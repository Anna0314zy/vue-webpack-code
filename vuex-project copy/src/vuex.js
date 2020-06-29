let Vue;
class ModuleCollection {
    constructor(options) {
        this.register([], options)//注册模块  将模块注册成树结构
    }
    register(path, rootModule) {
        // console.log(path, rootModule, 'register-path, rootModule');
        let module = { //将模块格式化 如果是根模块 
            _rawModule: rootModule,
            _children: {},
            state: rootModule.state
        }
        if (path.length == 0) {
            this.root = module;//如果是根模块将这个模块挂在根实例上
        } else {
            //递归都用reduce [a,b,c]
            console.log(path, 'path');
            //prev next [a] [a,m]
            let parent = path.slice(0, -1).reduce((root, current) => {
                //    console.log(root,current, 'root-curent---' )
                //第一次root是 返回的结果会重新被赋值给root
                return root._children[current];
            }, this.root)
            //把模块都要挂在在root _children上
            parent._children[path[path.length - 1]] = module;
        }
        //看当前模块是否有modules
        if (rootModule.modules) { //如果有 再次注册
            forEach(rootModule.modules, (moduleName, module) => {
                this.register(path.concat(moduleName), module);
            })
        }
    }
}
const forEach = (obj, cb) => { //迭代对象 会将帝乡的value key拿到
    Object.keys(obj).forEach(key => {
        cb(key, obj[key]);
    })
}
const installModule = (store, rootState, path, rootModule) => {
    // console.log(path, 'installModule-path');
    //state挂在到根节点
    if (path.length >0) {
        let parent = path.slice(0,-1).reduce((root, current) => {
            return root[current]
        }, rootState)
        // {age:1,a:{a:1}}
        //vue不能在vue 增加不存在的属性不会导致视图更新
        Vue.set(parent, path[path.length -1], rootModule.state);
        // parent.path[path.length -1]= rootModule.state;
    }else {

    }
    let getters = rootModule._rawModule.getters;
    if (getters) {
        forEach(getters, (getterName, fn) => {
            Object.defineProperty(store.getters, getterName, {
                get() {
                    //让get执行让自己的内容传进去
                    console.log(rootModule.state, 'rootModule.state');
                    return fn(rootModule.state);
                }
            })
        })
    }
    let mutations = rootModule._rawModule.mutations;

    if (mutations) {
        forEach(mutations, (mutationName, fn) => {
            let mutations = store.mutations[mutationName] || [];
            mutations.push((payload) => {
                fn(rootModule.state, payload);
                store._subscribe.forEach(fn => fn({type:mutationName,payload},rootState))
            })
            store.mutations[mutationName] = mutations;
        })
    }
    let actions = rootModule._rawModule.actions;
    
    if (actions) {
        forEach(actions, (actionsName, fn) => {
            let actions = store.actions[actionsName] || [];
            actions.push((payload) => {
                fn(store, payload);
            })
            store.actions[actionsName] = actions;
        })
    }
    //挂载儿子
    forEach(rootModule._children, (moduleName, module) => {
        installModule(store,rootState,path.concat(moduleName),module);
    })
}
    class Store {
        constructor(options = {}) {
            // this.state = options.state;
            //核心定义了响应式变化  数据更新  更新视图
            this.s = new Vue({
                data() {
                    return { state: options.state }
                }
            })
            // console.log(this.s, 'a')
            this._subscribe = [];
            let getters = options.getters;//所有的getter都会被定义到根实例上
            this.getters = {};
            let mutations = options.mutations;
            this.mutations = {};
            let actions = options.actions;
            this.actions = {};
            this._modules = new ModuleCollection(options);//把数据格式化一个树状结构
            //this代表store state当前的根状态 把模块所有的state放到根上
            installModule(this, this.state, [], this._modules.root);

            console.log(this._modules, 'this._modules');

            // forEach(getters, (getterName, fn) => {
            //     Object.defineProperty(this.getters, getterName, {
            //         get: () => {
            //             return fn(this.state)
            //         }
            //     })
            // })
            // Object.keys(getters).forEach(getterName => {
            //     Object.defineProperty(this.getters, getterName, {
            //         get: () => {
            //             return getters[getterName](this.state)
            //         }
            //     })
            // })
            // let mutations = options.mutations;
            // this.mutations = {};
            // forEach(mutations, (mutationsName, fn) => {
            //     this.mutations[mutationsName] = (payload) => {
            //         fn(this.state, payload);
            //     }
            // })
            // Object.keys(mutations).forEach(mutationsName => {
            //     this.mutations[mutationsName] = (payload) => {
            //         mutations[mutationsName](this.state, payload);
            //     }
            // })
            // let actions = options.actions;
            // this.actions = {};
            // forEach(actions, (actionsName, fn) => {
            //     this.actions[actionsName] = (payload) => {
            //         fn(this, payload);
            //     }
            // })
            // 
                options.plugins.forEach(plugin => plugin(this));
        }
        subscribe(fn) {
            this._subscribe.push(fn);
        }
        commit = (mutationsName, payload) => {
            // this.mutations[mutationsName](payload);
            this.mutations[mutationsName].forEach(fn => fn(payload));
        }
        dispatch = (actionsName, payload) => {
            this.actions[actionsName](payload); //源码里有一个变量 来控制是否通过mutation更新
        }
        get state() { //类的属性访问器
            return this.s.state;

        }
    }
    const install = (_Vue) => {
        Vue = _Vue;
        // TODO复习下插件思想
        // console.log('install', _Vue);
        //组件渲染顺序 mixin 混合
        Vue.mixin({
            //new vue  一次  app一次
            beforeCreate() {
                //没有将$store挂到vue原型上
                //可以重复new vue
                //我需要拿到store给每个组件增加$store属性
                console.log('ok');
                if (this.$options && this.$options.store) {
                    //给根实例增加store属性
                    this.$store = this.$options.store;
                } else {
                    //有可能组件没有父亲 有可能单独创建vue
                    this.$store = this.$parent && this.$parent.$store;
                }
            }
        })
    }
    export default {
        //给用户提供一个isntall方法默认会被调用
        install,
        Store
    }
//源码会将  当前用户传递的内容  进行格式化管理
// let root = {
//     _raw: options,
//     _children: {
//         a: {},
//         b: {}
//     },
//     state: options.state
// }