# vue2.0

## vue基础

### 1.为啥data 是个函数

为了保证每个组件都有自己独立的作用域 这与js的特性有关

### 2.this.$set

https://www.cnblogs.com/heavenYJJ/p/9559439.html

```js

```

### 3.如何匹配模板里面的{{}}

### 4.指令

```js
export default (Vue) => {
  Vue.directive('loadmore', {
    bind (el, binding, vnode) {
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      SELECTWRAP_DOM.addEventListener('scroll', function () {
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
        if (CONDITION) {
          binding.value()
        }
      })
    }
  })
}
```

### 5.transition

```js
import  Velocity from 'velocity-animate'
https://www.cnblogs.com/zhaobao1830/p/7171408.html
```

### 6.postcsss

### 7.异步组件

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})

```

对于异步加载组件想提供一个加载状态

```js
这里的异步组件工厂函数也可以返回一个如下格式的对象：
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

封装

```js
const AsyncComponent = (asyncFunction) => {
  const component = () => ({
    component: asyncFunction(),
    loading: Loading,
  });

  // 最终要返回一个组件，组件需要有render，通过render 在去渲染一个异步组件
  return { // cli 默认不支持模板
    render(h) {
      return h(component);
    },
  };
  // 组件是一个对象 会变成render函数
};
//配合路由使用
{
    path: '/profile',
    name: 'profile', // import()
    // 匹配到路径后才会加载这个组件
    component: AsyncComponent(() => import('@/views/Profile/index.vue')),
}
    
 坑：一定要把浏览器缓存清掉 才能看到效果 network -- disabled cache
```

### 8.封装路由(cobe-ui-project)

1.router --- index.js

```
router.beforeEach((to, from, next) => {
 ``// ...
})
```

```js
Object.values(hooks).forEach((hook) => {
  router.beforeEach(hook.bind(router)); //
});
```

2.hooks

```js
// 根路由相关的hook 钩子 全局钩子
import store from '@/store';
import * as types from '@/store/action-type';
import auth from './auth';

export default {
  // 标识 当前的hook的作用
  cancelToken: (to, from, next) => {
    // 清除token
    store.commit(types.CLEAR_TOKEN); // 清除所有的请求
    next(); // 继续王下走
  },
  permisson: async (to, from, next) => {
    // 如果用户没有登陆 访问了课程页 就要访问登录页
    // 在页面切换的时候 拿到当前状态 是否登录
    // 我们1要知道用户是否登录 2） 要知道哪个页面是需要登录的
    const needLogin = to.matched.some(item => item.meta.needLogin);
    // 可以做一个白名单
    //  let pages = ['/', 'xxx']
    // 判断    next();
    console.log(to, '', needLogin, needLogin, store.state.hasPermisson, 'hasPermisso');
    // hasPermisson 是否拉取过权限
    // const token = localStorage.getItem('token');
    // 如果用户 把本地的token 删除了怎么办呢
    // console.log(store.state.hasPermisson && token, 'token---');
    if (!store.state.hasPermisson) {
      const flag = await store.dispatch(types.VALIDATE);
      console.log(flag, 'flag', needLogin, 'needLogin');
      if (needLogin) { // 如果需要登录 并且没登录就跳转到登录页面
        if (!flag) {
          next('/login');// 需要登录但是没登录
        } else {
          next(); // 需要登录已经登录
        }
      } else {
        // 不需要登录
        if (to.name === 'login') {
          if (!flag) {
            next(); // 没登录 直接登录
          } else {
            next('/profile'); // 登录过了 去登录中心
          }
        }
        next(); // 不需要登录
      }
    } else {
      // 有权限
      // 还是访问登录页的话
      if (to.name === 'login') {
        next('/');
      }
      next();
    }
  },
  //这里必须是一个普通函数，this是外面绑定过来的
  profileAuth(to, from, next) {
    // 根据当前用户权限 动态加载路由
    if (store.state.hasPermisson && store.state.user && store.state.user.menuList) {
      if (!store.state.menuPermisson) {
        const list = store.state.user.menuList.map(item => item.auth);

        const newRoutes = auth.filter(item => list.includes(item.name));
        //
        this.addRoutes(newRoutes); // 把需要的路由新增进,是在下一轮才会生效
        store.commit(types.SET_MENU_LIST);
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
    next();
  },
};

```

### 9.封装api.js(cobe-ui-project)

弹窗的封装 api-loading的封装 添加拦截器

