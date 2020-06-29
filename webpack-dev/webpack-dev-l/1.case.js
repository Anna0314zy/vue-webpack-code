class AsyncSeriesWaterfallHook { // 钩子是同步的
    constructor(args) {
        this.tasks = [];
    }
    tapAsync(name,task) { 
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
       let next = (err, data) => {
        let task = this.tasks[index];
        if (!task || err) return finalCallback();
        if (index === 0) { //执行的第一个
            task(...args, next);
        }else {
            task(data,next);
        }
        index++;
       }
       next();
    }
}
let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('react', function(name, cb) {
    setTimeout(() => {
        console.log('react', name);
        cb(null, 'result');
        // cb('error', 'result');
    }, 1000)

})
hook.tapAsync('node', function(name, cb) {
    setTimeout(() => {
        console.log('node', name);
        // cb(null, 'result');
        cb();
    }, 1000)

})

hook.callAsync('jw',() => {
    console.log('end');
})