<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <p-table v-model="list" :columns="columns" :func="getList" :load="load">
      <!-- 引用组件的时候 我们这中间是写不了任何东西的 -->
      <!-- 如果组件内部 给我们留了个插槽 我们这里写的东西 到时候显示的位置就是p-table内部分装的插槽的位置 -->
      <!-- 为啥用插槽 因为用组件的时候 有的页面可能存在特殊需求 我们得留个插槽 别人用组件的时候好写自己的逻辑 -->
      <template #man="{props}"> 
        <el-input v-model="props.row.man"></el-input>
      </template>

    </p-table>
    <div @mousemove="handleMouseMove">改变列宽</div>
    <table class="wrapper">
      <thead>
      <tr>
        <th>ror</th>
        <th>rr</th>
        <th>rr</th>
        <th>rr</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>rr</td>
        <td>rrr</td>
        <td>rr</td>
        <td>rr</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import pTable from "../components/p-table";
import Mock from "mockjs";
export default {
  name: "Home",
  components: {
    pTable,
  },
  data() {
    return {
      list: [],
      columns: [
        { label: "姓名", prop: "name", width: 200,sortable: true },
        { label: "年龄", prop: "age", width: 190 },
        { label: "喜欢的文字", prop: "str", width: 190 },
        { label: "手机号", prop: "phone", width: 100 },
        {
          label: "喜欢的男神",
          prop: "man",
          width: 100,
          customizeSlotName: "man",
        },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleMouseMove() {
      const bodyStyle = document.body.style;
      bodyStyle.cursor = 'col-resize';
    },
    getList() {
      let res = [];
      for (let i = 0; i < 25; i++) {
        res.push({
          id: i,
          name: Mock.Random.cname(),
          age: Mock.mock("@integer(1,100)"),
          str: Mock.Random.cword(9),
          hasChildren: i === 2 ? true : false,
          phone: Mock.mock("@integer(10000)"),
        });
      }
      return new Promise((reslove) => {
        setTimeout(() => {
          reslove({
            total: 1,
            list: res,
          });
        }, 1000);
      });
    },
    load() {
      let res = [];
      for (let i = 0; i < 2; i++) {
        res.push({
          id: i + 100,
          name: Mock.Random.cname(),
          age: Mock.mock("@integer(1,100)"),
          str: Mock.Random.cword(9),
          phone: Mock.mock("@integer(10000)"),
        });
      }
      console.log(res, "res");
      return new Promise((reslove) => {
        setTimeout(() => {
          reslove(res);
        }, 1000);
      });
    },
  },
};
</script>
<style>
  .wrapper {
    border: 1px solid #ccc;
    th, td {
      padding: 10px;
      border: 1px solid #ccc;
    }
  }
</style>
