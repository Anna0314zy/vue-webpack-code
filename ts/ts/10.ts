namespace a {
    interface Bird {
        name: string;
        fly(): void
    }
    interface Person {
        name: string;
        eat(): void
    }
    //交叉类型 其实就是二个接口类型属性的并类
    type BirdMan = Bird & Person;
    let p: BirdMan = {
        name: 'zhufeng',
        fly() { },
        eat() { }
    }

}
namespace b {
    //typeof 可以获取一个变量的类型
    // type Person = {
    //     name: string,
    //     age: number
    // }
    let p = {
        name: 'zhufeng',
        age: 10
    }
    //let 定义变量的 type 定义类型的
    type Person = typeof p; //Person是一个类型
    let p2: Person = {
        name: 'zhufeng',
        age: 20
    }
    //索引访问操作符 通过【】获取一个类型的子类型
    interface Person2 {
        name: string;
        age: number;
        job: {
            name: string
        },
        interest: { name: string, level: number }[]
    }
    let myname: Person2['job'] = {
        name: 'fe'
    }
    let myname2: Person2['job']['name'] = 'fe'
    let myLevel: Person2['interest'][0]['level'] = 10;
    //keyof 索引类型查询操作符
    interface Person3 {
        name: string,
        age: number,
        gender: 'male' | 'femal'
        // [propName: string]:any
    }
    //key 只能是上面3个属性中的一个
    //type Person3Keys = 'name' | 'age' | 'gender';
    type Person3Keys = keyof Person3; //返回一个接口 key的一个集合
    function getValueByKey(val: Person3, key: Person3Keys): any {
        return val[key]; //上面加一个任性属性 这里就不会报错 但是我不希望这么做
        //
    }
    let person3: Person3 = {
        name: 'zhufeng',
        age: 10,
        gender: 'male'
    }
    let name = getValueByKey(person3, 'name');
    //映射类型 在定义的时候用in操作符批量定义
    interface Person4 {
        name: string,
        age: number,
        gender: 'male' | 'femal'
    }
    // type PartialPerson = {
    //     [key in keyof Person4]?: Person4[key]//中间多个？
    // } //属性变成是可选的 可有可无
    // type Partial<T> = {
    //     [key in keyof T]?: T[key]
    // }
    type PartialPerson = Partial<Person4> //原生支持
    let p4: PartialPerson = {
        name: 'zhufeng'
    }// -? 必选
    type Required<T> = {
        [key in keyof T]-?: T[key]
    }
    type RequiredPerson = Required<Person4>

    let p5: RequiredPerson = {
        name: 'zhufeng',
        age: 4,
        gender: 'male'
    }//原理
    type Readonly<T> = {
        readonly [key in keyof T]: T[key]
    }
    type ReadonlyPerson = Readonly<Person4>;
    let p6: ReadonlyPerson = {
        name: 'zhufeng',
        age: 4,
        gender: 'male'
    }//
    // p6.name = 'giagou'
    //Pick 剔除某个属性 原理
    type Pick<T, k extends keyof T> = {
        [key in k]:T[key]
    }
    type PickPerson = Pick<Person4, 'name'>;
    let x:PickPerson = {
        name: 'name'
    }
    //ts 要区分类型和值
    interface Fish {
        name1: string
    }
    interface Fish2 {
        name1: string
    }
    interface Water {
        name2: string
    }
    interface Bird {
        name3: string
    }
    interface Sky {
        name4: string
    }
    type Condition<T> = T extends Fish?Water: Sky;
    //只要给我的类型有Fish里的所有属性就可以
    let condition: Condition<Fish2> ={
       name2: 'cvv'
    }
    //条件类型的分发
    type Condition2<T> = T extends Fish ? Water : Sky;
    let c1: Condition2<Fish | Bird> = {
        name2: 'zhufneg'
    }
    let c2: Condition2<Fish | Bird> = {
        name4: 'zhufneg'
    }
   

}
namespace c {
     //关键字
     type E = Exclude<string | number, string>;
     let e:E = 10; //
     type E2 = Extract<string | number | null, string>;
     let e2: E2 = '10';
     type E3 = NonNullable<string | number | undefined |null>;
     let E3 = 'heollo' //把非空的干掉
     //redux 
     function getUserinfo() {
         return {
             name: 'zhufeng',
             age: 10
         }
     }
     type Userinfo = ReturnType<typeof getUserinfo>
     let user: Userinfo = {name: 'zhufeng', age: 10}
     class Person5{
         name: string
         constructor(name: string) {
             this.name = name;
         }
     }
     //InstanceType 获取实例类型
     type P = InstanceType<typeof Person5>;
     let p :P = new Person5('zhufeng');

}
