//基础的webpack配置 我们的服务端打包和客户端打包都要基于
const path = require('path');
const VueLoader = require('vue-loader/lib/plugin')

const resolve = dir => {
    return path.resolve(__dirname, dir)
}
module.exports = {
    // entry: resolve('./src/client-entry.js'),
    output: {
        filename: '[name].bundle.js',
        path: resolve('../dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.css']
        // alias: {
        //     'vue$': 'vue/dist/vue.esm.js',
        //     '@': 'src'
        // }
        // alias: {
        //     vue: 'vue/dist/vue.js',
        //     components: path.resolve(__dirname, '../app/components')
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/

            },
            {
                test: /\.css$/,
                use: ['vue-style-loader','style-loader', 'css-loader']

            },
            {
                test: /\.vue$/,
                loader: ['vue-loader']

            }

        ]
    },
    plugins: [
        new VueLoader()
    ]
}