```js
import axios from 'axios'; // 基于promise
import {
  Toast,
} from 'cube-ui';
import store from '@/store';
import * as types from '@/store/action-type.js';
import router from '@/router';
// axios可以配配置拦截器 我可以给实例增加多个拦截器
// axios 实例的唯一性 ，我可以给，每个请求 独立增加拦截器

// 开发的时候 localhost  /xxx
class AjaxRequest {
  constructor() {
    // development production
    this.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api'
      : '/'; // 基础路径
    this.timeout = 3000; // 超时时间
    // message组件
    this.queue = {}; // 请求队列
  }

  setInterceptor(instance, url) {
    instance.interceptors.request.use((config) => { // 请求拦截
      console.log('请求前');
      const Cancel = axios.CancelToken;
      const isCancel=axios.isCancel;
      // 每次请求前 将token 放到请求中
      config.headers.token = localStorage.getItem('token') || '';
      config.cancelToken = new Cancel(((c) => {
        console.log(c);
        store.commit(types.PUSH_TOKEN, c); //订阅
      }));
      // 请求前  增加请求队列
      if (Object.keys(this.queue).length === 0) {
        this.toast = Toast.$create({
          txt: '正在加载',
          time: 0,
        });
        this.toast.show();
      }
      this.queue[url] = url;
      return config;
    }, err => Promise.reject(err));
    instance.interceptors.response.use((res) => { // 响应拦截
      delete this.queue[url];
      // 请求完成删除对应的url 当队列被情况隐藏掉
      if (Object.keys(this.queue).length === 0) {
        this.toast.hide();
      }
      // res.data.code = 401;
      if (res.data.code === 0) {
        return res.data.data;
      }
      return Promise.reject(res.data);
    }, (err) => {
      delete this.queue[url];
      // 请求完成删除对应的url 当队列被情况隐藏掉
      if (Object.keys(this.queue).length === 0) {
        this.toast.hide();
      }
      if(isCancel) {
        console.log('主动取消请求');
      }else {
         Promise.reject(err);
      }
    });
  }

  request(options) {
    const instance = axios.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
    };
    // 给这个实例增加拦截器
    this.setInterceptor(instance, options.url); // 给这个实例增加拦截功能
    return instance(config); // 返回的是一个promise
  }
}

export default new AjaxRequest();
// new AjaxRequest().request({
//   url: 'xxxx',
//   xxasd
// }).then(data => {

// })

```

### 10.动态添加菜单 菜单权限

(cobe-ui-project)

#### 1.store--index.js

```js
  state: {
    user: {}, //user.meauList
    hasPermisson: false, //校验通过 记录是否登录
    menuPermisson: false,//记录是否加载过有权限的路由
    ajaxToken: [], // 准备一个容器放所有请求
  },
    mutations: {
    [types.SET_USER](state, payload) {
      state.user = payload;
      state.hasPermisson = true;
    },
    [types.SET_MENU_LIST](state) {
      state.menuPermisson = true;
    },
  },
    //路由加载
     router.beforeEach(to, from, next) {
    // 根据当前用户权限 动态加载路由
    if (store.state.hasPermisson && store.state.user && store.state.user.menuList) {
      if (!store.state.menuPermisson) {
        const auths = store.state.user.menuList.map(item => item.auth);//后台给的权限
        const newRoutes = formatList(authRoutes,auths)
        this.addRoutes(newRoutes); // 把需要的路由新增进,是在下一轮才会生效
        store.commit(types.SET_MENU_LIST); //记录下已经拉取菜单列表
        next({ ...to, replace: true });//必须手动next一下 因为把需要的路由新增进,是在下一轮才会生效
      } else {
        next();
      }
    }
    next();
  },
    //获取权限列表
      const formatList = (authRoutes,auths)=>{
  return authRoutes.filter(route=>{
    if(auths.includes(route.name)){
      if(route.children){
        route.children = formatList(route.children,auths)
      }
      return true
    }
  })
}
}
```

```js


```





#### 2.login.js

登录页面

```js

```

### 11.api.cancelToken

应用场景 

1.路由切换的时候 之前页面的请求都取消掉

2.或者tab栏切换的时候，异步返回前后的问题 保证当前请求的是自己想要的数据，切换的时候 取消之前的请求

