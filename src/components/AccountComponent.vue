<template>
    <b-nav-dropdown v-if="accessToken" :text="name" right>
        <b-dropdown-item @click="logout">{{ $t('logout') }}</b-dropdown-item>
    </b-nav-dropdown>
    <b-nav-item v-else @click="auth">
        {{ $t('signin') }}
    </b-nav-item>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapState('user', {
                accessToken: 'accessToken',
            }),
            ...mapGetters('user', {
                name: 'name'
            })
        },
        methods: {
            auth() {
                this.$root.$emit('bv::show::modal', 'authModal')
            },
            logout() {
                this.$store.dispatch('user/logout');
            }
        }
    }
</script>