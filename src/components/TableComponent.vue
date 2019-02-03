<template>
    <b-container fluid>
        <b-table :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :busy.sync="items.length === 0"
                 :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 id="proxy-table">
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
                        :total-rows="items.length"
                        :per-page="perPage"
                        v-model="currentPage"
                        class="my-0">
                </b-pagination>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'TableComponent',
        props: ['items'],
        data() {
            return {
                sortBy: 'protocol',
                sortDesc: true,
                fields: [
                    {
                        key: 'country',
                        sortable: true,
                        label: 'Страна',
                        class: 'align-middle'
                    },
                    {
                        key: 'server',
                        label: 'IP-адрес',
                        class: 'align-middle'
                    },
                    {
                        key: 'port',
                        label: 'Порт',
                        class: 'align-middle'
                    },
                    {
                        key: 'protocol',
                        sortable: true,
                        label: 'Протокол',
                        class: 'align-middle'
                    },
                    {
                        key: 'pingTimeMs',
                        sortable: true,
                        label: 'Пинг (ms)',
                        class: 'align-middle'
                    },
                    {
                        key: 'export',
                        label: 'Экспорт',
                        class: 'align-middle'
                    }
                ],
                currentPage: 1,
                perPage: 50
            }
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
