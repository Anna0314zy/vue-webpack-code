let path = require('path');
let DonePlugin = require('./plugins/DonePlugin')
let AsyncPlugin = require('./plugins/AsyncPlugin.js')
let HtmlWebpackPlugin = require('html-webpack-plugin');
// let FileListPlugin = require('./plugins/FileListPlugin');
let MinicssExtractPlugin = require('mini-css-extract-plugin');
// let InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
// let UploadPlugin = require('./plugins/UploadPlugin');
const OptimizePlugin = require('./plugins/OptimizePlugin');
const ZipPlugin = require('./plugins/ZipPlugin');
const PrefetchPlugin = require('./plugins/PrefetchPlugin');
class P {
    apply(compiler) {
        compiler.hooks.emit.tap('emit', function () {
            console.log('emit')
        })
    }
}

class P1 {
    apply(compiler) {
        //可以定义监听不同事件
        compiler.hooks.afterPlugins.tap('emit', function () {
            console.log('afterPlugins-p1')
        })
    }
}

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        //别名
        modules: ['node_modules',path.resolve(__dirname, 'loaders')],
        // modules:['node_modules']
        // alias: {
        //     loader1: path.resolve(__dirname, 'loader', 'loader1')
        // }
    },
    devtool: 'none',
    // watch: true,
    module: {
        //顺序  pre + normal + inline + post
        //loader分类  pre   前面的laoder post 后面的  normal 正常的
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [MinicssExtractPlugin.loader, 'css-loader']
            // },
            // {
            //   test:'/\.css$/',
            //     use:['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                //目的就是很久图片生成一个mds 发射到dist目录下，file-loader会返回当前图片路径
                //url-loader file-loader会处理路径
                use: [{
                    loader: 'style-loader'
                },

                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    },
                ]
            },
            {
                test: /\.(jpg|jepg|png)$/,
                //目的就是很久图片生成一个mds 发射到dist目录下，file-loader会返回当前图片路径
               //url-loader file-loader会处理路径
                use:{
                    loader: 'url-loader',
                    options: {
                        filename:'[name].[hash].[ext]',
                        limit: 200*1024 //Base64
                    }
                }
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'banner-loader',
            //         options: {
            //            text: 'zhufeng',
            //            filename: path.resolve(__dirname, 'banner.js')
            //         }

            //     }
            // },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: path.resolve('node_modules', 'babel-loader'),
            //         options: {
            //             presets: [
            //                 '@babel/preset-env'
            //             ]
            //         }
            //     }
            // },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'loader1'
            //     },
            //     enforce: 'pre'
            // },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'loader2'
            //     }
            // },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'loader3'
            //     },
            //     enforce: 'post'
            // },
            // {
            //     test:/\.js$/,
            //     use: ['loader1', 'loader2', 'loader3']
            //     // use: 'loader1'
            // },
            // {
            //     test: /\.less$/,
            //     use: [
            //         path.resolve(__dirname, 'loader', 'style-loader'),
            //         path.resolve(__dirname, 'loader', 'less-loader')
            //     ]
            // }
        ]
    },
    plugins: [
        // new MinicssExtractPlugin({
        //     filename: 'main.css'
        // }),
        // new P(),
        // new P1(),

        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new PrefetchPlugin(),
        //上传到青牛
        // new UploadPlugin({
        //     bucket: '', //对象存储
        //     domain:"", //域名
        //      accesskey: '',
        //      secretKey:""
        // })
        // new InlineSourcePlugin({
        //     match: /\.(js|css)/
        // })
        // new FileListPlugin({
        //     filename: 'list.md'
        // }),
        // new DonePlugin({
        //     message: '编译完成---'
        // }),
        // new OptimizePlugin(),
        // new AsyncPlugin(),
        // new ZipPlugin({
        //     name:'asset.zip'
        // })
    ]

}
