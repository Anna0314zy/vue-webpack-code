/**
 * <div id="wrapper" a=1>
   <span style="color:red">hello</span>
   zf
</div>
 */
import {h, render, patch} from './vdom'

let vnode = h('div', {}, 

h('li', {style:{background:'red'}, key:'A'}, 'A'),
h('li', {style:{background:'yellow'}, key:'B'}, 'B'),
h('li', {style:{background:'blue'}, key:'C'}, 'C'),
h('li', {style:{background:'green'}, key:'D'}, 'D')
);
console.log(vnode, 'vnode');
// let app = document.getElementById('app')
render(vnode, app);
let newVnode = h('div', {},


h('li', {style:{background:'yellow'}, key:'g'}, 'g'),
h('li', {style:{background:'blue'}, key:'C'}, 'C2'),
h('li', {style:{background:'red'}, key:'A', id:'a'}, 'A'),
h('li', {style:{background:'yellow'}, key:'e'}, 'e'),

h('li', {style:{background:'green'}, key:'f'}, 'f'),




);
setTimeout(() => {
  patch(vnode, newVnode)
}, 1000)
