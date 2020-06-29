let obj = {
    name: {
        name: 'jw'
    }, 
    arr: ['吃','喝','玩']
}
//兼容性差 可以代理13种方法 set  get
//defineProerty 只能对特定的属性拦截
let handler = {
    //target 就是原对象 key就是当前
    get(target, key) {
        console.log('收集依赖');
        if (typeof target[key] === 'object' && target[key] !== null) {
            //只有取到对应值的时候才会代理
            return new Proxy(target[key], handler);
        }
        //Reflect

        return Reflect.get(target,key);
        // return target[key]
    },
    set(target, key, value) { //先去改变数组的长度
        
        //判断一下是新增 还是修改操作
        let oldValue = target[key];
        console.log(key, oldValue, value);
        if (!oldValue) {
            //洗增
            console.log('触发更新-新增');

        }else if (oldValue !== value) {
            //修改
            console.log('触发更新-修改');
        }
        // target[key] = value; //如果设置不成功不会报错，对象不可配置
        return Reflect.set(target, key, value)
    }
}
let proxy = new Proxy(obj,handler)
// proxy.name = 123;
// proxy.name.name = 12355;
// console.log(proxy.name.name);
//懒代理，只有在取值的时候才去代理；
//setdefineproperty 只要是对象就会去递归
proxy.arr.push(123);
proxy.arr[0] = 100;