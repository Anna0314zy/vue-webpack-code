export default function vnode(type, key,props, children, text) {
    return {
        type, //标签名
        props,//标签的属性
        key,
        children,
        text
    }
}