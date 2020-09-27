import Vue from '../source/vue';
import '../src/history/index2'
import '../src/history/index'
let vm = new Vue({
    el:'#app',
    data() {
        return {msg:'hello zf'}
    },
    render(h){ //内部  将render方法中的this  变成当前实例
        console.log('执行用户传过来的render', h)
        return h('p',{id:'a'}, this.msg)
    }
})
let vm = new Vue({
    data() {
        return {msg:'hello zf'}
    },
    render(h){ //内部  将render方法中的this  变成当前实例
        console.log('执行用户传过来的render', h)
        return h('p',{id:'a'}, this.msg)
    }
}).$mount('#app')
setTimeout(() => {
 vm.msg = 'zouyu';
},1000)