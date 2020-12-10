let {SyncLoopHook} = require('tapable')
debugger;
// class SyncLoopHook { // 钩子是同步的
//     constructor(args) {
//         this._args = args;
//         this.taps = [];
//     }
//     tap(name,fn) {
//         this.taps.push(fn);
//     }
//     call() {
//         //只要不返回undefined就一直循环下去
//         let args = Array.from(arguments).slice(0, this._args.length);
//         let first = args[0];
//         for(let i = 0; i < this.taps.length; i++) {
//             let fn = this.taps[i];
//             let result = true;
//             //如果fn返回值一直不是undefined则一直执行
//             //如果遇到的不是undefined 则重头开始执行
//             do {
//                 result = fn(first, ...args.slice(1)); //如果没有返回
//             }while (typeof result != 'undefined')
//         }
//     }
//     loop() {
//         //只要不返回undefined就一直循环下去
//         let args = Array.from(arguments).slice(0, this._args.length);
//         let first = args[0];
//         for(let i = 0; i < this.taps.length; i++) {
//             let fn = this.taps[i];
//             let result;
//             //如果fn返回值一直不是undefined则一直执行
//             do {
//                 result = fn(first, ...args.slice(1)); //如果没有返回
//             }while (typeof result != 'undefined')
//         }
//     }
// }
let hook = new SyncLoopHook(['name', 'age']);
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
//不停的执行函数 直到函数结果返回undefined
hook.tap('1', function(name, age) {
    console.log('1', name, age);
    if (++counter1 == 1) {
        counter1 = 0;
        return;
    }
    return true;
})
hook.tap('2', function(name, age) {
    console.log('2', name, age);
    if (++counter2 == 2) {
        counter2 = 0;
        return;
    }
    return true;
})
hook.tap('3', function(name, age) {
    console.log('3', name, age);
    if (++counter3 == 3) {
        counter3 = 0;
        return;
    }
    return true;
})
//只要不返回undefined 又重头循环
hook.call('zhufeng', 10);
// 1 zhufeng 10
// 2 zhufeng 10
// 1 zhufeng 10
// 2 zhufeng 10
// 3 zhufeng 10
// 1 zhufeng 10
// 2 zhufeng 10
// 1 zhufeng 10
// 2 zhufeng 10
// 3 zhufeng 10
// 1 zhufeng 10
// 2 zhufeng 10

