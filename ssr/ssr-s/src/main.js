import Vue from 'vue';
import App from './App'
import createRouter from './router'
import createStore from './store'
//入口文件 需要提供vue 实例
//如果是服务端渲染 每个人应该有一个自己的vue实例

export default () => { 
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        // el: '#app',
        store,
        router,
        render: h =>h(App)
    })
    return {
        app,
        router,
        store
    }

}