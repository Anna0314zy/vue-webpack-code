// const Koa = require('koa');
const Router = require('vue-router');
// const Static = require('koa-static'); //静态文件
const path = require('path');
// const app = new Koa();
const express = require("express");
const router = new Router();
const fs = require('fs')
const {createBundleRenderer} = require('vue-server-renderer');
const app = express();
//要把上面的vue 放到html文件里 上
//渲染打包后的结果
const ServerBundle = require('./dist/vue-ssr-server-bundle');
const clientManifest = require('./dist/vue-ssr-client-manifest.json') //这样不用每次都要重启一下 node server.js
const template = fs.readFileSync('./dist/index.ssr.html', 'utf8');
//服务端打包 需要用到客户端的文件
// const render =  VueServerRender.createBundleRenderer(ServerBundle, {
//     template,
//     clientMainfest
// });
const renderer= createBundleRenderer(ServerBundle, {
    runInNewContext: false, // 推荐
    template, // （可选）页面模板
    clientManifest // （可选）客户端构建 manifest
  })
//   app.get('/',async ctx => {
//     ctx.body = await new Promise((resolve, reject) => {
//         // 必须写成回调函数的形式 否则样式不生效
//         renderer.renderToString({url: '/'},(err, data) => {
//             if (err) reject(err);
//             console.log(data, 'data');
//             resolve(data);
//         })
//     })
// })
app.get("/", async (req, res) => {
    try {
        const context = {
            url: req.url,
            title: 'ssr test'
        }
      console.log(req.url);
      const html = await renderer.renderToString(context); // 之前接收vue实例，现在接收上下文
      console.log(html);
      res.send(html);
    } catch (error) {
      console.log(error);
      res.status(500).send("服务器内部错误");
    }
  });
//还需要把客户端打包的结果挂载上去
// app.use(router.routes());
// app.use(Static(path.resolve(__dirname, 'dist')));
// 中间件处理静态文件请求
app.use(express.static(path.join(__dirname, 'dist')))
// app.use(express.static('../dist/client.bundle.js', {index: false})) // 为false是不让它渲染成dist/client/index.html
// app.use(express.static('../dist/client'))
// app.use(async ctx => {
//     //如果服务器没有此路径 会渲染当前这个页面
//     try{
//         ctx.body = await new Promise((resolve, reject) => {
//             // 必须写成回调函数的形式 否则样式不生效
//             //{url: ctx.url } ===> context
//             render.renderToString({url: ctx.url },(err, data) => {
//                 if (err) reject(err);
//                 console.log(data, 'data');
//                 resolve(data);
//             })
//         })
//     }catch(e) {
//         ctx.body = '404';
//     }
// })
app.get("*", async (req, res) => {
    try {
        const context = {
            url: req.url,
            title: 'ssr test'
        }
      console.log(req.url, 'req.url');
      const html = await renderer.renderToString(context); // 之前接收vue实例，现在接收上下文
      console.log(html);
      res.send(html);
    } catch (error) {
      console.log(error);
      // res.status(500).send("服务器内部错误");
    }
  });
// // 在服务器处理函数中……
// app.get('*', (req, res) => {
//     const context = { url: req.url }
//     // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
//     // 现在我们的服务器与应用程序已经解耦！
//     renderer.renderToString(context, (err, html) => {
//       // 处理异常……
//       res.end(html)
//     })
//   })
app.listen(3000);
//ssr 如何集成路由 路由的跳转规则 何时是服务端渲染
