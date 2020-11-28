// import './index.css'
//
// console.log('-login-')
// document.write('login')
// function say() {
//     console.log('say---')
// }
new Promise((reslove, reject) => {
  setTimeout(() => {
    const data = {name: 'zy'}
    reslove(data);
  }, 1000)
  reject();
}).then((res) => {
  console.log(res);
  return Promise.resolve(res);
}).then((res) => {
  console.log(res);

}).then(() => {
  setTimeout(() => {
    console.log('ooo');
  }, 1000)
}).catch((e) => {
  console.log(e);
})
