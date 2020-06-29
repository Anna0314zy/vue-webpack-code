let fs = require('fs');
//订阅  on  订阅好一件事 当这件事发生的时候 触发对应的函数
// 发布emit
let e = {
    _obj: {},
    _callback:[],
    on(callback) {//订阅  就是将函数放到数组中
        this._callback.push(callback);
    },
    emit(key, val) {
        this._obj[key] = val; //让订阅的数组中的方法依次执行
        this._callback.forEach(fn => {
            fn(this._obj);//用户想拿到结果
        })
    }
}
//只要发布了 就应该让订阅的执行 
// e.on(function() { //每次发布都触发此函数
//     console.log('获取一个')
// })
//监听 on会执行2次  因为两个emit
e.on(function(obj) {//每次发布都会触发此函数
    console.log('获取一个');
})
e.on(function(obj) {//每次发布都会触发此函数
    if (Object.keys(obj).length === 2){//用户根据结果自己决定
        console.log(Object.values(obj))
        console.log(Object.entries(obj))
        console.log(obj);
    }
})
//每次发布的时候都会触发on emit核心让订阅on之中的方法依次执行
fs.readFile('./a.text', 'utf-8', function(error, data) {
    e.emit('age', data);//发布
    // e.emit('age', data);//发布
})
fs.readFile('./b.text', 'utf-8', function(error, data) {
    e.emit('name', data);//发布
})
//发布订阅 - 解偶  多个类之前可以解除耦合关系
//订阅  中间没有任何关联    发布   
//特点 订阅方和发布方没有任何关系  
//观察者模式  观察者被观察者