#!/usr/bin/env node
console.log("start");
//需要拿到当前执行名的路径 webpack.config.js
let path = require('path');
// console.log(path.resolve('webpack.config.js'));
let config =  require(path.resolve('webpack.config.js'));
let Compiler = require('../lib/Compiler.js');
let compiler = new Compiler(config);
compiler.hooks.entryOption.call();
//标识运行代码
compiler.run();