<template>
    <b-nav-dropdown right>
        <template slot="button-content">
            <flag-icon-component :iso="toIcon($i18n.locale)"></flag-icon-component>
            {{ toLanguage($i18n.locale) }}
        </template>
        <b-dropdown-item v-for="v in languages" :key="v.lang" :active="isCurrentLanguage(v.lang)" @click="changeLanguage(v.lang)">
            <flag-icon-component :iso="v.icon"></flag-icon-component>{{ v.name }}
        </b-dropdown-item>
    </b-nav-dropdown>
</template>

<script>
    import FlagIconComponent from "@/components/FlagIconComponent";
    import { DEFAULT_LANGUAGE } from "@/constants/i18n";
    export default {
        components: {
            FlagIconComponent
        },
        data() {
            return {
                languages: [
                    {
                        name: 'Русский',
                        lang: 'ru',
                        icon: 'ru'
                    },
                    {
                        name: 'English',
                        lang: 'en',
                        icon: 'us'
                    }
                ]
            }
        },
        methods: {
            toIcon(lang) {
                const language = this.languages.find(v => v.lang === lang) || {};

                return language.icon || this.$i18n.locale;
            },
            toLanguage(lang) {
                const language = this.languages.find(v => v.lang === lang) || {};

                return language.name || this.$i18n.locale;
            },
            changeLanguage(lang) {
                const pathlang = (lang === DEFAULT_LANGUAGE) ? null : lang;
                const { location } = this.$router.resolve({ params: { lang: pathlang } });
                this.$store.dispatch('lang/change', lang);

                if (this.$i18n.locale === lang) {
                    return;
                }

                import(/* webpackChunkName: "lang-[request]" */ `@/i18n/${lang}.json`)
                    .then(messages => {
                        this.$i18n.setLocaleMessage(lang, messages.default || messages);
                        this.$i18n.locale = lang;
                        this.$router.push(location);
                    })
            },
            isCurrentLanguage(lang) {
                return lang === this.$i18n.locale;
            }
        }
    }
</script>