
let loaderUtils = require('loader-utils');
function loader(source) {
    console.log('file-loader');
    // 获取options，就是 webpack 中对 file-loader 的配置，比如这里我们配置的是 `name=[name]_[hash].[ext]`
  // 获取到的就是这样一个k-v 对象 { name: "[name]_[hash].[ext]" }
  const options = loaderUtils.getOptions(this) || {};

    //file-loader需要返回路径
    let filename = loaderUtils.interpolateName(this, options.name, {
        content: source
    });
    this.emitFile(filename, source);//发射文件
    //这里要用到一个变量，就是 __webpack_public_path__ ，这是一个由webpack提供的全局变量，是public的根路径
  // 参见：https://webpack.js.org/guides/public-path/#on-the-fly
  // 这里要注意一点：这个返回的字符串是一段JS，显然，他是在浏览器中运行的
  // 举个栗子：
  // css源码这样写： background-image: url('a.png')
  // 编译后变成: background-image: require('xxxxxx.png')
  return 'module.exports = __webpack_public_path__ + '+ JSON.stringify(filename)
}
loader.raw = true; //二进制  //bufffer
module.exports = loader;