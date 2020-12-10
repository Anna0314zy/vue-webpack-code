/**
 * 主要实现处理@import 和 url() 语法,基于postcss
 */
    //通过js插件处理样式
const postcss = require('postcss');
const loaderUtils = require('loader-utils');
const path = require('path');
// css选择器的词法分析器,用于解析和序列化css选择器
const Tokenizer = require("css-selector-tokenizer");

function loader(content) {
    console.log('css-loader');
    const callback = this.async();
    const options = {
        importItems: [],
        urlItems: []
    };
    postcss([createPlugin(options)]).process(content).then(result => {
        const {importItems, urlItems} = options;
        let importJs = importItems.map(itemUrl => {
                console.log(loaderUtils.stringifyRequest(this, itemUrl), 'itemurl');
                return "require(" + loaderUtils.stringifyRequest(this, itemUrl) + ")";
            }
        ).join('\n');
        // require(url)返回一个打包后的绝对路径
        let cssstring = JSON.stringify(result.css).replace(/_CSS_URL_(\d+?)/g, function(match, g1) {
            // "background-image: url('" + require('" + url + "')";
            return '"+ require("' + urlItems[+g1] + '").default + "';
        });
        cssstring = cssstring.replace(/@import\s+?.+?;/g, '');
        console.log(`${importJs}`, '${importJs}');
        console.log(cssstring,'cssstring');
        callback(null, `
        ${importJs}
        module.exports=${cssstring};`);
    })
}
// 自定义的js插件
function createPlugin({urlItems, importItems}) {
    return function(css) {
        // 遍历@import规则
        css.walkAtRules(/^import$/, function(rule) {
            let values = Tokenizer.parseValues(rule.params);
              console.log(JSON.stringify(values), 'valeus');
            let url = values.nodes[0].nodes[0];
            importItems.push(url.value);
        })
        console.log(importItems, 'importItems');
        // 遍历每一条样式
        css.walkDecls(function(decl) {
            // 解析样式属性的值
            const values = Tokenizer.parseValues(decl.value);
            values.nodes.forEach(value => {
                value.nodes.forEach(item => {
                    if(item.type === 'url') {
                        let url = item.url;
                        item.url = "_CSS_URL_" + urlItems.length;
                        urlItems.push(url);
                    }
                })
            })
            // 将解析后值返回序列化
            decl.value = Tokenizer.stringifyValues(values);
            console.log(decl.value,'decl.value');
        })
    }
}
module.exports = loader;
