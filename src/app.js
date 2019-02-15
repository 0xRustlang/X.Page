import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import App from '@/App.vue'
import router from '@/router'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faPaperPlane, faCheck, faShieldAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

config.autoAddCss = false;

library.add(faCopy, faPaperPlane, faCheck, faShieldAlt, faPlusSquare);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(VueClipboard);

export function createApp() {
    const app = new Vue({
        router,
        render: h => h(App)
    });

    return { app, router }
}
