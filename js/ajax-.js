new AjaxRequest().request({
  url: '/user',
  xxasd
}).then(data => {

})

// 限制并发2 
// let results = [];
// // Promise.all()
// asyncPool(2, tasks, (task, next) => {
//     console.log(task);
//     task().then(result => {
//         results.push(result);
//         next();
//     })
// }, ()=> {
//     console.log('所有的并发都成功');
// })