```js
store文件夹
1.--actionTypes
// 4） 存储token  和 执行存储的token
export const PUSH_TOKEN = 'PUSH_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN'
2.--store.index.js 定义方法
mutations: {
    [types.PUSH_TOKEN](state, cancel) {
      state.ajaxToken = [...state.ajaxToken, cancel]; //保证是新创建的对象
    },
    [types.CLEAR_TOKEN](state) {
      state.ajaxToken.forEach(cancel => cancel());
      state.ajaxToken = [];
    }
}
3.-api.js 订阅
instance.interceptors.request.use((config) => { // 请求拦截器
      const Cancel = axios.CancelToken;
      const isCancel=axios.isCancel; //判断是不是取消的请求
      config.cancelToken = new Cancel(((c) => {
        store.commit(types.PUSH_TOKEN, c); //订阅
      }));
 4.--路由切换的时候触发
   router.beforeEach(to, from, next) => {
    // 清除token
    store.commit(types.CLEAR_TOKEN); // 清除所有的请求
    next(); // 继续王下走
  },
```

### 12.vuex的用法

#### 1.声明常量

目的：防止调用方法的时候变量名字拼写错误

Action-types

```js
// 1) 分类功能
export const SET_CATEGORIES = 'SET_CATEGORIES';
// 2) 添加当前选中的课程
export const SET_CURRENT_LESSON = 'SET_CURRENT_LESSON'

```

#### 2.定义方法 store--index.js

分模块化

定义home模块的store数据，index.js去引入home模块

```js
export default new Vuex.Store({
  modules: {
    home,
  },
  state: {},
  mutations: {},
  actions: {}
});
```

```js
home模块
import { fetchCategory, fetchSlides } from '@/api/home';
import * as types from '../action-type';
export default {
  namespaced: true,
  state: {
    categories: [],
    currentLesson: -1,
    slides: [],
  },
  actions: {
    //异步方法
    async [types.SET_CATEGORIES]({ commit }) {
      const categories = await fetchCategory();
      commit(types.SET_CATEGORIES, categories);
    },
    async [types.SET_SLIDES]({ commit }) {
      const slides = await fetchSlides();
      commit(types.SET_SLIDES, slides);
    },
  },
  mutations: {
    // 设置分类的
    [types.SET_CATEGORIES](state, payload) {
      state.categories = payload;
    },
    [types.SET_SLIDES](state, payload) {
      state.slides = payload;
    },
    [types.SET_CURRENT_LESSON](state, payload) {
      state.currentLesson = payload;
    }
  },
};
```

#### 3.使用

如果想直接引用store的方法

this.$store.dispatch('home/setCategories');  //store的action方法

如果是mutation方法 直接this.$store.commit('');

```js
import { createNamespacedHelpers } from 'vuex'; // 跟import { mapActions } from 'vuex'二选一
import HomeHeader from './HomeHeader';
// import { mapActions } from 'vuex';
import * as types from '@/store/action-type.js';
import { fetchLessonList } from '@/api/home';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers('home');//直接把引入了该模块
 computed: {
    ...mapState(['categories', 'slides']), //store.state数据
  },
    mounted() {
     // this.$store.dispatch('home/setCategories'); 
      this[types.SET_CATEGORIES]();
      this[types.SET_SLIDES]();
    },
     methods: {
    // 切换课程
    // ...mapActions('home', ['setCategories']), //如果是直接因为import { mapActions } from 'vuex' 需要加模块名字
    ...mapActions([types.SET_CATEGORIES, types.SET_SLIDES]),//store.mutations 被隐射成方法使用
    ...mapMutations([types.SET_CURRENT_LESSON]),
    change(value) {
      this[types.SET_CURRENT_LESSON](value[0]);
      this.hasMore = true;
      this.offsetIndex = 0;
      this.$refs.list.reset();
    }
  },
```

### 13.keepAlive 

应用场景 用户来回切换的时候 需要保留住位置

- 给 router-view 添加 keep-alive

- 获取并存储当前 scrollTop

- 返回时取出并设置 scrollTop

     <keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。所以在由详情页返回列表页时，不让列表页刷新。

  当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

  ```js
  mounted() {
      // 防抖 - 不停的滚动 最后只触发一次 靠定时器
      // 节流 一直滚动 不定期的触发 靠时差
      let timer;
    //this.$refs.list.$el 获取滚动元素的真实dom添加滚动事件
      this.$refs.list.$el.addEventListener('scroll', (e) => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          console.log(e.target.scrollTop);
          sessionStorage.setItem('position', e.target.scrollTop);
        }, 50);
      });
    },
      
       activated() { // 激活 不会渲染dom 设置定位
      const position = sessionStorage.getItem('position') || 0;
      this.$refs.list.$el.scrollTop = position;
    },
  ```

