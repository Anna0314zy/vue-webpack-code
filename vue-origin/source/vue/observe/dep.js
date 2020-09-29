let id = 0;
class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }
    addSub(watcher) { // 订阅  就是将调用ADDsub时传入的内容保存到数组中
        this.subs.push(watcher);
    }
    notify() { //发布
        console.log(this.subs, '通知渲染watcher');
        this.subs.forEach(watcher => watcher.update());
    }
    depend() {
        if (Dep.target) { //为了防止直接调用depengd
            //Dep.target是一个渲染watcher dep可以计算watch  watch也可以计算dep
            Dep.target.addDep(this); //互相记忆 希望可以在watcher中互相记忆  让watcher 可以记住Dep

        }
    }
}
//用来保存当前的watcher
let stack = []; //保存watcher的栈 保留当前的watcher
export function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
}
export function popTarget() {
   stack.pop();
   Dep.target = stack[stack.length - 1];//取栈的最后一个//
}
export default Dep; //用来收集依赖收集的是watcher
//观察者模式 
// let dep = new Dep();
// dep.addSub({
//     update() {
//         console.log(1)
//     }
// })
// dep.addSub({
//     update() {
//         console.log(2)
//     }
// })
// dep.notify();
