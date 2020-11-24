<template>
<div class="about">
    <h1>其他</h1>
    <Demo></Demo>
  </div>
</template>
<script>
    import Demo from './demo.jsx';
export default {
    components: {Demo},
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
