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
    .ps__scrollbar-y-rail {
        right: 5px;
        opacity: 0.6;
        background: transparent;
        .ps__scrollbar-y {
            background: rgba(255, 255, 255, 0.6);
        }
    }

    .multiselect--active {
        z-index: 10;
    }

    .multiselect__clear {
        position: absolute;
        right: 35px;
        height: 22px;
        width: 22px;
        display: block;
        cursor: pointer;
        z-index: 2;
        &:before {
            transform: rotate(45deg);
        }
        &:after {
            transform: rotate(-45deg);
        }
        &:after,
        &:before {
            content: "";
            display: block;
            position: absolute;
            width: 2px;
            height: 16px;
            background: #aaa;
            top: 65%;
            right: 10px;
        }
    }
</style>
