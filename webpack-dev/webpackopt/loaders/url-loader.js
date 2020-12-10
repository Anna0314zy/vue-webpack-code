/**
 * 当小于limit时，使用base64;
 如果文件小于limit不再拷贝 而是返回base64
 * 当大于limit时，根据file-loader处理
 */
/**
 * 读取源文件内容；重命名；并写入到新的目录下
 */
const { interpolateName, getOptions } = require('loader-utils');
const mime = require('mime');
const fileloader = require('file-loader');
function loader(content) {
    const {filename='[name].[hash].[ext]', limit=1024*64} = getOptions(this) || {};
    if (content.length < limit) {
    const constType = mime.getType(this.resourcePath);//返回此图片的内容类型
    let base64 = `data:${constType};base64,${content.toString('base64')}`;
    return `module.exports=${JSON.stringify(base64)}` //一定要转换成字符串类型
    }
    return fileloader.call(this,content);
}
// 内容二进制形式
loader.raw = true;
module.exports = loader;

