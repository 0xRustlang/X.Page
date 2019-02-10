import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import FlagIcon from 'vue-flag-icon'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faPaperPlane, faCheck, faShieldAlt, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import LandingComponent from "@/components/LandingComponent.vue";
import CheckerComponent from "@/components/CheckerComponent.vue";

library.add(faCopy, faPaperPlane, faCheck, faShieldAlt, faTrash, faPlusSquare);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(VueClipboard);
Vue.use(FlagIcon);


new Vue({
    el: '#app',
    components: {
        LandingComponent,
        CheckerComponent
    }
});
