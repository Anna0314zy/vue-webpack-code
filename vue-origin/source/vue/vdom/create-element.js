export function vnode(tag, props,key, children, text) {
    return {
        tag, //标签名
        props,//标签的属性
        key,
        children,
        text
    }
}