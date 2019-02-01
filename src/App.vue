<template>
    <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="items"
             :fields="fields">
    </b-table>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                sortBy: 'ping_time_ms',
                sortDesc: false,
                fields: [
                    {
                        key: 'server',
                        label: 'IP-адрес'
                    },
                    {
                        key: 'port',
                        label: 'Порт'
                    },
                    {
                        key: 'protocol',
                        sortable: true,
                        label: 'Протокол'
                    },
                    {
                        key: 'ping_time_ms',
                        sortable: true,
                        label: 'Пинг (ms)'
                    },
                ],
                items: []
            }
        },
        mounted() {
            axios
                .get('https://api.firexproxy.com/v1/proxy')
                .then(response => response.data)
                .then(response => this.items = response);
        }
    }
</script>
