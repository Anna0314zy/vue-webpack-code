const path = require('path'); 
let myPath = path.join(__dirname,'/img/so'); 
let myPath2 = path.join(__dirname,'./img/so'); 
let myPath3 = path.resolve(__dirname,'/img/so'); 
let myPath4 = path.resolve(__dirname,'./img/so'); 
console.log(__dirname); //D:\myProgram\test 
console.log(myPath); //D:\myProgram\test\img\so 
console.log(myPath2); //D:\myProgram\test\img\so 
console.log(myPath3); //D:\img\so<br> 

// /Users/zouyu/Desktop/vue-webpack-code/webpack-dev/webpack-dev-l/img
// /Users/zouyu/Desktop/vue-webpack-code/webpack-dev/webpack-dev-l/img/img/so
// /Users/zouyu/Desktop/vue-webpack-code/webpack-dev/webpack-dev-l/img/img/so
// /img/so
// /Users/zouyu/Desktop/vue-webpack-code/webpack-dev/webpack-dev-l/img/img/so