import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Home = {
  template: `
            <ul class="list_content home">
                <li v-for='i in 100'>{{ i }}</li>
            </ul>
            `,
  data () {
    return {
      timerId: ''
    }
  },
  mounted () {
    // 通过 addEventListener 方法注册事件的时候需要格外小心
    // 如果在 destroyed 钩子函数中没有销毁 scroll 事件
    // 在激活 home 组件的时候会再次绑定 scroll 事件
    // window.addEventListener('scroll', this.justifyPos)
    // 通过 on 方式绑定事件能够有效避免上述情况
    // window.onscroll = this.justifyPos
  },
  methods: {
    justifyPos () {
      // 节流；
      if (this.timerId) clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        // 获取页面滚动距离之后设置给当前路由的 元信息
        this.$route.meta.y = window.pageYOffset
      }, 300)
    }
  },
  destroyed () {
    // 当组件销毁的时候，移除滚动行为监听, 清空定时器；
    // 该方法是绑定到 window 身上，即使跳转到其他组件，仍然会监听页面的滚动行为
    // window.removeEventListener('scroll', this.justifyPos)
    // clearTimeout(this.timerId)
  }
}
const List = {
  template: `
            <ul class="list_content list">
                <li v-for='i in 100'>{{ i }}</li>
            </ul>
            `
}
const About = {
  template: `
            <ul class="list_content about">
                <li v-for='i in 100'>{{ i }}</li>
            </ul>
            `
}

const routes = [
  // 设置 meta，细颗粒控制组件滚动
  {path: '/', component: Home},
  {path: '/list', component: List},
  {path: '/about', component: About}
]
// const scrollBehavior = function (to, from, savedPosition) {
//   return to.meta
// }
const router = new VueRouter({
  routes,
  // scrollBehavior,
  linkExactActiveClass: 'current'
})
export default router;