let {AsyncSeriesHook} = require('tapable');
//异步串行的钩子  第一个执行完再执行第二个
class Lesson {
    constructor() {
    
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tap() { // 注册监听函数
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                // cb();
            })
        })
        this.hooks.arch.tapAsync('react', (data, cb) => {
            setTimeout(() => {
                console.log('react', data);
              cb();
            })
        })
    }
    start() {
        //只有注册的两个异步方法都执行了  此回调才会执行 否则不执行
            this.hooks.arch.callAsync('zouyu', function() {
                console.log('end');
            })
    }
}
let l = new Lesson();
l.tap();
l.start(); //启动钩子