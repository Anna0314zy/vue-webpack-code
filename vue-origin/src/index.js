import Vue from 'vue';
import '../src/history/index2'
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
setTimeout(() => {
 vm.msg = 'zouyu';
},1000)