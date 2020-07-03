const HtmlWebpackPlugin = require('html-webpack-plugin');
//把外链的标签变成内链的
class InlineSourcePlugin {
  constructor({match}) {
     this.reg = match;
  }
 //处理某一个标签
  processTag(tag, compilation) {
    console.log(tag, 'tag----', compilation.assets);
    let newTag, url;
    // attributes: { href: 'main.css', rel: 'stylesheet' }
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: {type: 'text/css'}
      }
      url = tag.attributes.href; //main.css
    }
    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: {type: 'application/javascript'}
      }
      url = tag.attributes.src; // bundele.js
    }
    if (url) {
    
      newTag.innerHTML = compilation.assets[url].source();//文件的内容放到 innerHTML属性上
      delete compilation.assets[url];
      return newTag;
    }
    return tag;
  }
  processTags(data, compilation) { //处理引入标签的数据
    //data
  // headTags: [ { tagName: 'link', voidTag: true, attributes: [Object] } ],
  // bodyTags: [ { tagName: 'script', voidTag: false, attributes: [Object] } ],
  let headTags = [];
  let bodyTags = [];
  data.headTags.forEach(headTag => {
    headTags.push(this.processTag(headTag, compilation))
  })
  data.bodyTags.forEach(bodyTag => {
    bodyTags.push(this.processTag(bodyTag, compilation))
  })
 //返回一个新的tag
  return {...data, headTags,bodyTags }
  }
  apply(compiler) {
      //要通过webpackplugin来实现这个功能 html-webpack-plugin@next、、
      //参考官网 html-webpack-plugin 的用法
      compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
        console.log('The compiler is starting a new compilation...')
  
        // Static Plugin interface |compilation |HOOK NAME | register listener 
        //修改资源组后
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'alterPlugin', // <-- Set a meaningful name here for stacktraces
          (data, cb) => {
            // Manipulate the content
            // console.log(data, 'data');
            data = this.processTags(data, compilation);
            cb(null, data);
          }
        )
      })

      
  }
}
module.exports = InlineSourcePlugin;