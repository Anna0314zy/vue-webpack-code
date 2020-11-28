let express = require('express');
let app = express();
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackConfig = require('./webpack.config.js');
let webpack = require('webpack');
let compiler = webpack(webpackConfig);
//中间件到底做了什么?
/**
 * 1.启动编译 compiler.run
 * 2.有一个中间件 用来响应客户端对打包后的文件的请求
 */
app.use(webpackDevMiddleware(compiler, {}));
app.get('/users', function (req, res) {
  res.json([{id:1, name: 'zhufeng'}])
})
app.listen('3000')
