<template>
    <multiselect v-model="selectedProtocols"
                 :options="protocols"
                 :clear-on-select="false"
                 :searchable="false"
                 :multiple="true"
                 :allow-empty="false"
                 :close-on-select="false">
    </multiselect>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'ProtocolFilterComponent',
        computed: {
            ...mapState({
                protocols: state => state.filter.protocols,
            }),
            selectedProtocols: {
                get() {
                    return this.$store.state.filter.protocolFilter;
                },
                set(newValue) {
                    this.$store.commit('filter/setProtocolFilter', newValue);
                }
            }
        }
    }
</script>