## ssr服务端渲染

https://ssr.vuejs.org/zh/ 官网介绍

如何手写实现一个服务端渲染

## 开发中遇到的问题

### vue优化

#### 1.el-select下拉返回大量数据

```js
<template>
    <div class="content">
        <el-select v-model="choose" size="small" v-el-select-loadmore:rangeNumber="loadMore(rangeNumber)">
            <el-option
                    v-for="(item, index) in list.slice(0, rangeNumber)"
                    :key="index"
                    :label="item.label"
                    :value="item.value"></el-option>
        </el-select>
        <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
    </div>
</template>

<script>
    import Vue from "vue";
            Vue.directive(
        'el-select-loadmore', {
            bind(el, binding) {
                // let self = this
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    /**
                     * scrollHeight 获取元素内容高度(只读)
                     * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                     * clientHeight 读取元素的可见高度(只读)
                     * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                     * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                     */
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight; //表示下面没有内容了
                    if (condition) binding.value()
                });
            }
        }
    )
    export default {
        data() {
            return {
                list: [],
                choose: "",
                rangeNumber: 10,
            }
        },
        created(){
            this.getList()
        },
        methods: {
            getList(){
                for(let i = 0; i < 100000; i++){
                    this.list.push({
                        label: "menu",
                        value: "menu"
                    })
                }//测试数据10万条数据, 这里数据多少条无所谓,list.slice(0, rangeNumber)方法只会默认加载初始的10条数据
            },
            loadMore(){
              //也可以写成从接口获取数据的
                //n是默认初始展示的条数会在渲染的时候就可以获取,具体可以打log查看
                //if(n < 8) this.rangeNumber = 10 //elementui下拉超过7条才会出滚动条,如果初始不出滚动条无法触发loadMore方法
                return () => this.rangeNumber += 5 //每次滚动到底部可以新增条数  可自定义
            },
        }
    }
</script>
```



https://blog.csdn.net/weixin_41698051/article/details/107070908

搞清clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop

https://imweb.io/topic/57c5409e808fd2fb204eef52

## table长列表优化

插件vue-virtual-scroll-list

### 1.表格头固定

```js
 <template>
    <div class="table-wrapper" ref="tableWrapper">
<!--        表头-->
        <div :style="{'height':height + 'px'}" class="scroll-box" ref="scrollBox">
            <table :class="['table', {border:border, stripe:stripe}]" ref="table">
                <thead>
                <tr>
                    <th style="width:50px">
                        <input type="checkbox" :checked="checkedAll" ref="checkedAll" @change="changeAll">
                    </th>
                    <th v-for="column in columns" :key="column.key">
                        <div class="th-head">
                            {{column.title}}
                            <span v-if="column.key in orderBy" @click="sortChange">排序</span>
                        </div>
                    </th>
                </tr>
                </thead>
                <!--        表体-->
                <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td style="width:50px">
                        <input type="checkbox" @change="changeItem(row, $event)" :checked="isChecked(row)">
                    </td>
                    <td v-for="column in columns" :key="column.key">
                        {{row[column.key]}}
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

if(this.height) {
               //固定表头必须有height属性
               this.table = this.$refs.table; //table
               this.tableWrapper = this.$refs.tableWrapper; //table
               //拷贝一个空表格
               let copyTable = this.$refs.table.cloneNode();//不传参数true只能拷贝父节点
               let thead = this.table.children[0];
               //先取高度再移走
               this.tableWrapper.style.paddingTop = thead.getBoundingClientRect().height + 'px';

               copyTable.appendChild(thead);//将thead移动到新新的空表格上
               //被拷贝的元素就没有了
               this.tableWrapper.appendChild(copyTable);//将拷贝后的插入到新的表格中
               copyTable.classList.add('fixed-header')
           }
```

### 2.事件环机制

宏任务 -> 微任务-> ui界面渲染

宏任务只执行一个 微任务批量执行

