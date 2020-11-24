import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import ElTable from 'element-ui/packages/table'
import ElTableColumn from 'element-ui/packages/table-column'
// import ElRadioGroup from 'element-ui/packages/radio/src/radio-group.vue';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.use(ElTable);
Vue.use(ElTableColumn)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
