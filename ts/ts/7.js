"use strict";
//任意属性
var a;
(function (a) {
    var obj = {
        x: 1,
        y: 2
    };
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.speak = function () { };
        ;
        Person.prototype.speakChinese = function () { };
        ; //此处要实现上面的两个方法
        return Person;
    }());
    var circle = {
        PI: 3.14,
        radius: 10
    };
    var cost = function (price) {
        return price * 0.8;
    };
})(a || (a = {}));
var arr = ['1', '2', '3'];
var obj2 = {
    1: '1',
    2: '2'
};
//类的接口 可以用接口来装饰类 ts核心 接口+泛型
var b;
(function (b) {
    //类要实现接口的所有方法
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        Dog.prototype.speak = function () { };
        return Dog;
    }());
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        return Animal;
    }());
    function createAnimal(clazz, name) {
        return new clazz(name);
    }
    var a = createAnimal(Animal, 'zhufeng');
})(b || (b = {}));
