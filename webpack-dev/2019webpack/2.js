let glob = require('glob');
let files = glob.sync('./src/**/*.{js,jpg,png,jpeg}');
//返回文件的匹配路径
console.log(files);
/**
 * [
 './src/2.js',
 './src/common.js',
 './src/hello1.js',
 './src/index.js',
 './src/login.js'
 ]
 */

