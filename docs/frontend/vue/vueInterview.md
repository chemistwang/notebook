# 面试题

### 使用vue脚手架，在实际开发中修改过哪些配置，eg: 代理/@

### vue核心小知识点

- vue中key值的作用
- vue中子组件调用父组件的方法
- vue等单页面应用及其优缺点

### v-show 和 v-if 指令的共同点和不同点

都可以实现元素的显示与否
不同的是：
v-show只是简单的基于css切换；
v-if真正条件渲染，条件块内的时间监听器和子组件适当的被销毁和重建

### 如何让css只在当前组件中起作用？原理是什么

vue中scoped属性效果主要通过postcss转译实现，postcss给组件中所有dom添加一个独一无二的动态属性，给css选择器额外添加一个对应属性选择器选择该组件中的dom

``` html
<style>
.hello[data-v-469af010] {border: 1px solid red};
</style>
<div data-v-469af010 class="hello">hello</div>
```

### <keep-alive></keep-alive>的作用是什么

### vue中引入组件的步骤

### 指令 v-el 的作用是什么

### 在vue中使用插件的步骤

### 请简述下vuex的原理和使用方法，数据单向流动

### vue watch 的高级用法 - 监听对象的属性变化

### vue prop 不同数据类型设置默认值

### vue实现组件 props 双向绑定

### active-class是哪个组件的属性？嵌套路由怎么定义？

### 怎么定义vue-router的动态路由？怎么获取传过来的值

### vue-router有哪几种导航钩子

### scss是什么？安装使用的步骤是？有哪几大特性


### v-model是什么？怎么使用？描述使用它实现登陆功能的流程？

### axios+tp5进阶中，调用 axios.post('api/user')是进行什么操作？axios。put('api/user')呢

### 什么是 restful api？ 怎么使用

### vuex是什么？怎么使用？哪种功能场景使用它

### mvvm框架是什么？它和其他框架（jquery）的区别是什么？哪些场景适合

### 自定义指令（v-check，v-focus）的方法有哪些？他有哪些钩子函数？还有哪些钩子函数参数？

### 说出至少4种vue当前指令和它的用法

### vue-router是什么？它有哪些组件

### 导航钩子有哪些？它们有哪些参数

### vue双向数据绑定原理是什么

### 请说下封装vue组件的过程？

### vue-loader是什么？使用它的用途有哪些

### 请说出vue.cli项目中src目录每个文件夹和文件的用法

### vue.cli中怎样使用自定义的组件？有遇到过哪些问题

### 你对vue.js的 template 编译的理解

### vue如何实现父子组件通信，以及非父子组件通信

### vuejs与angularjs以及react的区别

### vuex是用来做什么

### vue源码结构

### webpack打包原理

### gulp构建原理

### vue响应式原理

### vue-router实现原理

### 为什么选择vue？与其他框架对比的优势和劣势


### vue组件有哪些生命周期，说明其触发条件


