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
// 抽象类 无法被实例化
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
//如果不是抽象类 需要是想上面抽象类的所有方法
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.getName = function () {
        return this.name;
    };
    return Cat;
}(Animal));
var cat = new Cat();
cat.name = 'cat';
console.log(cat.getName());
var point = { x: 2, y: 0 };
//类可以实现多个接口 但只能继承一个类
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.getName = function () {
        return this.name;
    };
    Dog.prototype.speak = function () {
    };
    Dog.prototype.eat = function () {
    };
    return Dog;
}(Animal));
var p = new Dog();
//重写 和 重载
//重写是指子类重写继承自父类中的方法 重载是指为同一个函数提供多个类型定义
var b;
(function (b) {
    //重写 子类重新实现并覆盖父类的方法
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.speak = function () {
            console.log('动物叫');
            // throw new Error('此方法不能被调用');
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.speak = function () {
            console.log('我们一起喵喵喵');
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.speak();
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dog.prototype.speak = function () {
            console.log('我们一起汪汪汪');
            _super.prototype.speak.call(this); //可以掉父类的方法
        };
        return Dog;
    }(Animal));
    var dog = new Dog();
    dog.speak();
})(b || (b = {}));
