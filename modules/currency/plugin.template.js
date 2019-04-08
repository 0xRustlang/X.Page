import Vue from 'vue'
import VueCurrencyFilter from '@/filters/VueCurrencyFilter'

Vue.use(VueCurrencyFilter, <%= serialize(options) %>)
