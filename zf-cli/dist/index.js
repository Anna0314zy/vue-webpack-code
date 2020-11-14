'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _common = require('./utils/common');

// 主流程控制
var apply = function apply(action) {
  var _console;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  (_console = console).log.apply(_console, [action].concat(args));
  // 读取的都是dist 目录下的文件

  (0, _common.betterRequire)((0, _path.resolve)(__dirname, './' + action)).apply(undefined, args);
  console.log((0, _common.betterRequire)((0, _path.resolve)(__dirname, './' + action)));
};

exports.default = apply;