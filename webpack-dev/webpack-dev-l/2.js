// for (var i=1; i<=5; i++) {
//     setTimeout( function timer() {
//         console.log( i );
//      }, i*1000 );
// }
//同步任务  宏观异步任务
// for (var i=1; i<=5; i++) {
//     (function() {
//         setTimeout( function timer() {
//             console.log( i );
//         }, i*1000 );
//     })();
// }
// for (var i=1; i<=5; i++) {
//     (function(j) {
//         setTimeout( function timer() {
//             console.log( j );
//         }, j*1000 );
//     })(i);
// }
// function timer(i) {
//     setTimeout(() => console.log( i ), i*1000 );
// }
// for (var i=1; i<=5;i++) {
//     timer(i);
// }
for (let i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
     }, i*1000, i );
}
// 第三个参数 可选。 传给执行函数的其他参数（IE9 及其更早版本不支持该参数）。