class Animal {
    constructor() {
        this.name = 'nxxo'
    }
    //实例上的属性
    static get a () { //属性访问器
        return 23;
    }
    static set a (newVal) { //属性访问器
        return newVal;
    }
    //原型上的属性
    get b () { //属性访问器
        return 23;
    }
    // set b () { //属性访问器
    //     return 23;
    // }
    say() {

    }
    eat() {
        
    }
}
console.log(Animal.a)