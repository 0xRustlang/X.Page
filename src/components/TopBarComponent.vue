<template>
    <b-container fluid>
        <b-row>
            <b-col sm="3" class="countries">
                <VuePerfectScrollbar class="scroller">
                    <b-list-group>
                        <b-list-group-item>
                            <div class="float-left">Brazilia
                            </div>

                            <div class="float-right">
                                <font-awesome-icon icon="shield-alt"></font-awesome-icon>
                                255
                            </div>
                        </b-list-group-item>
                        <b-list-group-item class="active">
                            <div class="float-left">Singapore
                            </div>

                            <div class="float-right">
                                <font-awesome-icon icon="shield-alt"></font-awesome-icon>
                                144
                            </div>
                        </b-list-group-item>
                        <b-list-group-item>Jingle</b-list-group-item>
                        <b-list-group-item>Amazon</b-list-group-item>
                        <b-list-group-item>Russia</b-list-group-item>
                        <b-list-group-item>Brazilia</b-list-group-item>
                        <b-list-group-item>Singapore</b-list-group-item>
                        <b-list-group-item>Jingle</b-list-group-item>
                        <b-list-group-item>Amazon</b-list-group-item>
                        <b-list-group-item>Russia</b-list-group-item>
                        <b-list-group-item>Brazilia</b-list-group-item>
                        <b-list-group-item>Singapore</b-list-group-item>
                        <b-list-group-item>Jingle</b-list-group-item>
                        <b-list-group-item>Amazon</b-list-group-item>
                        <b-list-group-item>Russia</b-list-group-item>
                        <b-list-group-item>Brazilia</b-list-group-item>
                        <b-list-group-item>Singapore</b-list-group-item>
                        <b-list-group-item>Jingle</b-list-group-item>
                        <b-list-group-item>Amazon</b-list-group-item>
                        <b-list-group-item>Russia</b-list-group-item>
                    </b-list-group>
                </VuePerfectScrollbar>
            </b-col>
            <b-col sm="9">
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        name: 'TopBarComponent',
        components: {
            VuePerfectScrollbar
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-fluid {
        height: 100%;
        .row {
            height: 100%;
        }
    }

    .countries {
        height: 100%;
        overflow: auto;
        padding-left: 0;

        .scroller {
            height: 100%;
            width: 100%;
            margin: auto;
            position: relative;
        }

        .list-group-item {
            background: 0;
            color: white;
            border-top: 0;
            border-radius: 0;
            border-left: 0;
            border-color: rgba(255, 255, 255, 0.7);
            cursor: pointer;

            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }

            &.active {
                background: linear-gradient(to right, #EC6EAD, rgba(255,255,255, 0.2));
            }
        }
    }
</style>