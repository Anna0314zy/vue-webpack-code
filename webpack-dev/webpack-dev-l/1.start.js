let {AsyncSeriesWaterfallHook} = require('tapable');
//异步串行瀑布函数  上一个人的  result  是下一个人的输出 如果上一个报错 下个直接不走了  跳过执行最后一个
class Lesson {
    constructor() {
    
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        }
    }
    tap() { // 注册监听函数
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                // cb(null, 'result');
                cb('error', 'result');
            }, 1000)
        })
        this.hooks.arch.tapAsync('react', (name, cb) => {
            setTimeout(() => {
                console.log('react', name);
                cb();
            }, 1000)
        })
    }
    start() {
        //只有注册的两个异步方法都执行了  此回调才会执行 否则不执行
            this.hooks.arch.callAsync('zouyu',() => {
                console.log('end')
            })
    }
}
let l = new Lesson();
l.tap();
l.start(); //启动钩子