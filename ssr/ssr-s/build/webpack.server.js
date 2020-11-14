const { merge } = require('webpack-merge');
const base = require('./webpack.base')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServerRenderPlugin = require('vue-server-renderer/server-plugin')
const resolve = dir => {
    return path.resolve(__dirname, dir)
}
module.exports = merge(base, {
    entry: {
        server: resolve('../src/server-entry.js')
    },
    target: 'node', //要给node 使用 let fs = 
    output: {
        libraryTarget: 'commonjs2' //最终把这个文件的导出结果 放到module.exports上 node规范
    },
    // output.libraryTarget` should be "commonjs2".
    plugins: [
        new ServerRenderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.ssr.html',
            template: resolve('../public/index.ssr.html'),
            minify:{
                //删除注释
                removeComments:false,
            },
            excludeChunks:['server'] //排除某个模块 不用挂载 这个入口打包出来的文件
        })
    ]

})


