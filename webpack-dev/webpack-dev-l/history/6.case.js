class AsyncParallelHook { // 钩子是同步的
    constructor(args) {
        this.tasks = [];
    }
    tapPromise(name,task) { 
        this.tasks.push(task);
    }
    promise(...args) {
    let tasks = this.tasks.map(task => task(...args));
    return Promise.all(tasks);
        
    }
}
let hook = new AsyncParallelHook(['name']);
let total = 0;
hook.tapPromise('react', function(name) {

    return new Promise((reslove, reject) => {
        setTimeout(() => {
            console.log('react', name);
            reslove();
        })
    })

})
hook.tapPromise('node', function(name) {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            console.log('node', name);
            reslove();
        })
    })

})

hook.promise('jw').then(() => {
    console.log('end');
})