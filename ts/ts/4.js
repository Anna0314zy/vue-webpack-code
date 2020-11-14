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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var a;
(function (a) {
    //装饰器 修改配置文件 experimentalDecorators:true 支持装饰器
    function enhancer(target) {
        //target 代表Person类
        target.prototype.xx = 'xx';
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    //不能改person
    var p = new Person();
    console.log(p.xx);
})(a || (a = {}));
//把类进行替换
var b;
(function (b) {
    //装饰器 修改配置文件 experimentalDecorators:true 支持装饰器
    //装饰器工厂
    function enhancer(name) {
        return function (target) {
            //target 代表Person类
            // return class {
            //     name: string = 'person'; //下面的类生命了name 所以这里也必须要有啊
            //     public age: number = 10;
            // }
            return /** @class */ (function (_super) {
                __extends(Child, _super);
                function Child() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = name;
                    _this.age = 10;
                    return _this;
                }
                return Child;
            }(target));
        };
    }
    //普通装饰器
    // function enhancer(target: any) {
    //     //target 代表Person类
    //     // return class {
    //     //     name: string = 'person'; //下面的类生命了name 所以这里也必须要有啊
    //     //     public age: number = 10;
    //     // }
    //     return class Child extends Person {
    //         public age: number = 10;
    //     }
    // }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'person';
        }
        Person = __decorate([
            enhancer('zhufeng')
        ], Person);
        return Person;
    }());
    //替换掉旧的类
    var p = new Person();
    console.log(p.age);
})(b || (b = {}));
//属性装饰器
var c;
(function (c) {
    //TODO target 装饰的是一个普通属性 target 指向类的原型 Person.prototype
    //TODO 装饰的是一个static target 指向类的定义
    function upperCase(target, propertyName) {
        var val = target[propertyName];
        var getter = function () { return val; };
        var setter = function (newVal) {
            val = newVal.toLocaleUpperCase();
        };
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
    function prototyNoEnumerable(flag) {
        return function (target, propertyName) {
        };
    }
    function methodNoEnumerable(flag) {
        return function (target, methodName, propertyDescriptor) {
            propertyDescriptor.enumerable = flag;
        };
    }
    function setAge(age) {
        return function (target, methodName, propertyDescriptor) {
            target.age = 100; //给person类增加了属性
        };
    }
    function toNumber(target, methodName, propertyDescriptor) {
        var oldMethod = propertyDescriptor.value; //指向sum方法
        propertyDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (item) { return parseFloat(item); });
            return oldMethod.apply(this, args);
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'zhufeng';
        }
        Person.prototype.getName = function () {
            console.log('getName');
        };
        Person.getAge = function () {
        };
        Person.prototype.sum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (accu, item) { return accu + item; }, 0);
        };
        __decorate([
            upperCase,
            prototyNoEnumerable(false)
        ], Person.prototype, "name", void 0);
        __decorate([
            methodNoEnumerable(false)
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber
        ], Person.prototype, "sum", null);
        __decorate([
            setAge(100)
        ], Person, "getAge", null);
        return Person;
    }());
    var p = new Person();
    p.name = 'jiagou';
    console.log(Person.age, 'p---'); //age是类的属性
    for (var attr_1 in p) {
        console.log('attr' + attr_1);
    }
    console.log(p.sum(1, '2', '3'));
})(c || (c = {}));
var d;
(function (d) {
    function addAge(target, methodName, paramsIndex) {
        console.log(target, methodName, paramsIndex);
        target.age = 10;
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (username, password) {
            //this.age 要想访问 上面得写个interface
            console.log(this.age, username, password);
        };
        __decorate([
            __param(1, addAge)
        ], Person.prototype, "login", null);
        return Person;
    }());
    var p = new Person();
    p.login('zhufeng', '123');
})(d || (d = {}));
//TODO 1.装饰器执行顺序  属性和方法先执行 (谁写在前面先执行哪个)
//2.方法 的时候 先参数再方法 他们肯定会在一起
//3.最后是类 
//4.如果是同类型的 后写的先执行 谁离person近谁先执行
