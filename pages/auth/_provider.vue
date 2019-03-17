<template></template>

<script>
    export default {
        layout: 'empty',
        async mounted() {
            const { provider } = this.$route.params;
            const { query } = this.$route;

            await this.$store.dispatch('user/authenticate', { provider, query })
                .then(() => {
                    this.$cookies.set('credentials', this.$store.state.user.credentials, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 3
                    })
                });

            window.close();
        }
    }
</script>
