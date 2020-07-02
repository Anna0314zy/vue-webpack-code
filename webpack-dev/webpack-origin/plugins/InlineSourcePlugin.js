const HtmlWebpackPlugin = require('html-webpack-plugin');
//把外链的标签变成内链的
class InlineSourcePlugin {
  constructor({match}) {
     this,match = match;
  }
  apply(compiler) {
      //要通过webpackplugin来实现这个功能 html-webpack-plugin@next


      
  }
}
module.exports = InlineSourcePlugin;