### 安装和编译
1.cnpm init -y
2.生成配置文件
tsc --init
- AMD CMD require.js sea.js(退出)
- node commonjs  commonjs2
- es6 module
- umd 兼容以上三种
3.执行编译
vscode Terminal-> run task -> tsc:build 编译
vscode Terminal-> run task -> tsc:watch 编译并监听

配置脚本运行
“build”: 'tsc',
"build:watch": 'tsc --watch',


