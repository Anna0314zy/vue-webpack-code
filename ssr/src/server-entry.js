//客户端
import createApp from './main'


//服务端需要调用当前这个文件产生一个vue实例

export default context => {
    // 因为这边 router.onReady 是异步的，所以我们返回一个 Promise
    // 确保路由或组件准备就绪
    const { app, router, store } = createApp();
    return new Promise((resolve, reject) => {
        router.push(context.url)
        router.onReady(() => {
            let matchs = router.getMatchedComponents();
            if (matchs.length === 0) {
                reject({ code: 404 });
            }
            //matchs 匹配到的所有组件 整个都在服务端执行
            Promise.all(matchs.map(component => {
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

