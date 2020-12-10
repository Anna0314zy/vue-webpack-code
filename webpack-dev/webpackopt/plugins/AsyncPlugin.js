//监听异步的钩子

const {
    compilation
} = require("webpack");

//异步的插件
class EmitPlugin {
    apply(compiler) {
        // emit AsyncSeriesHook异步的串行钩子
        //先执行第一个 再执行第二个 再执行第三个
        compiler.hooks.emit.tapAsync('EmitPlugin', (compilation, cb) => {
            console.log('开始执行EmitPlugin----')
            setTimeout(() => {
                console.log('结束执行EmitPlugin----')
                cb();
            }, 3000)

        })
        // compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             console.log('文件发射出来等一下')
        //             resolve();
        //         }, 1000)
        //     })
        //
        // })
    }
}
module.exports = EmitPlugin;
