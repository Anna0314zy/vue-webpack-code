
import { initState } from './observe'
import Watcher from './observe/watcher';
import { utils, compiler } from './utils'
import {render, h, patch} from './vdom'
// import { Compiler } from 'webpack';
function Vue(options) {
    this._init(options);//初始化vue 并且将用户选项传入
}
Vue.prototype._init = function (options) {
    //vue中初始化
    let vm = this;
    vm.$options = options;
    // mvvm原理 需要数据重新初始化
    initState(vm);//data computed  watch
    //初始化工作
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
    let preVnode = vm.preVnode;
    console.log(preVnode, 'preVnode');
    if(!preVnode) {
        //
        vm.preVnode = vnode;//把上一次的节点保存起来
        render(vnode, el);
    }else {
        console.log(patch(preVnode, vnode), 'patch(preVnode, vnode)');
        vm.$el = patch(preVnode, vnode);
    }
    // //要循环这个元素 将里面的内容 换成我们的数据  内存的dom 不是真实  
    // let node = document.createDocumentFragment();
    // let firstChild;
    // while (firstChild = el.firstChild) {//每次拿到第一个元素 将这个元素放到文档碎片中 操作好替换真实dom
    //     node.appendChild(firstChild); //appengChild具有移动的功能能
    // }
    // // // console.log('执行');
    // // console.log(node, 'node');
    // // //todo文本替换
    // compiler(node, vm);
    // el.appendChild(node);
    //需要匹配{{}}方式来替换
    //依赖收集  数据变化了  重新渲染

}
Vue.prototype._render = function() {
    let vm = this;
    let render = vm.$options.render;//获取用户编写的render方法
    let vnode = render.call(vm,h);
    console.log(vnode, 'vnode');
    return vnode;
}
Vue.prototype.$mount = function () {
    let vm = this;
    let el = vm.$options.el; // 获取元素 //#app
    el = vm.$el = query(el);//获取当前挂载的节点 vm.$el就是我要挂载的一个元素
    //渲染 通过watcher 来渲染
    //渲染watcher 用于渲染的watcher
    //vue 2.0 组件级别更新  new Vue产生一个组件
    let updateComponent = () => { // 更新组件 渲染的逻辑
        vm._update(vm._render());//更新组件

    }

    new Watcher(vm, updateComponent);//渲染watcher
    //默认我会创建一个渲染watcer 会默认执行
    //如果数据更新  需要重新渲染
}
Vue.prototype.$watch = function (expr, handler, opts) {
    let vm = this;
    new Watcher(vm, expr, handler, {user: true, ...opts});//用户自己写的一个Watch
    //默认我会创建一个渲染watcer 会默认执行
    //如果数据更新  需要重新渲染
}
export default Vue;