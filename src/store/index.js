import Vue from 'vue'
import Vuex from 'vuex'
import proxies from '@/store/modules/proxies'
import filters from '@/store/modules/filters'
import user from '@/store/modules/user'
import lang from '@/store/modules/lang'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        proxies,
        filters,
        user,
        lang
    }
})