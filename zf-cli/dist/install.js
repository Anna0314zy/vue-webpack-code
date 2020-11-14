'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _git = require('./utils/git');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var loading, list, answer, _answer, project, _answer2, tag;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 下载模板 选择模板使用
            // 通过配置模板文件 获取模板信息（哪些模板）
            loading = (0, _ora2.default)('fetching template');

            loading.start();
            _context.next = 4;
            return (0, _git.repoList)();

          case 4:
            list = _context.sent;

            loading.succeed();
            list = list.map(function (_ref2) {
              var name = _ref2.name;
              return name;
            });
            console.log(list, 'list');
            _context.next = 10;
            return _inquirer2.default.prompt([{
              type: 'list',
              name: 'project',
              choices: list,
              message: 'please choose template'
            }]);

          case 10:
            answer = _context.sent;

            // 拿到项目名字
            // console.log(answer.project, 'project');
            _answer = answer, project = _answer.project;
            // 获取当前项目的 版本号

            loading = (0, _ora2.default)('fetching tag.....');
            loading.start();
            console.log(project, 'project');
            _context.next = 17;
            return (0, _git.tagList)(project);

          case 17:
            list = _context.sent;

            loading.succeed();
            list = list.map(function (_ref3) {
              var name = _ref3.name;
              return name;
            });
            _context.next = 22;
            return _inquirer2.default.prompt([{
              type: 'list',
              name: 'tag',
              choices: list,
              message: 'please choose tag'
            }]);

          case 22:
            answer = _context.sent;
            _answer2 = answer, tag = _answer2.tag;
            // 下载文件 （先下载到缓存文件中）
            // zf-cli init
            // 下载 git版本
            // 下载

            loading = (0, _ora2.default)('downloading project.....');
            loading.start();
            _context.next = 28;
            return (0, _git.downLoadLocal)(project, tag);

          case 28:
            loading.succeed();

          case 29:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function install() {
    return _ref.apply(this, arguments);
  };
}();
// vue 会使用模板引擎
// vue init 当前下载好的模板 生成到项目目录中
// vue uninstall
// 选择技术
// https://api.github.com/orgs/zhufeng-cli/repos 看模板目录的
exports.default = install;