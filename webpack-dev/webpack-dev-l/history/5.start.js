let {AsyncParallelHook} = require('tapable');
//异步的钩子（串行）并行需要等待所有并发的异步事件执行后再执行回调方法
//同时发送多个请求
//注册方法 tapAsync 异步执行  tap同步执行
class Lesson {
    constructor() {
    
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    tap() { // 注册监听函数
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                cb();
            },1000)
        })
        this.hooks.arch.tapAsync('react', (data, cb) => {
            setTimeout(() => {
                console.log('react', data);
                cb();
            },1000)
        })
    }
    start() {
        //只有注册的两个异步方法都执行了  此回调才会执行 否则不执行
            this.hooks.arch.callAsync('zouyu', function() {
                console.log('end');
            });
    }
}
let l = new Lesson();
l.tap();
l.start(); //启动钩子