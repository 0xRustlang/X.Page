import VueI18n from 'vue-i18n'
import Vue from 'vue'
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '@/constants/i18n'
import ru from '@/i18n/ru.json'

Vue.use(VueI18n);

export const createI18n = () => new VueI18n({
    locale: DEFAULT_LANGUAGE,
    fallbackLocale: FALLBACK_LANGUAGE,
    messages: { ru }
});
