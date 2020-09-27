
import vnode from './vnode'
/**
 * 
 * @param {*} type type 类型
 * @param {*} props 节点属性
 * @param  {...any} children  所有孩子
 */

export default function h(type, props, ...children) {
    console.log(children, 'children')
    let key;
    if(props.key) {
        key = props.key;
        delete props.key; //属性中不包括key属性
    }
    //将不是虚拟节点的子节点变成虚拟节点 文本节点是个字符串
    children = children.map(child => {
        if (typeof child === 'string') {
            return vnode(undefined, undefined,undefined, undefined, child);
        }else {
            return child;
        }
    })
    return vnode(type, key, props,children);
}
