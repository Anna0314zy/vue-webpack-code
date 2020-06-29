// nodejs原生模块
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口
    output: {
        path: path.resolve(process.cwd(),'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve:{ //更改解析模块的查找方式
        modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')]

    },
    // node: {
    //     fs: 'empty'
    //   },
    plugins: [
        new HtmlWebpackPlugin({
        //   title: 'hello world',	
        //   filename: 'custom.html',
          template: 'public/index.html'	// 指定模板文件		
        })       
    ]
}