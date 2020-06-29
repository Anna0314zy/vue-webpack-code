<template>
  <div class="cascader" v-clickOutside="close">
    <div class="title" @click="toggle">{{result}}</div>
    <div class="content" v-if="isVisible">
      <cascaderItems :options="options" :value="value" :level="0" @change="change"></cascaderItems>
    </div>
  </div>
</template>

<script>
//可以在全局挂个事件，当点击的时候校验一下点击的是否是cascader的内容
//判断当前点击的是否在某个元素
//如果你希望对某个元素拥有一系列的操作 可以封装一个自定义指令（）
import { clickOutside } from "../directives/clickOutside";
import cascaderItems from "./cascader-items";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "cascade",
  props: {
    lazyLoad: {
      type: Function
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  components: {
    cascaderItems
  },
  data() {
    return {
      isVisible: false
    };
  },
  directives: {
    clickOutside
  },
  computed: {
    result() {
      return this.value.map(item => item.name).join("/");
    }
  },
  watch: {
    options() {
      // console.log(this.options, "this.options");
    },
    deep: true
  },
  created() {
    // console.log(this.lazyLoad, 'lazyLoad');
  },
  methods: {
    handle(id, children) {
      console.log(id, children, "handle");
      let cloneOptions = cloneDeep(this.options);
      //去树中如何找到当前
      //遍历树 采用深度 和广度
      let stack = [...cloneOptions];
      let index = 0;
      let current;
      while ((current = stack[index++])) {
        //广度遍历
        if (current.id !== id) {
          if (current.children) {
            stack = stack.concat(current.children);
          }
        } else {
          break;
        }
      }
       if (current) {
          current.children = children; //动态添加儿子节点
          //通知父亲
          this.$emit("update:options", cloneOptions);
        }
    },
    change(value) {
      // console.log(value, "value");
      // console.log(this.lazyLoad, 'lazyLoad');
      //获取点击的是谁 调用用户的lazyLoad方法
      let lastItem = value[value.length - 1];
      let id = lastItem.id;
      //我需要给当前id这项添加一个children属性
      if (this.lazyLoad) {
        console.log(this.lazyLoad, "this.lazyLoad");
        this.lazyLoad(id, children => this.handle(id, children));
      }
      this.$emit("input", value);
    },
    close() {
      this.isVisible = false;
    },
    // //显示隐藏
    toggle() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>
<style lang="stylus">
.cascader {
  display: inline-block;
  // border: 1px solid #ccc;
}

.title {
  min-width: 150px;
  height: 30px;
  border: 1px solid #ccc;
}

.content {
  display: flex;
}

.content-left {
  border: 1px solid #ccc;
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
}

.label {
  width: 80px;
  padding-left: 5px;
}

.label:hover {
  background-color: #999;
  cursor: pointer;
}
</style>
