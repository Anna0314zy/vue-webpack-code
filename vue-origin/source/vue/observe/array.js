//主要拦截用户的push shift unshift pop reverse sort splice

import { observe } from './index';

//先获取老的方法 只改写这7个
let oldArrayProtoMethods = Array.prototype;
//拷贝的原型 拷贝一下 不能直接去改数组的原型方法
export let arrayMethods = Object.create(oldArrayProtoMethods);

export function observerArray(inserted) {//要循环数组对数组每项观测
    for(let i = 0; i< inserted.length; i++) {
        // console.log(inserted[i], 'inserted[i]');
        observe(inserted[i]);
    }
 
}
//收集依赖 [[1]] 使用数组里面还有依赖的关系
export function dependArray(value) {//要循环数组对数组每项观测
    for(let i = 0; i< value.length; i++) {
        // console.log(inserted[i], 'inserted[i]');
        let currentItem = value[i];
        currentItem.__ob__ && currentItem.__ob__.dep.depend();
        if (Array.isArray(currentItem)) {
            dependArray(currentItem);
        }

    }
 
}
let methods = [
    'push', 
    'shift',
    'unshift',
    'pop',
    'reverse',
    'sort',
    'splice'
]
// [].push(9)
//对新增的数据进行监测就可以  给每个对象下面添加一个—__ob__
methods.forEach(method => {
    //arr.push(1,2,3) args = [1,2,3]
    arrayMethods[method] = function(...args) { // 函数劫持 切片编程
        //这里的...args 会变成一个数组  apply
        //this谁调用就是谁 让原有函数执行
        let r = oldArrayProtoMethods[method].apply(this, args);
        //如果新增的属性也是对象 还要继续观察
        let inserted;
        // console.log(args, 'args---');
        switch(method){
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                //获取数组新增的内容
                inserted = args.slice(2);//获取splcie新增的内容 从数组第二位开始截取获取数组新增内容
            default:
                break;
        }
        // console.log(inserted, 'inserted----');
        if (inserted) observerArray(inserted); //对
        this.__ob__.dep.notify();//通知视图更新
        return r;
        // console.log('调用了数组更新的方法');
    }
})
