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
    </multiselect>
</template>

<script>
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'FilterComponent',
        components: {
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
        }
    }
</script>
