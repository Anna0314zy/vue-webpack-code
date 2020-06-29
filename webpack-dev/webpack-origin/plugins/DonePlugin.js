class DonePlugin {
    apply(compiler) {
        //同步插件
        //打包完成告诉一下吗 hooks实例 挂载很多钩子函数
        compiler.hooks.done.tap('DonePlugin',  (stats) => { 
            console.log('编译完成```')
         })
    }
}
module.exports = DonePlugin;