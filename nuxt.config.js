module.exports = {
    mode: 'universal',
    head: {
        titleTemplate: '%s - FireX Proxy',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    },
    server: {
        port: 8084
    },
    loading: {
        color: '#fff'
    },
    css: [
        'vue-multiselect/dist/vue-multiselect.min.css',
        '~assets/main.scss'
    ],
    plugins: [
        '~plugins/axios.js',
        '~plugins/vue-multiselect.js',
        { src: '~plugins/vue-flag-icon.js', ssr: false }
    ],
    axios: {
        baseURL: 'https://api.firexproxy.com',
        credentials: true
    },
    modules: [
        'nuxt-clipboard2',
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        'bootstrap-vue/nuxt',
        [
            'nuxt-fontawesome',
            {
                component: 'fa',
                imports: [
                    {
                        set: '@fortawesome/free-solid-svg-icons',
                        icons: [
                            'faCopy',
                            'faCheck',
                            'faPaperPlane',
                            'faPlusSquare',
                            'faEnvelope',
                            'faTimes',
                            'faRubleSign',
                            'faDollarSign',
                            'faShoppingCart'
                        ]
                    },
                    {
                        set: '@fortawesome/free-brands-svg-icons',
                        icons: [
                            'faFacebookF',
                            'faVk',
                            'faGoogle',
                            'faYandex',
                            'faTwitter',
                            'faGithub',
                            'faCcVisa',
                            'faCcMastercard',
                            'faPaypal'
                        ]
                    }
                ]
            }
        ],
        [
            'nuxt-i18n',
            {
                locales: [
                    {
                        code: 'en',
                        iso: 'en-US',
                        icon: 'us',
                        name: 'English',
                        file: 'en-US.js'
                    },
                    {
                        code: 'ru',
                        iso: 'ru-RU',
                        icon: 'ru',
                        name: 'Русский',
                        file: 'ru-RU.js'
                    }
                ],
                strategy: 'prefix_except_default',
                defaultLocale: 'ru',
                seo: true,
                lazy: true,
                langDir: 'locales/'
            }
        ]
    ],
    bootstrapVue: {
        css: false
    }
};
