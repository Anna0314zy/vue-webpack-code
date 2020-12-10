//插件就是一个类 有一个apply方法接受一个complier方法
//我们会在compiler对象上钩子上挂载一个监听函数
// 当compiler这个对象上的钩子函数触发的时候 会执行对应的监听函数

class DonePlugin {
    constructor(options){
        this.options = options || {};

    }
    apply(compiler) {
        //同步插件
        //打包完成告诉一下吗 hooks实例 挂载很多钩子函数
        //每当编译完成之后都会call done这个事件
        compiler.hooks.done.tap('DonePlugin',  (stats) => {
            console.log(this.options.message || '编译完成');
        })
    }
}
module.exports = DonePlugin;
