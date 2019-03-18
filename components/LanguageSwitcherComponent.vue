<template>
    <b-nav-dropdown right>
        <template slot="button-content">
            <no-ssr>
                <flag :iso="getCurrentLanguageIcon()" :squared="false"></flag>
            </no-ssr>
            {{ getCurrentLanguageName() }}
        </template>
        <b-dropdown-item v-for="v in $i18n.locales" :key="v.code" :active="v.code === $i18n.locale" :exact="true" :to="switchLocalePath(v.code)">
            <no-ssr>
                <flag :iso="v.icon" :squared="false"></flag>
            </no-ssr>
            {{ v.name }}
        </b-dropdown-item>
    </b-nav-dropdown>
</template>

<script>
    export default {
        methods: {
            getCurrentLanguage() {
                const { locale, locales } = this.$i18n;

                return locales.find(v => v.code === locale) || {};
            },
            getCurrentLanguageName() {
                return this.getCurrentLanguage().name || this.$i18n.locale;
            },
            getCurrentLanguageIcon() {
                return this.getCurrentLanguage().icon;
            }
        }
    }
</script>
