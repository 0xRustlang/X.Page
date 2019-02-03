<template>
    <b-container fluid class="px-5 pt-3">
        <b-row id="proxy">
            <b-container fluid class="shadow p-3 mb-5 bg-white rounded" v-if="items.length">
                <b-row>
                    <b-col>
                        <filter-component :items="countries" v-model="selectedCountries"></filter-component>
                    </b-col>
                    <b-col>
                        <protocol-filter-component :items="selectedProtocols" v-model="selectedProtocols"></protocol-filter-component>
                    </b-col>
                </b-row>
                <table-component :items="items"></table-component>
            </b-container>
        </b-row>
    </b-container>
</template>

<script>
    import FilterComponent from '@/components/FilterComponent.vue'
    import ProtocolFilterComponent from '@/components/ProtocolFilterComponent.vue'
    import TableComponent from '@/components/TableComponent.vue'
    import axios from 'axios'
    import * as URI from 'urijs'

    export default {
        name: 'LandingComponent',
        metaInfo: {
            title: 'Прокси для Телеграм, список прокси'
        },
        components: {
            FilterComponent,
            ProtocolFilterComponent,
            TableComponent
        },
        data() {
            return {
                predefinedItems: [],
                items: [],
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
                                pingTimeMs: pingTimeMs,
                                uri: URI('tg://socks')
                                    .query({
                                        server: server,
                                        port: port
                                    })
                            };
                        });

                    this.items = this.predefinedItems;
                });
        }
    }
</script>