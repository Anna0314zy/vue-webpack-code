### p-table 组件 封装

简单描述

对el-table的二次分装，因为很多页面都会用到el-table展示表格，一般都会对el-table进行分装，便于对代码的管理，封装组件用起来方便，不用写重复代码，加快开发速度

分装组件用到的知识点简单描述

#### 1.v-model

```js
一般v-model 用于什么 我们一般用于input 这样能实现双向绑定吧

<input v-model="msg">
  
  v-model 其实是个语法糖  input我们不用写逻辑 直接就双向绑定了
  
  :value  子组件value 接受参数 子组件 this.$emit('input', val);
  父组件 监听input的变化 并进行赋值 @input="(val) => this.msg = val"

  实现双向绑定 即子组件变化 父组件也同步变化
```

封装p-table组件

父组件 即我们写的那个页面

![image-20201116134013690](/Users/zouyu/Library/Application Support/typora-user-images/image-20201116134013690.png)

v-model="list"   如何能让v-model 实现双向绑定 

input 直接就能写 v-model 因为vue帮我们做了处理

组件要想用v-model 我们必须自己写

子组件定义props: value  

必须叫value

子组件的值一旦发生变化  我们就去通知父组件

![image-20201116134356196](/Users/zouyu/Library/Application Support/typora-user-images/image-20201116134356196.png)

这样你会发现 父组件绑定的list的值 同步发生变化了

 ```js
v-model 的好处就是
父组件 能少写一个方法
即监听@input="(val) => this.list = val"

v-model其实就是子传父

用v-model 能少写一个 @input="(val) => this.list = val"

为啥能少写 vue帮我们实现了
 ```

v-model 封装组件

#### 2.插槽的用法

定义插槽

![image-20201116140254046](/Users/zouyu/Library/Application Support/typora-user-images/image-20201116140254046.png)

这是我在p-table 定义个一个插槽 

我给插槽起了一个名字 name = "itm.customizeSlotName" 即你在父组件中使用的时候 你自己传过来的 

:props 是啥呢  我把该作用域的值 传给了 slot 你在用的时候就能够拿到这个值



![image-20201116140656086](/Users/zouyu/Library/Application Support/typora-user-images/image-20201116140656086.png)

```js
1. <template #defalut="scope"> 跟 <template slot-scope="scope">
  
  意思是一样的 一般我们都会写成#default 这种是默认插槽
  
2. 如果插槽有名字 
  你定义了一个插槽 <slot name="zou">
  
 你使用的时候 就可以写<template #zou>
  
  3.如果你还给插槽传值了
  var arr = ['1', '2']
  <slot name="zou" :props="arr">
    
    那你使用的时候 就能拿到这个值
  <template #zou=“{props}”> 或者 <template #zou=“scope”>  那你想拿到里面的值 还得scope.props
    
    我直接写成 #zou="{props}" 其实是个解构
```

![image-20201116141238503](/Users/zouyu/Library/Application Support/typora-user-images/image-20201116141238503.png)



#### 3.组件间传值  必会 得多用

组件间传值必须会 多写组件就会了

总结 ： 像昨天你写的那个预览 公共逻辑 你都放在组件里面 ，就可以在每个地方调用了 ，方便代码维护和管理

如果是每个页面都有自己特别的逻辑 都要放到组件外面 

思考  --- 像你们的页面 那个学科的搜索项 是不是模糊下拉的 是不是有好个页面用到 他能不能对el-select二次封装 

假如有一天 课程的接口变了  我们改一个组件是不是就可以



### 九宫格高亮 

![image-20201116145037518](/Users/zouyu/Library/Application Support/typora-user-images/image-20201116145037518.png)

