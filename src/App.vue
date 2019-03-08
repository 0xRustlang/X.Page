<template>
    <div id="app">
        <header>
            <b-navbar toggleable="md" type="dark" variant="primary">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item :to="$i18nRoute({ name: 'home' })" exact>{{ $t('pages.home') }}</b-nav-item>
                        <b-nav-item :to="$i18nRoute({ name: 'proxy-checker' })">{{ $t('pages.checker') }}</b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item
                                href="https://chrome.google.com/webstore/detail/firex-proxy/jccfbhillgcekaepchoahodacnlhcbnj"
                                target="_blank">
                            {{ $t('addon.chrome') }}
                        </b-nav-item>
                        <b-nav-item href="https://addons.mozilla.org/ru/firefox/addon/firex-proxy" target="_blank">
                            {{ $t('addon.firefox') }}
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
                            <h3>Бесплатные прокси-сервера, прокси для Телеграм, прокси-чекер, проверка прокси</h3>
                        </div>
                    </b-row>
                </b-container>
            </div>
        </header>
        <div class="content">
            <router-view></router-view>
        </div>
        <auth-modal-component></auth-modal-component>
    </div>
</template>

<script>
    import AuthModalComponent from "@/components/AuthModalComponent"
    import LanguageSwitcherComponent from "@/components/LanguageSwitcherComponent";
    import AccountComponent from "@/components/AccountComponent";

    export default {
        name: 'App',
        components: {
            AccountComponent,
            LanguageSwitcherComponent,
            AuthModalComponent
        },
        metaInfo: {
            titleTemplate: '%s - FireX Proxy'
        },
        async mounted() {
            if (this.$store.state.user.accessToken) {
                const isExpired = await this.$store.dispatch('user/isExpired');

                if (isExpired) {
                    await this.$store.dispatch('user/refreshToken');
                }
            }

            await this.$store.dispatch('user/profile');
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        height: 60vh;
        background: url(assets/background.jpg) 50%;
        background-size: cover;
        position: relative;
        display: flex;
        align-items: center;
        text-align: center;
        color: white;
        &::after {
            content: '';
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: block;
            left: 0;
            top: 0;
            background: rgba($primary, 0.88);
            background: linear-gradient(to bottom, rgba($primary, 1.0), rgba($primary, 0.31));
            background: -webkit-linear-gradient(to bottom, rgba($primary, 1.0), rgba($primary, 0.31));
        }
        .container {
            position: relative;
            z-index: 2;
            h1 {
                font-size: 4.2rem;
                font-weight: 600;
            }
            h3 {
                font-size: 1.313rem;
            }
        }
    }

    .content {
        position: relative;
        margin-top: -60px;
        z-index: 2;
    }
</style>
