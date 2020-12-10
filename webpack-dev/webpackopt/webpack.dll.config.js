
const path = require('path');
// const DllPlugin = require('webpack/lib/DllPlugin');
const webpack = require('webpack');
module.exports = {
    mode:'development',
    entry: {
        react: ['react', 'react-dom']
    },//希望把这些第三方库文件进行单独打包提高主文件的打包速度
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].dll.js',//会打包出来 react.dll.js
        library: '_dll_[name]',//指定导出的名字 _dll_react
        // libraryTarget: "umd"
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]', //跟上面libary一样
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}
