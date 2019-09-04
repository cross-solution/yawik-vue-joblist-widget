import Vue from 'vue'
import YawikJobList from './YawikJobList.vue'
import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false
Vue.use(vueCustomElement)

Vue.customElement('yawik-job-list', YawikJobList)
