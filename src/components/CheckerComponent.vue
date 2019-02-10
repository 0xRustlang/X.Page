<template>
    <b-container fluid class="px-5 pt-3">
        <b-row>
            <b-container fluid class="shadow p-3 mb-3 bg-white rounded">
                <b-form inline @paste.prevent="onPaste" @submit.prevent="onAdd(server)">
                    <b-col>
                        <b-form-input :state="validServer" v-model.trim="server" type="text" placeholder="127.0.0.1:8080"></b-form-input>
                        <b-button variant="primary" class="ml-1" type="submit">
                            <font-awesome-icon icon="plus-square"></font-awesome-icon>
                        </b-button>
                    </b-col>
                    <b-col>
                        <b-button variant="primary" @click="submit()">Check</b-button>
                        <b-button variant="primary" @click="copyAlive()">Copy alive</b-button>
                    </b-col>
                </b-form>
            </b-container>
        </b-row>
        <b-row>
            <b-container fluid class="shadow p-3 mb-3 bg-white rounded">
                <b-table :busy.sync="proxies.length === 0"
                         :items="proxies"
                         :fields="fields"
                         id="proxy-table"
                         responsive>
                    <template slot="country" slot-scope="data">
                        <flag :iso="data.item.isoCode" :squared="false"></flag>
                        {{ data.item.country }}
                    </template>
                    <template slot="export" slot-scope="data">
                        <b-button variant="danger" @click="onRemove(data.index)" v-if="state === 'init'">
                            <font-awesome-icon icon="trash"></font-awesome-icon>
                        </b-button>
                        <copy-button :copy-string="`${data.item.server}:${data.item.port}`"></copy-button>
                        <a :href="data.item.uri"
                           target="_blank"
                           class="btn btn-primary"
                           variant="primary"
                           v-if="data.item.protocol.startsWith('SOCKS')">
                            <font-awesome-icon icon="paper-plane"></font-awesome-icon>
                        </a>
                    </template>
                    <template slot="status" slot-scope="data">
                        <b-badge variant="success" v-if="data.item.lossRatio !== 1">Works</b-badge>
                        <b-badge variant="danger" v-else-if="data.item.lossRatio === 1 && state === 'finished'">Dead</b-badge>
                        <b-badge variant="warning" v-else-if="data.item.lossRatio === 1 && state === 'progress'">Checking</b-badge>
                    </template>
                </b-table>
            </b-container>
        </b-row>
    </b-container>
</template>

<script>
    import * as URI from 'urijs'
    import CopyButton from "@/components/CopyButtonComponent.vue";

    export default {
        components: {
            CopyButton
        },
        name: 'CheckerComponent',
        data() {
            return {
                server: '',
                proxies: [],
                receivedPackets: 0,
                state: 'init',
                expectedPackets: 0,
                fields: [
                    {
                        key: 'status',
                        sortable: true,
                        label: 'Status',
                        class: 'align-middle'
                    },
                    {
                        key: 'country',
                        sortable: true,
                        label: 'Country',
                        class: 'align-middle'
                    },
                    {
                        key: 'server',
                        label: 'IP address',
                        class: 'align-middle'
                    },
                    {
                        key: 'port',
                        label: 'Port',
                        class: 'align-middle'
                    },
                    {
                        key: 'protocol',
                        sortable: true,
                        label: 'Protocol',
                        class: 'align-middle'
                    },
                    {
                        key: 'pingTimeMs',
                        sortable: true,
                        label: 'Ping (ms)',
                        class: 'align-middle'
                    },
                    {
                        key: 'export',
                        label: 'Actions',
                        class: 'align-middle'
                    }
                ]
            }
        },
        computed: {
            validServer() {
                return  this.server.length === 0 || this.checkIP(this.server);
            }
        },
        methods: {
            onPaste(e) {
                const text = (e.originalEvent || e).clipboardData.getData('text/plain');

                text.split('\n').forEach(this.onAdd.bind(this));
            },
            checkIP(server) {
                return this.isUnique(server) && /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/.test(server);
            },
            isUnique(newServer) {
                const [server, port] = newServer.split(':');

                return !this.proxies.some(proxy => proxy.server === server && proxy.port === port);
            },
            onAdd(newServer) {
                if (newServer.length === 0 || !this.checkIP(newServer) || this.proxies.length === 20) {
                    return;
                }

                const [server, port] = newServer.split(':');

                this.proxies.push({
                    server,
                    port,
                    country: '-',
                    protocol: '-',
                    pingTimeMs: '-',
                    lossRatio: 1
                });

                this.server = '';
                this.state = 'init';
            },
            onRemove(index) {
                this.proxies.splice(index, 1);
            },
            submit() {
                if (this.proxies.length === 0) {
                    return;
                }

                this.proxies = this.proxies.map(proxy => ({
                    server: proxy.server,
                    port: proxy.port,
                    country: '-',
                    protocol: '-',
                    pingTimeMs: '-',
                    lossRatio: 1
                }));

                this.receivedPackets = 0;
                this.state = 'progress';
                this.expectedPackets = this.proxies.length * 2;

                this.ws.send(JSON.stringify(this.proxies));
            },
            onReceive({ data }) {
                data
                    .split('\n')
                    .forEach(line => {
                        const newServer = JSON.parse(line);

                        const {
                            server,
                            port,
                            loss_ratio: lossRatio,
                            protocol,
                            ping_time_ms: pingTimeMs,
                            iso_code: isoCode,
                            country
                        } = newServer;

                        const index = this.proxies.findIndex(proxy => proxy.server === server && proxy.port === port);

                        if (index === -1) {
                            return;
                        }

                        if (lossRatio < 1) {
                            this.proxies.splice(index, 1, {
                                server,
                                port,
                                lossRatio,
                                protocol,
                                pingTimeMs,
                                isoCode,
                                country,
                                uri: URI('tg://socks')
                                    .query({
                                        server: server,
                                        port: port
                                    })
                            });
                        }

                        this.receivedPackets++;
                    });

                if (this.expectedPackets === this.receivedPackets) {
                    this.state = 'finished';
                }
            },
            copyAlive() {
                const text = this.proxies
                    .filter(proxy => proxy.lossRatio !== 1)
                    .map(proxy => `${proxy.server}:${proxy.port}`)
                    .join('\n');

                this.$copyText(text);
            },
            connect() {
                this.ws = new WebSocket('ws://localhost:8081');
                this.ws.onmessage = this.onReceive.bind(this);
                this.ws.onclose = this.connect.bind(this);
            }
        },
        mounted() {
            this.connect();
        }
    }
</script>

<style lang="scss">
    .table {
        tr {
            &:first-of-type {
                th {
                    border-top: none;
                }
            }
        }
    }
</style>