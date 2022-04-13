# 基础

:::tip
- [create-react-app](https://create-react-app.dev/)
- [react router](https://reactrouter.com/)
- [v5 reactrouter](https://v5.reactrouter.com/)
- [v6 reactrouter](https://reactrouter.com/docs/en/v6)
- [react](https://reactjs.org/)
:::


## 1. React是什么

React是一个UI框架，通过组件化的方式解决视图层开发复用的问题，本质是一个组件化框架。
它的核心设计思路有三点，分别是声明式、组件化与通用性。
声明式的优势在于直观与组合。
组件化的优势在于视图的拆分与模块复用，可以更容易做到高内聚低耦合。
通用性在于一次学习，随处编写。比如React Native，React 360等，这里主要依靠虚拟DOM来保证实现。
这使得React的适用范围变得足够广，无论是Web、Native、VR，甚至Shell应用都可以进行开发。这也是React的优势。
但作为一个视图层的框架，React的劣势也十分明显。他并没有提供一揽子的解决方案，在开发大型前端应用时，需要向社区寻找并整合解决方案。
虽然一定程度上促进的社区的繁荣，但也为开发者在技术选型和学习适用上造成了一定的成本。

## 2. 为什么React要用JSX

- 一句话解释JSX

JSX是一个JavaScript的语法扩展
或者说是一个类似于XML的ECMAScript语法扩展
 
React并不强制使用JSX
React需要将组件转化为虚拟DOM树，
XML在树结构的描述上天生具有可读性强的优势


- 核心概念

React团队并不想引入除JS以外的开发体系

- 方案对比

模板：1. 弱关注点分离，2. 引入概念多
模板字符串：1. 结构描述复杂，2. 语法提示差
JXON：语法提示差

:::tips
Babel插件如何实现JSX到JS的编译（手写）

::: 

## 3.如何避免生命周期中的坑

通过梳理生命周期，明确周期函数职责，确认什么时候做什么。  

### 挂载阶段

社区中去除constructor的原因
- constructor中并不推荐去处理初始化以外的逻辑
- constructor不属于React的生命周期，只是Class的初始化函数
- 通过移除constructor，代码也会变得更简洁

生命周期
- getDerivedStateFromProps 
    - 作用：使组件在props变化时更新state
    - 触发时机：1. 当props被传入时 2. state发生变化时 3. forceUpdate被调用时
- UNSATE_componentWillMount
    - 用于组件加载前做某些操作，但目前被标记为弃用。因为在React异步渲染机制下，该方法可能被多次调用
- render
    - 作用：返回JSX结构，用于描述具体的渲染内容
- componentDidMount
    - 作用：主要用于组件加载完成时某些操作

### 更新阶段
 
指外部props传入，或state发生变化时的阶段

- UNSAFE_componentWillReceiveProps
- getDerivedStateFromProps
- shouldComponentUpdate
- UNSAFE_componentWillUpdate
- Render
- getSnapshotBeforeUpdate

### 卸载阶段

 - componentWillUnmount 主要用于执行清理工作
 
> `函数组件`：任何情况下都会重新渲染，没有生命周期，官方提供`React.memo`优化手段
> `React.Component`: 不实现`shouldComponentUpdate`函数，有两种情况触发重新渲染
    - 当state发生变化时
    - 当父级组件的Props传入时
> `React.PureComponent`: 默认实现了 `shouldComponentUpdate` 函数
    - 仅在props与state进行浅比较后，确认有变更时才会触发重新渲染

渲染时的报错，只能通过`componentDidCatch`捕获

## 4. 类组件与函数组件的区别

### 相同点

使用方式和最终呈现效果上是完全一致的

### 不同点

基础认知：本质上代表两种不同设计思想与心智模式

类组件：根基是 `OOP`，面向对象编程。可以实现继承。类组件优化依靠 `shouldComponentUpdate` 函数去阻断渲染。
函数组件：根基是 `FP`，函数式编程。缺少继承能力。函数组件优化依靠 `React.memo` 来优化 

相比较类组件，函数组件更纯粹、简单、易测试 

类组件存在：1. this的模糊性 2. 业务逻辑散落在生命周期中


## 5. 如何设计React组件


## 6. setState是同步更新还是异步更新

`setState` 用于变更状态，触发组件重新渲染，更新视图UI

:::tip 知识点 
合成事件

- React给document挂上事件监听
- DOM事件触发后冒泡到document
- React找到对应的组件，造出一个合成事件出来
- 并按组件树模拟一遍事件冒泡   


:::

### 同步更新

### 异步更新



## 7. React如何面向组件跨层级通信

### 父与子

### 子与父

主要依赖回调函数

### 兄弟


### 无直接关系
 

## 8. 列举一种你了解的React状态管理框架

解决副作用

Redux受函数式编程影响，导致
- 所有事件都收拢Action去触发
- 所有UI状态都交给Store去管理
- 所有业务逻辑都交由Reducer去处理

方案1：
方案2:允许Reducer


## 9. Virtual DOM的工作原理是什么

## 10. 与其他框架相比，React的diff算法有何不同


## 11. 如何解释React的渲染流程

- React渲染节点挂载
- React组件生命周期
- setState触发渲染更新
- diff策略与patch方案

`Stack Reconciler`是React15及以前版本的渲染方案。其核心是以递归的方式逐级调度栈中子节点到父节点的渲染
`Fiber Reconciler`是React16及以后版本的渲染方案。其核心是增量渲染，将渲染工作分割为多区块，将其分散到多个帧中执行

## 12. React的渲染异常会造成什么后果

## 13. 如何分析和调优性能瓶颈


## 14. 如何避免重复渲染


## 15. 如何提升React代码可维护性




## 16. React Hooks使用限制

### What是什么 （列举限制）
### Why为什么 （设计初衷、问题领域、方案原理）
### How怎么做 （如何规避）

## 17. useEffect和useLayoutEffect区别在哪里

## 18. 谈谈React Hook的设计模式


## 19. React Router的实现原理及工作方式分别是什么

### 实现原理

### 工作方式

## 20. React中常用的工具库有哪些

### 初始化

React官网推荐使用`create-react-app`

### 开发
- 路由 ReactRouter
- 样式 
- 功能组件 
    - react-dnd react-draggable用于实现拖拽
    - video-react 用于视频播放
    - react-pdf-viewer 用于预览pdf
    - react-window react-react-virtualized 用于长列表





  


---

## React 状态管理库

按复杂度分：

- 简单状态管理

主要通过 `Context API` 做简单的封装实现，业务逻辑不复杂的时候，简单状态管理就能解决问题

代表作：[unstated](https://github.com/jamiebuilds/unstated)

- 复杂状态管理

按数据流

- 单向数据流： ReduX
- 响应式数据流：mobX
- stream：rxJS

Redux 和 RxJs 更偏底层，实际的项目会使用更上层的封装

---

为什么 Redux 更热门

1. 出现的时间点很合适。诞生于 2015 年，当时 react 还没有被社区广泛认可的状态管理方案
2. 名气大，官方背景
