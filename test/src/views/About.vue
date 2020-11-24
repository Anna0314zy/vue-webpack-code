<template>
<div class="about">
    <h1>九宫格高亮</h1>
    <div class="wrapper">
      <div 
      v-for="item in 9" 
      :key="item" 
      @mouseenter="hover(item)" 
      @click="hclick(item)"
      :class="['item', {active: active===item}]">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
     active: ''
    }
  },
  methods:{
    hover(item) {
      this.active = item;
      console.log(item, 'hover');
    },
    hclick(item){
       this.active = item;
      console.log(item, 'hover');
    }
  }
}
</script>
<style lang="css" scoped>
.wrapper {
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  
}
.item {
     width:200px;
     height: 200px;
     border: 1px solid #ccc;
     box-sizing: border-box;
     margin-left: -1px;
     margin-bottom: -1px;
      position: relative;
  }
.active.item {
  border: 1px solid red;
  z-index: 2;
}
</style>
