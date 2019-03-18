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
                <no-ssr>
                    <flag :iso="data.item.isoCode" :squared="false"></flag>
                </no-ssr>
                {{ data.item.country }}
            </template>
            <template slot="export" slot-scope="data">
                <copy-button-component :copy-string="`${data.item.server}:${data.item.port}`"></copy-button-component>
                <a :href="`tg://socks?server=${data.item.server}&port=${data.item.port}`"
                   target="_blank"
                   class="btn btn-primary"
                   variant="primary"
                   v-if="data.item.protocol.startsWith('SOCKS')">
                    <fa :icon="['fa', 'paper-plane']" class="icon-default"></fa>
                </a>
            </template>
        </b-table>
    </b-container>
</template>

<script>
    import CopyButtonComponent from '@/components/CopyButtonComponent.vue'

    export default {
        props: ['items', 'currentPage', 'perPage'],
        components: {
            CopyButtonComponent
        },
        data() {
            return {
                sortBy: 'protocol',
                sortDesc: true,
                fields: [
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
