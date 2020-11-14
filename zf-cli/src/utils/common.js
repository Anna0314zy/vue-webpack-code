export let betterRequire = (absPath) => {
    // console.log(absPath, 'absPath');
    let modules = require(absPath);
    // console.log(modules, 'modules');
    if (modules.default) {
        // console.log(modules.default, 'modules.default');
        return modules.default
    }
    
    return modules;
}
