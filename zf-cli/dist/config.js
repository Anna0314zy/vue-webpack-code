'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _rc = require('./utils/rc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, k, v) {
    var key, obj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = action;
            _context.next = _context.t0 === 'get' ? 3 : _context.t0 === 'set' ? 15 : _context.t0 === 'remove' ? 17 : 19;
            break;

          case 3:
            if (!k) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return (0, _rc.get)(k);

          case 6:
            key = _context.sent;

            console.log(key);
            _context.next = 14;
            break;

          case 10:
            _context.next = 12;
            return (0, _rc.getAll)();

          case 12:
            obj = _context.sent;


            Object.keys(obj).forEach(function (key) {
              console.log(key + '----' + obj[key]);
            });

          case 14:
            return _context.abrupt('break', 19);

          case 15:
            (0, _rc.set)(k, v);
            return _context.abrupt('break', 19);

          case 17:
            (0, _rc.remove)(k);
            return _context.abrupt('break', 19);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function config(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // 专门管理 .zfclirc 文件的（当前用户目录下）
// zf-cli config set key value
exports.default = config;