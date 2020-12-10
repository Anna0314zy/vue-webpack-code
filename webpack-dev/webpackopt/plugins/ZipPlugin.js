
/**
 * 写一个插件的思路
 * 1.找到插件代码需要执行的钩子
 * 2.知道钩子函数的参数和数据结构，进行加工
 */
const JsZip = require('jszip');
const {RawSource}= require('webpack-sources');
class ZipPlugin {
    constructor(options){
        this.options = options || {};

    }
    apply(compiler) {
        //当资源已经准备就绪 准备向输出的目录写入的时候会触发这个钩子
        //写入文件之前触发
        compiler.hooks.emit.tapPromise('OptimizePlugin', (compilation, cb) => {
           console.log(compilation.assets, 'compilation');
           /**
            {
                'bundle.js': CachedSource {
                _source: ConcatSource { children: [Array] },
                _cachedSource: undefined,
                    _cachedSize: undefined,
                    _cachedMaps: {},
                node: [Function],
                    listMap: [Function]
            },
                'index.html': { source: [Function: source], size: [Function: size] }
            } compilation
            */
           var zip = new JsZip();
           for(let filename in compilation.assets) {
               zip.file(filename, compilation.assets[filename].source());
           }
           //把所有文件压成一个压缩包 将压缩包的二进制内容content
           return zip.generateAsync({type:'nodebuffer'}).then(content => {
               //向Assets属性上新挂载了一个值
               //一种写法
               /**
                *
                * @type {{size(): *, source(): *}}
                * compilation.assets[this.options.name] = {
                   source() {
                       return content;
                   },
                   size() {
                       return content.length;
                   }
               }
                */
               //借助webpack源码
               compilation.assets[this.options.name]=new RawSource(content)
               // cb(null, compilation);
               // return Promise.resolve(compilation);//tappromise没有cb 这个还可以不用
           })

        })
    }
}
module.exports = ZipPlugin;

