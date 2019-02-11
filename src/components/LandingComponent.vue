<template>
    <b-container fluid class="px-5 pt-3" v-if="items.length">
        <b-row>
            <b-container fluid class="shadow p-3 mb-3 bg-white rounded">
                <b-row>
                    <b-col>
                        <filter-component :items="countries" v-model="selectedCountries"></filter-component>
                    </b-col>
                    <b-col>
                        <protocol-filter-component :items="selectedProtocols" v-model="selectedProtocols"></protocol-filter-component>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
        <b-row>
            <b-container fluid class="shadow p-3 mb-3 bg-white rounded">
                <table-component :items="items" :per-page="perPage" :current-page="currentPage"></table-component>
            </b-container>
        </b-row>
        <b-row>
            <b-container fluid class="shadow p-3 bg-white rounded">
                <b-form-select id="rows" v-model="perPage" :options="[25, 50, 100]" class="float-left"></b-form-select>
                <b-pagination
                        :total-rows="items.length"
                        :per-page="perPage"
                        v-model="currentPage"
                        class="float-right m-0">
                </b-pagination>
            </b-container>
        </b-row>
    </b-container>
</template>

<script>
    import FilterComponent from '@/components/FilterComponent.vue'
    import ProtocolFilterComponent from '@/components/ProtocolFilterComponent.vue'
    import TableComponent from '@/components/TableComponent.vue'
    import axios from 'axios'

    export default {
        name: 'LandingComponent',
        components: {
            FilterComponent,
            ProtocolFilterComponent,
            TableComponent
        },
        data() {
            return {
                predefinedItems: [],
                items: [],
                currentPage: 1,
                perPage: 50,
                selectedCountries: [],
                selectedProtocols: [
                    'SOCKS5',
                    'HTTP'
                ]
            }
        },
        computed: {
            countries: {
                get: function () {
                    return this.items
                        .filter(this.unique)
                        .map(item => {
                            const { isoCode, country } = item;

                            return {
                                isoCode: isoCode,
                                country: country
                            }
                        })
                }
            }
        },
        methods: {
            unique: function (el, pos, items) {
                return items.map(v => v.isoCode).indexOf(el.isoCode) === pos
            },
            applySelectedCountries: function (item) {
                return this.selectedCountries.length === 0 || this.selectedCountries.map(v => v.isoCode).indexOf(item.isoCode) > -1
            },
            applySelectedProtocols: function (item) {
                return this.selectedProtocols.indexOf(item.protocol) > -1
            },
            applyFilter: function () {
                this.items = this.predefinedItems
                    .filter(this.applySelectedCountries)
                    .filter(this.applySelectedProtocols)
            }
        },
        watch: {
            selectedCountries: function () {
                this.applyFilter()
            },
            selectedProtocols: function () {
                this.applyFilter()
            }
        },
        mounted() {
            axios
                .get('https://api.firexproxy.com/v1/proxy')
                .then(response => response.data)
                .then(response => {
                    this.predefinedItems = response
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
                                pingTimeMs: pingTimeMs
                            };
                        });

                    this.items = this.predefinedItems;
                });
        }
    }
</script>

<style lang="scss" scoped>
    #rows {
        width: auto;
    }
</style>
