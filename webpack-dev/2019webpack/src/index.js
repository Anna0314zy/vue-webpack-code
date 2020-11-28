// import './index.css';
// import './font.css';
// import Animal from './animal';
//
// class Person extends Animal {
//   constructor(name, age) {
//     super(name);
//     this.age = age;
//   }
// }
// const p = new Person('zhufeng', 10);
// const a = 10;
// const b = 19;
// const v = 5;
// const r = 5;
// const f = 6;
//如果想给加载的模块配置loader 从右向左执行 用!隔开
// ?$ 是要给expose-loader传参  向全局暴露变量 变量就叫$
// let $ = require('expose-loader?$!jquery');
// import $ from "expose-loader?exposes[]=$&exposes[]=jQuery!jquery";
// import _ from 'lodash'
//
import './3'
console.log($_.join(['a','b'], '$ggg'));
console.log($('#root'))
console.log(process.env, 'env');


