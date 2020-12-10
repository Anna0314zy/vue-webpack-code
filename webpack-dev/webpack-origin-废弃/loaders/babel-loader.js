
let babel = require('@babel/core');

let loaderUtils = require('loader-utils');
function loader(source) {   
    // console.log(Object.keys(this))
      //拿到{ presets: [ '@babel/preset-env' ] }
    let options = loaderUtils.getOptions(this); 
    console.log(this.resourcePath) // 绝对路径 E:\zouyu\study\webpack-dev\webpack-origin\src\index.js

    let cb = this.async();
    // 通过babel.transform将代码直接转化为函数字符串放到html模版中
    babel.transform(source, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop()//文件名 处理文件的绝对路径
    }, function (err, result) {  
        cb(err, result.code, result.map); //异步
    })
  }

  module.exports = loader;
  
