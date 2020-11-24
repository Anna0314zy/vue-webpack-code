//客户端
import createApp from './main'


//服务端需要调用当前这个文件产生一个vue实例

export default context => {
    // 因为这边 router.onReady 是异步的，所以我们返回一个 Promise
    // 确保路由或组件准备就绪

    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();
        router.push(context.url);//跳转到路由
        //如果服务端直接访问、foo 返回的页面永远是index,html 需要通过路由跳转到相应的路径
        //为了防止路由中的异步逻辑 采用promise 等待路由加载完成后才渲染页面
        router.onReady(() => {
            let matchs = router.getMatchedComponents();//router给服务端用 匹配到的路由
            console.log(matchs, 'matchs');
            if (matchs.length === 0) {
                reject({ code: 404 });
            }
            //matchs 匹配到的所有组件 整个都在服务端执行
            Promise.all(matchs.map(component => {
                console.log(component, component.asyncData, 'component.asyncData');
                if (component.asyncData) {
                    //asyncData 在服务端执行
                    return component.asyncData(store);
                }
            })).then(() => {
                //以上 all中的方法会改变 store中的state
                context.state = store.state; //告诉客户端 store数据变化了 会放到windoo上
                resolve(app)
            })

        }, reject)
    })
    //获取数据的操作
}
//服务端配置好后 需要导出给node使用

// import { createApp } from './app'

