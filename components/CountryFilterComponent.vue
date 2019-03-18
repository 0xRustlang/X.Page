<template>
    <multiselect v-model="selectedCountries"
                 :placeholder="$t('filters.country.placeholder')"
                 :options="countries"
                 track-by="country"
                 label="country"
                 :clear-on-select="false"
                 :searchable="true"
                 :multiple="true"
                 :close-on-select="false">
        <template slot="clear" slot-scope="props">
            <div class="multiselect__clear"
                 v-if="selectedCountries.length"
                 @mousedown.prevent.stop="clearAll()">
            </div>
        </template>
        <template slot="option" slot-scope="props">
            <div class="option__desc">
                <no-ssr>
                    <flag :iso="props.option.isoCode" :squared="false"></flag>
                </no-ssr>
                <span class="option__title">{{ props.option.country }}</span>
            </div>
        </template>
    </multiselect>
</template>

<script>
    export default {
        name: 'FilterComponent',
        methods: {
            clearAll() {
                this.selectedCountries = []
            }
        },
        computed: {
            ...mapState({
                countries: state => state.filter.countries,
                selectedCountries: state => state.filter.countryFilter
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .option__desc {
        display: inline-block;
        vertical-align: middle;
    }
</style>
