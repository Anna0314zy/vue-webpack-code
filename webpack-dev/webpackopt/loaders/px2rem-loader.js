/**
 * 找到需要生成雪碧图的图片
 *
 */
const postcss = require('postcss');
const path = require('path');
const loaderUtils = require('loader-utils');
const spritesmith = require('spritesmith');
const Tokenizer = require("css-selector-tokenizer")

function loader(source) {
    let callback = this.async();
    let {remUnit = 75,remPrecision=8} = loaderUtils.getOptions(this);
    let that = this; //this.context代表加载资源的上下文目录
    function createPlugin(postcssOptions) {

        return function (css) { //代表css文件本身
            css.walkDecls(function (decl) {
                // console.log(decl);
                let values = Tokenizer.parseValues(decl.value);
                // console.log(JSON.stringify(values.nodes));
                values.nodes.forEach(value => {
                    // console.log(JSON.stringify(value.nodes));
                    value.nodes.forEach(item => {
                        console.log(item);
                        if (item.name && item.name.endsWith('px')) {
                            let px = parseInt(item.name);
                            let rem = (px / remUnit).toFixed(remPrecision);
                            item.name = rem+'rem';
                        }
                    })

                })
                decl.value = Tokenizer.stringifyValues(values);
            })
        }
    }
    const postcssOptions = {};
    let pipeline = postcss([createPlugin(postcssOptions)]);
    pipeline.process(source, {from: undefined}).then(cssresult => {
        let cssStr = cssresult.css;
        callback(null, `module.exports = ${JSON.stringify(cssStr)}`);

    })
    //JSON.stringify 可以处理某些换行符  直接用双引号会出现断行

}
module.exports = loader;
