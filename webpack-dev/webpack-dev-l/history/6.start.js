let {AsyncParallelHook} = require('tapable');
//异步的钩子（串行）并行需要等待所有并发的异步事件执行后再执行回调方法
//同时发送多个请求
//注册方法 tapAsync 异步执行  tap同步执行
//前两个都执行完了  再执行最后一个
class Lesson {
    constructor() {
    
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    tap() { // 注册监听函数
        this.hooks.arch.tapPromise('node', (name) => {
            // setTimeout(() => {
            //     console.log('node', name);
            //     cb();
            // },1000)
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    reslove();
                })
            })
        })
        this.hooks.arch.tapPromise('react', (data) => {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    console.log('react', data);
                    // reslove();
                })
            })
        })
    }
    start() {
        //只有注册的两个异步方法都执行了  此回调才会执行 否则不执行
            this.hooks.arch.promise('zouyu').then(() => {
                console.log('end');
            })
    }
}
let l = new Lesson();
l.tap();
l.start(); //启动钩子