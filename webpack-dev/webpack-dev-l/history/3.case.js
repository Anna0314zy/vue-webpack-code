class SyncWaterfallHook { // 钩子是同步的
    constructor(args) {
        this.tasks = [];
    }
    tap(name,task) { 
        this.tasks.push(task);
    }
    call(...args) {
        console.log(this.tasks, 'this.tasks');
       let [first, ...others] = this.tasks;
       let ret = first(...args);
       //迭代
       others.reduce((a, b) => {
            return b(a);
       }, ret)
        
    }
}
let hook = new SyncWaterfallHook(['name']);
hook.tap('react', function(name) {
    console.log('react', name);
    return 'react ok'
})
hook.tap('node', function(name) {
    console.log('node', name);
    return 'node ok'
})
hook.tap('webpack', function(name) {
    console.log('webpack', name);
    return 'node ok'
})

hook.call('jw');