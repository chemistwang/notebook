# 源码


## 源码调试

1. 下载代码

2. `npm i` 安装依赖

:::warning 报错

``` bash
➜  react git:(main) npm i
npm ERR! code EUNSUPPORTEDPROTOCOL
npm ERR! Unsupported URL Type "link:": link:./scripts/eslint-rules

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/wyl/.npm/_logs/2022-07-22T11_12_55_347Z-debug.log
```

解决方案：修改 `package.json` 的依赖并重新安装

``` json
...
   // "eslint-plugin-react-internal": "link:./scripts/eslint-rules",
   "eslint-plugin-react-internal": "file:./scripts/eslint-rules",
...
```

:::





::: tip 参考资料
卡颂大神的 B 站视频和电子书，推荐搭配食用

- [B 站](https://space.bilibili.com/453618117/video)
- [React 技术揭秘](https://react.iamkasong.com/)
:::

---

同步 =》 v17.0 并发 `concurrent mode`

理念 =》 架构 =》 实现

调用栈 =》 产生更新 =》决定需要更新什么组件 =》将更新的组件渲染到页面

            调度  =》      协调       =》   渲染

---

### 第一层：掌握术语、基本实现思路

[build-your-own-react](https://pomb.us/build-your-own-react/)

---

### 第二层：掌握整体工作流程，局部细节

整体工作流程

1. schedule 调度 scheduler

2. render 协调 reconciler - Fiber

3. commit 渲染 renderer
   > Web：ReactDOM | Native：ReactNative | Canvas、SVG：ReactArt

局部细节

- Diff 算法
- Hooks

参考资料：[React 技术揭秘](https://react.iamkasong.com/)

view 视图 软件、应用
生命周期函数 -》 符合人脑认知 class component
hooks 操作系统 function component
React 底层运行逻辑 硬件

---

### 第三层：掌握关节流程的细节（探索前端边界）

schedule 调度 scheduler

- 数据结构：小顶堆
- 浏览器渲染原理，每一帧需要做什么事情
- MessageChannel 宏任务 | 微任务

render 协调 reconciler

- 算法：DFS 深度优先遍历
- 数据结构（更新）：单向链表 | 单向有环链表 、链表基本操作
- react 调度优先级模型： lane 模型、二进制掩码操作

fiber 架构：react 并发的自我实现，类似于实现了原生 generator

---

### 第四层：掌握思想

class component - 》 面向对象
function component =》 函数式编程

代数效应：为了在函数式编程中解决副作用

hooks： 代数效应在 react 中的实现

state =》 view，函数式更适合表达从一个 state 变为另一个 state

---

### 第五层：？

Twitter 关注大佬就好了
