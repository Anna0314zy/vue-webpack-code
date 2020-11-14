//如何定义类
namespace a {
    class Person {
        //需要先定义
        name: string = 'zhufeng';
        age: number;
        constructor() {
            this.age = 10;
        }
    }
    let p1 = new Person();
    console.log(p1.name, p1.age);
}

//存取器 getter setter
namespace b {
    class Person {
        //需要先定义
        myname: string = 'zhufeng';
        constructor(name: string) {
            this.myname = name;
        }
        get name() {
           return this.myname; 
        }
        set name(newVal: string) {
            this.myname = newVal.toLocaleUpperCase();
        }
    }
    let p = new Person('zhufeng');
    console.log(p.name);
    p.name='jiagou';
    console.log(p.name);

    
}
namespace c {
    class Person {
        //需要先定义
        //public 把name变成person实例上的属性
        constructor(public readonly name: string) {
          
        }
    
    }
    let p = new Person('zhufeng');
    // p.name = 'j';
}
//继承 ts讲设计模式
/**
 * 1.子类继承父类后 子类的实例生就有了父类上的属性和方法
 * 2.访问修饰符 public protected private
 * public 自己的子类和其他类都可以访问
 * protecd 受保护的 自己和自己的子类能访问 其他都不能访问
 * private 只能自己访问 儿子也不能访问
 */
namespace d {
    //如果不想初始化改配置文件 strictPropertyInitialization: false
    class Person{
        name:string;
        age: number;
        constructor(name: string,  age: number) {
            this.name = name;
            this.age =  age;
            
        }
        getName() {
            return this.name;
        }
        setName(newName: string) {
            this.name = newName;
        }
        
    }
    class Student extends Person {
        stuNo:number;
        static type = 'student'; //类属性 不是实例属性
        constructor(name: string, age: number, stuNo: number) {
            super(name, age);
            this.stuNo = stuNo;
            
        }
        getStuNo() {
            console.log(this.name, 'this.name');
            return this.name+ this.stuNo;
        }
        setStuNo(stuNo: number) {
            this.stuNo = stuNo + this.age;
        }
        
    }
    let s = new Student('zhufeng', 10, 1);
     s.setStuNo(334);
    console.log(s.name, s.stuNo);
    // class P extends Student {
    //     constructor(type:string) {
    //         super(type);
    //         console.log(this.type);
    //     }
    // }
}


