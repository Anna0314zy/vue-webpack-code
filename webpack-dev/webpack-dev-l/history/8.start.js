let {AsyncSeriesHook} = require('tapable');
//异步串行的钩子  第一个执行完再执行第二个
class Lesson {
    constructor() {
    
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tap() { // 注册监听函数
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    reslove();
                })
            })
        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    console.log('react', name);
                    reslove();
                })
            })
        })
    }
    start() {
        //只有注册的两个异步方法都执行了  此回调才会执行 否则不执行
            this.hooks.arch.promise('zouyu').then(() => {
                console.log('end')
            })
    }
}
let l = new Lesson();
l.tap();
l.start(); //启动钩子