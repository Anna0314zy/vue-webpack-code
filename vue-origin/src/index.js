import Vue from '../source/vue';
import '../src/history/index2'
// import '../src/history/1.vue'
// import '../src/history/index1'
let vm = new Vue({
    el:'#app',
    data() {
        return {
            // msg:'hello zf',
            // school: {name:'zggg'},
            firstname: 'ay',
            lastname: 'zou'
            // arr: [[1],{a:1}, 2, 3]
        }
    },
    render(h){ //内部  将render方法中的this  变成当前实例
        // console.log('执行用户传过来的render', h)
        // console.log(this.arr, 'this.arr');
        // return h('p',{id :'a'},  this.arr,h( 'span', {style:{'color': 'red'}}))
    },
    watch:{
        msg(newValue, oldValue) {
            console.warn(newValue, oldValue, 'msg变化');
        }
    },
    computed:{
        fullName() {
            return this.firstname + this.lastname
        }
    }
})
setTimeout(() => {
 // vm.msg = 'zouyu';
    // vm.msg = 'zouyu1';
    // vm.firstname = 'liangyuan'
    // vm.msg = 'zouyu2';
    // vm.msg = 'zouyu3';
    // vm.msg = 'zouyu4';
    // vm.school.name = 'zzz'; //TODO 不同属性 但是watcher相同
    // console.log(vm.arr[0].a = 100); //这个可以监听得到变化
    // // console.log(vm.arr[1] = 10);
    // //
    // // console.log(vm.arr[0] = 19);
    // vm.arr[0].push(4);
    // console.log(vm.arr);
    // vm.arr = [9];
    console.log(vm,vm.firstname, 'firstname')
    vm.firstname = 'wanglei'
    console.log(vm.fullName);
    // console.log(vm.arr[3].c.b = 100); //这个可以监听得到变化
},1000)


//什么样的数组会被观测  [0,1,2] 不能被监测到  【1，2，3].length-- 也不行
//[{a:1}] //可以监测
//vm.$delete  对索引去监控