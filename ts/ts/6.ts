namespace a {
    class Animal {
        name: string = 'zhufeng';
        getName() {
            console.log('父亲')
        }
    }
    class Dog extends Animal {
        constructor() {
            super() //super指向构造函数本身
        }
        getName() {
            console.log(super.getName() + '儿子');
        }
    }
    let d = new Dog();
    d.getName();
    console.log(d);
}
namespace b {
    
}