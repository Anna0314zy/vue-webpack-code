let fs = require('fs');
// let Promise = require('./promise');
// function read(...args) {
//     let dfd = Promise.defer();//延迟对象 可以解决promise的嵌套问题
//     // return new Promise((resolve, reject) => {
//     //     fs.readFile(...args, (err, data) =>{
//     //         if (err) reject(err);
//     //         resolve(data);
//     //     })

//     // })
//     console.log(...args, 'args');
//     fs.readFile(...args, (err, data) =>{
//         if (err) dfd.reject(err);
//         dfd.resolve(data);
//     })
//     return dfd.promise;
// }
// read('./a.txt', 'utf8').then(data => {
//     // console.log('data', data);
//     return read(data, 'utf8');
// }, err=> {
//     console.log('err', err);
// }).then(null, err => {
//     console.log(err, 'err');
// })
// let {
//     promisify
// } = require('util');
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function(err, data){
                if (err) reject(err);
                resolve(data);
            });
        })
    }
}
let readFile = promisify(fs.readFile);
readFile('./a.text', 'utf-8').then(data => {
    console.log('data', data);
    // return read(data, 'utf-8');
}, err => {
    console.log('err', err);
}).then(null, err => {
    console.log(err, 'err');
})