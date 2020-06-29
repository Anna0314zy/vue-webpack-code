//除了第一次初始化渲染之外 还要做比对操作
export function render(vnode, container) {  //让虚拟节点渲染成真实节点
    // console.log(vnode, container);
    let el = createElm(vnode);
    // console.log(el, 'el---')
    container.appendChild(el);

    //递归创建
}
//创建真实节点
function createElm(vnode) {
    let { tag, children, key, props, text } = vnode;
    if (typeof tag === 'string') {
        //标签 一个虚拟节点对应着真实节点
        vnode.el = document.createElement(tag);
        upadteProperties(vnode); //更新属性
        children.forEach(child => { //child是虚拟节点
            return render(child, vnode.el); //递归渲染
        })
    } else {
        //文本
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}
//更新属性也会调用此方法 {id:'a'}
function upadteProperties(vnode, oldProps = {}) {
    console.log(vnode, oldProps, 'oldProps---')
    let newProps = vnode.props || {};//获取老节点的属性

    let el = vnode.el; //当前的真实节点
    //我要考虑一下以前有没有、
    //如果下次更新时  我应该用新的属性 来更新老的节点
    //如果老的中有属性 新的中没有

    let newStyle = newProps.style || {};
    let oldStyle = oldProps.style || {};
    console.log(newStyle, oldStyle, 'style---')
    //稍后会用这个更新操作 主要的作用就是根据
    // 新的虚拟节点 来修改dom元素
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = '' //如果没有直接 删除dom上的属性
        }
    }

    for (let key in oldProps) {
        if (!newProps[key]) {
            delete el[key]; //如果没有直接 删除dom上的属性
        }
    }
    for (let key in newProps) {
        if (key === 'style') { //如果是？style需要再次遍历
            for (let styleName in newProps.style) {
                console.log(styleName, 'styleName');
                el.style[styleName] = newProps.style[styleName]
            }

        } else if (key === 'class') {
            el.className = newProps.class;
        } else { //给这个元素添加属性 值就是对应的值
            el[key] = newProps[key];
        }

    }
}
//对比标签  
export function patch(oldVnode, newVnode) {
    // console.log(oldVnode, newVnode, 'oldVnode, newVnode');
    //1)先比对标签一样不一样
    if (oldVnode.tag !== newVnode.tag) {
        //必须拿到当前节点的父亲 才能操作替换自己
        oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el);
    }
    //2)比较文本  标签一样 可能都是undefind
    // console.log(oldVnode.tag, 'tag');
    if (!oldVnode.tag) { //文本节点
        // console.log(oldVnode.text, newVnode.text, 'oldVnode.text');
        if (oldVnode.text !== newVnode.text) {
            console.log(oldVnode.el, newVnode.text);
            oldVnode.el.textContent = newVnode.text; //文本节点
        }
    }
    //3)标签一样 可能属性不一样
    let el = newVnode.el = oldVnode.el; //标签一样复用
    // console.log(el, 'el---el')
    // console.log( oldVnode.props, ' oldVnode.props')
    upadteProperties(newVnode, oldVnode.props);
    //必须要有一个根节点
    //4)比较孩子
    let oldChildren = oldVnode.children || [];
    let newChildren = newVnode.children || [];

    //老的有孩子 新的有孩子 updateChildren
    console.log(oldChildren.length, newChildren.length);
    if (oldChildren.length > 0 && newChildren.length > 0) {
        updateChildren(el, oldChildren, newChildren);
    } else if (oldChildren.length > 0) {
        //老的有孩子 新的没孩子
        //  console.log('新的没有孩子')
        el.innerHTML = '';
    } else if (newChildren.length > 0) {
        //老的没孩子 新的有孩子
        for (let i = 0; i < newChildren.length; i++) {
            let child = newChildren[i];
            el.appendChild(createElm(child));
        }
    }
    return el;

}
function updateChildren(parent, oldChildren, newChildren) {
    //vue增加了很多优化策略 
    //向后面添加  插入dom 比较  4 个变成 5个  
    //双指针实现
    let oldStartIndex = 0;
    let oldStartVnode = oldChildren[0];
    let oldEndIndex = oldChildren.length - 1;
    let oldEndVnode = oldChildren[oldEndIndex];

    let newStartIndex = 0;
    let newStartVnode = newChildren[0];
    let newEndIndex = newChildren.length - 1;
    let newEndVnode = newChildren[newEndIndex];
    function makeIndexByKey(children) {
        let map = {};
        children.forEach((item, index) => {
            map[item.key] = index;
        })
        return map;
    }
    let map = makeIndexByKey(oldChildren);
    console.log(map, 'map');
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        //先比较前面是否一样 再从后面比较是否一样
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex];
        } else if (isSameNode(oldStartVnode, newStartVnode)) {
            //向后插
            // 先比较前面是否一样
            patch(oldStartVnode, newStartVnode);//用新的属性更新老的属性
            // oldStartIndex++;
            // console.log(oldStartIndex++, 'oldStartIndex++;');
            // console.log(++oldStartIndex, '++oldStartIndex;');
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex]
        } else if (isSameNode(oldEndVnode, newEndVnode)) {
            // 再从后面比较是否一样
            //向前插入
            patch(oldEndVnode, newEndVnode);//用新的属性更新老的属性
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameNode(oldStartVnode, newEndVnode)) {
            //DCBA  倒叙
            //老的指针跟新的最后的指针比较  不一样就向后移动  新的向前 老的向后
            patch(oldStartVnode, newEndVnode);//用新的属性更新老的属性
            parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameNode(oldEndVnode, newStartVnode)) {
            //DABC 老的尾比新的头 老的尾巴移动到老的头前面
            // debugger;
            patch(oldEndVnode, newStartVnode);//用新的属性更新老的属性
            parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex];
        } else {
            //两个列表  乱序不复用
            //会先拿新节点的第一项 去老节点中匹配 如果匹配不到 直接将这个节点插入到
            //老节点的开头的前面 如果能查到直接移动老节点 
            //可能老节点中还有剩余 则直接删除
            let moveIndex = map[newStartVnode.key];
            if (moveIndex == undefined) {
                parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
            } else {
                //我要移动这个元素
                let moveVnode = oldChildren[moveIndex];
                oldChildren[moveIndex] = undefined;
                parent.insertBefore(moveVnode.el, oldStartVnode.el);
                patch(moveVnode, newStartVnode);

            }
            //要将新节点的指针向后移动
            newStartVnode = newChildren[++newStartIndex];
        }

        //倒叙和正序
    }
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            //可能是inserBefore  插入的第二个参数是个null 等价于apendchild
            // parent.appendChild(createElm(newChildren[i]));
            //参考节点
            let ele = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el;
            parent.insertBefore(createElm(newChildren[i]), ele);
        }
    }
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            let child = oldChildren[i];
            if (child != undefined) {
                parent.removeChild(child.el);
            }
        }
    }
}
function isSameNode(oldNode, newNode) {
    return (oldNode.tag === newNode.tag) && (oldNode.key === newNode.key); //复用真实节点
}