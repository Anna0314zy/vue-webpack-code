import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  //将$store new Vue.$store会在所有组件中声明一个属性$store
  store,
  render: h => h(App)
}).$mount('#app')
