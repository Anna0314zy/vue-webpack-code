
let id = 0;
import { pushTarget, popTarget } from './dep'
import { utils } from '../utils'
class Watcher {
    /**
     * 
     * @param {*} vm 当前组件的实例
     * @param {*} exprOrfn 用户传入的是一个表达式可能是一个函数
     * @param {*} cb 用户传入的回调函数  vm.$watch('msg;, cb)
     * @param {*} opts //一些其他参数
     */
    //
    constructor(vm, exprOrfn, cb = () => { }, opts = {}) {
        //vm当前组件实例
        this.vm = vm;
        this.exprOrfn = exprOrfn;
        if (typeof exprOrfn === 'function') {
            this.getter = exprOrfn;//getter就是new Wacher的第二个参数
        } else {
            this.getter = function () { //如果调用此方法 会将vm上对应的表达式取出来
                // console.log(exprOrfn, 'exprOrfn---');
                // exprOrfn ----  msg  utils.getValue(vm, exprOrfn) --- value
                // console.log(utils.getValue(vm, exprOrfn));
                return utils.getValue(vm, exprOrfn);
            }
        }
        if (opts.user) {//标识用户自己写的watch
            this.user = true;
        }
        this.lazy = opts.lazy;//计算属性
        this.dirty = this.lazy;
        this.cb = cb;
        this.opts = opts;
        this.deps = [];
        this.depsId = new Set();
        this.id = id++;
        //创建watch实
        this.immediate = opts.immediate;
        //如果当前是计算属性  不会默认调用get
        this.value = this.lazy ? undefined: this.get(); // 创建一个watcher 执行自身的getter方法
        if (this.immediate) {
            this.cb(this.value);
        }

    }
    get() {
        //默认创建watch就会调用
        pushTarget(this); // 渲染watcher  Dep.target = watcher msg变化了  需要让这个watch重新执行
        // fullname(){}
        let value = this.getter.call(this.vm); //当前传入的函数执行  会更新属兔 会调用当前属性的get方法 给当前的属性加一个dep dep.addSub()  
        //如果客户修改值了  会调用set方法  dep.notify  => 调用watch的update方法
        popTarget();
        return value;
    }
    evaluate() {
        this.value = this.get(); //this  计算属性watcher
        this.dirty = false;
    }
    addDep(dep) {//统一个watch 不应该重复记录dep
        let id = dep.id;//masg 的dep
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }


    }
    depend() { //deps firsename lastNmae 
        let i = this.deps.length;
        while(i--) {
            this.deps[i].depend();
        }
    }
    //如果客户修改值了  会调用set方法  dep.notify  => 调用watch的update方法
    update() {
        // this.get();
        // debugger;
        if (this.lazy) {
            this.dirty = true;
        }else {
            queueWatcher(this);
        }
      
    }
    run() {
        let value = this.get(); //新值
        if (this.value !== value) {
            this.cb(value, this.value);
        }
    }

}
let has = {}; //对重复的watcher 进行过滤操作
let queue = [];
function flushQueue() { //等待当前这一轮全部更新  再去执行watcher
    queue.forEach(watcher => watcher.run());
    has = {}; //恢复正常
    queue = [];
}
function queueWatcher(watcher) {
    let id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher); //相同的wacher 只会存一个
        //延迟清空队列
        // nextTick()
        nextTick(flushQueue);
    }

}
function flushCallbacks() {
    callbacks.forEach(cb => cb());
}
let callbacks = [];
//nextTick 实现原理  setTimeout宏任务 比较慢 所以要这么 
function nextTick(cb) { // cb 就是flushQueue
    callbacks.push(cb);
    //要异步刷新这个cb
    //异步分执行顺序的 会先执行promise  mutationObserver  微任务   setTimeout setImmidiate  宏仁任务
    let timerFunc = () => {
        flushCallbacks();
    }
    if (Promise) { //then是一个异步
        return Promise.resolve().then(timerFunc);
    }
    if (MutationObserver) { //h5 的api  MutationObserver异步执行 文本节点变成2才会执行 timerFunc
        let observe = new MutationObserver(timerFunc);
        let textNode = document.createTextNode(1); //观察文本节点 节点的文本内容发生变化 就会执行 timerFunc
        observe.observe(textNode, { characterData: true });
        textNode.textContent = 2;
        return;
    }
    if (setImmediate) {
        return setImmediate(timerFunc); //高版本浏览器执行
    }
    setTimeout(timerFunc, 0);
}
// Vue.nextTick
//渲染使用地 计算属性用他  vm.watch
export default Watcher;
//一个属性里 可以放一个渲染watcher  一个watch方法
//渲染watcher  包含很多Dep 
//vue2.0一个组件定义一个watcher