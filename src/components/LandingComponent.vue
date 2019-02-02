<template>
    <b-container fluid>
        <b-row id="topbar">
            <top-bar-component></top-bar-component>
        </b-row>
        <b-row id="proxy">
            <table-component></table-component>
        </b-row>
    </b-container>
</template>

<script>
    import TopBarComponent from '@/components/TopBarComponent.vue'
    import TableComponent from '@/components/TableComponent.vue'

    export default {
        name: 'LandingComponent',
        metaInfo: {
            title: 'Index'
        },
        components: {
            TopBarComponent,
            TableComponent
        }
    }
</script>

<style lang="scss" scoped>
    .row {
        margin: 20px;

        &#topbar {
            height: 40vh;
            overflow: auto;
            background: inherit;
            position: relative;

            &:before {
                content: '';
                box-shadow: inset 0 0 0 200px rgba(255,255,255,0.3);
                filter: blur(10px);
                position: absolute;
                height: 100%;
                width: 100%;
            }
        }

        &#proxy {
            background: white;
        }
    }
</style>