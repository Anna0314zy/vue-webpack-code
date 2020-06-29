// let str = require('!!inline-loader!./a.js');
// -! 不会再去通过 pre + normal loader来处理了
/**
 * let str = require('-!inline-loader!./a.js');
 * loader1
loader2
loader3
inline-loader
loader3
 */
/**
 * let str = require('!inline-loader!./a.js');
 * 不执行 normal -loader
 * loader1
loader2
loader3
loader1
inline-loader
loader3
 */
/**
 * let str = require('!!inline-loader!./a.js');
 * 不执行 normal-pre-post -loader
 * loader1
loader2
loader3
inline-loader

 */
// ! 没有normal
// ！！什么都不要
// require('./index.less')
// console.log(str);
//loader 默认是由 pitch normal 组成
//先执行pitch 
// class Zfpx {
//     constructor() {
//         this.name = 'zfpx';
//     }
//     getName() {
//         return this.name
//     }
// }
// let zf = new Zfpx();
// console.log(zf.getName());
// console.log('珠峰')
// import p from './img.jpg';
// import './index.less'
// console.log(p, 'p---');
// let img = document.createElement('img');
// img.src = p;
// document.body.appendChild(img);
import './index.css'