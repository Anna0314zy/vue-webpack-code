//我们想知道如何获取到compilation对象
class OptimizePlugin {
    constructor(options){
        this.options = options || {};

    }
    apply(compiler) {
        //每当compiler创建出来一个compilation对象 就会触发回调 参数就是compilation
        compiler.hooks.compilation.tap('OptimizePlugin', compilation => {
            compilation.hooks.optimize.tap('OptimizePlugin', () => {
                console.log('webpack优化中----');
            })
        })
    }
}
module.exports = OptimizePlugin;
