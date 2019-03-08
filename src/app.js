import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import App from '@/App.vue'
import { createRouter } from '@/router'
import { createI18n } from '@/i18n'
import store from '@/store'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faPaperPlane, faCheck, faShieldAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faVk, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {DEFAULT_LANGUAGE} from "@/constants/i18n";

Vue.config.productionTip = false;
config.autoAddCss = false;

library.add(faCopy, faPaperPlane, faCheck, faShieldAlt, faPlusSquare, faGoogle, faVk, faFacebookF, faInstagram);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(VueClipboard);

export function createApp() {
    const i18n = createI18n();
    const router = createRouter(i18n);

    Vue.prototype.$i18nRoute = (to) => {
        if (i18n.locale === DEFAULT_LANGUAGE) {
            return to;
        } else {
            return {
                ...to,
                params: {
                    lang: i18n.locale,
                    ...to.params
                }
            };
        }
    };

    const app = new Vue({
        router,
        store,
        i18n,
        render: h => h(App)
    });

    return { app, router }
}
