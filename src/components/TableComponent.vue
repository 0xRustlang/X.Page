<template>
    <b-container fluid>
        <b-table :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :busy.sync="items.length === 0"
                 :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 responsive>
            <template slot="country" slot-scope="data">
                <flag-icon-component :iso="data.item.isoCode"></flag-icon-component>
                {{ data.item.country }}
            </template>
            <template slot="export" slot-scope="data">
                <copy-button :copy-string="`${data.item.server}:${data.item.port}`"></copy-button>
                <a :href="`tg://socks?server=${data.item.server}&port=${data.item.port}`"
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
    import CopyButton from '@/components/CopyButtonComponent.vue'
    import FlagIconComponent from '@/components/FlagIconComponent.vue'

    export default {
        name: 'TableComponent',
        props: ['items', 'currentPage', 'perPage'],
        components: {
            FlagIconComponent,
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

    a.btn {
        padding: 0.70rem 0.70rem;
    }
</style>
