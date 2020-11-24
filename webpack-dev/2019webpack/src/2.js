let glob = require('glob');
let files = glob.sync('./src/**/*.js');
//返回文件的匹配路径
console.log(files);