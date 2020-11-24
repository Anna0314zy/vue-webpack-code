<template>
  <div id="app">
    <my-tree
      :data.sync="data"
      :fileDrop="fileDrop"
      :diectoryDrop="diectoryDrop"
      :delete="deletefn"
    ></my-tree>
    <my-select></my-select>
  </div>
</template>
<script>
import myTree from "./components/myTree";
import mySelect from './components/el-select'
import { getTreeList } from "../api";
export default {
  components: {
    myTree,
    mySelect
  },
  data() {
    return {
      data: [],
      fileDrop: [{ text: "rm", value: "删除文件" }],
      diectoryDrop: [
        { text: "rm", value: "删除文件" },
        { text: "rn", value: "编辑文件" },
      ],
    };
  },
  async mounted() {
    let { data } = await getTreeList();
    data.parent.forEach((p) => (p.type = "parent"));
    this.data = [...data.parent, ...data.child];
    console.log(data, "data");
    // {1:{name:'文件夹1',pid:0,id:1}
  },
  methods:{
    deletefn(){
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          console.log(reslove, reject);
          return reslove();
        }, 1000)
      })
    },
  }
};
</script>

