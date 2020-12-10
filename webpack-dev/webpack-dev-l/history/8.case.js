let {AsyncSeriesHook} =require('tapable') ;
// class AsyncSeriesHook { // 钩子是同步的
//     constructor(args) {
//         this.tasks = [];
//     }
//     tapPromise(name,task) {
//         this.tasks.push(task);
//     }
//     promise(...args) {
//        let [first, ...others] = this.tasks;
//        return others.reduce((p, n) => {
//        return  p.then(() => n(...args));
//        }, first(...args))
//     }
// }
let hook = new AsyncSeriesHook(['name']);
let total = 0;
hook.tapPromise('react', function(data) {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            console.log('react', data);
            // reslove();
        }, 1000)
    })

})
hook.tapPromise('node', function(data) {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            console.log('node', data);
            reslove();
        }, 1000)
    })

})

hook.promise('jw').then(() => {
    console.log('end');
})
