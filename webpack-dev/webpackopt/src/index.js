// import './index.less'
// import './style.css'
// import './spirit.css'
// import './px2rem.css'
// let img = new Image();
// img.src = require('./small.png');
// document.body.appendChild(img);
console.log('index.js');
let button = document.querySelector('button');
button.innerHTML = '点我';
// document.append(button);
button.addEventListener('click', () => {
    //给分离的代码块起个名字
    import(/*webpackPrefetch:true*//*webpackChunkName:'hello'*/'./hello').then(result => {
        console.log(result.default);
    })
    import(/*webpackPrefetch:true*//*webpackChunkName:'world'*/'./world').then(result => {
        console.log(result.default);
    })
})

