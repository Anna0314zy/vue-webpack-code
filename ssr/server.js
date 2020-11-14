const Koa = require('koa');
const Router = require('koa-router');
const Static = require('koa-static'); //静态文件
const path = require('path');
const app = new Koa();
const router = new Router();
const fs = require('fs')
const VueServerRender = require('vue-server-renderer');

//要把上面的vue 放到html文件里 上
//渲染打包后的结果
const ServerBundle = require('./dist/vue-ssr-server-bundle');
const clientMainfest = require('./dist/vue-ssr-client-manifest.json')
const template = fs.readFileSync('./dist/index.ssr.html', 'utf8');
//服务端打包 需要用到客户端的文件
const render =  VueServerRender.createBundleRenderer(ServerBundle, {
    template,
    clientMainfest
});
router.get('/',async ctx => {
    ctx.body = await new Promise((resolve, reject) => {
        // 必须写成回调函数的形式 否则样式不生效
        render.renderToString({url: '/'},(err, data) => {
            if (err) reject(err);
            console.log(data, 'data');
            resolve(data);
        })
    })
})
//还需要把客户端打包的结果挂载上去
app.use(router.routes());
app.use(Static(path.resolve(__dirname, 'dist')));
app.use(async ctx => {
    //如果服务器没有此路径 会渲染当前这个页面
    try{
        ctx.body = await new Promise((resolve, reject) => {
            // 必须写成回调函数的形式 否则样式不生效
            //{url: ctx.url } ===> context
            render.renderToString({url: ctx.url },(err, data) => {
                if (err) reject(err);
                console.log(data, 'data');
                resolve(data);
            })
        })
    }catch(e) {
        ctx.body = '404';
    }
})
app.listen(3000);
//ssr 如何集成路由 路由的跳转规则 何时是服务端渲染
