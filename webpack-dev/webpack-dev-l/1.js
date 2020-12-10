
const {
    SyncHook
} = require('tapable');
//context
const hook = new SyncHook(['arg1', 'arg2', 'arg3']);

/**
 * 注册拦截器
 */
hook.intercept({

    //每次在call之前的钩子
    call(source, target, name) {
        console.log(source, target, name)
    },
    tap() {
        console.log(arguments, 'argument')
    },
    register({type, fn, name}) {
        console.log(arguments, 'argument--register({type, fn, name}) {\n')
        return {type, fn, name};
    }
});

/**
 * 注册监听事件
 */
hook.tap('1', (name) => {
    console.log(1, name);
});

hook.tap('2', (name) => {
    console.log(2, name);
});

/**
 * 事件触发
 */

hook.call('zhufeng');
