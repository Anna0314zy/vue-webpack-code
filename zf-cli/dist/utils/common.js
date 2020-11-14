"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var betterRequire = exports.betterRequire = function betterRequire(absPath) {
    // console.log(absPath, 'absPath');
    var modules = require(absPath);
    // console.log(modules, 'modules');
    if (modules.default) {
        // console.log(modules.default, 'modules.default');
        return modules.default;
    }

    return modules;
};