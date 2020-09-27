import vnode from "./vnode";

/**
 * 
 * @param {*} vnode 用户写的虚拟节点
 * @param {*} container 要渲染到哪个容器中
 */
export function render(vnode, container) {
    let ele = createDomElementFromVnode(vnode);//通过这个方法转换成真实节点
    container.appendChild(ele);
}
//通过虚拟的对象 创建一个真实的dom元素
function createDomElementFromVnode(vnode) {
    let {type, key,props, children, text } = vnode;
    if (type) {
        vnode.domElement = document.createElement(type); //建立虚拟节点和真实dom的关系
        updateProperties(vnode);//更新节点
        //children 中的放的也是一个个虚拟节点 递归渲染
        children.forEach(childVnode => render(childVnode, vnode.domElement))
    }else {//文本
        
        vnode.domElement = document.createTextNode(text);
    }
    return vnode.domElement;
}
//后续比对的时候 会根据老的属性 和新的属性 重新更新节点
function updateProperties(newVnode, oldProps={}) {
    let domElement = newVnode.domElement;
    let newProps = newVnode.props;//当前虚拟节点中的属性
    //老节点有 新节点没有该属性 移除该属性
    for (let oldPropsName in oldProps) {
        if (!newProps[oldPropsName]) {
            delete domElement[oldPropsName];
        }
    }
    //如果新的里面有style 老的里面也有style style有可能还不一样 
    //老的有backgrounde 新的没有backgrounde 也要移除
   
    let newStyleObj = newProps.style || {};
    let oldStyleObj = oldProps.style || {};
    for (let propName in oldStyleObj) {
        if (!newStyleObj[propName]) {
            domElement.style[propName] = '';
        }
    }
     //老节点没有 新节点有 直接覆盖
    for (let newPropsName in newProps) {
        //@click
        if (newPropsName == 'style') {
          let styleObj = newProps.style;
          for(let s in styleObj) {
              domElement.style[s] = styleObj[s];
          }
        }else if (key === 'class') {
            domElement.className = newProps.class;
        }else {
            domElement[newPropsName]=newProps[newPropsName];

        }
    }
}

export function patch(oldVnode, newVnode) {
    //类型相同
  if (oldVnode.type !== newVnode.type) {
      return oldVnode.domElement.parentNode.replaceChild(createDomElementFromVnode(newVnode), oldVnode.domElement);
  }
  //类型相同 文本不同
  if (oldVnode.text) {
    if(oldVnode.text === newVnode.text) return;
      return oldVnode.domElement.textContent = newVnode.text;
  }
  //类型一样 并且是标签 需要根据新节点的属性 去更新老节点的属性
  let domElement = newVnode.domElement = oldVnode.domElement;
  //上面的代码是要复用dom结构
  updateProperties(newVnode, oldVnode.props);
  let oldChildren = oldVnode.children;
  let newChildren = newVnode.children;
  //1.老的有儿子 新的有儿子
 // 2.老的有儿子 新的没儿子
  //3.新增了儿子
  if (oldChildren.length > 0 && newChildren.length > 0) {
   //比对两个儿子
   updateChildren(domElement, oldChildren, newChildren);
  }else if (oldChildren.length > 0) { //2.老的有儿子 新的没儿子
      domElement.innerHTML = '';
  }else if (newChildren.length > 0) {
      for(let i = 0; i < newChildren.length; i++) {//3.新增了儿子
          domElement.appendChild(createDomElementFromVnode(newChildren[i]))
      }
  }
} 
//需要写一个方法 做成一个映射表 {a:0, b: 1, c:2 , d: 3}
function createMapByKeyToIndex(oldChildren) {
    let map = {};
    for(let i = 0; i < oldChildren.length; i++) {
        let current = oldChildren[i];
        if (current.key) {
            map[current.key] = i;
        }   
    }
    return map;
}
//diff 最复杂的就是
//对常见的dom操作优化 1.正序 倒叙  2.前后 追加
function updateChildren(parent, oldChildren, newChildren) {
    let oldStartIndex = 0;
    let oldStartVnode = oldChildren[0];
    let oldEndIndex = oldChildren.length - 1;
    let oldEndVnode = oldChildren[oldEndIndex];
    //创建映射表
    let map = createMapByKeyToIndex(oldChildren); //{a:0, b:1, c:2 , d:3}
    let newStartIndex = 0;
    let newStartVnode = newChildren[0];
    let newEndIndex = newChildren.length - 1;
    let newEndVnode = newChildren[newEndIndex];
    //双指针
    //判断老的孩子 和新的孩子 循环的时候 谁先结束就停止循环
    while (oldStartIndex<=oldEndIndex && newStartIndex<= newEndIndex) {
        //type key
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex]
        }else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex];
        }else if (isSameVnode(oldStartVnode, newStartVnode)) {//a b c d --> a b c d e
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
        }else if (isSameVnode(oldEndVnode, newEndVnode)) { //a b c d -->e a b c d 到这一步已经知道第一个元素不一样了
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        }else if (isSameVnode(oldStartVnode, newEndVnode)) {  //a b c  d ---> d c b a 倒叙 或者 // a b c d ----> b c d a
           // a b c d ----> b c d a 第一次头 跟 尾 比 第二次 头跟头比
            patch(oldStartVnode, newEndVnode);
            parent.insertBefore(oldStartVnode.domElement, oldEndVnode.domElement.nextSibling)
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        }else if(isSameVnode(oldEndVnode, newStartVnode)) { //a b c  d ---> d a b c 
            patch(oldEndVnode, newStartVnode);
            parent.insertBefore(oldEndVnode.domElement, oldStartVnode.domElement);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex];
        }else {
            //暴力比对 a b c d ---> g c a e f
            //需要先拿到新的节点 去老的中查找 看是否存在 如果存在就复用 不存在就创建插入即可
            let index = map[newStartVnode.key];//没有
            if (index == null) {
                parent.insertBefore(createDomElementFromVnode(newStartVnode),oldStartVnode.domElement);
            }else {
                let toMoveNode =  oldChildren[index];
               patch(toMoveNode, newStartVnode);
               parent.insertBefore(toMoveNode.domElement, oldStartVnode.domElement);
               oldChildren[index] = undefined;
            }
            newStartVnode = newChildren[++newStartIndex];

        }
    }
    //a b c d --> a b c d e 或者 a b c d -->e a b c d
    if (newStartIndex <= newEndIndex) {
        for(let i = newStartIndex; i <= newEndIndex;i++) {
            let beforeElement = newChildren[newEndIndex+1] == null ? null: newChildren[newEndIndex+1].domElement;
            //如果引用节点为空，则将指定的节点添加到指定父节点的子节点列表的末尾
            parent.insertBefore(createDomElementFromVnode(newChildren[i]), beforeElement);
            //parent.appendChild(createDomElementFromVnode(newChildren[i]))
        }
    }
    if (oldStartIndex <= oldEndIndex) {
        for(let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i]) {
                parent.removeChild(oldChildren[i].domElement);
            }
        }
    }
    //a b c  d ---> d c b a 倒叙 
    // a b c d ----> b c d a
    

}
//判断是不是同一个节点
function isSameVnode(oldVnode, newVnode) {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
}