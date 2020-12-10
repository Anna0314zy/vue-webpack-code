const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    mode: 'none',
    entry:{
        'zhufengmath': './src/index.js',
        'zhufengmath.min': './src/index.js',
    },
    output:{
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: 'zhufengmath',//导出库的名字
        libraryTarget: "umd", //通用的模式  以何种方式导出支持commonjs esmodule
        libraryExport: 'default'//导出哪个属性
    },
    optimization:{
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min.js$/
            })
        ]
    }
}
