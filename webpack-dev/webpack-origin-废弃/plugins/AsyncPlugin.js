const {
    compilation
} = require("webpack");

//异步的插件
class AsyncPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
            setTimeout(() => {
                console.log('文件发射出来等一下')
                cb();
            }, 1000)

        })
        compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('文件发射出来等一下')
                    resolve();
                }, 1000)
            })

        })
    }
}
module.exports = AsyncPlugin;