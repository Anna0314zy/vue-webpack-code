
let loaderUtils = require('loader-utils');
//require  返回的就是Css-loader处理好的结果
// !!css-loader!less-loader!index.less

function loader(source) {
    //style-loader导出一个脚本
    let style = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
    `
    return style;
}
//在style-loader less-loader css-loader
//./loaders/css-loader.js!./loaders/less-loader.js!./src/index.less
loader.pitch = function (remainingRequest) { //剩余的请求
    console.log(remainingRequest, 'remainingRequest');
    let str = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, 
        '!!' + remainingRequest)})
    document.head.appendChild(style);
    `
    return str;
    //让 style-laoder去处理 less-loader!css-loader!./index.less
  }
// JSON.stringify(source) 转换成一行  会把换行符转换成\r\n
module.exports = loader;