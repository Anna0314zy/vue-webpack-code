function flushCallbacks() {
    callbacks.forEach(cb => cb());
}
let callbacks = []; //内部也是一个队列
//nextTick 实现原理  setTimeout宏任务 比较慢 所以要这么
// this.$nextTick(() => {获取最新的dom})
//todo 页面更新后再去获取dom元素
export default function nextTick(cb) {
    callbacks.push(cb); // todo 用户也会写Vue.nextTick 然后希望用户写的回调函数在cd  cb 就是flushQueue 之后执行
    //要异步刷新这个cb
    //异步分执行顺序的 会先执行promise  mutationObserver  微任务   setTimeout setImmidiate  宏仁任务
    let timerFunc = () => {
        flushCallbacks();
    }
    if (Promise) { //then是一个异步
        return Promise.resolve().then(timerFunc);
    }
    if (MutationObserver) { //h5 的api  MutationObserver异步执行 文本节点变成2才会执行 timerFunc
        let observe = new MutationObserver(timerFunc);
        let textNode = document.createTextNode(1); //观察文本节点 节点的文本内容发生变化 就会执行 timerFunc
        observe.observe(textNode, { characterData: true });
        textNode.textContent = 2; //todo 从1 变成2  上面的函数就会执行 上面的函数就会异步执行
        return;
    }
    if (setImmediate) {
        return setImmediate(timerFunc); //高版本浏览器执行  性能会比settimerout 要 好
    }
    setTimeout(timerFunc, 0);
    //todo Promise MutationObserver
}
