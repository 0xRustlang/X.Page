<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        metaInfo: {
            titleTemplate: '%s - FireX Proxy'
        }
    }
</script>

<style lang="scss">
    body {
        background: #3494E6;
        background: -webkit-linear-gradient(to right, #EC6EAD, #3494E6);
        background: linear-gradient(to right, #EC6EAD, #3494E6);
    }

    .ps__scrollbar-y-rail {
        right: 5px !important;
        opacity: 0.6 !important;
        background: transparent !important;
        .ps__scrollbar-y {
            background: rgba(255, 255, 255, 0.6) !important;
        }
    }
</style>