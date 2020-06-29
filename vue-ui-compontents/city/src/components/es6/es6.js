// import {
//     a
// } from './a'

// console.log(a, '-----');
// import {b, c} from './a'
// console.log(b, c);
let btn = document.createElement('button');
btn.addEventListener('click', function() {
    import('./d').then(res => { //返回的是一个promise
        console.log(res);
        console.log(res.default);
    })
})
document.body.appendChild(btn);