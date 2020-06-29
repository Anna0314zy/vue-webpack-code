<template>
  <div class="content">
    <div class="content-left">
      <div v-for="(item, index) in options" :key="index">
        <div @click="select(item)" class="label">{{item.name}}</div>
      </div>
    </div>
    <div class="content-right" v-if="lists && lists.length">
      <!-- value再传一遍 -->
      <cascadeItems :options="lists" :level="level+1" @change="change" :value="value"></cascadeItems>
      <!-- <div v-for="(item, index) in lists" :key="index">
          <div>{{item.label}}</div>
      </div>-->
    </div>
  </div>
</template>

<script>
//cascade => cascadeItems  cascadeItems => cascadeItems
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "cascadeItems", //必须给当前组件起个名字
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number
    }
  },
  data() {
    return {
      isVisible: false,
      currentSelected: null
    };
  },
  computed: {
    lists() {
      //点击左边算出右边 计算属性
      //如果options变化了  没有更新视图 因为没有依赖options
      //去自己的那一层找自己的儿子
      if (this.value[this.level] && this.value[this.level].id) {
       
        let o = this.options.find(
          item => item.id === this.value[this.level].id
        );
        return o.children;
      }
       return [];
      // return this.currentSelected && this.currentSelected.children;
      // return this.value[this.level] && this.value[this.level].children
    }
  },
  methods: {
    //子组件 要通知前一级的  要触发自己的change  事件  不加会触发的是父亲的事件
    change(item) {
      this.$emit("change", item);
    },
    //   /每次选择了告诉父亲  父亲去更新
    select(item) {
      //需要把数据拷贝一份  把数据改好提交给父亲
      this.currentSelected = item;
      let cloneValue = cloneDeep(this.value);
      cloneValue[this.level] = item;
      //当前点击某一项  就将自己后面加1的所有项都删除
      cloneValue.splice(this.level + 1);
      //第一层触发change事件
      this.$emit("change", cloneValue);
    }
  }
};
</script>
<style lang="stylus" scoped>
.content {
  display: flex;
}
</style>
