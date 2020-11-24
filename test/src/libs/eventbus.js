import Vue from 'vue';
let bus = new Vue();
Vue.prototype.$bus = bus;
export default Vue.prototype.$bus;