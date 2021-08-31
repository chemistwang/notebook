# 面试题

### 使用 vue 脚手架，在实际开发中修改过哪些配置，eg: 代理/@

### vue 核心小知识点

- vue 中 key 值的作用
- vue 中子组件调用父组件的方法
- vue 等单页面应用及其优缺点

### v-show 和 v-if 指令的共同点和不同点

都可以实现元素的显示与否
不同的是：
v-show 只是简单的基于 css 切换；
v-if 真正条件渲染，条件块内的时间监听器和子组件适当的被销毁和重建

### 如何让 css 只在当前组件中起作用？原理是什么

vue 中 scoped 属性效果主要通过 postcss 转译实现，postcss 给组件中所有 dom 添加一个独一无二的动态属性，给 css 选择器额外添加一个对应属性选择器选择该组件中的 dom

```html
<style>
  .hello[data-v-469af010] {
    border: 1px solid red;
  }
</style>
<div data-v-469af010 class="hello">hello</div>
```

### <keep-alive></keep-alive>的作用是什么

### vue 中引入组件的步骤

### 指令 v-el 的作用是什么

### 在 vue 中使用插件的步骤

### 请简述下 vuex 的原理和使用方法，数据单向流动

### vue watch 的高级用法 - 监听对象的属性变化

### vue prop 不同数据类型设置默认值

### vue 实现组件 props 双向绑定

### active-class 是哪个组件的属性？嵌套路由怎么定义？

### 怎么定义 vue-router 的动态路由？怎么获取传过来的值

### vue-router 有哪几种导航钩子

### scss 是什么？安装使用的步骤是？有哪几大特性

### v-model 是什么？怎么使用？描述使用它实现登陆功能的流程？

### axios+tp5 进阶中，调用 axios.post('api/user')是进行什么操作？axios。put('api/user')呢

### 什么是 restful api？ 怎么使用

### vuex 是什么？怎么使用？哪种功能场景使用它

### mvvm 框架是什么？它和其他框架（jquery）的区别是什么？哪些场景适合

### 自定义指令（v-check，v-focus）的方法有哪些？他有哪些钩子函数？还有哪些钩子函数参数？

### 说出至少 4 种 vue 当前指令和它的用法

### vue-router 是什么？它有哪些组件

### 导航钩子有哪些？它们有哪些参数

### vue 双向数据绑定原理是什么

### 请说下封装 vue 组件的过程？

### vue-loader 是什么？使用它的用途有哪些

### 请说出 vue.cli 项目中 src 目录每个文件夹和文件的用法

### vue.cli 中怎样使用自定义的组件？有遇到过哪些问题

### 你对 vue.js 的 template 编译的理解

### vue 如何实现父子组件通信，以及非父子组件通信,父子传值

### vuejs 与 angularjs 以及 react 的区别

### vuex 是用来做什么

### vue 源码结构

### webpack 打包原理

### gulp 构建原理

### vue 响应式原理

### vue-router 实现原理

### 为什么选择 vue？与其他框架对比的优势和劣势

### vue 组件有哪些生命周期，说明其触发条件

### vuejs 绑定对象内部属性失败的原因或者解决方案
