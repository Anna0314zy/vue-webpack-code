实现可以在命令行 中 运行代码
zf-cli install
zf-cli config
bin文件夹  www --> 告诉使用哪些文件

src 源文件 
ES6 语法转译

npm install babel-cli babel-env

sudo npm link
//以上 把zf-cli 变成命令行  直接敲  zf-cli


## 需要的包
npm i eslint ---生成配置文件 npx eslint --init 初始配置化文件

How would you like to use ESLint? · style
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript


import program from 'commander' -- zf-cli --help 解析用户传入的参数
npm i ini


npm i babel-runtime babel-plugin-transform-runtime -D


cat ~/.zfclirc  查看c盘 用户下面的文件

npm i request // 可以帮助我们请求别人的仓库

npm i ora //下载包的时候 一直会转圈

npm i inquirer //用户可以选择下载哪个包

npm i download-git-repo 在git中下载模板

npm i chalk 粉笔帮我们在控制台画出各种各样的颜色

npm i metalsmith 读取所有的文件实现模板渲染

npm i consolidate  统一模板引擎


npm i download-git-repo // 

### 需要实现一下功能

zf-cli create project-name

zf-cli config set repo repo-name

https://developer.github.com/v3/repos/

npm i ncp  ---拷贝用 

npm i metalsmith consolidate ejs-- 复杂项目需要用户选择后才能编译

//发包
nrm use npm
npm addUser
npm publish

npm unlink
npm install zf-cli -g
npm uninstall zf-cli --force

