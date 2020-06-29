<template>
  <div id="app">
    <myTitle :type='2' :fn="say">hello</myTitle>
    <List :list="arr" :render="render"></List>
     <Table :columns="columns1" :data="data1"></Table>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- 获取选择的数据 -->
    <!-- {{this.value}} -->
    <!-- {{options}} -->
    <cascader :options.sync="options" v-model="value" :lazyLoad="lazyLoad"></cascader>
  </div>
</template>

<script>
import myTitle from './components/myTitle.js'
import List from './components/list.vue'
import cascader from "./components/cascader.vue";
import cityList from "./data.json";
// import cloneDeep from "lodash/cloneDeep";
const fetchData = pid => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove(cityList.filter(item => item.parentId == pid));
    }, 1000);
  });
};
export default {
  name: "App",
  components: {
    cascader,
    myTitle,
    List
  },
  data() {
    return {
      arr: [1,2,3],
      value: [],
      options: [],
       columns1: [
                    {
                        title: 'Name',
                        key: 'name',
                        edit:true
                        // render(h,{row,column,index}) {
                        //   console.log(h,row,column,index);
                        //   return <input></input>
                        // }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
      // arr:[{
      //   a:1
      // }, '3']
    };
  },
  async mounted() {
    console.log(this.arr);
    this.options = await fetchData(0);
  },
  methods: {
    render(h, a) {
      console.log(h, a,'h--');
      return <h1>{a}</h1>
    },
     say() {
            alert(1)
        },
    async lazyLoad(id, callback) {
      //你需要传一个方法  这个方法第一个参数是你选中的id
      let children = await fetchData(id);
      callback(children);
    }
    //点击的数组 怎么知道当前点击的是谁  用户看不懂这个
    // async input(value) {
    //   //需要在组件内部来处理
    //   let currentItem = value[value.length - 1];
    //   console.log(currentItem, 'currentItem');
    //   let children = await fetchData(currentItem.id);
    //   //动态添加数据 响应式的
    //   this.$set(currentItem, 'children', children);
    // },
  }
// 发布包
  //npm addUser 
  //npm publish
};
</script>

<style>
</style>
