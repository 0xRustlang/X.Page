<template>
    <span v-if="iso" class="flag-icon" :class="flagClass"></span>
</template>
<script>
    export default {
        name: 'FlagIconComponent',
        props: ['iso'],
        computed: {
            flagClass() {
                return `flag-icon-${this.iso.toLowerCase()}`;
            }
        }
    }
</script>

<style>
    .flag-icon {
        vertical-align: middle;
    }
</style>