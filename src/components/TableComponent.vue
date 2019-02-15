<template>
    <b-container fluid>
        <b-table :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :busy.sync="items.length === 0"
                 :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 id="proxy-table"
                 responsive>
            <template slot="country" slot-scope="data">
                <no-ssr>
                    <flag :iso="data.item.isoCode" :squared="false"></flag>
                </no-ssr>
                {{ data.item.country }}
            </template>
            <template slot="export" slot-scope="data">
                <copy-button :copy-string="`${data.item.server}:${data.item.port}`"></copy-button>
                <a :href="'tg://socks?server=${data.item.server}&port=${data.item.port}'"
                   target="_blank"
                   class="btn btn-primary"
                   variant="primary"
                   v-if="data.item.protocol.startsWith('SOCKS')">
                    <font-awesome-icon icon="paper-plane"></font-awesome-icon>
                </a>
            </template>
        </b-table>
    </b-container>
</template>

<script>
    import CopyButton from "@/components/CopyButtonComponent.vue"

    export default {
        name: 'TableComponent',
        props: ['items', 'currentPage', 'perPage'],
        components: {
            CopyButton
        },
        data() {
            return {
                sortBy: 'protocol',
                sortDesc: true,
                fields: [
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
                        label: 'Export',
                        class: 'align-middle'
                    }
                ]
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
