<template>
  <div>
      <span>child</span>
      <div v-for="(value, key, index) in data" :key="index">
           {{ index }}. {{ key }} - {{ value }}
        </div>
  </div>
</template>


<script>
export default {
    props:{
        data: {
            type: Object,
            default:() =>{}
        }
    }
  // beforeRouteEnter(to,from,next){ // 路由守卫 只有通过路由渲染的才会执行这些钩子
  //   console.log('路由进入前');
  //   next((vm)=>{ //当前组件创建完成后才会执行
  //       console.log(vm);
  //   })
  // },
  //a/1 a/2
  // beforeRouteUpdate(){

  // },
  // beforeRouteLeave(){

  // }
}
</script>
