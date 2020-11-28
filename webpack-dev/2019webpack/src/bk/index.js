// import './index.css'
// import './5.less'
// import './3.scss'
//
// function readonly(target, key, discriptor) {
//     console.log(discriptor, 'discriptor');
//     // configurable: true
//     // enumerable: true
//     // initializer: ƒ initializer()
//     // writable: true
//     discriptor.writable = false;
// }
// class Person {
//     @readonly PI = 3.14; //类是属性
// }
// let p = new Person();
// // p.PI = 3.15;
// console.log(p.PI);
// // Cannot assign to read only property 'PI' of object '#<Person>
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(<div>hello</div>, document.getElementById('root'))
// import Animal from "./animal";
// class Person extends Animal{
//     constructor(name, age) {
//         super(name);
//         this.age = age;
//     }
// }
// let p = new Person('zhufeng', 10);
// console.log(p)