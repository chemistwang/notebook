# Vue Router

## 源码结构

``` bash
src/
├── components
│   ├── link.js # 定义 <router-link> 组件
│   └── view.js # 定义 <router-view> 组件
├── create-matcher.js # 定义 createMatcher 函数
├── create-route-map.js # 将 routes数组 转化为路由映射表，包含 pathList | pathMap | nameMap 数据项
├── history
│   ├── abstract.js # abstract mode
│   ├── base.js # 定义 History 基类 包含 transitionTo 方法
│   ├── hash.js # hash mode
│   └── html5.js # history mode
├── index.js # 定义 VueRouter 类
├── install.js # 暴露 intall 方法，实现了 beforeCreate 和 destroyed 的混入
└── util # 工具类
    ├── async.js
    ├── dom.js
    ├── errors.js
    ├── location.js
    ├── misc.js
    ├── params.js
    ├── path.js
    ├── push-state.js
    ├── query.js
    ├── resolve-components.js
    ├── route.js
    ├── scroll.js
    ├── state-key.js
    └── warn.js
```


### 怎么定义 vue-router 的动态路由？怎么获取传过来的值


### 导航钩子有哪些？它们有哪些参数

### vue-router 实现原理

----
tmp

怎么重定向 ：routerConfig配置redirect path|name|fn

怎么配置404页面：hash：routerConfig 配置 * notfoundpage | history：nginx配置

切换路由，需要保存草稿功能，如何实现:keep-alive include | exclude | max

几种模式：hash | history | abstract 区别：#

完整导航守卫流程：。。。

路由导航守卫和vue实例生命周期钩子函数执行顺序 。。。
导航守卫三个参数含义：。。。
afterEach可以使用next吗：不能
全局导航有哪些怎么用：beforeEach | beforeResolve |  afterEach | 
什么是路由独享守卫怎么用：。。。
组件内使用的导航守卫：怎么用。。。
beforeRouteEnter可以使用this吗：不能 没有初始化

router-link的了解。。。
to | tag | active-class | replace | append | exact | event | exact-active-class | aria-current-value


怎么在组件中监听路由参数变化：props true
切换路由，新页面滚动到顶部或保持原先滚动怎么做。。。
什么场景使用嵌套路由：父模块子模块，需要父组件的数据
什么是命名视图，举例。。。router-view

如何获取路由传过来的参数：props | $router
路由组件和路由为什么解耦？怎么解耦：。。。
active-class是哪个组件属性：router-link

动态加载路由：。。。
怎么实现路由懒加载：。。。
路由之间怎么跳转，有哪些：router.push |router.replace | router-link to
vue-router 使用history模式，部署需要注意：后端支持

route和router区别:route当前路由信息，router全局

vue路由怎么跳转打开新窗口





