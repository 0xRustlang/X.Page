import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import FlagIcon from 'vue-flag-icon'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'flag-icon-css/css/flag-icon.css'

library.add(faCopy, faPaperPlane, faCheck);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(VueClipboard);
Vue.use(FlagIcon);

new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});
