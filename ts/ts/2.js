"use strict";
function hello(name) {
    console.log('hello' + name);
}
var getUsername = function (firstname, lastname) {
    return firstname + lastname;
};
//可选参数
function print(name, age, home) {
}
print('zhufeng'); //少传一个不行 上面加？
//默认参数
function ajax(url, method) {
    if (method === void 0) { method = 'GET'; }
    console.log(url, method);
}
ajax('http');
ajax('http', 'POST');
//剩余参数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (accu, item) { return accu + item; }, 0);
}
console.log(sum(1, 3, 4));
//函数重载
//no overload expects 1 argument
var obj = {};
function attr(val) {
    if (typeof val === 'string') {
        obj.name = val;
    }
    else if (typeof val === 'number') {
        obj.age = val;
    }
}
attr('zhufeng');
attr(10);
function sum2(a, b) {
    return a + b;
}
sum2('5', '5');
//ts 怎么写箭头函数 跟js一样
var delay = function (ms) {
    setTimeout(function () {
        console.log('hello');
    }, ms);
};
