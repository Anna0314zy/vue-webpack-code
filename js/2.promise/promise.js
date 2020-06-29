//每个  3个状态
const PENDING = 'PENDING'; //等待
const RESOLVED = 'RESOLVED'; //成功
const REJECTED = 'REJECTED'; //失败
// resolvePromise(promise2,x,resolve, reject)
//判断x的状态 是让promise2变成功态还是失败态
function resolvePromise(promise2, x, resolve, reject) {
    // console.log(promise2, 'promise2');
    //此方法  为了兼容所有的promise n个库中间 执行的流程是一样的
    //要尽可能的详细  不出错
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    //判断 x是一个promise  
    //x 如果是对象  或者函数 说明他有可能是promise
    let called;
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        //有可能是promise

        try {
            //取值 只取一次 不能x.then.call
            let then = x.then; // then 方法可能使用的getter定义
            if (typeof then === 'function') { //只认为他是个promise
                //x为this  call改变this指向并且让函数执行
                then.call(x, (y) => {
                    //继续解析直到y是一个普通值 递归解析reslove的值
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                    //data 就是hello
                    // resolve(y);
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(r);
                })
            } else {
                resolve(x);
            }
        } catch (e) { //取then出错了 在错误中又掉了该promise的成功
            if (called) return;
            called = true;
            reject(e); //取值失败  走到error
        }
    } else {
        resolve(x);
    }

}
class Promise {
    constructor(executor) { //宏变量
        this.status = PENDING; //默认是等待它
        this.value = undefined;
        this.reason = undefined;
        //专门存放成功的回调函数
        this.onResolevedCallbacks = [];
        this.onRejectedCallbacks = [];
        //专门存放失败的回调函数
        //保证只有状态是等待的时候 才能更改状态
        let resolve = (value) => {
             //value 
             if (value instanceof Promise) {
                 value.then(resolve, reject);//递归解析直到是普通值为止
                 return;
             }
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                //需要将成功的方法依次执行
                this.onResolevedCallbacks.forEach(fn => fn());
            }

        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn());
            }

        }
        //执行executor 传入成功和失败
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e) // 如果内部出错直接将err手动的调用reject
        }
    }
    //catch就是没有成功的then方法
    catch(errCallback) {
        return this.then(null, errCallback);
    }
    then(onfulfilled, onrejected) {
        //处理前面调用的时候不停的then().then()
        onfulfilled = typeof onfulfilled == 'function' ? onfulfilled : v => v;
        onrejected = typeof onrejected == 'function' ? onrejected : err => {
            throw err
        };
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                //执行then中的方法，可能返回的是一个普通值 或者promise我要判断x的；我要判断x是不是一个
                // promise2,如果是，需要让这个promise执行 并采用他的状态 作为promise的成功或者失败
                setTimeout(() => {
                    try {
                        //如果then里面调用的时候没传参数
                        let x = onfulfilled(this.value); //onfulfilled规定是异步执行  因为要保证promise2要生成
                        console.log(onfulfilled, onrejected, 'onfulfilled, onrejected');
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) { //一旦then方法报错，就走到外层then的错误处
                        console.log('error', e);
                        reject(e)
                    }

                }, 0);

            }
            if (this.status === REJECTED) {


                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                }, 0);
            }
            if (this.status === PENDING) {
                //executor有异步逻辑  切片编程 方便添加逻辑
                this.onResolevedCallbacks.push(() => {
                    //todo  ...切片编程


                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }

                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {


                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }

                    }, 0);
                })
            }
        });

        return promise2;
    }
}
Promise.defer = Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
Promise.resolve = function(value) {
    return new Promise((resolve,reject) => {
        resolve(value);
    })
}
Promise.reject = function(value) {
    return new Promise((resolve,reject) => {
        reject(value);
    })
}
// Promise.resolve = function(value) {
//     return 
// }
// Promise.resolve可以接收一个promise  reject接收promise无意义
module.exports = Promise;
//测试库  promises-aplus-tests