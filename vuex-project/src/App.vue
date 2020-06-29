<template>
  <div id="app">
    他的年龄好小：{{$store.state.age}}
    {{$store.state.a.a}}
    {{$store.getters.myAge}}
    {{this.$store.getters.computedC}}
    <br>
    <button @click="add">按钮</button>
    <button @click="minus">異步減少</button>
     {{this.$store.getters.computedC}}
    </div>
</template>
<script>
// import HemlloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
  },
  mounted() {
    console.log(this.$store,this.$store._modules);
    //这种写法不对
    // setInterval(() => {
    //   this.$store.state.age+=1;
    // }, 1000)
  },
  methods: {
    add() {
      this.$store.commit('syncAdd', 10);
    },
    minus() {
      this.$store.dispatch('asyncMinus', 10);
    }
  }
}
</script>

<style>
</style>
