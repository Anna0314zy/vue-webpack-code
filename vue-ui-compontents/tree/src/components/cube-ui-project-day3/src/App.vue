<template>
  <div id="app">
    <div class="container">
      <transition :name="move">
<!--        内部会缓存虚拟节点 -&#45;&#45; 直接将缓存的结果返回-->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition :name="move">
        <!--        内部会缓存虚拟节点 -&#45;&#45; 直接将缓存的结果返回-->
        <keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="footer">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @change="changeHandler">
      </cube-tab-bar>
    </div>
  </div>

<!--      <transition :name="move">-->
<!--        &lt;!&ndash; 会根据路径切换 来显示对应的页面 &ndash;&gt;-->

<!--        &lt;!&ndash; 内部缓存虚拟节点 直接将缓存后的结果返回 &ndash;&gt;-->
<!--        <keep-alive>-->
<!--          <router-view v-if="$route.meta.keepAlive"></router-view>-->
<!--        </keep-alive>-->
<!--      </transition>-->

<!--      <transition :name="move">-->
<!--          <router-view v-if="!$route.meta.keepAlive"></router-view>-->
<!--      </transition>-->
<!--    </div>-->
<!--    <div class="footer">-->
<!--      <cube-tab-bar v-model="selectedLabelDefault" :data="tabs" @change="changeHandler"></cube-tab-bar>-->

</template>
<script>
export default {
  data() {
    return {
      selectedLabelDefault: '/',
      move: 'slide-left',
      tabs: [
        {
          label: '首页',
          value: '/', // value选中的值
          icon: 'iconfont icon-xingqiu',
        },
        {
          label: '我的课程',
          value: '/course',
          icon: 'iconfont icon-react',
        },
        {
          label: '个人中心',
          value: '/profile',
          icon: 'iconfont icon-xiaolian',
        },
      ],
    };
  },
  watch: {
    // 监控路由属性的变化
    $route: {
      handler(to, from) {
        if (to && from) {
          if (to.meta.idx > from.meta.idx) {
            this.move = 'slide-left';
          } else {
            this.move = 'slide-right';
          }
        }
        this.selectedLabelDefault = to.path;
      },
      immediate: true,
    },
  },
  methods: {
    changeHandler(label) {
      // if you clicked different tab, this methods can be emitted
      this.$router.push(label);
    },
  },
};
</script>

<style lang="stylus">
html, body, #app {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  overflow: scroll;
}

.footer {
  background: #f2f2f2;
}

.cube-tab {
  i {
    font-size: 22px;
    line-height: 26px;
  }
}

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.4s linear;
}

.slide-left-enter-active, .slide-right-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.slide-right-enter {
  transform: translate(-100%);
}

.slide-right-leave-to {
  transform: translate(100%);
}

.slide-left-enter {
  transform: translate(100%);
}

.slide-left-leave-to {
  transform: translate(-100%);
}

.wrapper{
  position absolute;
  height 100%;
  left:0;
  top:0;
  width 100%;
  z-index 10;
  background #fff
}
</style>
