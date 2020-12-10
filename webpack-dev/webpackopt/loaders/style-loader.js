
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
//在style-loader  css-loader less-loader
//style-loader!css-loader!style.css
loader.pitch = function (remainingRequest) { //剩余的请求
    console.log(remainingRequest, 'remainingRequest');
    let style = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this,
        '!!' + remainingRequest)})
    document.head.appendChild(style);
    `
    //如果不加！！会出现死循环
    return style;
}
//pitch 如果有两个最左侧的loader要联合使用
// JSON.stringify(source) 转换成一行  会把换行符转换成\r\n
module.exports = loader;
