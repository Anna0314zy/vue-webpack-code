const path = require('path');
const webpack = require('webpack');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const htmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const glob = require('glob');
const PurgecssWebpackPlugin=require('purgecss-webpack-plugin');
const PATHS = {
  src: path.join(__dirname, 'src')
}
console.log(PATHS, 'PATHS');
const entryFiles = glob.sync('./src/entries/*.js');
const speedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const snw = new speedMeasureWebpackPlugin();
// [
//   './src/entries/index.js',
//   './src/entries/index1.js',
//   './src/entries/index2.js'
// ]
  let entry = {};
let htmlWebpackPlugins = [];
entryFiles.forEach(entryFile => {
  // console.log(path.sep, '/');
  let entryName = path.basename(entryFile.split(path.sep).pop(), '.js');
  // console.log(path.basename(entryFile.split(path.sep).pop(), '.js'), 'pathname')
  entry[entryName] = entryFile;
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    template: `./src/pages/${entryName}.html`,
    filename: `${entryName}.html`,
    // minify: false,
    // hash: true, // 为了避免缓存，可以在产出的文件后面加hash值
    chunks: [entryName], //指定引入的代码块  用的不多 感觉不好使
    // chunksSortMode: "manual" //对引入的代码块进行排序的模式
  }))
  //path.extname 扩展名
})
module.exports = snw.wrap({
  mode: 'development',
  // mode: 'production',//只有在生产环境才会启用压缩 自带压缩
  optimization: { // 这里放优化的内容
    minimizer: [
      // 支持es6
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'],
          },
        },
        cache: true,
      }),
      // new UglifyjsWebpackPlugin({
      //
      // }),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        // post-css 的优化分离插件
        cssProcessor: require('cssnano'),
      }),
    ],
  },
  devtool: 'eval',
  //定制一些查找文件的规则
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.scss', '.less', '.css'],
    alias: {
      //引入的时候 直接找你指定的路径 就不从按照node_modules规则找了
      'bootstrap': path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
    },
     //可以减少查找的路径 加快查找速度 可以自己添加查找路径
    modules: ['node_modules', 'zfmodules'],// 先从node_modules里面找 找不到 再找zfmath
    mainFields: ['style', 'browser', 'module', 'main'],
    mainFiles: ['base.js', 'index.js']
  },
  //这个选项是用来指定查找loader
  resolveLoader: {
    extensions: ['.js', '.jsx', '.vue', '.scss', '.less', '.css'],
    alias: {
      //引入的时候 直接找你指定的路径 就不从按照node_modules规则找了
      'bootstrap': path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
    },
    //可以减少查找的路径 加快查找速度 可以自己添加查找路径
    modules: ['node_modules', 'loaders'],// 先从node_modules里面找 找不到 再找loaders
    mainFields: ['style', 'browser', 'module', 'main'],
    mainFiles: ['base.js', 'index.js']
  },
  // entry: path.resolve(__dirname, 'src/index.js'),
  // 多入口
  entry: entry,
  // entry: {
  //   // vendor: ['react', 'react-dom'],
  //   // vendor: glob.sync('./node_modules/**/*.js'),
  //   index: './src/index.js',
  //
  //   login: './src/login.js'
  // },
  // Multiple chunks emit assets to the same filename bundle.js (chunks index and login)
  // 如果是单入口 chunk的名字就叫main 如果是多入口 就是entry的key
  // 一般 每个chunk都会生成一个文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    // chunkhash 依赖的代码块变了才会变 contenthash内容变了就变了
    // filename: '[name].[hash: 8].js', //name -- entry里面的key
    // hash 有32 位 hash: 8 取前8位  文件不改hash不变 防止缓存
    publicPath: '/', // 根路径 图片路径前缀
  },
  // 告诉webpack不用打包了
  // externals: {
  //    'jquery': 'jQuery' //key是包的名字，值是jQuery 全局上的jQuery给了jquery
  // },
  // hash 有3种
  // 默认会把当前文件夹作为静态目录
  // 如果你使用Devserver 所有产出的文件都会写到内存里，而不会写到硬盘上
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 产出文件的根目录
    port: 8080,
    host: 'localhost',
    compress: true, //会启用gizp压缩
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  module: {
    noParse: /jquery|lodash/,//不去解析jquery中的依赖库
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre', // 强制提前执行 pre normal post
      //   include: path.join(__dirname, 'src'), // 只检验自己写的代码
      //   exclude: /node_modules/,
      //   options: { fix: true }, // 这里的配置项参数将会传递给eslint cliEngine
      //
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options:{
          //     presets:[
          //         "@babel/preset-env", //转译es6 es7
          //         "@babel/preset-react"//转译jsx
          //     ],
          //     plugins:[
          //         ["@babel/plugin-proposal-decorators", { legacy: true }], //装饰器
          //        [ "@babel/plugin-proposal-class-properties",{loose: true}],//类的属性
          //     ]
          // }
        },
      },
      {
        test: /\.(css)$/,
        // use: 'css-loader', //单个
        // 不用style-loader
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../' //回到上一级目录r
            }

          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              // 0 no loader
              // 1 postcss-loader
              // 2 postcss-loader sass-loader
            },
          },
          {
            loader: "px2rem-loader",
            options: {
                remUnit: 75, //1rem = 75px
                remPrecision: 8 //除不尽 保留8位小数
            }
        },
          'postcss-loader',
          'sass-loader',
        ], // 从右向左
        // use: [MiniCssExtractPlugin.loader, 'css-loader', {
        //     loader: 'postcss-loader',options...
        // }]
      },
      {
        test: /\.less$/,
        // use: 'css-loader', //单个
        // 不用style-loader
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'], // 从右向左
      },
      {
        test: /\.scss$/,
        // use: 'css-loader', //单个
        // 不用style-loader
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // 从右向左
      },
      // 处理html中的图片
      {
        test: /\.(html|htm)$/,
        use: {
          loader: 'html-withimg-loader',
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 10 * 1024, // 如果图片小于10k就转成base64
              outputPath: 'images',
              publicPath: '/images',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {//jpeg压缩
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {//png压缩
                enabled: false,
              },
              pngquant: {//png压缩
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {//gif压缩
                interlaced: false,
              }
              // the webp option will enable WEBP
              //webp: {
              // quality: 75
              //}
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|otf)$/, // 二进制文件
        use: 'url-loader',
      },
      // {
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // }
    ],
  },
  // stats: 'minimal',
  plugins: [
    // 此插件会自动向所有的模块注入一个_变量
    // 每个模块注入的是一个局部变量
    new htmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'jquery',
          entry: 'https://unpkg.com/jquery@3.2.1/dist/jquery.min.js',
          global: 'jQuery',
        },
      ],
    }),
    new webpack.ProvidePlugin({
      // $: 'jquery',
      // jQuery: 'jquery',
      $_: 'lodash',
    }),
    ...htmlWebpackPlugins,
    // 产出html文件
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'index.html',
    //   minify: false,
    //   // hash: true, // 为了避免缓存，可以在产出的文件后面加hash值
    //   chunks: ['index'], //指定引入的代码块  用的不多 感觉不好使
    //   // chunksSortMode: "manual" //对引入的代码块进行排序的模式
    // }),
    new CleanWebpackPlugin(), // 清除打包目录
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true //是否生产stats文件
    }),
    //清除没有用到的类名
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash].css' // name 代码块chunk的名字
      // chunkhash 只要打包后的模块有一个发生了变化 都会改变
      // chunkFilename: '[id].css' //代码块的名字 在异步加载的时候用的 分割代码块然后异步加载
    }), // 分离css
  ],
})
