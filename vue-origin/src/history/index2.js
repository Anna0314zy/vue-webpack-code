// let app = document.getElementById('app');
//节约性能 先把真实节点 用一个对象来表示出来 再通过对象渲染到页面上
//前端操作dom的时候 排序  删除
//比对  diff 新的节点 在生成一个对象 
//vue 基本不用手动操作dom
//虚拟dom  只是一个对象
// for (let key in app) {
//     console.log(key);
// }
// vue template  render
// {
//     tag: 'div',
//         props: { },
//     children: [{
//         tag: undefined,
//         props: undefined,
//         children: undefined,
//         text: 'hello'
//     }]
// }
// new Vue({
//     render(h) {
//         return h('div', {}, 'hello')
//     }
// })
//初始化  将虚拟节点渲染到页面上
//<div id="container"><span style="color:red">hello</span>zf</div>

import {
    h,
    render,
    patch
} from '../../source/vue/vdom'
console.log(h, 'f');
//zf 也应该是个对象
let oldVnode = h('div', {
    id: 'container'
}, h('li', {
    key: 'a',
    style: {
        backgroundColor: 'red',
        fontSize: '18px'
    }
}, 'a'), h('li', {
    key: 'b',
    style: {
        background: 'yellow'
    }
}, 'b'), h('li', {
    key: 'c',
    style: {
        background: 'pink'
    }
}, 'c'), h('li', {
    key: 'd',
    style: {
        background: 'orange'
    }
}, 'd'));
// let oldVnode = h('div', {
//     id: 'container',
//     key: 1,
//     class: 'red'
// });
console.log(oldVnode, 'oldVnode');
let container = document.getElementById('app');
//patchVnode 用新的虚拟节点与老的节点做对比 来更新真实dom元素
render(oldVnode, container);
let newVnode = h('div', {
    id: 'aa',
    style: {
        background: 'pink',
        fontSize: '18px'
    }
}, h('li', {
    key: 'e',
    style: {
        background: 'red'
    }
}, 'e'), h('li', {
    key: 'a',
    style: {
        background: 'yellow'
    }
}, 'a'), h('li', {
    key: 'f',
    style: {
        background: 'hotpink'
    }
}, 'f'), h('li', {
    key: 'c',
    style: {
        background: 'orange'
    }
}, 'c'), h('li', {
    key: 'n',
    style: {
        background: 'orange'
    }
}, 'n'));
// let newVnode = h('div', {
//     id: 'aa',
//     style: {
//         background: 'pink'
//     }
// });
//
setTimeout(() => {
    console.log(newVnode, 'newVnode');
    patch(oldVnode, newVnode);
}, 1000);