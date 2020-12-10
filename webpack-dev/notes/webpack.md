webpack

1. 
   rm -rf node_modules
2. rm package-lock.json
3. npm cache clear *--force*

23.webpack自带优化

```js
1.import from  语法优化  在生产环境打包时没用到的会tree-shaking
2.作用域提升 webpack会省略掉简单的代码
```

24.抽离公共代码

```js
当配置了externals 就打包不出了
externals:{
    
}

通过webpack打包提取公共代码
提取公共代码的必要性
网站都是由多个页面组成的，一般来说所有的页面采用的都是相同的技术栈，要么都是Vue，都是React，要么都是Angular，采用的技术是一致的，既然是一致的，就会有公共的代码，有很多代码是相同的，如果每个页面都将这些相同的公共代码包含进去，会引起一些问题。

相同的资源配重复加载，造成了资源的浪费，（最后的静态资源包会很大）
每个页面打开的时间会变长（影响用户体验）
因为第一个原因，导致了第二个原因，所以我们将公共代码抽离出来，在用户打开一个页面的时候，顺便加载了公共的文件，在打开其他页面的时候，如果其他页面也引用了这个公共文件，就不用重新加载，直接从浏览器缓存中获取，这么做解决了以上的两个问题。
有人说通过cdn加载公共静态资源也可以解决以上问题，对此，我说：

什么是CDN
内容分发网络，加速网络传输，就是通过将资源部署到世界各地，用户访问时按照就近原则从最近的服务器获取资源，来提高获取资源的速度，cdn就是对http的提速
 

image

综合以上，cdn在数据传输层面上降低了用户打开首页的时间，和webpack提取公共打码不是一个方向
 

如何提取公共代码？
从webpack4开始官方移除了commonchunk插件，改用了optimization属性进行更加灵活的配置，这也应该是从V3升级到V4的代码修改过程中最为复杂的一部分
splitChunks: {
    chunks: "async”,//默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
    minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
    minChunks: 1,  // 表示被引用次数，默认为1；
    maxAsyncRequests: 5,  //所有异步请求不得超过5个
    maxInitialRequests: 3,  //初始话并行请求不得超过3个
   automaticNameDelimiter:'~',//名称分隔符，默认是~
    name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
    cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
       common: {
         name: 'common',  //抽取的chunk的名字
         chunks(chunk) { //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
         },
         test(module, chunks) {  //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。自己尝试过程中发现不能提取出css，待进一步验证。
         },
        priority: 10,  //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
       minChunks: 2,  //最少被几个chunk引用
       reuseExistingChunk: true，//  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
       enforce: true  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
       }
    }
}
复制代码
公共模块抽离
举例：

项目中分别有a.js, b.js, page1.js, page2.js这四个JS文件， page1.js 和 page2.js中同时都引用了a.js, b.js， 这时候想把a.js, b.js抽离出来合并成一个公共的js，然后在page1, page2中自动引入这个公共的js，怎么配置呢？如下： 
配置webpack.config.js文件

复制代码
module.exports = {
  //...
 
  //优化项配置
  optimization: {
    // 分割代码块
    splitChunks: {
      cacheGroups: {
        //公用模块抽离
        common: {
          chunks: 'initial', 
          minSize: 0, //大于0个字节
          minChunks: 2 //抽离公共代码时，这个代码块最小被引用的次数
        }
      }
    }
  }
}
复制代码
 

第三方模块抽离
页面中有时会引入第三方模块，比如import $ from 'jquery'; page1中需要引用，page2中也需要引用，这时候就可以用vendor把jquery抽离出来，方法如下：

复制代码
module.exports = {
  //...
 
  //优化项配置
  optimization: {
    // 分割代码块
    splitChunks: {
      cacheGroups: {
 
        //公用模块抽离
        common: {
          chunks: 'initial',
          minSize: 0, //大于0个字节
          minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
        },
        
        //第三方库抽离
        vendor: {
          priority: 1, //权重
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0, //大于0个字节
          minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
        }
      }
    }
  }
}
```

25.懒加载

**npm install @babel/plugin-syntax-dynamic-import --save-dev**

```js
import('./js').then(data => {
    console.log(data.default);
})
```

26热更新

27.Tapable

```js

```



