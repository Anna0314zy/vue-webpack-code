let {SyncLoopHook} = require('tapable');
//同步遇到某个不返回underfined的监听函数会多次执行
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name'])
        }
    }
    tap() { // 注册监听函数
        this.hooks.arch.tap('node', (name) => {
            console.log('node', name);
            return ++this.index === 3 ? undefined : '继续学'
        })
        this.hooks.arch.tap('react', (data) => {
            console.log('react', data);
            // return 'react ok '
        })
        this.hooks.arch.tap('webpack', (data) =>{
            console.log('webpack', data);
            // return 'webpack ok '
        })
        this.hooks.arch.tap('lodash', (data)=> {
            console.log('lodash', data);
            // return 'lodash ok '
        })
    }
    start() {
            this.hooks.arch.call('zouyu');
    }
}
let l = new Lesson();
l.tap();
l.start(); //启动钩子