namespace a {
    //装饰器 修改配置文件 experimentalDecorators:true 支持装饰器
    
    interface Person {
        xx: string;
        yy: string;
    }
    function enhancer(target: any) {
        //target 代表Person类
        target.prototype.xx = 'xx';

    }
    @enhancer
    class Person {
        constructor() { }
    }
    //不能改person
    let p = new Person();
    console.log(p.xx);
}
//把类进行替换
namespace b {
    //装饰器 修改配置文件 experimentalDecorators:true 支持装饰器
    
    interface Person {
        age: number;

    }
    //装饰器工厂
    function enhancer(name: string) {
        return function (target: any) {
            //target 代表Person类
            // return class {
            //     name: string = 'person'; //下面的类生命了name 所以这里也必须要有啊
            //     public age: number = 10;
            // }
            return class Child extends target {
                public name: string = name;
                public age: number = 10;
            }
    
        }
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
    @enhancer('zhufeng')
    class Person {
        public name: string = 'person';
        constructor() { }
    }
    //替换掉旧的类
    let p = new Person(); 
    console.log(p.age);
}
//属性装饰器
namespace c {
    //TODO target 装饰的是一个普通属性 target 指向类的原型 Person.prototype
    //TODO 装饰的是一个static target 指向类的定义
    function upperCase(target:any, propertyName:string) {
        let val = target[propertyName];
        const getter = () => val;
        const setter = (newVal:string) => {
            val = newVal.toLocaleUpperCase();
        }
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
    function prototyNoEnumerable(flag: boolean) {
        return function(target: any, propertyName: string) {
           
        }
    }
    function methodNoEnumerable(flag: boolean) {
        return function(target: any, methodName: string, propertyDescriptor:PropertyDescriptor) {
            propertyDescriptor.enumerable = flag; 
        }
    }
    function setAge(age: number) {
        return function(target: any, methodName: string, propertyDescriptor:PropertyDescriptor) {
            target.age = 100; //给person类增加了属性
        }
    }
    function toNumber(target: any, methodName: string, propertyDescriptor:PropertyDescriptor) {
       let oldMethod = propertyDescriptor.value;//指向sum方法
       propertyDescriptor.value = function (...args:any[]) {
           args = args.map(item => parseFloat(item));
           return oldMethod.apply(this, args);
       }
    }
    class Person {
        static age: number;
        @upperCase
        @prototyNoEnumerable(false)
        name: string = 'zhufeng';
        
        @methodNoEnumerable(false)
        public getName() {
            console.log('getName');
        }
        @setAge(100)
        static getAge() {

        }
        @toNumber
        sum(...args:any[]) {
            return args.reduce((accu, item) => accu + item, 0);
        }
    }
    let p = new Person();
    p.name = 'jiagou';
    console.log(Person.age, 'p---'); //age是类的属性
    for(let attr in p) {
        console.log('attr'+ attr);
    }
    console.log(p.sum(1, '2', '3'))
}
namespace d {
    //参数装饰器 方法参数 很少用
    interface Person {
        age: number
    }
    function addAge(target:any, methodName:string,paramsIndex: number) {
      console.log(target, methodName, paramsIndex);
      target.age = 10;
    }
    class Person {
        login(username:string, @addAge password: string) {
            //this.age 要想访问 上面得写个interface
            console.log(this.age, username, password);
        }
        
    }
    let p = new Person();
        p.login('zhufeng', '123');
}
//TODO 1.装饰器执行顺序  属性和方法先执行 (谁写在前面先执行哪个)
//2.方法 的时候 先参数再方法 他们肯定会在一起
//3.最后是类 
//4.如果是同类型的 后写的先执行 谁离person近谁先执行
