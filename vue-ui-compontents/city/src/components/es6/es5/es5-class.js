// import { prototype } from "vue/types/umd"
function define(target, protoProperties){
    for (let i = 0; i < protoProperties.length; i++) {
        let property = protoProperties[i];
        Object.defineProperty(target, property.key, {
            configurable: true,
            enumerable: true, //默认是不可以枚举的，所以要用defineProperty
            ...property
        })
    }
}
//es5中没有类 只有构造函数 可以把一个函数当成类
function defineProperty(Constructor, protoProperties, staticProperties) {
    if (Array.isArray(protoProperties)) {
        define(Constructor.prototype, protoProperties);
    }
    if (Array.isArray(staticProperties)) {
        define(Constructor, staticProperties);
    }
}
var Animal = (function () {
    function Animal() {
        //判断调用方式是不是通过new调用
        if (!(this instanceof Animal)) {
            throw new Error('not new')
        }
        this.name = '熊脑'
    }
    // Animal  公共方法
    defineProperty(Animal, [{
            key: 'say',
            value: function () {
                console.log('say----')
            },
        },
        {
            key: 'eat',
            value: function () {
                console.log('eat----')
            }
        }

    ], [{
            key: 'a',
            value: function () {
                return 123;
            }
        },
        {
            key: 'b',
            value: function () {
                return 123;
            }
        }

    ])
    return Animal;

})()


// function Animal() {
//     this.name = '熊猫';
// }
// let animal = new Animal();//构造函数this默认指向实例
//如果new 返回的hi一个引用类型 function object this就会指向当前返回的结果
// console.log(animal);
// new Animal();//如何判断是不是new Animal()调用
// Animal.prototype.say = function() {//所有人公用这个方法的

// }
new Animal();

console.log(new Animal());
console.log(Animal.a());