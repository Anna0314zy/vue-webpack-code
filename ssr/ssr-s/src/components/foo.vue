<template>
  <div class="foo">
    foo.vue
    <button @click="click">按钮</button>
    <p style="color: red">我哦我</p>
    {{this.$store.state.name}}
  </div>
</template>
<script>
export default {
  mounted() {
    return this.$store.dispatch("changename");
  },
  asyncData(store) {
    // asyncData 服务端 页面中读取
    console.log('asyncData');
    return store.dispatch("changename");
  },
  methods: {
    click() {
      // alert("点我");
      console.log('点击我');
    },
  },
};
</script>
<style>
@import './foo.css';
.foo{
  color: aquamarine;
  border: 1px solid red;
  height: 500px;
}
</style>