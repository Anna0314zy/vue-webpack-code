/**
 * 读取源文件内容；重命名；并写入到新的目录下
 */
const { interpolateName, getOptions } = require('loader-utils');

function loader(content) {
    const {filename='[name].[hash].[ext]'}= getOptions(this) || {};
    const outFilename = interpolateName(this, filename, {content});
    this.emitFile(outFilename, content); //往输出目录下写文件
    return `module.exports=${JSON.stringify(outFilename)}`
}
// 内容二进制形式
loader.raw = true;
module.exports = loader;
