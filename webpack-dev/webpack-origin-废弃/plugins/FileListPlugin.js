

class FileListPlugin {
    constructor({filename}) {
        this.filename = filename;
    }
    apply(compiler) {
        //文件已经准备好了 要发射
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            console.log(compilation.assets);
           let assets = compilation.assets;
           let content= `##文件名  资源大小\r\n`;
           //[bundle.js, '24kb']
           Object.entries(assets).forEach(([filename, statObj]) => {
            content += `-${filename}   ${statObj.size()}\r\n`
           })
           assets[this.filename] = {
               source() {
                return content;
               },
               size() {
                return content.length;
               }
           }
        })
    }
}
module.exports = FileListPlugin;