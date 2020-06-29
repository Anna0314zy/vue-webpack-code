import Vue from 'vue'
import App from './App.vue'
// import Routers from './router.js';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

// Vue.use(VueRouter);
Vue.use(ViewUI);
// import es5 from '../src/components/es6/es5/es5-class'
// import es6 from '../src/components/es6/es5/es6-class'
// console.log(es5, es6)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
