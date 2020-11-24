<template>
  <div>
    course

<!--    <Child :data="obj"></Child>-->
<!--    <button @click="add">改变data</button>-->
<!--    <button @click="addAsync">异步改变data</button>-->
<!--    <div v-for="(item, key) in 9" :key="key" class="wrapper">-->
<!--<div class="item">{{item}}</div>-->
<!--    </div>-->
  </div>
  <!-- 对象遍历 -->
  <!-- <div v-for="(value, key, index) in object" :key="key">
    {{ index }}. {{ key }} - {{ value }}
  </div> -->
</template>


<script>
// import Child from "./child";
export default {
  components: { },
  data() {
    return {
      obj: {
        name: 'zy',
      },
    };
  },
  methods: {
    add() {
      this.$set(this.obj, 'age', 12);
      arr[0] = 5;


      this.$set(this, 'obj', {
        name: 'zy',
        id: 1,
      });
    },
    addAsync() {
      setTimeout(() => {
        this.obj = {
          name: 'zy',
          id: 1,
          hobby: '篮球',
        };
        // this.$set(this, "obj", {
        //   name: "zy",
        //   id: 1,
        //   hobby: '篮球'
        // });
      }, 500);
    },
  },
  // beforeRouteEnter(to,from,next){ // 路由守卫 只有通过路由渲染的才会执行这些钩子
  //   console.log('路由进入前');
  //   next((vm)=>{ //当前组件创建完成后才会执行
  //       console.log(vm);
  //   })
  // },
  // a/1 a/2
  // beforeRouteUpdate(){

  // },
  // beforeRouteLeave(){

  // }
};
</script>
<style lang="stylus">
.wrapper {
  display flex
  .item {
    height 200px
  }
}
</style>
