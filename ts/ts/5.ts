// 抽象类 无法被实例化
abstract class Animal {
    name: string;
    abstract getName(): string
}
//如果不是抽象类 需要是想上面抽象类的所有方法
class Cat extends Animal {
    getName(): string {
        return this.name;
    }
}
let cat = new Cat();
cat.name = 'cat'
console.log(cat.getName());
//1.用来描述对象的形状 指的是对象有哪些属性 属性是什么类型
interface Point {
    x: number //, ; 空着都可以
    y: number
}
let point: Point = { x: 2, y: 0 };
//2.还可以用来描述行为的抽象
interface Speakable {
    speak(): void // 接口里不能放实现 只能放定义 所有接口里都是抽象方法
}
interface Eatable {
    eat(): void
}
//类可以实现多个接口 但只能继承一个类
class Dog extends Animal implements Speakable, Eatable {
    getName(): string {
        return this.name;
    }
    speak() {

    }
    eat() {

    }
}
let p = new Dog();
//重写 和 重载
//重写是指子类重写继承自父类中的方法 重载是指为同一个函数提供多个类型定义
namespace b {
    //重写 子类重新实现并覆盖父类的方法
    class Animal {
        constructor() {

        }
        speak() {
            console.log('动物叫');
            // throw new Error('此方法不能被调用');
        }
    }
    class Cat extends Animal {
        speak() {
            console.log('我们一起喵喵喵')
        }
    }
    let cat = new Cat();
    cat.speak();
    class Dog extends Animal {
        speak() {
            console.log('我们一起汪汪汪')
            super.speak(); //可以掉父类的方法
        }
    }
    let dog = new Dog();
    dog.speak();
}