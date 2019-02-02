import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import TableComponent from '@/components/TableComponent.vue'

Vue.use(Router);
Vue.use(Meta);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'TableComponent',
            component: TableComponent
        }
    ]
})
