# 基础

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
