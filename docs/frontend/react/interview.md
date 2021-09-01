# 面试题

1. `this.setState` 是同步的还是异步

依赖状态更新后的值

- 对于 class component

componentDidMount
componentDidUpdate

- 对于 function component

useEffect

答案：

- `Legacy` 模式命中 `batchedUpdates` 时异步
- `Legacy` 模式未命中`batchedUpdates` 时同步
- `Concurrent` 模式中都是异步

---

2. 生命周期

`UI = fn(state)`

- state： 负责计算出 `状态变化` ----> Reconciler(`reconcile`算法，也成为`diff`算法)

  - render 阶段

  调用的生命周期函数：
  contructor
  render
  getDerivedStateFromError
  componentWillMonut
  shouldComponentUpdate
  componentWillUpdate
  getDerivedStateFromProps
  componentWillReceiveProps

* fn: 负责将`状态变化`渲染在`视图`中 ----> Renderer

  - commit 阶段

  调用的生命周期函数：
  componentWillUnmount
  componentDidCatch
  componentDidMount
  getSnapshotBeforeUpdate
  componentDidUpdate

---
