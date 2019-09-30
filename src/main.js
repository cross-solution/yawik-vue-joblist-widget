import Vue from 'vue'
import YawikJobList from './YawikJobList.vue'
import wrap from '@vue/web-component-wrapper';
// import Buefy from 'buefy'

Vue.config.productionTip = false

// Vue.use(Buefy,{
//     defaultIconPack: 'fas',
//     defaultContainerElement: '#yawik-job.list'
// })


const app = wrap(Vue, YawikJobList);
window.customElements.define('yawik-job-list', app, {shadow: true});


