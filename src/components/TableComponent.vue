<template>
    <b-container fluid>
        <b-table :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :busy.sync="items.length === 0"
                 :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage">
            <template slot="country" slot-scope="data">
                <flag :iso="data.item.isoCode" :squared="false"></flag>
                {{ data.item.country }}
            </template>
            <template slot="export" slot-scope="data">
                <b-button variant="light" v-clipboard:copy="`${data.item.server}:${data.item.port}`">
                    <font-awesome-icon icon="copy"></font-awesome-icon>
                </b-button>
                <a :href="data.item.uri"
                   target="_blank"
                   class="btn btn-primary"
                   variant="primary"
                   v-if="data.item.protocol.startsWith('SOCKS')"
                   role="button">
                    <font-awesome-icon icon="paper-plane"></font-awesome-icon>
                </a>
            </template>
        </b-table>
        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination
                        :total-rows="totalRows"
                        :per-page="perPage"
                        v-model="currentPage"
                        class="my-0">
                </b-pagination>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'
    import * as URI from 'urijs'

    export default {
        metaInfo: {
            title: 'Прокси для Телеграм'
        },
        name: 'TableComponent',
        data() {
            return {
                sortBy: 'protocol',
                sortDesc: true,
                fields: [
                    {
                        key: 'country',
                        sortable: true,
                        label: 'Страна'
                    },
                    {
                        key: 'server',
                        label: 'IP-адрес'
                    },
                    {
                        key: 'port',
                        label: 'Порт'
                    },
                    {
                        key: 'protocol',
                        sortable: true,
                        label: 'Протокол'
                    },
                    {
                        key: 'pingTimeMs',
                        sortable: true,
                        label: 'Пинг (ms)'
                    },
                    {
                        key: 'export',
                        label: 'Экспорт'
                    }
                ],
                currentPage: 1,
                perPage: 50,
                totalRows: 0,
                items: []
            }
        },
        mounted() {
            axios
                .get('https://api.firexproxy.com/v1/proxy')
                .then(response => response.data)
                .then(response => {
                    this.totalRows = response.length;
                    this.items = response
                        .filter(item => {
                            const { iso_code: isoCode } = item;

                            return isoCode
                        })
                        .map(item => {
                            const {
                                server,
                                port,
                                iso_code: isoCode,
                                country,
                                protocol,
                                ping_time_ms: pingTimeMs
                            } = item;

                            return {
                                isoCode: isoCode.toLowerCase(),
                                server: server,
                                port: port,
                                country: country,
                                protocol: protocol,
                                pingTimeMs: pingTimeMs,
                                uri: URI('tg://socks')
                                    .query({
                                        server: server,
                                        port: port
                                    })
                            };
                        });
                });
        }
    }
</script>