```js
let total = 10000;
    //新版本浏览器优化 当js执行完成后会一并的插入到dom中
    let index = 0;
    let id = 0;
    const container = document.getElementById('root');
    function load() {
        if (index < total) {
            // requestAnimationFrame 也是一个宏任务 可以配合浏览器
            requestAnimationFrame(() => {
                let fragment = document.createDocumentFragment();
                for(let i = 0; i < 20; i++) {  //ie浏览器要实现一个优化 需要使用文档碎片
                    let li = document.createElement('li');
                    li.innerHTML = id++;
                    fragment.appendChild(li)
                }
                container.appendChild(fragment);
                //新浏览器 监测到你在不断在加dom 会合并成一次操作 优化下 先创建文档碎片
                load();
            })
        }
    }
    load();
    //分片加载 会导致页面dom元素过多 会造成卡顿
    //虚拟列表优化 只渲染当前的可视区域
```

### 3.实现

插件vue-virtual-scroll-list

1.每个元素高度确认 size每条高度  remain 可视区域的高度

```js
<template>
<!-- 能滚动盒子 -->
  <div class="viewport" ref="viewport" @scroll="scrollFn">
    <!-- 自己做一个滚动条 -->
    <div class="scrollBar" ref="scrollBar"></div>
    <!-- 真实渲染的内容 -->
    <!-- 定位定位到窗口 -->
    <div class="scroll-list" :style="{transform:`translate3d(0,${offset}px,0)`}">
      <div v-for="(item,index) in visibleData" :key="item.id" :vid="item.index" ref="items">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>
.viewport {
  overflow-y: scroll;
  position: relative;
}

.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
```

```js
// 1.固定高度
  // 2.不知道每行的高度怎么办
  //3.用户提前把所有的数据都拉回来了
  //4.variable 导致的问题 滚动条太高或者太低 需要动态的计算滚动条的高度
  import throttle from 'lodash/throttle'
export default {
  name: "virtual-list-zy.vue",
  props: {
    items: Array, //一共有多少数据
    size: Number, //当前每一个的高度
    remain: Number, //可见多少个
    variable: Boolean
  },
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: 0
    };
  },
  computed: {
    //算可视区域的数据 会根据start end 自动截取渲染
    visibleData() {
      let start = this.start - this.prevCount;
      let end = this.end + this.nextCount;
      return this.items.slice(start, end);
    },
    //前面预留几个 默认前面多this.remain 个 后面多this.remain
    prevCount() {
      return Math.min(this.start, this.remain); //如果数据只有5个
    },
    //后面预留几个
    nextCount() {
      return Math.min(this.remain, this.items.length - this.end); //还剩3个 8个
    }
  },
  created() {
    this.scrollFn =throttle(this.handleScroll, 200, {leading: false});//200毫秒不会重复触发 leading 第一次不触发
  },
  mounted() {
    this.$refs.viewport.style.height = this.size * this.remain + "px";
    this.$refs.scrollBar.style.height = this.items.length * this.remain + "px";
    //1.如果加载完毕 我需要缓存每一项的高度
    this.cacheList();
    //2.等一会滚动的时候 去渲染页面的时候去获取真实dom的高度 然后去更新缓存的高度
    // 3.然后再重新计算滚动条的高度
  },
  updated(){
    // 获取真实元素的位置 更新top和bottom;
    if (!this.variable) return;
    this.$nextTick(()=>{
      //更具当前显示 更新缓存中的 hight top height  最终更新滚动条 的高度
      let nodes = this.$refs.items;
      if(!(nodes && nodes.length >0)){
        return
      }
      nodes.forEach(node=>{
        let rect = node.getBoundingClientRect(); //获取dom节点的高度
        let height = rect.height; //真实的高度
        let index = +node.getAttribute('vid'); //可以把字符串变成数字
        let oldHeight = this.positions[index].height;
        let val = oldHeight - height; //看当前的跟预期的有没有变化
        // console.log(val);
        if(val){ //如果缓存的高度 与当前的高度一致 就不用更新了
          // 先更新自己
          this.positions[index].height = height;
          //高度变高了 top不会变 bottom会变
          this.positions[index].bottom = this.positions[index].bottom - val;
          //后面的人的top bottom 都要向后移动
          for(let i = index+1;i<this.positions.length;i++){
            this.positions[i].top = this.positions[i-1].bottom; //上一个人的值
            this.positions[i].bottom = this.positions[i].bottom - val;  //后续的人都要往后移动
          }
        }
      })
      //设置滚动条高度   只要更新过 会算出滚动条高度
      this.$refs.scrollBar.style.height = this.positions[this.positions.length-1].bottom +'px';
    });
  },
  methods: {
    cacheList() { //缓存当前项的高度 和top值还有bottom
      this.positions = this.items.map((item, index) => ({
        top: index * this.size,
        height: this.size,
        bottom: (index + 1) * this.size
      }))

    },
    //二分查找  查找当前的位置
    getStartIndex(value) { //查找当前滚动需要查找的值
      let positions = this.positions;
      let start = 0; //开头
      let end = this.positions.length - 1; //结束的位置 查找的都是索引
      let temp = null; //可能会滑到2.3
      while (start <= end) {
        let middleIndex = parseInt((start + end) / 2);
        let middleValue = this.positions[middleIndex].bottom; //找到当前的中间的结尾点
        if (value == middleValue) { //如果直接找到了 就返回下一个人
          return middleIndex + 1;
        } else if (middleValue < value) { //当前查找的人在右边
          start = middleIndex + 1;
        } else if (middleValue > value) {

          if (temp == null || temp > middleIndex) { //当前查找的人在左边
            temp = middleIndex; //找到范围
          }
          end = middleIndex - 1;
        }
      }
      return temp; //返回的永远是当前滑到位置的前一个
    },
    handleScroll() {
      //1.先算出来滚过去几个了 当前应该从第几个显示
      let scrollTop = this.$refs.viewport.scrollTop; //拿到用户当前用户滚动的距离
      // console.log(scrollTop);  scrollTop / this.size  3.25 滚过去多少个了
      if (this.variable) {
        //说明要使用二分查找对应的记录
        this.start = this.getStartIndex(scrollTop);
        console.log(this.start);
        this.end = this.start + this.remain;
        this.offset = this.positions[this.start - this.prevCount] ? this.positions[this.start - this.prevCount].top: 0;
      }else {
        //2.获取当前应该从第几个显示
        this.start = Math.floor(scrollTop / this.size); //1.7 取1
        //3.计算当前结尾的位置
        this.end = this.start + this.remain; //当前可渲染的区域
        //4.定位当前的可视区域 让当前渲染的内容在当前viewport可视区域内
        //5.如果有预先加载的 要减去预先加载的部分
        this.offset = this.start * this.size - this.prevCount * this.size; //源码用的paddingTop
      }
    }
  }
};
```

