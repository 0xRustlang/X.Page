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
                <flag :iso="data.item.iso_code.toLowerCase()" :squared="false"></flag> {{ data.item.country }}
            </template>
            <template slot="export" slot-scope="data">
                <b-button variant="light" v-clipboard:copy="`${data.item.server}:${data.item.port}`">
                    <font-awesome-icon icon="copy"></font-awesome-icon>
                </b-button>
                <a :href="`tg://socks?server=${data.item.server}&port=${data.item.port}`"
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
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'

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
                        key: 'ping_time_ms',
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
                    this.items = response;
                    this.totalRows = response.length;
                });
        }
    }
</script>
