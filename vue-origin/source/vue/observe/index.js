
import Observer from './observer'
import Watcher from './watcher';
import Dep from './dep';


export function initState(vm) {
    let opts = vm.$options;
    // console.log(opts, 'opts')
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed(vm, opts.computed);
    }
    if (opts.watch) {
        initDataWatch(vm);
    }
}
export function observe(data) {
    if (typeof data !== 'object' || data == null) {
        return;
    }
    //已经被监控过了
    if (data.__ob__) {
        return data.__ob__;
    }
    return new Observer(data);
}
function proxy(vm, source, key) {
    Object.defineProperty(vm,key,{
        get() {
            return vm[source][key]
        },
        set(newKey) {
            vm[source][key] = newKey;
        }
    })
}
function initData(vm) { // 将用户传入的数据 通过defineProperty重新定义
    let data = vm.$options.data;  // data.call(vm) 可以把函数的返回值取出来
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

    for(let key in data) {
        proxy(vm, '_data', key); //会将vm上的取值操作和赋值操作代理给vm._data属性

    }
    observe(vm._data);

}

//用书取值时会执行此方法
function createComputedGetter(vm, key) {
    let watcher = vm._watchersComputed[key]; //这个watch就是我们定义的计算属性watcher
    return function() {//公主
        if (watcher) {
            //如果dirty是false的话 不用计算
            if (watcher.dirty) { //如果页面取值  dirty true 就会调用Wacther方法
                watcher.evaluate();
            }
            if (Dep.target) { //渲染watcher  计算属性watcher
                watcher.depend();
            }
            return watcher.value;
        }
    }
}
//计算属性的特点 默认不执行 等用户取值时执行 会缓存取值的结果  如果依赖的值变化了  会更新dirty属性 再次取值时 可以重新求新值

//watch不能用在模板里 监控的逻辑Wathcher
//渲染watcher 用户watcher  计算属性watcher

function initComputed(vm, computed) {
    let watchers = vm._watchersComputed =  Object.create(null); // 创建存储计算属性的watcher对象
    // console.log(watchers, computed, 'computed----')
    for(let key in computed) { // 
      
        let userDef = computed[key];
        // console.log(key, userDef, 'key----userDef')
        watchers[key] = new Watcher(vm, userDef,()=>{},{lazy:true} )
        Object.defineProperty(vm, key, {
            get: createComputedGetter(vm, key)
        });
    }
}
function createWatcher(vm, key, handler, opts) {
    //内部最终也会使用
    return vm.$watch(key, handler, opts);
}
function initDataWatch(vm) {
    let watch = vm.$options.watch; //获取用户传入的watch属性
    // console.log(vm, 'vm');
    for(let key in watch) { //msg(){}
        let userDef = watch[key];
        let handler = userDef;
        if (userDef.handler) {
            handler = userDef.handler
        }

        createWatcher(vm, key, handler, {immediate:userDef.immediate});
    }
}