<template>
    <div id="app">
        <header>
            <b-navbar toggleable="md" type="dark" variant="primary">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item :to="localePath('index')" exact>
                            {{ $t('menu.pages.home') }}
                        </b-nav-item>
                        <b-nav-item :to="localePath('proxy-checker')">
                            {{ $t('menu.pages.checker') }}
                        </b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item href="https://chrome.google.com/webstore/detail/firex-proxy/jccfbhillgcekaepchoahodacnlhcbnj"
                                target="_blank">
                            {{ $t('menu.addon.chrome') }}
                        </b-nav-item>
                        <b-nav-item href="https://addons.mozilla.org/ru/firefox/addon/firex-proxy" target="_blank">
                            {{ $t('menu.addon.firefox') }}
                        </b-nav-item>
                        <account-component></account-component>
                        <language-switcher-component></language-switcher-component>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <div class="header">
                <b-container>
                    <b-row>
                        <div class="col-md-8 ml-auto mr-auto">
                            <h1>FireX Proxy</h1>
                            <h3>{{ $t('headers.description.main') }}</h3>
                        </div>
                    </b-row>
                </b-container>
            </div>
        </header>
        <div class="content">
            <nuxt/>
        </div>
        <auth-modal-component></auth-modal-component>
    </div>
</template>

<script>
    import AuthModalComponent from "@/components/AuthModalComponent"
    import LanguageSwitcherComponent from "@/components/LanguageSwitcherComponent"
    import AccountComponent from "@/components/AccountComponent"
    import { mapGetters } from 'vuex'

    export default {
        components: {
            AccountComponent,
            LanguageSwitcherComponent,
            AuthModalComponent
        },
        computed: {
            ...mapGetters('user', {
                isExpired: 'isExpired'
            })
        },
        async mounted() {
            if (!this.$store.state.user.credentials.accessToken) {
                return;
            }

            if (this.isExpired) {
                await this.$store.dispatch('user/refreshToken')
                    .then(() => {
                        this.$cookies.set('credentials', this.$store.state.user.credentials, {
                            path: '/',
                            maxAge: 60 * 60 * 24 * 3
                        })
                    });
            }

            this.$store.dispatch('user/profile');
        }
    }
</script>
