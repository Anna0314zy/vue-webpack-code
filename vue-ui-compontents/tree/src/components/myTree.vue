<template>
  <el-tree
    :data="Alldata"
    default-expand-all
    :render-content="render"
    :expand-on-click-node="false"
  ></el-tree>
</template>
<script>
import _ from "lodash";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    fileDrop: {
      type: Array,
      default: () => [],
    },
    diectoryDrop: {
      type: Array,
      default: () => [],
    },
    delete: Function,
  },
  data() {
    return {
      Alldata: [],
      currentId: "",
      currentContent: "",
    };
  },
  watch: {
    data() {
      this.transferData();
    },
  },
  mounted() {},
  methods: {
    isParent(data) {
      return data.type === "parent";
    },
    handleRename(data) {
      this.currentId = data.id;
      console.log(data.id === this.currentId);

      this.currentContent = data.name;
    },
    remove(id) {
      console.log("remove");
      let list = _.cloneDeep(this.data);
      console.log(list);
      list = list.filter((l) => l.id !== id);
      console.log(list, "list");
      this.$emit("update:data", list);
    },
    handleRemove(data, val) {
      this.$confirm(`此操作将永久删除该文件, ${data.name}是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delete
            ? this.delete(data.id).then(() => {
                this.remove(data.id, val);
              })
            : this.remove(data.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCommand(data, val) {
      console.log("handleCommand", val);
      if (val === "rn") {
        this.handleRename(data, val);
      } else if (val === "rm") {
        this.handleRemove(data, val);
      }
    },
    handleInput(val) {
      console.log(val, 'handleinput');
      this.currentContent = val;
    },
    ok(data) {
      let list = _.cloneDeep(this.data);

      let item = list.find((l) => l.id === data.id);
      item.name = this.currentContent;
      this.currentId = '';
      this.$emit("update:data", list);
    },
    cancel() {
      this.currentId = "";
    },
    render(h, { node, data }) {
      console.log(data);
      let list = this.isParent(data) ? this.diectoryDrop : this.fileDrop;
      return (
        <div>
          {this.isParent(data) ? (
            node.expanded ? (
              <i class="el-icon-folder-opened"></i>
            ) : (
              <i class="el-icon-folder"></i>
            )
          ) : (
            <i class="el-icon-document"></i>
          )}
          {data.id === this.currentId ? (
            <el-input value={this.currentContent} on-input={this.handleInput}></el-input>
          ) : (
            data.name
          )}

          {/**bind绑定时会将之前的参数向后移动 */}
          {this.currentId !== data.id ? (
            <el-dropdown
              placement="bottom-start"
              trigger="click"
              on-command={this.handleCommand.bind(this, data)}
            >
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                {list.map((item) => (
                  <el-dropdown-item command={item.text}>
                    {item.value}
                  </el-dropdown-item>
                ))}
              </el-dropdown-menu>
            </el-dropdown>
          ) : (
            <span style={{ float: "right" }}>
              <el-button
                size="mini"
                type="text"
                on-click={this.ok.bind(this, data)}
              >
                确认
              </el-button>
              <el-button size="mini" type="text" on-click={this.cancel}>
                删除
              </el-button>
            </span>
          )}
        </div>
      );
    },
    transferData() {
      let Alldata = _.cloneDeep(this.data);
      let treeMapList = Alldata.reduce((memo, current) => {
        memo[current["id"]] = current;
        return memo;
      }, {});
      //   console.log(treeMapList, "treeMapList");
      let res = Alldata.reduce((arr, current) => {
        current.label = current.name;
        //   console.log(arr, current, "arr-current");
        let pid = current.pid;
        let parent = treeMapList[pid];
        if (parent) {
          parent.children
            ? parent.children.push[current]
            : (parent.children = [current]);
        } else if (pid === 0) {
          arr.push(current);
        }
        return arr;
      }, []);
      this.Alldata = res;
    },
  },
};
</script>
<style scoped></style>
