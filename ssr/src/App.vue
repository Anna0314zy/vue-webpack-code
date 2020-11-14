<template>
  <div id="app">
    App.vue
    <router-link to="/"></router-link>
    <router-link to="/bar"></router-link>
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