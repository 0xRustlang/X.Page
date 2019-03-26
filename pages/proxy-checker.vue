<template>
    <b-container fluid class="content pt-3">
        <b-container fluid class="shadow-sm p-3 mb-3 bg-white rounded">
            <b-row>
                <b-col>
                    <b-form inline @paste.prevent="onPaste" @submit.prevent="onAdd(server)" class="m-0">
                        <b-input-group>
                            <b-form-input :state="valid" v-model.trim="server" type="text" placeholder="127.0.0.1:8080"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="primary" class="ml-1" type="submit">
                                    <fa :icon="['fa', 'plus-square']" class="icon-default"></fa>
                                </b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form>
                </b-col>
                <b-col>
                    <b-button variant="primary" @click="copyAlive()" class="float-right">
                        {{ $t('proxy.copyAlive') }}
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid class="shadow-sm p-3 mb-3 bg-white rounded">
            <b-row>
                <b-table :busy.sync="proxies.length === 0"
                         :items="proxies"
                         :fields="fields"
                         responsive>
                    <template slot="index" slot-scope="data">
                        {{ data.index + 1 }}
                    </template>
                    <template slot="country" slot-scope="data">
                        <no-ssr>
                            <flag :iso="data.item.isoCode" :squared="false"></flag>
                        </no-ssr>
                        {{ data.item.country }}
                    </template>
                    <template slot="export" slot-scope="data">
                        <copy-button-component :copy-string="`${data.item.server}:${data.item.port}`"></copy-button-component>
                        <a :href="'tg://socks?server=${data.item.server}&port=${data.item.port}'"
                           target="_blank"
                           class="btn btn-primary"
                           variant="primary"
                           v-if="data.item.protocol.startsWith('SOCKS')">
                            <fa :icon="['fa', 'paper-plane']" class="icon-default"></fa>
                        </a>
                    </template>
                    <template slot="status" slot-scope="data">
                        <b-badge variant="success" v-if="data.item.lossRatio < 1">
                            {{ $t('proxy.status.available') }}
                        </b-badge>
                        <b-badge variant="danger" v-else-if="data.item.lossRatio === 1 && data.item.counter === 2">
                            {{ $t('proxy.status.unavailable') }}
                        </b-badge>
                        <b-badge variant="warning" v-else>
                            {{ $t('proxy.status.checking') }}
                        </b-badge>
                    </template>
                </b-table>
            </b-row>
        </b-container>
    </b-container>
</template>

<script>
    import CopyButtonComponent from '@/components/CopyButtonComponent.vue'

    export const MAX_QUEUE_SIZE = 20;

    export default {
        components: {
            CopyButtonComponent
        },
        head() {
            return {
                title: this.$i18n.t('metadata.title.checker'),
                meta: [
                    {
                        name: 'description',
                        content: this.$i18n.t('metadata.description.checker')
                    },
                    {
                        name: 'keywords',
                        content: this.$i18n.t('metadata.keywords.checker')
                    }
                ]
            }
        },
        data() {
            return {
                server: '',
                proxies: [],
                fields: [
                    {
                        key: 'index',
                        label: '#',
                        class: 'align-middle'
                    },
                    {
                        key: 'status',
                        sortable: true,
                        label: this.$i18n.t('table.status'),
                        class: 'align-middle'
                    },
                    {
                        key: 'country',
                        sortable: true,
                        label: this.$i18n.t('table.country'),
                        class: 'align-middle'
                    },
                    {
                        key: 'server',
                        label: this.$i18n.t('table.server'),
                        class: 'align-middle'
                    },
                    {
                        key: 'port',
                        label: this.$i18n.t('table.port'),
                        class: 'align-middle'
                    },
                    {
                        key: 'protocol',
                        sortable: true,
                        label: this.$i18n.t('table.protocol'),
                        class: 'align-middle'
                    },
                    {
                        key: 'pingTimeMs',
                        sortable: true,
                        label: this.$i18n.t('table.ping'),
                        class: 'align-middle'
                    },
                    {
                        key: 'export',
                        label: this.$i18n.t('table.export'),
                        class: 'align-middle'
                    }
                ]
            }
        },
        computed: {
            valid() {
                return this.server.length === 0 || this.checkServer(this.server);
            }
        },
        methods: {
            onPaste(e) {
                const clipboard = (e.originalEvent || e)
                    .clipboardData
                    .getData('text/plain')
                    .split('\n');

                const data = clipboard
                    .filter(this.checkServer.bind(this))
                    .slice(0, this.availableQueueSize())
                    .map(v => this.create(...v.split(':')));

                this.server = clipboard.find(s => this.checkServer(s) === false) || '';

                this.proxies.push(...data);
                this.ws.send(JSON.stringify(data));
            },
            checkServer(server) {
                return this.isUnique(server) && /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/.test(server);
            },
            isUnique(newServer) {
                const [server, port] = newServer.split(':');

                return !this.proxies.some(proxy => proxy.server === server && proxy.port === port);
            },
            onAdd(newServer) {
                if (newServer.length === 0 || !this.checkServer(newServer) || this.proxies.length === MAX_QUEUE_SIZE) {
                    return;
                }

                const proxy = this.create(...newServer.split(':'));

                this.proxies.push(proxy);
                this.ws.send(JSON.stringify([proxy]));

                this.server = '';
            },
            availableQueueSize() {
                return MAX_QUEUE_SIZE - this.proxies.filter(v => v.counter < 2).length;
            },
            create(server, port) {
                return {
                    server,
                    port,
                    country: '-',
                    protocol: '-',
                    pingTimeMs: '-',
                    lossRatio: 1,
                    counter: 0
                }
            },
            onReceive({ data }) {
                data
                    .split('\n')
                    .forEach(line => {
                        const {
                            server,
                            port,
                            loss_ratio: lossRatio,
                            protocol,
                            ping_time_ms: pingTimeMs,
                            iso_code: isoCode,
                            country
                        } = JSON.parse(line);

                        const index = this.proxies.findIndex(proxy => proxy.server === server && proxy.port === port);

                        if (index === -1) {
                            return;
                        }

                        this.proxies[index].counter++;

                        if (lossRatio < 1) {
                            this.proxies.splice(index, 1, {
                                server,
                                port,
                                lossRatio,
                                protocol,
                                pingTimeMs,
                                isoCode,
                                country,
                                counter: this.proxies[index].counter
                            });
                        }
                    });
            },
            copyAlive() {
                const text = this.proxies
                    .filter(proxy => proxy.lossRatio < 1)
                    .map(proxy => `${proxy.server}:${proxy.port}`)
                    .join('\n');

                this.$copyText(text);
            },
            connect() {
                this.ws = new WebSocket('wss://ws.firexproxy.com');
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
