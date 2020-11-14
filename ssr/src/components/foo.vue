<template>
  <div class="foo">
    foo.vue
    <button @click="click">按钮</button>
  </div>
</template>
<script>
export default {
  mounted() {
    return store.dispatch("changename");
  },
  asyncData(store) {
    // asyncData 服务端 页面中读取
    return store.dispatch("changename");
  },
  methods: {
    click() {
      alert("点我");
    },
  },
};
</script>
<style scoped>
div {
  color: aquamarine;
}
</style>