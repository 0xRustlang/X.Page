import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import LandingComponent from '@/components/LandingComponent.vue'

Vue.use(Router);
Vue.use(Meta);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: LandingComponent
        }
    ]
})
