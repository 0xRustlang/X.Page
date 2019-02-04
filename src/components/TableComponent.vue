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
                <copy-button :copy-string="`${data.item.server}:${data.item.port}`"></copy-button>
                <a :href="data.item.uri"
                   target="_blank"
                   class="btn btn-primary"
                   variant="primary"
                   v-if="data.item.protocol.startsWith('SOCKS')">
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
    import CopyButton from "@/components/CopyButtonComponent.vue";

    export default {
        name: 'TableComponent',
        props: ['items'],
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
