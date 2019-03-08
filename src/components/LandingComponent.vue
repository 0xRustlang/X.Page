<template>
    <b-container fluid class="pt-3" v-if="items.length">
        <b-container fluid class="shadow-sm p-3 mb-3 bg-white rounded">
            <b-row>
                <b-col md="6">
                    <filter-component :items="countries" v-model="selectedCountries"></filter-component>
                </b-col>
                <b-col md="6">
                    <protocol-filter-component :items="selectedProtocols"
                                               v-model="selectedProtocols">
                    </protocol-filter-component>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid class="shadow-sm p-3 mb-3 bg-white rounded">
            <b-row>
                <table-component :items="items" :per-page="perPage" :current-page="currentPage"></table-component>
            </b-row>
        </b-container>
        <b-container fluid class="shadow-sm p-3 bg-white rounded">
            <b-row>
                <b-col sm="12" md="5" class="my-1">
                    <b-form-select id="rows" v-model="perPage" :options="[25, 50, 100]"></b-form-select>
                </b-col>
                <b-col sm="12" md="7" class="my-1">
                    <b-pagination :total-rows="items.length"
                                  :per-page="perPage"
                                  v-model="currentPage"
                                  class="m-0">
                    </b-pagination>
                </b-col>
            </b-row>
        </b-container>
        <router-view></router-view>
    </b-container>
</template>

<script>
    import FilterComponent from '@/components/FilterComponent.vue'
    import ProtocolFilterComponent from '@/components/ProtocolFilterComponent.vue'
    import TableComponent from '@/components/TableComponent.vue'
    import { mapState } from 'vuex'

    export default {
        name: 'LandingComponent',
        components: {
            FilterComponent,
            ProtocolFilterComponent,
            TableComponent
        },
        metaInfo: {
            title: 'Прокси для Телеграм, список прокси SOCKS5, HTTP',
            meta: [
                {
                    name: 'description',
                    content: 'Бесплатный список проверенных прокси SOCKS5, HTTP с ежеминутным обновлением'
                },
                {
                    name: 'keywords',
                    content: 'прокси, прокси бесплатно, socks5, http, firex proxy, прокси телеграм, быстрые прокси'
                }
            ]
        },
        data() {
            return {
                currentPage: 1,
                perPage: 50
            }
        },
        computed: {
            ...mapState({
                predefinedItems: state => state.proxies.items
            }),
            ...mapState('filters', {
                countries: 'countries',
                protocols: 'protocols'
            }),
            items() {
                return this.predefinedItems
                    .filter(this.applySelectedCountries)
                    .filter(this.applySelectedProtocols);
            },
            selectedCountries: {
                get() {
                    return this.$store.state.filters.countryFilter;
                },
                set(newValue) {
                    this.$store.commit('filters/setCountryFilter', newValue);
                }
            },
            selectedProtocols: {
                get() {
                    return this.$store.state.filters.protocolFilter;
                },
                set(newValue) {
                    this.$store.commit('filters/setProtocolFilter', newValue);
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
            }
        },
        async mounted() {
            try {
                await this.$store.dispatch('poll');
                await this.$store.dispatch('filters/updateCountries', this.predefinedItems.filter(this.unique));
            } catch (_) {}
        }
    }
</script>

<style lang="scss" scoped>
    #rows {
        width: auto;
        -moz-appearance: none;
        -webkit-appearance: none;
        &::-ms-expand {
            display: none;
        }
    }

    .pagination {
        justify-content: flex-end;
    }

    @media all and (max-width: 767px) {
        #rows {
            width: 100%;
        }

        .pagination {
            justify-content: center;
        }
    }
</style>
