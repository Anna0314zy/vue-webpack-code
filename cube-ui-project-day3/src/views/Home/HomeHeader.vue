<template>
  <div>
    <div class="header">
      <img src="@/assets/images/logo.png" class="logo" />
      <span class="iconfont icon-liebiao" @click="show"></span>
    </div>

    <cube-drawer ref="drawer" title="请选择" :data="data" @select="selectHandler"></cube-drawer>
  </div>
</template>
<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    data() {
      const defaultActive = [{ text: '全部课程', value: -1 }];
      return [[...defaultActive, ...this.categories]];
    },
  },
  methods: {
    selectHandler(value) {
      this.$emit('change', value);
    },
    show() {
      console.log(this.$refs.drawer, 'this.$refs.drawe');
      this.$refs.drawer.show();
    },
  },
};
</script>
<style lang="stylus">
.header {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background: #2a2a2a;
}

.logo {
  width: 150px;
}

.icon-liebiao {
  color: #fff;
}
</style>
