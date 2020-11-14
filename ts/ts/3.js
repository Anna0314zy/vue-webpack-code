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
//如何定义类
var a;
(function (a) {
    var Person = /** @class */ (function () {
        function Person() {
            //需要先定义
            this.name = 'zhufeng';
            this.age = 10;
        }
        return Person;
    }());
    var p1 = new Person();
    console.log(p1.name, p1.age);
})(a || (a = {}));
//存取器 getter setter
var b;
(function (b) {
    var Person = /** @class */ (function () {
        function Person(name) {
            //需要先定义
            this.myname = 'zhufeng';
            this.myname = name;
        }
        Object.defineProperty(Person.prototype, "name", {
            get: function () {
                return this.myname;
            },
            set: function (newVal) {
                this.myname = newVal.toLocaleUpperCase();
            },
            enumerable: false,
            configurable: true
        });
        return Person;
    }());
    var p = new Person('zhufeng');
    console.log(p.name);
    p.name = 'jiagou';
    console.log(p.name);
})(b || (b = {}));
var c;
(function (c) {
    var Person = /** @class */ (function () {
        //需要先定义
        //public 把name变成person实例上的属性
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var p = new Person('zhufeng');
    // p.name = 'j';
})(c || (c = {}));
//继承 ts讲设计模式
/**
 * 1.子类继承父类后 子类的实例生就有了父类上的属性和方法
 * 2.访问修饰符 public protected private
 * public 自己的子类和其他类都可以访问
 * protecd 受保护的 自己和自己的子类能访问 其他都不能访问
 * private 只能自己访问 儿子也不能访问
 */
var d;
(function (d) {
    //如果不想初始化改配置文件 strictPropertyInitialization: false
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        Person.prototype.getName = function () {
            return this.name;
        };
        Person.prototype.setName = function (newName) {
            this.name = newName;
        };
        return Person;
    }());
    var Student = /** @class */ (function (_super) {
        __extends(Student, _super);
        function Student(name, age, stuNo) {
            var _this = _super.call(this, name, age) || this;
            _this.stuNo = stuNo;
            return _this;
        }
        Student.prototype.getStuNo = function () {
            console.log(this.name, 'this.name');
            return this.name + this.stuNo;
        };
        Student.prototype.setStuNo = function (stuNo) {
            this.stuNo = stuNo + this.age;
        };
        Student.type = 'student'; //类属性 不是实例属性
        return Student;
    }(Person));
    var s = new Student('zhufeng', 10, 1);
    s.setStuNo(334);
    console.log(s.name, s.stuNo);
    // class P extends Student {
    //     constructor(type:string) {
    //         super(type);
    //         console.log(this.type);
    //     }
    // }
})(d || (d = {}));
