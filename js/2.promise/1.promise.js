//promise a+ 规范 低版本
//高版本都支持promise
//promse 是一个类天生的  类需要传入 executor 执行器 默认会立即执行
//内部会提供两个方法 可以更改promise的3个状态 
let Promise = require('./promise.js');
let promise = new Promise((resolve, reject) => {
    // resolve('xxxx');
    // throw new Error('错误');
    // reject('val');
    setTimeout(() => {
        reject('xxxxx');
    }, 1000)
})
//发布订阅 支持一个promise可以then多次 改变状态后会让then的函数执行
// promise.then(data => {
//     console.log(data, '成功');
// }, error => {
//     console.error(error, '失败');
// })
promise.catch(e=> {
    console.error(e, '失败');
})