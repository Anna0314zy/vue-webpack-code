'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constant = require('./utils/constant');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// zf-cli config set a 1
// zf-cli install
var actionMap = {
  install: {
    description: 'install template',
    alias: 'i',
    examples: ['zf-cli i', 'zf-cli install']
  },
  config: {
    alias: 'c',
    description: 'config .zfclirc',
    examples: ['zf-cli config set <k> <v>', 'zf-cli config get <k>', 'zf-cli config remove <k>']
  },
  create: {
    alias: 'ct',
    description: 'create project',
    examples: ['zf-cli create your projectName']
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
};
Object.keys(actionMap).forEach(function (action) {
  // console.log(action, 'action');
  _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(function () {
    // 判断一下  当前是什么操作
    if (action === '*') {
      console.log(actionMap[action].description);
    } else if (action === 'config') {
      // 实现更改配置文件  zf-cli config set a 1 拿到命令行参数
      _index2.default.apply(undefined, [action].concat((0, _toConsumableArray3.default)(process.argv.slice(3))));
    } else if (action === 'install') {
      (0, _index2.default)(action);
    } else if (action === 'create') {
      _index2.default.apply(undefined, [action].concat((0, _toConsumableArray3.default)(process.argv.slice(3))));
    }
  });
});
function help() {
  console.log('\r\n    how to use');
  Object.keys(actionMap).forEach(function (action) {
    actionMap[action].examples.forEach(function (examples) {
      console.log('   -' + examples);
    });
  });
}
_commander2.default.on('-h', help);
_commander2.default.on('--help', help);

_commander2.default.version(_constant.VERSION, '-v --version').parse(process.argv);