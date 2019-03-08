<template></template>
<script>
    export default {
        name: 'AuthComponent',
        async mounted() {
            const { provider } = this.$route.params;
            const { query } = this.$route;

            await this.$store.dispatch('user/authenticate', { provider, query });
            window.close();
        }
    }
</script>