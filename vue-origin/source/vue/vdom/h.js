
import {vnode} from './create-element'
/**
 * 
 * @param {*} tag tag 类型
 * @param {*} props 节点属性
 * @param  {...any} children  所有孩子
 */
export default function h(tag, props, ...children) {
    let key;
    if(props.key) {
        key = props.key;
        delete props.key; //属性中不包括key属性
    }
    
    children = children.map(child => {
        if (typeof child === 'object') {
            return child;
        }else {
            return vnode(undefined, undefined,undefined, undefined, child);
        }
    })
    return vnode(tag, props,key, children);
    
}
// h('li', {
//     key: 'n',
//     style: {
//         background: 'orange'
//     }
// }, 'n')
