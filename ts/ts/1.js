"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var name = 'zf';
var age = 10;
var married = true;
var hobbies = ['1', '2'];
var interests = ['4', '5'];
//元祖 类似一个数组 它是一个长度和类型都固定的数组
var point = [100, 100];
var person = ['珠峰', 10];
//枚举类型
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
console.log("\u674E\u96F7\u662F" + Gender.BOY); //0
var Week;
(function (Week) {
    Week[Week["MONDAY"] = 1] = "MONDAY";
    Week[Week["TUSEDAY"] = 2] = "TUSEDAY";
})(Week || (Week = {}));
console.log("\u674E\u96F7\u662F" + Week.TUSEDAY); //2
console.log(0 /* RED */);
//任意类型 anyscript 
//第三库 没有类型定义 类型转换的时候 数据结构太复杂 尽量少用
//不写any 猜测root 可能是HTMLelement | null
//ts 为dom提供了一整套的类型声明
//let root: HTMLElement | null= document.getElementById('root');
//root! 强行断言 断言不会为null 
//root!.style.color = 'red';
//null 空 undefined 未定义
//他们都是其他类型的子类型 可以把他们赋值给其他类型
var myname = null;
var myname1 = undefined;
//上面操作需要改配置文件  "strictNullChecks": false,
//void类型 空的 没有 void 代表函数无返回值
function greeting(name) {
    console.log("hello" + name);
    // return 's';
}
greeting('zouyu');
//never 永远不 是其他类型的子类型 代表不会出现的值
//返回“从不”的函数不能具有可访问的终结点
//在函数内部永远会抛出错误 导致函数无法正常结束
function createError(msg) {
    console.log(1);
    throw new Error('error');
}
function sum() {
    while (true) {
        console.log('hello');
    }
    //监测到无法执行的代码
    console.log('end point');
}
var num1 = 3 | 5; // 7 //3的二进制是011  5 的二进制是101 
//类型的推论
var name2 = 2;
name2 = 4;
//name2 = "pp"; //类型推论name2 就是number
var name3;
name3 = "ggg";
name3 = 9; //推论是any
//包装对象 java装箱和拆箱
//自动在基本类型的对象类型之间切换 内部会name4 = new String(name4);
//当调用基础数据类型方法的时候 javascript会在原始数据类型和对象类型之间做一个迅速的强制性切换
var name4 = 'ZOUYU';
name4 = name4.toLocaleLowerCase();
console.log(name4);
var isok = true;
var isok1 = Boolean(1);
//let isok2: boolean = new Boolean(1); //编译失败 期待的是一个原始数据类型
//联合类型
var name5;
// name5. 不能掉string number的方法
name5 = 7; //赋值后就可以掉方法
//类型断言
var name6;
name6.toLocaleLowerCase(); // 断言就是一个string
//字面量类型  只能赋值 BOY GIRL
var Gender4;
//字符床字面量 和 联合类型
