'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downLoadLocal = exports.downLoad = exports.repoList = exports.tagList = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _rc = require('./rc');

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetch = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              var config = {
                url: url,
                method: 'get',
                headers: {
                  'user-agent': 'xxx'
                }
              };
              (0, _request2.default)(config, function (err, response, body) {
                console.log(err, 'err');
                if (err) {
                  reject(err);
                }
                // console.log(response)
                resolve(JSON.parse(body));
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
}();
var tagList = exports.tagList = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(repo) {
    var config, api;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _rc.getAll)();

          case 2:
            config = _context2.sent;
            api = 'https://api.github.com/repos/' + config.registry + '/' + repo + '/tags'; // 查看版本号

            return _context2.abrupt('return', fetch(api));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function tagList(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var repoList = exports.repoList = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var config, api;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _rc.getAll)();

          case 2:
            config = _context3.sent;
            api = 'https://api.github.com/' + config.type + '/' + config.registry + '/repos';
            return _context3.abrupt('return', fetch(api));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function repoList() {
    return _ref3.apply(this, arguments);
  };
}();
var downLoad = exports.downLoad = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(src, dest) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', new Promise(function (resolve, reject) {
              console.log(dest, 'dest');
              // Users/liangyuan/.template/react-template
              (0, _downloadGitRepo2.default)(src, dest, function (err) {
                if (err) reject();
                resolve();
              });
            }));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function downLoad(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();
var downLoadLocal = exports.downLoadLocal = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(project, version) {
    var conf, api;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _rc.getAll)();

          case 2:
            conf = _context5.sent;
            api = conf.registry + '/' + project;

            if (version) {
              api += '#' + version;
            }
            return _context5.abrupt('return', downLoad(api, _constant.DOWNLOAD + '/' + project));

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function downLoadLocal(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
// https://api.github.com/orgs/zhufeng-cli/repos
// https://api.github.com/repos/zhufeng-cli/vue-template/tags` //查看版本号