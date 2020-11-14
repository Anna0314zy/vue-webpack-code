"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a;
(function (a) {
    var Animal = /** @class */ (function () {
        function Animal() {
            this.name = 'zhufeng';
        }
        Animal.prototype.getName = function () {
            console.log('父亲');
        };
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super.call(this) || this;
        }
        Dog.prototype.getName = function () {
            console.log(_super.prototype.getName.call(this) + '儿子');
        };
        return Dog;
    }(Animal));
    var d = new Dog();
    d.getName();
    console.log(d);
})(a || (a = {}));
