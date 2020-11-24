const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    mode: 'development',
    // mode: 'production',//只有在生产环境才会启用压缩
    optimization: { //这里放优化的内容
        minimizer: [
            //支持es6
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: {
                        pure_funcs: ["console.log"]
                    }
                },
                cache: true
            }),
            // new UglifyjsWebpackPlugin({
            //
            // }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    // entry: path.resolve(__dirname, 'src/index.js'),
    //多入口

    entry: {
        vendor: ['react', 'react-dom'],
        index: './src/index.js',

        // login: './src/login.js'
    },
    // Multiple chunks emit assets to the same filename bundle.js (chunks index and login)
    //如果是单入口 chunk的名字就叫main 如果是多入口 就是entry的key
    //一般 每个chunk都会生成一个文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash].js',
        //chunkhash 依赖的代码块变了才会变
        // Cannot use [chunkhash] or [contenthash] for chunk in '[name][hash][chunkhash].js'
        // filename: '[name].[hash: 8].js', //name -- entry里面的key
        //hash 有32 位 hash: 8 取前8位  文件不改hash不变 防止缓存
        publicPath: "/" //根路径 图片路径前缀
    },
    //hash 有3种
    //默认会把当前文件夹作为静态目录
    //如果你使用Devserver 所有产出的文件都会写到内存里，而不会写到硬盘上
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), //产出文件的根目录
        port: 8080,
        host: 'localhost',
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: 'css-loader', //单个
                // 不用style-loader
                use: [MiniCssExtractPlugin.loader, 'css-loader'] //从右向左
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10*1024, //如果图片小于10k就转成base64
                        outputPath: 'images',
                        publicPath: '/images'

                    }
                }
            }
        ]
    },
    plugins: [
        //产出html文件
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: 'index.html',
            hash: true, //为了避免缓存，可以在产出的文件后面加hash值
            //chunks: ['common', 'index'], //指定引入的代码块  用的不多 感觉不好使
            //chunksSortMode: "manual" //对引入的代码块进行排序的模式
        }),
        new CleanWebpackPlugin(), //清除打包目录
        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash].css', //name 代码块chunk的名字
            //chunkhash 只要打包后的模块有一个发生了变化 都会改变
            // chunkFilename: '[id].css' //代码块的名字 在异步加载的时候用的 分割代码块然后异步加载
        }) //分离css
    ]
}