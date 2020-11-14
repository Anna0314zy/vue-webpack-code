 yarn add koa koa-router koa-static
 yarn add vue vue-router vuex vue-server-renderer
 yarn add webpack webpack-cli webpack-dev-server babel-loader @babel/preset-env @babel/core vue-style-loader css-loader vue-loader vue-template-compiler html-webpack-plugin webpack-merge

 npm run client:build -- --watch

 //顺序
 //打包一个 服务端代码 客户端代码
 //服务端代码是给我们生成字符串用的 渲染给前端
 //把客户端代码 渲染到html上