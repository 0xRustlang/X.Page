<template>
    <multiselect v-model="selectedProtocols"
                 :options="protocolOptions"
                 :clear-on-select="false"
                 :searchable="false"
                 :multiple="true"
                 :allow-empty="false"
                 :close-on-select="false">
    </multiselect>
</template>

<script>
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'ProtocolFilterComponent',
        components: {
            Multiselect
        },
        props: ['value', 'items'],
        data() {
            return {
                selectedProtocols: this.value,
                protocolOptions: this.items
            }
        },
        watch: {
            value: function (val) {
                this.selectedProtocols = val;
            },
            selectedProtocols: function (val) {
                this.$emit('input', val);
            }
        }
    }
</script>
