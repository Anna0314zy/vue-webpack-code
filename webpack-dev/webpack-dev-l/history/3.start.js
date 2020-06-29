let {SyncWaterfallHook} = require('tapable');
//
class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name'])
        }
    }
    tap() { // 注册监听函数
        this.hooks.arch.tap('node', function(name) {
            console.log('node', name);
            return 'node学的还不错'
        })
        this.hooks.arch.tap('react', function(data) {
            console.log('react', data);
            return 'react ok '
        })
        this.hooks.arch.tap('webpack', function(data) {
            console.log('webpack', data);
            return 'webpack ok '
        })
        this.hooks.arch.tap('lodash', function(data) {
            console.log('lodash', data);
            return 'lodash ok '
        })
    }
    start() {
            this.hooks.arch.call('zouyu');
    }
}
let l = new Lesson();
l.tap();
l.start(); //启动钩子