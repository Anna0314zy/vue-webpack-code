'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = exports.remove = exports.set = exports.get = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ini = require('ini');

var _util = require('util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// RC是配置文件 DEFAULT是默认配置
var exists = (0, _util.promisify)(_fs2.default.exists);
var readFile = (0, _util.promisify)(_fs2.default.readFile);
var writeFile = (0, _util.promisify)(_fs2.default.writeFile);
var get = exports.get = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(k) {
    var has, opts;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return exists(_constant.RC);

          case 2:
            has = _context.sent;
            opts = void 0;

            if (!has) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return readFile(_constant.RC, 'utf8');

          case 7:
            opts = _context.sent;

            opts = (0, _ini.decode)(opts);
            return _context.abrupt('return', opts[k]);

          case 10:
            return _context.abrupt('return', '');

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();
var set = exports.set = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(k, v) {
    var has, opts;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return exists(_constant.RC);

          case 2:
            has = _context2.sent;

            // console.log(has, 'has---');
            opts = void 0;

            if (!has) {
              _context2.next = 12;
              break;
            }

            _context2.next = 7;
            return readFile(_constant.RC, 'utf8');

          case 7:
            opts = _context2.sent;

            opts = (0, _ini.decode)(opts);
            Object.assign(opts, (0, _defineProperty3.default)({}, k, v));
            _context2.next = 13;
            break;

          case 12:
            opts = Object.assign(_constant.DEFAULTS, (0, _defineProperty3.default)({}, k, v));

          case 13:
            _context2.next = 15;
            return writeFile(_constant.RC, (0, _ini.encode)(opts), 'utf8');

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function set(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var remove = exports.remove = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(k) {
    var has, opts;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return exists(_constant.RC);

          case 2:
            has = _context3.sent;
            // 异步的
            opts = void 0;

            if (!has) {
              _context3.next = 12;
              break;
            }

            _context3.next = 7;
            return readFile(_constant.RC, 'utf8');

          case 7:
            opts = _context3.sent;

            opts = (0, _ini.decode)(opts);
            delete opts[k];
            _context3.next = 12;
            return writeFile(_constant.RC, (0, _ini.encode)(opts), 'utf8');

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function remove(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getAll = exports.getAll = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var has, opts;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return exists(_constant.RC);

          case 2:
            has = _context4.sent;
            opts = void 0;

            if (!has) {
              _context4.next = 10;
              break;
            }

            _context4.next = 7;
            return readFile(_constant.RC, 'utf8');

          case 7:
            opts = _context4.sent;

            opts = (0, _ini.decode)(opts);
            // console.log(opts, 'opts');
            return _context4.abrupt('return', opts);

          case 10:
            return _context4.abrupt('return', {});

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getAll() {
    return _ref4.apply(this, arguments);
  };
}();