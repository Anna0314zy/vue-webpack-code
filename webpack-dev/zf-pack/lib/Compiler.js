let fs = require('fs');
let path = require('path');
let babylon = require('babylon');//源代码转换成语法树
let  traverse = require('@babel/traverse').default;//用来遍历语法树的节点并且对节点增删改
let t = require('@babel/types');//判断某种节点是否指定类型 或者用来生成一个新节点
let generator = require('@babel/generator').default;//用来把语法树重新编程代码
//源代码 -> babylon转成语法树-->traverse遍历节点--->types生成新的节点替换老节点->generator重新生成代码
let ejs = require('ejs');
let {SyncHook} = require('tapable')
class Compiler {
   constructor(config) {
    this.config = config;
    //需要保存入口文件的路径
    this.entryId; // './src/index.js
    // 需要保存所有得到依赖模块
    this.modules = {};
    this.entry = config.entry;
    //工作路径
    this.root = process.cwd();
    this.hooks = {
        entryOption: new SyncHook(),
        compile: new SyncHook(),
        afterCompile: new SyncHook(),
        afterPlugins: new SyncHook(),
        run: new SyncHook(),
        emit: new SyncHook(),
        done:new SyncHook()
    }
    //如果配置了plugin
    let plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
        plugins.forEach(plugin => {
            plugin.apply(this);
        })
    }
    this.hooks.afterPlugins.call();
   }
   getSource(modulePath) {
    //    console.log(this.config, 'this.config.module.rules');
       let rules = this.config.module.rules;
       let content = fs.readFileSync(modulePath, 'utf8');
    //    console.log(content, 'content----');
       for (let i = 0; i < rules.length; i++) {
           let rule = rules[i];
           let {test, use} = rule;
           let len = use.length - 1;
           if (test.test(modulePath)) { //这个模块需要loader转化
            function normalLoader() {
                let loader = require(use[len--]);
                content = loader(content);
                //递归调用loader
                if (len >= 0) {
                    normalLoader();
                }
            }
            normalLoader();
           }
       }
       return content;
   }
   //解析源码
   parse(source, parentPath) { // AST解析语法树
    // console.log(source, parentPath);
    let ast = babylon.parse(source);
    let dependencies = []; //依赖的数组
    traverse(ast, {
        //解析  require ('./a.js') =?替换成 __webpack_require__  './src/a/js'
        CallExpression(p) { // a require
            let node = p.node;
            if (node.callee.name === 'require'){
                node.callee.name = '__webpack_require__';
                let moduleName = node.arguments[0].value; //模块 引用的名字 './a'
                //path.extname 如果path以 ‘.' 为结尾，将返回 ‘.'，如果无扩展名 又 不以'.'结尾，将返回空值。
                moduleName = moduleName + (path.extname(moduleName) ? "" : '.js');
                moduleName = './'+path.join(parentPath, moduleName); // 'src/a.js'
                dependencies.push(moduleName);
                node.arguments = [t.stringLiteral(moduleName)];
            }

        }
    })
    let sourceCode = generator(ast).code;
    return {sourceCode, dependencies};
   }
   //构建模块
   buildModule(modulePath, isEntry) {
    let source = this.getSource(modulePath); // require('./a.js') => 加上父路径 './src/a.js'
    //modulePath = modulePath - this.root
    let moduleName = './' + path.relative(this.root, modulePath);
    // console.log(source, moduleName); // moduleName 'src/index.js
    if (isEntry) {
        this.entryId = moduleName; //保存入口的名字
    }
    //解析需要把source源码进行改造  返回个依赖列表
    let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName))  //
    // console.log(sourceCode, dependencies);
    this.modules[moduleName] = sourceCode;
    dependencies.forEach(dep => { // 模块循环加载
        //path.join(this.root, dep) 绝对路径  false  附模块的加载
        this.buildModule(path.join(this.root, dep), false)
    })
   }
   emitFile() { //发射文件
     //用数据渲染 拿到呼出到哪个目录下
     //输出路径
    let main =  path.join(this.config.output.path, this.config.output.filename);
    //模板路径
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
    let code = ejs.render(templateStr, {
        entryId: this.entryId,
        modules: this.modules
    })
    this.assets ={};
    //资源中路径对应的diamante
    this.assets[main] = code;
    // console.log(main, this.assets[main], 'this.assets[main]')
    fs.writeFileSync(main, this.assets[main]);
   }
   run() {
    this.hooks.run.call();
    // 执行 并创建模块的依赖关系 解析当前依赖
    this.hooks.compile.call();
    this.buildModule(path.resolve(this.root, this.entry), true);
    //发射一个文件  打包后的文件
    // console.log(this.modules, this.entryId);
    this.hooks.afterCompile.call();
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
   }
}
module.exports = Compiler;
