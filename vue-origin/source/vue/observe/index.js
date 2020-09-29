
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
//就是vm.msg 进行取值操作 赋值操作 影响的还是_data
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
    //data为什么会定义成一个data() {return }
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
   //代理数据 vm.msg = vm._data.msg
    for(let key in data) {
        proxy(vm, '_data', key); //会将vm上的取值操作和赋值操作代理给vm._data属性

    }
    observe(vm._data);

}

//todo 用户取值时会执行此方法
//todo  {{fullName}}
function createComputedGetter(vm, key) {
    let watcher = vm._watchersComputed[key]; //这个watch就是我们定义的计算属性watcher
    return function() {
        if (watcher) {
            //如果dirty是false的话 不需要重新执行计算属性的方法
            if (watcher.dirty) { //如果页面取值  dirty true 就会调用Wacther方法
                //todo 执行this.get  stack pushTarget (计算属性watcher)
                // 执行计算方法 fullName() {return this.firstname + this.lastname } 获取最新的值
                //删除计算属性watcher 但是还会留一个渲染watcher
                // dirty 为false 下次取值的时候不用再取值了
                //todo this.fistname dep 收集了计算属性的watcher
                watcher.evaluate(); //todo 求值  会调用watcher 方法 dirty 变成false
                //todo 下次取值的时候不用求了 啥时候再求呢 下次计算属性依赖的值变化了 dirty变成true
                //执行 pushTarget(this);当前的计算属性watcher let value = this.getter.call(this.vm); poptarget();
            }
            console.log(Dep.target, '渲染wacther'); //渲染wacher里面存有2 个dep 分别是
            if (Dep.target) { //渲染watcher  计算属性watcher
                //让this.firstname
                //todo 是让firstname 有了渲染watcer
                watcher.depend(); // watcher写个方法  拿到当前的deps 给deps里面存的是dep
                //deps[i] 给每个依赖再加上 Dep.target.addDep(this)
            }
            return watcher.value;
        }
    }
}

//todo 计算属性的特点 默认不执行 等用户取值时执行 会缓存取值的结果  如果依赖的值变化了  会更新dirty属性 再次取值时 可以重新求新值

//watch不能用在模板里 监控的逻辑Wathcher
//渲染watcher 用户watcher  计算属性watcher
//todo 实际上也是一个watcher
function initComputed(vm, computed) {
    //todo 将计算属性的配置上  放到vm上
    let watchers = vm._watchersComputed =  Object.create(null); // 创建存储计算属性的watcher对象
    // console.log(watchers, computed, 'computed----')
    for(let key in computed) { // {fullName: () => this.firstname + this.lastname}
      
        let userDef = computed[key];
        // console.log(key, userDef, 'key----userDef')
        watchers[key] = new Watcher(vm, userDef,()=>{},{lazy:true} ) //计算属性watcher

        //todo 将这个属性定义到vm上 vm.firstname 取值
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
        //多个watch
        createWatcher(vm, key, handler, {immediate:userDef.immediate});
    }
}