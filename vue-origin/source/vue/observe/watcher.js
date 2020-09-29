
let id = 0;
import { pushTarget, popTarget } from './dep'
import { utils } from '../utils'
import nextTick from "./nextTick";
class Watcher {
    /**
     * 
     * @param {*} vm 当前组件的实例
     * @param {*} exprOrfn 用户传入的是一个表达式可能是一个函数
     * @param {*} cb 用户传入的回调函数  vm.$watch('msg;, cb)
     * @param {*} opts //一些其他参数
     */
    //vm.$watch('a.b.c', function (newVal, oldVal) {
    //   // 做点什么
    // })
    //todo  msg 表达式不是一个函数
    constructor(vm, exprOrfn, cb = () => { }, opts = {}) {
        //vm当前组件实例
        this.vm = vm;
        this.exprOrfn = exprOrfn;

        if (typeof exprOrfn === 'function') { //new Watcher(vm, updateComponent);//渲染watcher
            //计算属性 是个函数 直接执行
            this.getter = exprOrfn;//getter就是new Wacher的第二个参数  下面会执行
        } else {
            this.getter = function () { //如果调用此方法 会将vm上对应的表达式取出来

                // exprOrfn ----  msg  utils.getValue(vm, exprOrfn) --- value
                console.log(utils.getValue(vm, exprOrfn), 'fullname --- watch');
                return utils.getValue(vm, exprOrfn); //拿到msg的值
            }
        }
        if (opts.user) {//标识用户自己写的watch
            this.user = true;
        }
        this.lazy = opts.lazy;//计算属性 todo 计算属性标识
        this.dirty = this.lazy;
        this.cb = cb;
        this.opts = opts;
        this.deps = [];
        this.depsId = new Set();
        this.id = id++; //每个独立的watcher都应该有一个唯一标识
        //创建watch实
        this.immediate = opts.immediate;
        //如果当前是计算属性  不会默认调用get
        //todo 创建watcher的时候 现将表达式对应的值取出来 （老值）
        //todo 如果当前是计算属性的话 不会默认调用get方法 只有用户去取值的时候才会调用
        this.value = this.lazy ? undefined: this.get(); // 创建一个watcher 执行自身的getter方法
        if (this.immediate) {
            this.cb(this.value);
        }

    }
    get() {
        //默认创建watch就会调用
        //todo Dep.target = 用户的watcher
        pushTarget(this); // 渲染watcher  Dep.target = watcher msg变化了  需要让这个watch重新执行
        // fullname(){this.firstname + this.lastname}  这里会去执行计算属性的函数 会将当前计算属性的watcher
        //取值又会走this.firstnam get方法 会dep.target dep.depend 存当前的计算属性watcher
        let value = this.getter.call(this.vm); //当前传入的函数执行  会更新属兔 会调用当前属性的get方法 给当前的属性加一个dep dep.addSub()  
        //如果客户修改值了  会调用set方法  dep.notify  => 调用watch的update方法
        popTarget();// 保证当前栈是渲染watcher
        return value;
    }
    //求值   计算属性要用
    evaluate() {
        //this 计算属性watcher 放到dep里 Dep.target = 当前的计算属性 调用用户写的计算属性
        this.value = this.get(); //this  计算属性watcher 取到的最新值
        this.dirty = false; //计算属性watcher
    }
    //让watch 和dep 互相记忆   Dep.target 存当前的watcher
    addDep(dep) {//同一个watch 不应该重复记录dep {{msg}} {{msg}}
        let id = dep.id;//msg 的dep
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep); //watch记住了dep
            dep.addSub(this); //this 是渲染watcher
        }
    }
    //todo
    depend() { //deps firsename =[计算属性watcher 渲染wacher]
        let i = this.deps.length;
        //todo firstname 存一个渲染watcher 存一个计算watcher
        while(i--) {
            this.deps[i].depend(); // Dep.target.addDep(this 让watch存dep
        }
    }
    //如果客户修改值了  会调用set方法  dep.notify  => 调用watch的update方法
    update() {
        // this.get();
        // debugger;
        //todo 如果批量操作一个值的时候 取的是最后一步操作 批量更新页面 减少渲染
        //todo 这里不能立即掉get方法去立即更新  ----> Vue的特点是要批量更新
        if (this.lazy) { //如果是计算属性  属性一变就会更新
            this.dirty = true;
        }else {
            queueWatcher(this);
        }
      
    }
    run() {
        let value = this.get(); //新值   这里面会把用户传入的watcher存起来
        if (this.value !== value) {
            this.cb(value, this.value);
        }
    }

}
let has = {}; //对重复的watcher 进行过滤操作
let queue = [];
function flushQueue() { //todo 等待当前这一轮全部更新  再去执行watcher
    queue.forEach(watcher => watcher.run());
    has = {}; //恢复正常
    queue = [];
}
//对重复的watch进行过滤
function queueWatcher(watcher) {
    let id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher); //相同的wacher 只会存一个
        //todo 延迟清空队列
        // nextTick()
        nextTick(flushQueue); //异步方法会等待所有同步方法都执行完毕后才会调用此方法
    }

}

// Vue.nextTick
//渲染使用地 计算属性用他  vm.watch
export default Watcher;
//一个属性里 可以放一个渲染watcher  一个watch方法
//渲染watcher  包含很多Dep 
//vue2.0一个组件定义一个watcher
//todo 为什么要用this.$nextTick
//todo 不是这样的 this.$nextTick 会保证获取的dom 是最新
// 内部是把渲染watcher  和新传递进来的函数 放在一个队列里 然后依次执行
// 这样就保证先渲染页面 然后再 执行nextTick 里的操作