## jsx

Vue-cli3不用配置.babelrc否则会报错

```
transpileDependencies: ["element-ui"] //跑element-ui源码
```



## 知识点

### 1.promise

### 2.遍历数组

1. menuList: [{pid: -1, name: "购物车", id: 1, auth: "cart"}, {pid: 1, name: "购物车列表", id: 4, auth: "cart-list"},…]

2. 1. 0: {pid: -1, name: "购物车", id: 1, auth: "cart"}
   2. 1: {pid: 1, name: "购物车列表", id: 4, auth: "cart-list"}
   3. 2: {pid: 4, name: "彩票", id: 5, auth: "lottery"}
   4. 3: {pid: 4, name: "商品", id: 6, auth: "product"}

需要遍历是树结构

//做一个映射表

```js
const routeMap = result.menuList.reduce((memo, current) => {
  memo[current.id] = current;
  return memo;
}, {});
1. 1:{pid: -1, name: "购物车", id: 1, auth: "cart"}
2. 4: {pid: 1, name: "购物车列表", id: 4, auth: "cart-list"}
3. 5: {pid: 4, name: "彩票", id: 5, auth: "lottery"}
4. 6: {pid: 4, name: "商品", id: 6, auth: "product"}
//遍历 result.menuList 找上下属关系
 const meauList = result.menuList.reduce((prev, current) => {
  const {pid} = current;
   const parent = routeMap[pid];
   if(parent) {
     prev.children = prev.children ? prev.children.push(current) : [current];
   }else if (pid === -1) {
     prev.push(current);
   }
   return prev;
}, []);

```

### 3.改变this

注意：箭头函数无法改变this指向

1.call和apply会调用函数,并且改变函数内部this的指向
2.call和apply传递的参数不一样,call传递参数aru1,aru2…形式 , apply必须数组形式
3.bind 不会调用函数,可以改变函数内部this指向
主要应用场景
1.call经常做继承
2.apply经常跟数组有关系,比如借助于数学对象实现数组最大值最小值
3.bind不调用函数,但是还想改变this指向,比如改变定时器内部的this指向

