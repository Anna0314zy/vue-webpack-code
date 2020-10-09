# vue2.0

## 一.vue基础

### 1.为啥data 是个函数

为了保证每个组件都有自己独立的作用域 这与js的特性有关

### 2.this.$set

https://www.cnblogs.com/heavenYJJ/p/9559439.html

```js

```

### 3.如何匹配模板里面的{{}}

### 3.指令

```js
export default (Vue) => {
  Vue.directive('loadmore', {
    bind (el, binding, vnode) {
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      SELECTWRAP_DOM.addEventListener('scroll', function () {
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
        if (CONDITION) {
          binding.value()
        }
      })
    }
  })
}
```



## 开发中遇到的问题

### 1.下拉框返回1000条数据

### 2.优化问题

https://blog.csdn.net/weixin_41698051/article/details/107070908

# 小知识点

## 1.js

```js
arr.slice() 浅拷贝
[...childNodes] 可以转化类数组为数组
var ids = new Set();
ids.has(id) //看看有没有 ids.add(id) 添加新的

```

