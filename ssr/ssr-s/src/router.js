import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from './components/foo.vue'
import NotFound from './components/notFound'
Vue.use(VueRouter);
export default () =>{
    const router = new VueRouter({
        // mode:"",
        routes:[
            {
                path: '/',
                component: Foo

            },
            {
                path: '/bar',
                component:() => import('./components/bar.vue')
            },
            {
                path: '*',
                component: NotFound
            }
        ]
    })
    return router
}