function isType(type) {
    //将String保存了在这个代码块中
    return function(content) {
        //为了改变this指向
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}
// 高阶函数  保存变量
//闭包  在定义的时候，函数就决定了一个函数不在自己的所在作用域下执行
// let isString = isType('String');
// console.log(isString);
// console.log(isString([]));
// 函数的柯里化->具像 函数的反柯里化(扩大函数的范围)
// function isType
let utils = {};
['String', 'Number'].forEach(type => {
    utils['is'+type] = isType(type);
});
// console.log(utils.isString('heeo'));
//避免把string参数写错了，这样只会找方法去，方法找错了，就会报错，不会导致结果有错
//对某些函数进行扩展 面向切片编程 统一扩展了公共方法
function say(...args) {
    console.log('say', ...args)
}
//在说话之前去干一些事 
Function.prototype.before = function(callback) {//统一扩展了公共方法
//箭头函数没有this指向 也没有arguments 会向上层作用域查找
//args 
 return (...args) => {
    callback();
    console.log(this, 'this');
    this(...args);//this指向  谁调用就指向谁
 }

}
let newSay = say.before(function() {
    console.log('刷牙');
})
// newSay('wo', 'ikkk');
let fs = require('fs');
//异步的解决方案  回调地狱
function after(time, callback) {
    return function() { //out

    }
}
//基于回调的方式获取最终的结果
function after(times, callback) {
    //times会被宝尊在当前上下文中  不会被销毁
    let renderObj = {};
   return function(key, data) {
       renderObj[key] = data;
        if (--times == 0) {
            callback(renderObj);
        }
   }
}
//基于回调的方式获取最终结果
let out = after(2, function(rederObj) {
    console.log(rederObj, 'rederObj');

})
// let renderObj = {};
fs.readFile('./a.text', 'utf-8', function(error, data) {
    console.log(data);
    out('age', data);
    // renderObj['age'] = data;
})
fs.readFile('./b.text', 'utf-8', function(error, data) {
    console.log(data);
    out('name', data);
    // renderObj['name'] = data;
})
// console.log(renderObj);
//发布订阅 - 发布者模式
