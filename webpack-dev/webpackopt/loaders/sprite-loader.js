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
                     if (item.type === 'url' && item.url.endsWith('?sprite')){
                         //找到这个图片的绝对路径
                         let url = path.resolve(that.context, item.url);
                         // url = url.replace(/(\?sprite)/, '');
                         item.url = postcssOptions.spriteFilename;//改变css

                         // console.log(url, item.url, 'url---');
                         //按理说我要在当前规则下面添加一条规则background.position
                         postcssOptions.rules.push({
                             url,//原始图片的绝对路径 未来要用来合并雪碧图
                             rule: decl.parent //当前规则
                         })
                     }
                 })

             })
             decl.value = Tokenizer.stringifyValues(values);
         })
           postcssOptions.rules.map(item => item.rule).forEach((rule, index) => {
               console.log(index, 'index');
               rule.append(postcss.decl({
                   prop:'background-position',
                   value:`_BACKGROUNG_POSITON_${index}_` //弄个占位符 到时候替换一下子
               }))
           })
       }
   }
    const postcssOptions = {spriteFilename:'sprite.jpg',rules:[]}
    let pipeline = postcss([createPlugin(postcssOptions)]);
    pipeline.process(source, {from:undefined}).then(cssresult => {
        // console.log(result);
        let cssStr = cssresult.css;
        console.log('====================================');
        console.log(cssStr);
        console.log('====================================');

        let sprites = postcssOptions.rules.map(item => item.url.slice(0,item.url.lastIndexOf('?')));
        console.log(cssStr,sprites,'sprites')
        spritesmith.run({src:sprites},(err, result) => {
            // console.log(err,result);
            let coordinates = result.coordinates;

            Object.keys(coordinates).forEach((key, index) => {
                console.log(coordinates[key].x, coordinates[key].y)
                cssStr = cssStr.replace(`_BACKGROUNG_POSITON_${index}_`,
                    `-${coordinates[key].x}px -${coordinates[key].y}px`)
            })
            console.log('====================================');
            console.log(cssStr);
            console.log('====================================');
            that.emitFile(postcssOptions.spriteFilename, result.image);
            callback(null, `module.exports = ${JSON.stringify(cssStr)}`);

        })
        //JSON.stringify 可以处理某些换行符  直接用双引号会出现断行
    })

}
loader.raw = true;
module.exports = loader;
