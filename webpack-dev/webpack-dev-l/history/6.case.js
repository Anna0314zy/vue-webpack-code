// const {AsyncParallelHook} = require('tapable');

class AsyncParallelHook { // 异步并行的钩子
    constructor(args) {
        this._args = args;
        this.tasks = [];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
        let args = Array.from(arguments).slice(0, this._args.length);
    let tasks = this.tasks.map(task => task(...args));
    return Promise.all(tasks);

    }
}
let hook = new AsyncParallelHook(['name']);
let total = 0;
hook.tapPromise('1', function(name) {

    return new Promise((reslove, reject) => {
        setTimeout(() => {
            console.log('1', name);
            reslove();
        }, 1000)
    })

})
hook.tapPromise('2', function(name) {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            console.log('2', name);
            reject();
        }, 2000)
    })

})
hook.tapPromise('3', function(name) {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            console.log('3', name);
            reslove();
        }, 2000)
    })

})
console.time('cost')
hook.promise('jw').then(() => {
    console.log('end');
    console.timeEnd('cost')
}, err=> {
    console.log(err, 'err');
    console.timeEnd('cost')

})
// 1 jw
// 2 jw
// undefined err
// cost: 2022.995ms
// 3 jw


