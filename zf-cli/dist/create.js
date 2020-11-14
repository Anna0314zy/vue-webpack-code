'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _util = require('util');

var _rc = require('./utils/rc');

var _constant = require('./utils/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 拉取你所有的项目 安装哪个项目
// 选择完  显示版本号1.0
var fs = require('fs');

var MetalSmith = require('metalsmith'); // 异步的api 链式调用
// 遍历文件夹 看需不需要渲染
// console.log(MetalSmith, 'MetalSmith');
// const { render } = require('consolidate').handlebars; //这个也行
// consolidate 统一了 所有的模板引擎

var render = require('consolidate').ejs.render;

// console.log(render, 'render');


render = (0, _util.promisify)(render);
var path = require('path');
var axios = require('axios');
var ncp = require('ncp');

ncp = (0, _util.promisify)(ncp);
// 封装loading
var waitFnloading = function waitFnloading(fn, msg) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var spinner,
          res,
          _args = arguments;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              spinner = (0, _ora2.default)(msg);

              spinner.start();
              _context.next = 4;
              return fn.apply(undefined, _args);

            case 4:
              res = _context.sent;

              spinner.succeed();
              return _context.abrupt('return', res);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function () {
      return _ref.apply(this, arguments);
    };
  }();
};
// 1 获取项目列表
var ftechRepolist = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var conf, _ref3, data;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _rc.getAll)();

          case 2:
            conf = _context2.sent;
            _context2.next = 5;
            return axios.get('https://api.github.com/orgs/' + conf.registry + '/repos');

          case 5:
            _ref3 = _context2.sent;
            data = _ref3.data;
            return _context2.abrupt('return', data);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function ftechRepolist() {
    return _ref2.apply(this, arguments);
  };
}();
var fetchTagList = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(repo) {
    var conf, _ref5, data;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _rc.getAll)();

          case 2:
            conf = _context3.sent;
            _context3.next = 5;
            return axios.get('https://api.github.com/repos/' + conf.registry + '/' + repo + '/tags');

          case 5:
            _ref5 = _context3.sent;
            data = _ref5.data;
            return _context3.abrupt('return', data);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function fetchTagList(_x) {
    return _ref4.apply(this, arguments);
  };
}();
var download = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(repo, tag) {
    var conf, api, dest;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _rc.getAll)();

          case 2:
            conf = _context4.sent;
            api = conf.registry + '/' + repo;

            if (tag) {
              api += '#' + tag;
            }
            // user/xxx/.template/repo
            dest = _constant.DOWNLOAD + '/' + repo;
            _context4.next = 8;
            return new Promise(function (resolve, reject) {
              (0, _downloadGitRepo2.default)(api, dest, function (err) {
                if (err) reject();
                resolve();
              });
            });

          case 8:
            return _context4.abrupt('return', dest);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function download(_x2, _x3) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(projectName) {
    var repos, _ref9, repo, tags, _ref11, tag, result;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return waitFnloading(ftechRepolist, 'fetching template')();

          case 2:
            repos = _context7.sent;

            repos = repos.map(function (_ref8) {
              var name = _ref8.name;
              return name;
            });
            // 选择模板
            _context7.next = 6;
            return _inquirer2.default.prompt([{
              type: 'list', // 列表
              name: 'repo',
              choices: repos,
              message: 'please choose a template to create project'
            }]);

          case 6:
            _ref9 = _context7.sent;
            repo = _ref9.repo;

            console.log(repo);
            // 获取对应的版本号
            _context7.next = 11;
            return waitFnloading(fetchTagList, 'fetching template')(repo);

          case 11:
            tags = _context7.sent;

            tags = tags.map(function (_ref10) {
              var name = _ref10.name;
              return name;
            });
            _context7.next = 15;
            return _inquirer2.default.prompt([{
              type: 'list', // 列表
              name: 'tag',
              choices: tags,
              message: 'please choose tag to create project'
            }]);

          case 15:
            _ref11 = _context7.sent;
            tag = _ref11.tag;

            console.log(tag);
            // 下载模板后 放到一个临时目录里 以备后期使用
            // 获取项目所有的模板
            // 通过选择的项目 拉取对应的版本
            _context7.next = 20;
            return waitFnloading(download, 'download template')(repo, tag);

          case 20:
            result = _context7.sent;

            /// result  Users/liangyuan/.template/vue-template

            console.log(result, '下载到本地的地址');
            // 拿到了下载的目录 直接拷贝到执行的目录下即可 ncp

            // 复杂的需要模板渲染 渲染后在拷贝
            // 把template 下的文件 拷贝到执行命令的目录下 这是简单的
            // 这个目录 项目名字是否已经存在  如果存在提示已经存在
            // 如果有ask.js文件夹
            console.log(!fs.existsSync(path.join(result, 'ask.json')), 'ask.json');

            if (fs.existsSync(path.join(result, 'ask.json'))) {
              _context7.next = 29;
              break;
            }

            // /my-job 路径
            console.log('简单模板');
            _context7.next = 27;
            return ncp(result, path.resolve(projectName)).catch(function (e) {
              console.log('e-ncp', e);
            });

          case 27:
            _context7.next = 32;
            break;

          case 29:
            // 复杂的模板
            // 把git上面的项目下载下来 如果有ask 文件就是一个复杂的模板 我们需要用户选择 选择后编译模板
            // metalsmith 只要是模板编译 都需要这个模块

            // MetalSmith
            console.log('复杂的模板');
            // 1.用户填信息 2.渲染模板
            // use 中间不会立马执行 还需要调用 build
            _context7.next = 32;
            return new Promise(function (resolve, reject) {
              MetalSmith(__dirname) // 如果传入路径 会默认遍历当前目录下的src
              .source(result) // 遍历的文件
              .destination(path.resolve(projectName)).use(function () {
                var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(files, metal, done) {
                  var args, obj, meta;
                  return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          // console.log(files); // 遍历文件夹
                          args = require(path.join(result, 'ask.json'));
                          _context5.next = 3;
                          return _inquirer2.default.prompt(args);

                        case 3:
                          obj = _context5.sent;

                          console.log(obj, 'OBJ');
                          meta = metal.metadata(); // 下一个metal 就能拿到

                          Object.assign(meta, obj);
                          delete files['ask.json'];
                          done();

                        case 9:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, undefined);
                }));

                return function (_x5, _x6, _x7) {
                  return _ref12.apply(this, arguments);
                };
              }()).use(function (files, metal, done) {
                // 根据用户的输入 下载模板
                var obj = metal.metadata();
                console.log(obj, 'OBJ-METAL');
                // 遍历对象的所有属性
                Reflect.ownKeys(files).forEach(function () {
                  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(file) {
                    var content;
                    return _regenerator2.default.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            if (!(file.includes('js') || file.includes('json'))) {
                              _context6.next = 7;
                              break;
                            }

                            content = files[file].contents.toString(); // 文件的内容

                            if (!content.includes('<%')) {
                              _context6.next = 7;
                              break;
                            }

                            _context6.next = 5;
                            return render(content, obj);

                          case 5:
                            content = _context6.sent;

                            files[file].contents = Buffer.from(content);

                          case 7:
                          case 'end':
                            return _context6.stop();
                        }
                      }
                    }, _callee6, undefined);
                  }));

                  return function (_x8) {
                    return _ref13.apply(this, arguments);
                  };
                }());
                console.log(metal.metadata(), 'metal');
                console.log(files);
                done();
              }).build(function (err) {
                if (err) {
                  reject();
                } else {
                  resolve();
                }
              });
            });

          case 32:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x4) {
    return _ref7.apply(this, arguments);
  };
}();
// config install