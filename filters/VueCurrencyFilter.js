export default {
    install(Vue, options) {
        const opts = { languages: { RUB: 'ru-RU', USD: 'en-US' }, ...options };
        const { languages } = opts;

        Vue.filter('currency', (v, currency) => new Intl.NumberFormat(languages[currency], { style: 'currency', currency: currency }).format(v));
    }
}
