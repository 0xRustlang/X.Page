<template>
    <multiselect v-model="selectedCountries"
                 placeholder="Country..."
                 :options="countryOptions"
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
            <flag-icon-component :iso="props.option.isoCode"></flag-icon-component>
            <div class="option__desc">
                <span class="option__title">{{ props.option.country }}</span>
            </div>
        </template>
    </multiselect>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import FlagIconComponent from '@/components/FlagIconComponent.vue'

    export default {
        name: 'FilterComponent',
        components: {
            FlagIconComponent,
            Multiselect
        },
        props: ['value', 'items'],
        data() {
            return {
                selectedCountries: this.value,
                countryOptions: this.items
            }
        },
        methods: {
            clearAll() {
                this.selectedCountries = []
            }
        },
        watch: {
            value: function (val) {
                this.selectedCountries = val;
            },
            selectedCountries: function (val) {
                this.$emit('input', val);
            }
        },
        mounted() {
            this.countryOptions = this.countryOptions.sort();
        }
    }
</script>

<style lang="scss" scoped>
    .option__desc {
        display: inline-block;
        vertical-align: middle;
    }

    .multiselect__option {
        .flag-icon {
            vertical-align: middle;
        }
    }
</style>
