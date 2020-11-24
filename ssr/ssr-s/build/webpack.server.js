const { merge } = require('webpack-merge');

const nodeExternals = require('webpack-node-externals')

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
    // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',

    output: {
        // 此处告知 server bundle 使用 Node 风格导出模块(Node-style export
        libraryTarget: 'commonjs2' //最终把这个文件的导出结果 放到module.exports上 node规范
    },
    // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals: [nodeExternals()],
//   externals: nodeExternals({
//     // 不要外置化 webpack 需要处理的依赖模块。
//     // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
//     // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
//     whitelist: /\.css$/
//   }),

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


