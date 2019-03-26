<template>
    <div id="app">
        <header>
            <b-navbar toggleable="md" type="light">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item :to="localePath('index')" exact>
                            {{ $t('menu.pages.home') }}
                        </b-nav-item>
                        <b-nav-item :to="localePath('proxy-checker')">
                            {{ $t('menu.pages.checker') }}
                        </b-nav-item>
                        <b-nav-item :to="localePath('pricing')">
                            {{ $t('menu.pages.pricing') }}
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
            <div class="header" v-show="['index', 'proxy-checker'].includes(getRouteBaseName())">
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
        <nuxt/>
        <footer class="text-light mt-3">
            <b-container>
                <b-row class="text-center justify-content-center pt-5 mb-3">
                    <b-col md="2" class="mb-3">
                        <h6 class="text-uppercase font-weight-bold">
                            <b-link class="text-light" :to="localePath('index')" exact>
                                {{ $t('menu.pages.home') }}
                            </b-link>
                        </h6>
                    </b-col>
                    <b-col md="3" class="mb-3">
                        <h6 class="text-uppercase font-weight-bold">
                            <b-link class="text-light" :to="localePath('proxy-checker')">
                                {{ $t('menu.pages.checker') }}
                            </b-link>
                        </h6>
                    </b-col>
                    <b-col md="3" class="mb-3">
                        <h6 class="text-uppercase font-weight-bold">
                            <a class="text-light" href="https://chrome.google.com/webstore/detail/firex-proxy/jccfbhillgcekaepchoahodacnlhcbnj">Google Chrome</a>
                        </h6>
                    </b-col>
                    <b-col md="2" class="mb-3">
                        <h6 class="text-uppercase font-weight-bold">
                            <a class="text-light" href="https://addons.mozilla.org/ru/firefox/addon/firex-proxy">Mozilla Firefox</a>
                        </h6>
                    </b-col>
                </b-row>
                <hr>
                <b-row class="text-center justify-content-center mb-md-0 mb-4">
                    <b-col md="8" class="mt-5">
                        <p class="about">
                            {{ $t('footer.about') }}
                        </p>
                    </b-col>
                </b-row>
                <hr class="d-md-none">
                <b-row class="pb-3">
                    <b-col md="12">
                        <div class="my-3 text-center">
                            <b-link href="#" class="text-light">
                                <fa :icon="['fab', 'twitter']" class="icon-default fa-lg mx-2"></fa>
                            </b-link>
                            <b-link href="#" class="text-light">
                                <fa :icon="['fab', 'vk']" class="icon-default fa-lg mx-2"></fa>
                            </b-link>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pb-3">
                    <b-col md="12">
                        <div class="my-2 text-center">
                            <fa :icon="['fa', 'envelope']" class="icon-default"></fa> <b-link href="mailto:feedback@corp.firexproxy.com" class="text-light">feedback@corp.firexproxy.com</b-link>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
            <div class="footer-copyright text-center py-3 text-muted">
                © 2019 Copyright <a class="text-light" href="https://www.firexproxy.com">FireX Proxy</a>
            </div>
        </footer>
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

<style lang="scss" scoped>
    nav {
        font-weight: 500;
    }

    footer {
        background-color: #1c2331;
        .about {
            line-height: 1.7rem;
        }
        .footer-copyright {
            background-color: rgba(0, 0, 0, .2);
        }
        hr {
            border-top: 1px solid rgba(255, 255, 255, .1);
        }
    }
</style>
