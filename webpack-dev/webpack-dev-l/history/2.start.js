let {SyncBailHook} = require('tapable');
//如果return 一个不是undefined值  下面的hooks不执行
class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncBailHook(['name'])
        }
    }
    tap() { // 注册监听函数
        this.hooks.arch.tap('node', function(name) {
            console.log('node', name);
            return '想停止学习'
        })
        this.hooks.arch.tap('react', function(name) {
            console.log('react', name);
        })
    }
    start() {
            this.hooks.arch.call('zouyu');
    }
}
let l = new Lesson();
l.tap();
l.start(); //启动钩子