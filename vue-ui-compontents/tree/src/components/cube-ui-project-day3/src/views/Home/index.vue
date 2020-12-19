<template>
  <div class="home">
    <!-- header部分 -->
    <HomeHeader :categories="categories" @change="change"></HomeHeader>
    <!-- 轮播图部分 -->
    <div class="home-slide">
      <cube-slide :data="slides"/>
    </div>
    <!-- 当前滚动区域的包裹 -->
    <div class="home-wrapper">
      <!-- size 每次的个数 offset 距离底部的偏移量 -->
      <cube-recycle-list class="list" :size="size" :on-fetch="onFetch" :offset="offset" ref="list">
        <template slot="item" slot-scope="{ data }">
          <div :id="data.id" class="item">
            <h2>{{data.title}}</h2>
            <img :src="data.pic" />
            <p>{{data.price | addCurrency('￥')}}</p>
          </div>
        </template>
      </cube-recycle-list>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import HomeHeader from './HomeHeader';
// import { mapActions } from 'vuex';
import * as types from '@/store/action-type.js';
import { fetchLessonList } from '@/api/home';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers('home');
export default {
  data() {
    return { size: 5, offset: 50 };
  },
  components: {
    HomeHeader,
  },
  computed: {
    ...mapState(['categories', 'slides']),
  },
  created() {
    // 页面一创建可以定义一些公共数据 这些数据 属性不需要动态的监控
    this.offsetIndex = 0;
    this.hasMore = true;
  },
  mounted() {
    // this.$store.dispatch('home/setCategories');
    this[types.SET_CATEGORIES]();
    this[types.SET_SLIDES]();
    // 防抖 - 不停的滚动 最后只触发一次 靠定时器
    // 节流 一直滚动 不定期的触发 靠时差
    let timer;
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
  activated() { // 激活 不会渲染dom
    const position = sessionStorage.getItem('position') || 0;
    this.$refs.list.$el.scrollTop = position;
  },
  deactivated() { // 失活

  },
  methods: {
    // 抓取列表数据
    async onFetch() {
      if (this.hasMore) {
        try {
          const { result, hasMore } = await fetchLessonList(this.size, this.offsetIndex);
          this.hasMore = hasMore;
          this.offsetIndex = this.offsetIndex + result.length;
          return result;
        } catch (e) {
          return false;
        }
      }
      return false;
    },
    // 切换课程
    // ...mapActions('home', ['setCategories']),
    ...mapActions([types.SET_CATEGORIES, types.SET_SLIDES]),
    ...mapMutations([types.SET_CURRENT_LESSON]),
    change(value) {
      this[types.SET_CURRENT_LESSON](value[0]);
      this.hasMore = true;
      this.offsetIndex = 0;
      this.$refs.list.reset();
    },

  },

};
</script>


<style lang="stylus" >
img {
  width: 100%;
  max-width: 100%;
}

.home {
  &-slide {
    width: 100%;
    height: 150px;
  }

  &-wrapper {
    height: calc(100vh - 300px);
    width: 80%;
    margin: 10px auto 0;

    .item {
      display: flex;
      border: 1px solid #ccc;
      border-radius: 10px;
      flex-direction: column;
      justify-content: center;
      height: 250px;
      margin-bottom: 10px;

      img {
        width: 100%;
      }

      h2, p {
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>


// vuex 1） 可以存到内存中 只要用户不刷新 我就可以去内存中取
// 如果有了 我可以选择不重复调用接口

// 2) 如果多个页面 有共同逻辑 调用共同的action 即可

// vuex 数据变化 会更新视图

// window.xxx = {},重新掉接口 或者 去local里区2

// 权限问题
