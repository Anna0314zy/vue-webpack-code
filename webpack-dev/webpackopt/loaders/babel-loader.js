const babel = require('@babel/core');
const path = require('path')
const loaderUtils = require('loader-utils');
function loader(inputSource) {
    console.log('------------------------------');
    let options = loaderUtils.getOptions(this);
     options = {
        ...options,
        sourceMaps: true, // 生产sourceMaps
        filename: path.basename(this.resourcePath)
    }
    let {code,map,ast} = babel.transform(inputSource, options);
    //可以把sourcemap ast 都传给webpack 这样webapck
    return this.callback(null, code, map,ast)
}
module.exports = loader;
