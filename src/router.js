import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import { DEFAULT_LANGUAGE } from "@/constants/i18n";

Vue.use(Router);
Vue.use(Meta);

export const createRouter = (i18n) => new Router({
    mode: 'history',
    routes: [{
            path: `/:lang(en)?`,
            component: {
                template: '<router-view></router-view>'
            },
            beforeEnter({ params }, from, next) {
                const lang = params.lang || DEFAULT_LANGUAGE;

                if (i18n.locale === lang) {
                    return next();
                }

                import(/* webpackChunkName: "lang-[request]" */ `@/i18n/${lang}.json`)
                    .then(messages => {
                        i18n.setLocaleMessage(lang, messages.default || messages);
                        i18n.locale = lang;

                        return next();
                    })
            },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/components/LandingComponent.vue'),
                    children: [
                        {
                            path: 'auth',
                            component: () => import('@/components/AuthModalOpenerComponent.vue')
                        }
                    ]
                },
                {
                    path: 'auth/:provider',
                    component: () => import('@/components/AuthComponent.vue')
                },
                {
                    path: 'proxy-checker',
                    name: 'proxy-checker',
                    component: () => import('@/components/CheckerComponent.vue')
                }
            ]
        }
    ]
});
