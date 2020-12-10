// 作用是给每个生成的模板加一个版权声明的注释
let loaderUtils = require('loader-utils');
let {validate} = require('schema-utils');
let fs = require('fs');
const path = require('path')

function loader(source, sourceMap) {
    this.cacheable(); //自动缓存
    let options = loaderUtils.getOptions(this);
    let cb = this.async();
    let schema = {
        type: 'object',
        properties: {
            filename: {type: 'string'},
            text: {type: 'string'}
        }
    }
    //检验传的配置对不对
    validate(schema, options);
    // console.log(validate(schema, options), 'validate(schema, options)');
    let {filename} = options;
    //用到异步
    if (filename) {
        fs.readFile(path.join(__dirname, filename), 'utf-8', (err, data) => {
            cb(null, `/**${data}**/${source}`, sourceMap)
    })
    }else {
        return this.callback(null, `/**${options.text}**/${source}`, sourceMap)
     // return `/**${options.text}**/${source}`
}
}
module.exports = loader;
