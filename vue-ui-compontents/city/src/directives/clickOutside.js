// const clickOutsideFunc = (e, el, binding, vnode) => {
//     console.log(e, el, binding, vnode, 'clickOutsideFunc');
//     if (e.target === el || el.contains(e.target)) {
//         return;
//     }
//     binding.value(); //close事件
// }
export const clickOutside = {
    // bind: function (el, binding, vnode) {
    //     console.log(el, binding, vnode, 'bind');
    //     // 当指令第一次绑定到元素时调用，常用来进行一些初始化设置
    //     // 代码
    // },
    inserted: function (el, binding) {
        // 当被绑定的元素插入到 DOM 中时……
        // 代码
        // console.log(el, binding, vnode, 'inserted');
        document.addEventListener("click",function(e) {
            // console.log(e, el, binding, 'clickOutsideFunc');
            if (e.target === el || el.contains(e.target)) {
                return;
            }
            binding.value(); //close事件
        });
    },
    // update: function (el, binding, vnode, oldVnode) {
    //     console.log(el, binding, vnode, oldVnode, 'update');
    //     // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
    //     // 代码
    // },
    // componentUpdated: function (el, binding, vnode, oldVnode) {
    //     console.log(el, binding, vnode, oldVnode, 'componentUpdated');
    //     // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    //     // 代码
    // },
    // unbind: function (el, binding, vnode) {
    //     console.log(el, binding, vnode, 'unbind');
    //     // 只调用一次，指令与元素解绑时调用，类似于beforeDestroy的功能
    //     // 代码
    // }
}