//generator 生成器 生成的是迭代器
//普通函数执行 没有停止功能  generator函数可以暂停
// function * read() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;

// }
// let it = read();// iterator 迭代器中包含一个next方法
// // [] 迭代器接口
// let done = false;
// while(!done) {
//     let obj= it.next();
//     done = obj.done;
//     console.log(obj.value, 'done');
// }
// console.log(it.next());// {value, done} 碰到yield关键字就停止了  只有函数走完了 才会返回 done true
// console.log(it.next());
// function * read() {
//     let a = yield 1;
//     console.log(a)
//     let b = yield 2;
//     console.log(b)
//     let c = yield 3;
//     console.log(c)

// }
// let it = read();// iterator 迭代器中包含一个next方法
// // [] 迭代器接口
// it.next('hello');//第一次传递的参数 是无意义的
// it.next('world');//next传递参数会给上一次yield返回值
// it.next('xx');
let fs = require('fs')
let util = require('util');
// let co = require('co');
let read = util.promisify(fs.readFile);
function * readAge() {
    // return 1;
   let content = yield read('./name.txt', 'utf8');
   let age = yield read(content, 'utf8');
//    let age = yield {};
   return age;

}
function co(it) {
    return new Promise((reslve, reject) => {
        //异步迭代 需要next函数
        function next(r) {
            let {value, done} = it.next(r);
            if (done) {
                reslve(value)
            }else {
                Promise.resolve(value).then(data => {
                    next(data);
                }, reject)
            }
        }
        // let {value, done} = it.next();
        next();
    })
}
// let it = readAge();
co(readAge()).then(data => {
    console.log(data);
})
//依次去执行生成器 不停的调用next方法 将最终结果返回

// let {value} = it.next();
// value.then(data => {
//     // console.log(data);
//     let {value} = it.next(data);
//     value.then(data => {
//         // console.log(data);
//         let {value, done} = it.next(data);
//        console.log(value, done);
//     })
// })
function * test() {
    try{
        yield 100;
    }catch(e) {
        console.log(e, 'err')
    }
}
let it = test();
it.next();
it.throw('hello')