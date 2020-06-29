class AsyncSeriesHook { // 钩子是同步的
    constructor(args) {
        this.tasks = [];
    }
    tapAsync(name,task) { 
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
    let next = () => {
        if (this.tasks.length === index) return finalCallback();
        let task = this.tasks[index++];
        task(...args,  next);
    }
        next();
    }
}
let hook = new AsyncSeriesHook(['name']);
let total = 0;
hook.tapAsync('react', function(data, cb) {

    setTimeout(() => {
        console.log('react', data);
    //   cb();
    })

})
hook.tapAsync('node', function(data, cb) {
    setTimeout(() => {
        console.log('node', data);
      cb();
    })

})

hook.callAsync('jw', () => {
    console.log('end');
})