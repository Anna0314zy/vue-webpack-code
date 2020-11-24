<template>
  <div id="app">
    App.vue
    <router-link to="/">首页</router-link>
    <router-link to="/bar">bar</router-link>
    <router-view></router-view>
    <!-- <Foo></Foo> -->
    <!-- <Bar></Bar> -->
  </div>
</template>
<script>
import Foo from "./components/foo";
import Bar from "./components/bar";
export default {
  components: {
    Foo,
    Bar,
  },
};
</script>