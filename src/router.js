import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router);
Vue.use(Meta);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('@/components/LandingComponent.vue')
        },
        {
            path: '/proxy-checker',
            component: () => import('@/components/CheckerComponent.vue')
        }
    ]
})
