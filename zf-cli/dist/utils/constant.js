'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOWNLOAD = exports.DEFAULTS = exports.RC = exports.VERSION = undefined;

var _packageLock = require('../../package-lock.json');

var VERSION = exports.VERSION = _packageLock.version;

// 找到用户的根目录
//
var HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
var RC = exports.RC = HOME + '/.zfclirc';
// console.log(RC);
// RC配置模板的地方 参数给github用的
var DEFAULTS = exports.DEFAULTS = {
  registry: 'zhufeng-cli',
  type: 'orgs' // 组织和用户
};
// 下载目录 当前根路径下
var DOWNLOAD = exports.DOWNLOAD = HOME + '/.template';
// 把公司的代码都先下载到本地 如果用到的时候 再直接考到文件夹里就行了 免得每次都还要下载 网速太慢