```js
arr.slice() 浅拷贝
[...childNodes] 可以转化类数组为数组
var ids = new Set();
ids.has(id) //看看有没有 ids.add(id) 添加新的

```

### 4.正则

````js
//fontSize => font-size
function transform(str) {
    const reg = /([A-Z])/g;
   return str.replace(reg, function() {
        return '-' + String(arguments[1]).toLocaleLowerCase();
    })
}
````

### 5.鼠标

![mouse](/Users/zouyu/Desktop/vue-webpack-code/notes/img/mouse.png)

![mousemove](/Users/zouyu/Desktop/vue-webpack-code/notes/img/mousemove.png)

![mousedown](/Users/zouyu/Desktop/vue-webpack-code/notes/img/mousedown.png)

### 6.getBoundingClientRect

用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。

rectObject.top：元素上边到视窗上边的距离;

rectObject.right：元素右边到视窗左边的距离;

rectObject.bottom：元素下边到视窗上边的距离;

rectObject.left：元素左边到视窗左边的距离;

<img src="/Users/zouyu/Desktop/vue-webpack-code/notes/img/rect.png" alt="rect" style="zoom:50%;" style="text-align:left"/>

### 7.resize

import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';

源码中使用了库 resize-observer-polyfill

封装了元素的resize方法 

ResizeObserver是新的实验中的API，可以通过构造一个 ResizeObserver 对象以观察者模式监听任意 Element / SvgElement 的尺寸变化。除了chrome 64+ 和最新的 Edge Insider版支持，其他浏览器均不支持此API。但有第三方的polyfill方案，可以支持到 FF44+，IE9+，Edge 10+ ，Safari 11+ ，兼容方案是通过 MutationObserver API 实现的，通过监听 dom 的变化并加以判断，至此主流浏览器均可运行。非轮询监控，所以不会造成性能问题。

### 8.組件通信

Element-ui 封裝了組件通信方法

其实这里的broadcast与dispatch实现了一个定向的多层级父子组件间的事件广播及事件派发功能。完成多层级分发对应事件的组件间通信功能。

broadcast通过递归遍历子组件找到所需组件广播事件，而dispatch则逐级向上查找对应父组件派发事件。

broadcast需要三个参数，componentName（组件名），componentName（事件名称）以及params（数据）。根据componentName深度遍历子组件找到对应组件emit事件eventName。

dispatch同样道理，需要三个参数，componentName（组件名），componentName（事件名称）以及params（数据）。根据componentName向上级一直寻找对应父组件，找到以后emit事件eventName。

```js
function broadcast(componentName, eventName, params) {
  /*遍历当前节点下的所有子组件*/
  this.$children.forEach(child => {
    /*获取子组件名称*/
    var name = child.$options.componentName;

    if (name === componentName) {
      /*如果是我们需要广播到的子组件的时候调用$emit触发所需事件，在子组件中用$on监听*/
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      /*非所需子组件则递归遍历深层次子组件*/
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    /*对多级父组件进行事件派发*/
    dispatch(componentName, eventName, params) {
      /*获取父组件，如果以及是根组件，则是$root*/
      var parent = this.$parent || this.$root;
      /*获取父节点的组件名*/
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        /*当父组件不是所需组件时继续向上寻找*/
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      /*找到所需组件后调用$emit触发当前事件*/
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /*
        向所有子组件进行事件广播。
        这里包了一层，为了修改broadcast的this对象为当前Vue实例
    */
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};

```

# git

1.git pull 拉取线上代码

2.git add .    提交所有本地

3.git commit  -m'提交内容'

4.git pull

5.git push  先Git pull 与线上代码合并 再Git push

5.git status

modified:   src/index.js

查看本地改变内容

6.Git checkout .   放弃所有代码修改

git checkout --  src/index.js  放弃对某个文件的修改

7.git diff

add 之前可以看到本地都做了哪些修改

1.在git push的时候，有时候我们会想办法撤销git commit的内容

```js
1、找到之前提交的git commit的id
git log
找到想要撤销的id
2、git reset –hard id
完成撤销,同时将代码恢复到前一commit_id 对应的版本
3、git reset id
完成Commit命令的撤销，但是不对代码修改进行撤销，可以直接通过git commit 重新提交对本地代码的修改
```

2.分支branch1 的commit 移动到branch2

```js
切换到branch 2 
git cherry-pick commitid
在本地仓库中，有两个分支:branch1和branch2，我们先来查看各个分支的提交
```

