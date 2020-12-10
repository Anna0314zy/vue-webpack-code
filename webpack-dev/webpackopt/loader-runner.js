let path = require('path');
let fs = require('fs');

function createLoaderObject(loaderPath) {
    let obj = {data: {}};//data是用来在pitch
    obj.request = loaderPath;//loader这个文件的绝对路径
    obj.normal = require(loaderPath);//正常的loader函数
    obj.pitch = obj.normal.pitch;
    return obj;
}

function defineProperty(loaderContext) {
    Object.defineProperty(loaderContext, 'request', {
        get: function () { //loader1!loader2!loader3!hello.js 所有
            return loaderContext.loaders.map(loader => loader.request).concat(loaderContext.resource).join('!')
        }
    })
    Object.defineProperty(loaderContext, 'remindingRequest', {
        get: function () { //loader3!hello.js 不包括自己+后面
            return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loader => loader.request).concat(loaderContext.resource).join('!')
        }
    })
    Object.defineProperty(loaderContext, 'currentRequest', {
        get: function () {//loader2!loader3!hello.js 包括自己+后面
            return loaderContext.loaders.slice(loaderContext.loaderIndex).map(loader => loader.request).concat(loaderContext.resource).join('!')
        }
    })
    Object.defineProperty(loaderContext, 'previousRequest', {
        get: function () { //loader1 不包括自己的前面
            return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loader => loader.request).join('!')
        }
    })
    Object.defineProperty(loaderContext, 'data', {
        get: function () { //loader1 不包括自己的前面
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    })
}
var isSync = true;
function runLoaders(options, finnallyCallback) {
    let loaderContext = options.context || {}; //loader的上下文环境
    loaderContext.resource = options.resource;
    loaderContext.loaders = options.loaders.map(createLoaderObject);
    loaderContext.loaderIndex = 0; //loaderIndex正在执行的loader的索引
    loaderContext.readResource = options.readResource;
    defineProperty(loaderContext);

    function asyncCallback(err, result) {
        isSync = true;
        loaderContext.loaderIndex--;
        iterateNormalLoaders(loaderContext, result, finnallyCallback);
    }
    loaderContext.async = function () {
        isSync = false; //改成异步
        return asyncCallback;
    }
    iteratePitchingLoaders(loaderContext, finnallyCallback);
    function iteratePitchingLoaders(loaderContext, finnallyCallback) {
        if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
            loaderContext.loaderIndex--;
            return processRescource(loaderContext, finnallyCallback);
        }
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        let pitchFn = currentLoaderObject.pitch;
        if (!pitchFn) {
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext, finnallyCallback)
        }
        let args = pitchFn.apply(loaderContext, [
            loaderContext.remindingRequest,
            loaderContext.previousRequest,
            loaderContext.data]);
        if (args) { //有返回值 不再向后面走了
            loaderContext.loaderIndex--;
            iterateNormalLoaders(loaderContext, args, finnallyCallback);
        }else {
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext, finnallyCallback)
        }
    }
function processRescource(loaderContext,finnallyCallback) {

let result = loaderContext.readResource(loaderContext.resource);
if (!loaderContext.loaders[loaderContext.loaderIndex].normal.raw) {
    result = result.toString('utf8')
}
    iterateNormalLoaders(loaderContext, result, finnallyCallback);
}
function iterateNormalLoaders(loaderContext, args, finnallyCallback) {
    if (loaderContext.loaderIndex < 0) {
       return finnallyCallback(null,args);
    }
    let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
     let normalFn = currentLoaderObject.normal;
     args = normalFn.apply(loaderContext, [args]);
     if (isSync) {
         loaderContext.loaderIndex--;
         iterateNormalLoaders(loaderContext, args, finnallyCallback)
     }

}
}

runLoaders({
    resource: path.resolve(__dirname, 'src', 'hello.js'),//要加载的资源
    // String: Absolute path to the resource (optionally including query string)

    loaders: [//我们要用这三个loader去转换hello.js
        path.resolve('loaders', 'loader1'),
        path.resolve('loaders', 'loader2'),
        path.resolve('loaders', 'loader3')
    ],
    // String[]: Absolute paths to the loaders (optionally including query string)
    // {loader, options}[]: Absolute paths to the loaders with options object

    // context: { minimize: true },
    context: {},
    // Additional loader context which is used as base context

    readResource: fs.readFileSync.bind(fs)
    // A function to read the resource
    // Must have signature function(path, function(err, buffer))

}, function (err, result) {
    console.log(result, 'result');
    // err: Error?

    // result.result: Buffer | String
    // The result

    // result.resourceBuffer: Buffer
    // The raw resource as Buffer (useful for SourceMaps)

    // result.cacheable: Bool
    // Is the result cacheable or do it require reexecution?

    // result.fileDependencies: String[]
    // An array of paths (files) on which the result depends on

    // result.contextDependencies: String[]
    // An array of paths (directories) on which the result depends on
})
