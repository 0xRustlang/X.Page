<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="primary">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item to="/" active>Home</b-nav-item>
                    <b-nav-item to="/proxy-checker">Proxy Checker</b-nav-item>
                </b-navbar-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item
                            href="https://chrome.google.com/webstore/detail/firex-proxy/jccfbhillgcekaepchoahodacnlhcbnj"
                            target="_blank">
                        Add to Chrome
                    </b-nav-item>
                    <b-nav-item href="https://addons.mozilla.org/ru/firefox/addon/firex-proxy" target="_blank">
                        Add to Firefox
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>
