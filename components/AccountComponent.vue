<template>
    <b-nav-dropdown v-if="credentials.accessToken" :text="name" right>
        <b-dropdown-item @click="logout">{{ $t('auth.logout') }}</b-dropdown-item>
    </b-nav-dropdown>
    <b-nav-item v-else @click="auth">
        {{ $t('auth.title') }}
    </b-nav-item>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            credentials() {
                return this.$store.state.user.credentials;
            },
            ...mapGetters('user', {
                name: 'name'
            })
        },
        methods: {
            auth() {
                this.$root.$emit('bv::show::modal', 'authModal')
            },
            logout() {
                this.$store.commit('user/setCredentials', { credentials: {} });
                this.$cookies.remove('credentials')
            }
        }
    }
</script>