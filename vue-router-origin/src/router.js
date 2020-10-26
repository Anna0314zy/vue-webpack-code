import Router from "vue-router";
import Vue from 'vue';
import Home from './components/Home.vue'
Vue.use(Router);
const routes = [
  {
    name: 'path',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: {
      render() {
        return <div>关于</div>
      }
    }
  }
]
let router = new Router({
  mode: 'history',
  base: '',
  routes
})
export default router;