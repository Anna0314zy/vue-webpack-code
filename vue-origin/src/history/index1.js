// document.write('ok')
import Vue from 'vue';
let vm = new Vue({
    el: "#app",
    data() {
        return {
            msg: 'hello',
            arrobject: [{
                name: 'xy'
            }],
            school: { name: 'zf', age: 10 },
            arr: [[1],{ a: 3 }, 1, 2, 3, { c: 2 }],
            firstName: 'feng',
            lastName: 'zhu'
        }
    },
    computed: {
        fullName() {
            return this.firstName + this.lastName;
        }
    },
    watch: {
        // msg(newVal, oldVal) {
        //     console.log(newVal, oldVal);
        // }
        msg: {
            handler(newVal, oldVal) {
                console.log(newVal, oldVal);
            },
            deep:true,
            immediate: true
        }
    }
})
setTimeout(() => {
    // vm.msg = 'hello world';// dep = 渲染watcher
    // vm.msg = 'hello1';
    // vm.msg = 'hello2';
    // vm.msg = 'hello3----'; // 就更新最后一次就好了
    // vm.school.name = 'zf' //
    //数组更新 更改数组中的对象的属性是可以的 因为我们拦截了对象的set get 
    // vm.arr.push(4); //不会更新  这个没收集依赖
    vm.arr[0].push({c:9});
    // vm.arr[0].a = 100; //会更新
    //vue 批量更新 防止重复渲染
    console.log(vm, 'vm----');
    vm.msg = 'world';
    vm.firstName = 'zou';
}, 1000)
// console.log(vm._data.msg, 'vm---'); //代理
// console.log(vm.msg, 'vm---');
// vm.msg = 'wowow'
// console.log(vm.msg, 'vm---');
// vm.arr.push(8);
// console.log(vm.arr, 'arr---');

// console.log(vm.arr.splice(0,1,{a:9}), vm.arr[3].a)
// console.log(vm.arr, 'vm----');
// vm.arr.splice(0,2, {b:2});
// console.log(vm.arr, 'vm.arr')
// console.log(vm.arr[0].a = 100);
// [1,2,3].length -- 数组的长度变化  没有被监控
// [].push  / shift   /这些方法可以被监控