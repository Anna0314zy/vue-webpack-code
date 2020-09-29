
import { initState } from './observe'
import Watcher from './observe/watcher';
import { utils, compiler } from './utils'
import {render, h, patch} from './vdom'
import {popTarget, pushTarget} from "./observe/dep";
// import { Compiler } from 'webpack';
function Vue(options) {
    console.error(this, options, 'options----');
    this._init(options);//初始化vue 并且将用户选项传入
}
Vue.prototype._init = function (options) {
    //vue中初始化ni
    let vm = this;
    vm.$options = options;
    // mvvm原理 需要数据重新初始化
    initState(vm);//data 数据劫持 computed  watch
    //初始化工作
    console.log('vm.$options.el', vm.$options.el); //#app
    if (vm.$options.el) {
        vm.$mount();
    }
}
//渲染页面 将组建挂载
function query(el) {
    if (typeof el === 'string') {
        return document.querySelector(el);
    }
    return el;
}

Vue.prototype._update = function (vnode) {
    console.log('更新操作', '替换真实的dom');
    // 将用户传入的视图 去更新视图
    let vm = this;
    let el = vm.$el;
    // let preVnode = vm.preVnode;
    // console.log(preVnode, 'preVnode');
    // if(!preVnode) {
    //     //
    //     vm.preVnode = vnode;//把上一次的节点保存起来
    //     render(vnode, el);
    // }else {
    //     console.log(patch(preVnode, vnode), 'patch(preVnode, vnode)');
    //     vm.$el = patch(preVnode, vnode);
    // }
    // //要循环这个元素 将里面的内容 换成我们的数据  内存的dom 不是真实  
    let node = document.createDocumentFragment(); // 文档碎片 这是内存dom 减少页面渲染
    let firstChild;
    while (firstChild = el.firstChild) {//每次拿到第一个元素 将这个元素放到文档碎片中 操作好替换真实dom
        node.appendChild(firstChild); //appengChild具有移动的功能能
    }
    // // console.log('执行');
    // console.log(node, 'node');
    // //todo文本替换
    compiler(node, vm);
    el.appendChild(node); //1.0的写法
    //需要匹配{{}}方式来替换
    //依赖收集  数据变化了  重新渲染 watcher 和 dep

}
Vue.prototype._render = function() {
    let vm = this;
    let render = vm.$options.render;//获取用户编写的render方法
    let vnode = render && render.call(vm,h);
    console.log(vnode, 'vnode');
    return vnode || {};
}
Vue.prototype.$mount = function () {
    let vm = this;
    let el = vm.$options.el; // 获取元素 //#app
    console.log('el-el-000', el);
    el = vm.$el = query(el);//获取当前挂载的节点 vm.$el就是我要挂载的一个元素
    console.log('el----el', el);
    //渲染 通过watcher 来渲染
    //渲染watcher 用于渲染的watcher
    //vue 2.0 组件级别更新  new Vue产生一个组件
    let updateComponent = () => { // 更新组件 渲染的逻辑
        vm._update(vm._render());//更新组件 渲染
    }
   //初次渲染
    new Watcher(vm, updateComponent);//渲染watcher  更新组件或者渲染组件
    //默认我会创建一个渲染watcer 会默认执行_update
    //如果数据更新  需要重新渲染
}

Vue.prototype.$watch = function (expr, handler, opts) {
    let vm = this;
    console.log(expr, 'expr---');
    //创建一个watcher  expr 是watch 里面定义的键值  user: true 标识是用户自己定义的watcher
    new Watcher(vm, expr, handler, {user: true, ...opts});//用户自己写的一个Watch

}
export default Vue;
//TODO//1.默认我会创建一个渲染watcer 会默认执行
// pushTarget(this); // dep 收集了watcher 渲染watcher  Dep.target = watcher msg变化了  需要让这个watch重新执行
// this.getter(); 取当前的值 updateComponent 更新视图  要更新视图就必须要从vm对象上去取值 就会调用get方法
//TODO 给当前添加一个Dep 添加当前的watch  等下次用户修改值的时候 就去dep.notify
//  dep.notify  => 调用watch的update方法  调用这个方法的时候又会掉get方法 触发重新渲染
// popTarget();

//TODO 如果数据更新   需要重新渲染 set ==> dep.notify() ---> 执行渲染watcher _update()方法执行

//如果页面 {{msg}} {{msg}} 两次取值的情况下  第一次取值 取值操作
// if（Dep.target） Dep.target.addDep(this) watcher添加dep  唯一的dep 相互记忆
//当用户改值的之后 dep.notify() 更新渲染watcher  渲染watcher

//dep 是收集依赖的  watcher是渲染页面的
//每个属性只有一个dep    可能有多个watch
//TODO 只要对这个属性进行取值操作 就会把当前的watch 存进去
//todo 一个属性里 可以放一个渲染watcher  多个dep对应一个watcher 然后多个dep对应多个watcher(用户监听的的watcer)
//vue2.0 一个组件定义一个watcher 组件级更新
//todo 数组的依赖收集
//定义响应式数据的时候 给数组添加this.dep 数组发生变化的时候去调用 this.dep.notify() 去更新
// 如何收集依赖呢 在数组定义的时候 如果是数组 就 childOb.dep.depend() 注意还要监控每个子集  去执行子集的上面的__ob__.dep.depend() 收集相关依赖