namespace a {
  //结构类型系统
  //1。接口的兼容性  ts跟类型没有关系 只跟属性有关系
  interface Animal {
    name: string,
    age: number
  }
  //描述的是一个函数 用：代表返回值
  interface Calculate {
    <T>(a: T, b: T): T
  }
  //描述的是一个对象 用=> 代表返回值 speak 是对象上的一个属性
  interface Person {
    name: string,
    age: number
    speak: (word: string) => void
  }
  function getName(animal: Animal): string {
    return animal.name;
  }
  let p: Person = {
    name: 'zhufeng',
    age: 10,
    speak() { }
  }
  console.log(getName(p))
}
//基本类型的兼容性
let num: string | number;
let str: string = 'hello';
num = str;
str = num;
let num2: {
  toString(): string //我只要求自己是一个对象 有toString方法 字符串满足我的要求 所以可以对我进行赋值
}
let str2: string = 'jia';
num2 = str2;
namespace b {
  //类的兼容性 跟类型无关 只关心属性
  class Animal {
    name: string
  }
  class Bird extends Animal {
    // swing: number
  }
  let a: Animal;
  a = new Bird(); //父类的变量能指向子类的实例
  let b: Bird;
  b = new Animal(); //Animal 里面没有swing的属性
  b = { name: 'zhu-fengs' }; //不管这个对象的具体类型 只要有这个属性就可以


}
namespace c {
  //函数的兼容性
  type sumFunction = (a: number, b: number) => number;
  let sum: sumFunction;
  function f1(a: number, b: number): number {
    return a;
  }
  sum = f1;
  function f2(a: number): number {
    return a
  }
  sum = f2;
  function f3(): number {
    return 1;
  }
  sum = f3;
  //可以少参数 但是不能多参数
  //比较返回值
  type GetPerson = () => { name: string, age: number };
  let getPerson: GetPerson
  function g1() {
    return { name: 'string', age: 10 }
  }
  getPerson = g1;
  function g2() {
    return { name: 'string' }
  }
  //getPerson = g2; //返回值对象少一个属性不可以 多一个可以
  // interface T {
  //   name: string
  // }
  // let t: T = {name: 'zhufeng', age: 10} //直接赋值没有兼容性
  //函数参数的协变 变量的类型 配置文件 strictFunctionTypes：
  //双向协变 说是取消了 只有单向的
  type logFunc = (a: number | string) => void;
  let log: logFunc;
  function log1(a: number | string | boolean) {
    console.log(a);
  }
  log = log1; //可以把log1给log 功能要有 只有满足我的功能就可以赋值给我
  //泛型的兼容性 判断兼容性 先判断具体的类型再进行兼容性的判断
  interface Empty<T> {

  }
  let x!: Empty<string>;
  let y!: Empty<number>
  x = y; //可以赋值 x y都是空对象  如果上面对象里面写有值就不可以哦
  interface NotEmptyString<T> {
    data: string
  }
  interface NotEmptyNumber<T> {
    data: number
  }
  //枚举的兼容性
  //枚举类型与数字类型兼容 并且数字类型与枚举类型兼容
  //不同枚举类型之间是不兼容的
  enum Colors {
    Red, Yellow
  }
  let c: Colors;
  c = Colors.Red; //c 就是一个数字 所以可以兼容
  c = 1;
  let d: number;
  d = Colors.Yellow;
  //类型保护 更精确的知道是哪种类型
  //类型保护就是一些表达式 他们在编译的时候能够通过类型信息确保某个作用域内变量的类型
  //类型保护就是能够通过关键字判断出分支中的类型
  //1、typeof 类型保护
  function double(input: string | number | boolean) {
    if (typeof input === 'string') {
      input.toLocaleLowerCase();//可以判断具体是啥类型
    } else if (typeof input === 'number') {
      input.toFixed();
    } else {
      input;
    }
  }
  //类的保护
  class Animal {
    public name: string = 'zhufeng'
  }
  class Bird extends Animal {
    public swing: number = 2;
  }
  function getName(a: Animal) {
    if (a instanceof Bird) {
      a.swing;
    } else {
      a.name;
    }
  }
  //null保护
  function getFirstLetter(s:string | null) {
    // if (s === null) s = '';
    // s = s || '';
    // function ensure() {
    //   s = s || ''
  
    // }
    // ensure(); //不能识别函数里面的断言
    return s!.charAt(0);
  }
}
namespace d {
  let a = {b:1}; 
//先判断a是否为null或者undedined 是null undefined 返回null undefined 不是的话返回a.b
  console.log(a?.b);//等同于 a ? a.b : a 这个语法不能用
}
interface WarningButton{
  class: 'warning', //
  text1: '修改'
}
interface DangerButton{
  class: 'danger',
  text2: '修改'
}
type Button = WarningButton | DangerButton;
function getButton(button: Button) {
  button.class // 只能使用公有属性
  if (button.class === 'warning') {
    button.text1;
  }else {
    button.text2;
  }
}
interface Bird {
  swing: number
}
interface Dog {
  leg: number
}
function getNumber(x:Bird | Dog) {
  if ('swing' in x) {
    x.swing;
  }else {
    x.leg
  }
}
namespace d {
  //怎么区分
  interface Bird {
    name1: 'Bird',
    legs: number
  }
  interface Dog {
    name2: 'Dog',
    legs: number
  }
  //自定义类型保护函数
  function isBird(x:Bird | Dog): x is Bird {
       return x.legs === 2;
  }
 function getAnimal(x:Bird | Dog) {
       if (isBird(x)) {
         console.log(x.name1); //x 就是一个鸟
       }else {
         console.log(x.name2)
       }
 }
 let x:Bird = {name1: 'Bird', legs: 2};
 getAnimal(x);
} 