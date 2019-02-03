<template>
    <b-button variant="light" @click="copy" :class="{ switched: state }">
        <font-awesome-icon icon="copy" class="icon-default"></font-awesome-icon>
        <font-awesome-icon icon="check" class="icon-clicked"></font-awesome-icon>
    </b-button>
</template>

<script>
    export default {
        name: 'CopyButton',
        props: ['copyString'],
        data() {
            return {
                state: false,
                timer: null
            }
        },
        methods: {
            copy() {
                this.$copyText(this.copyString);
                this.state = true;

                clearTimeout(this.timer);

                this.timer = setTimeout(() => {
                    this.state = false;
                }, 2000);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        .icon-clicked, .icon-default {
            transition: opacity .3s, transform .3s;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto auto;
        }
        .icon-clicked {
            transform: rotate(-180deg) scale(.5);
            opacity: 0;
        }
        &.switched {
            .icon-clicked {
                transform: rotate(0deg) scale(1);
                opacity: 1;
            }
            .icon-default {
                transform: rotate(180deg) scale(.5);
                opacity: 0;
            }
        }
    }
</style>
