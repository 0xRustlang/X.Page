<template></template>

<script>
    export default {
        mounted() {
            this.$root.$emit('bv::show::modal', 'authModal');
        }
    }
</script>