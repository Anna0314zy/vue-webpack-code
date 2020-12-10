
let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');
function loader(source) {   
  this.cacheable && this.cacheable(); // 参数传false 不要缓存  webpack推荐使用缓存 不写默认true 
  //webpack每次打包的时候没有缓存

    // console.log(Object.keys(this))
      //拿到{ presets: [ '@babel/preset-env' ] }
    let options = loaderUtils.getOptions(this); 
    let cb = this.async();
    let schema = {
      type: 'object',
      properties: {
        text: {
          type: 'string'
        },
        filename: {
          type: 'string'
        }
      }
    }
    //检验传的配置对不对
    validateOptions(schema, options, 'banner-loader');
    if (options.filename) {
      this.addDependency(options.filename); //自动添加文件依赖
      fs.readFile(options.filename, 'utf8', function(err,data){
        cb(err, `/**${data}**/${source}`)
      })
    }else {
      cb(null, `/**${options.text}**/${source}`)
    }
  
  }

  module.exports = loader;