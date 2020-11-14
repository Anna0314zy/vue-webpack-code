//任意属性
namespace a {
    //任意属性 下面可以写多个参数
    interface PlainObject {
        [propName:string] : number
    }
    let obj: PlainObject = {
        x: 1,
        y: 2
    }
    //接口继承
    interface Speackable {
        speak(): void
    }
    interface SpeakChinese extends Speakable {
        speakChinese(): void
    }
    class Person implements SpeakChinese {
        speak(){};
        speakChinese(){}; //此处要实现上面的两个方法
    }
    //接口的readonly 
    interface Circle {
        readonly PI: number; //不能赋值
        radius: number
    }
    let circle: Circle = {
        PI: 3.14,
        radius: 10
    }
    //接口还可以用来约束函数
    interface Discount {
        (price: number): number 
    }//price: number是参数列表  ：number是函数返回值
    let cost: Discount = function (price:number):number {
        return price * 0.8
    }
}
//可索引接口
//对数组和对象进行约束
interface UserInterFace {
    [index: number]: string
}
let arr: UserInterFace = ['1', '2', '3'];
let obj2: UserInterFace ={
    1: '1', 
    2: '2'
}
//类的接口 可以用接口来装饰类 ts核心 接口+泛型
namespace b {
    interface Speakable {
        name: string,
        speak(word: string):void
    }
    //类要实现接口的所有方法
    class Dog implements Speakable {
        name: string;
        speak() {}
    }
    class Animal {
        constructor(public name: string) {
            
        }
    }
    //约束构造类型 使用new 来约束构造函数
    interface WithNameClass {
        new(name: string):Animal
    }
    function createAnimal(clazz:WithNameClass, name: string) {
        return new clazz(name);
    }
    let a = createAnimal(Animal, 'zhufeng');
}
