
import {observe} from './index'
import {arrayMethods} from './array'
import {dependArray} from './array'
import {observerArray} from './array'
import Dep from './dep';
export function defineReative(data,key,value) { //定义响应式数据
    //vue不支持ie8 ie8以下
    //如果value依旧是一个对象的话 需要深度观察
    //todo 这里是要给数组添加依赖哦 想用new observe __ob__
    let childOb = observe(value);//todo 如果是数组就会返回当前Obsever实例 实例上有__ob__ 可以收集数组的依赖
    //
    //相同的属性 用的是相同的dep
    let dep =new Dep();//这里收集wactcher  每个属性都增加一个dep实例  数据变化 要让watch去执行
    Object.defineProperty(data, key, { //data = {arr:[1,2,{a:1}, {b:{c:12}]}  页面取值的时候
        // **依赖收集
        //TODO 一个属性只有一个Dep
        get() { //只要对这个属性进行了取值操作，就会将当前的watcher存入进去
            console.log('获取数据');
            // debugger;
            if(Dep.target) {// 渲染watcher
                //我们希望存入的watch不重复 如果重复对造成多次渲染
                // dep.addSub(Dep.target);
                dep.depend(); //让dep存watch 我还希望这个watch中也存放dep  实现多对多的关系
                if (childOb) { //数组的依赖收集 {{arr}} [1,2,3]
                    childOb.dep.depend(); //数组也收集了当前的渲染watch
                    dependArray(value);//收集儿子的依赖 [[1]] // 二维数组的情况下
                }
            }
            return value
        },
        //** 通知依赖更新 */
        set(newVal) {
            console.log('设置数据');
            if (newVal === value) return;
            observe(newVal);
            value = newVal;
            dep.notify();
        }
    })

}




class Observer {
    constructor(data){
        // console.log('observer', data);
        //用户的数据重新定义
        this.dep = new Dep();//此dep专门为数组而设定
        //每个对象 包括数组都有一个——ob_属性 返回当前的observer实例
        Object.defineProperty(data, '__ob__', {
            get:() => this
        })
        if (Array.isArray(data)) {
            //只能拦截数组的方法  数组里的每一项还需要去观测一下
            data.__proto__ = arrayMethods;//通过原型链 让数组通过链查找到我们的原型
            //todo 当调用数组的方法手动通知 ---> 什么时候去收集依赖呢
            observerArray(data);//观测数据的每一项

        }else {
            this.walk(data)
        }
       
    }
    //循环对象
    walk(data) {
    
        let keys = Object.keys(data); //不会遍历原型上的属性  for in 会遍历原型上的属性
        // console.log(keys);
        for(let i = 0; i< keys.length; i++) {
            let key = keys[i];//用户传入的key
            let value = data[keys[i]];//用户传入的值
            //定义响应式数据
            defineReative(data,key,value);
        }
    }
}
export default Observer;