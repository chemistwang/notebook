# 面试题
# setState到底是异步还是同步?

::: tip 版本更新
[React18.0.0](https://github.com/facebook/react/blob/main/CHANGELOG.md#1800-march-29-2022)

- 新的api `createRoot`
- `ReactDOM.render`已经被废弃，使用时会警告，
:::

- 老版本 使用 `ReactDOM.render`

异步场景：因为可能会有多次 `setState`, `React` 为了性能优化会合并 `batchedUpdates` 并异步执行

``` js
class App extends React.Component<MyProps, MyState> {
  state = {
    num: 0
  }
  updateNum = () => {
    console.log('before setState', this.state.num);
    this.setState({
        num: this.state.num + 1
    })
    console.log('after setState', this.state.num);
  }
  render() {
    const { num } = this.state;
    console.log('app class render', num);
    return <button onClick={this.updateNum}>hello {num}</button>
  }
}
```

源码分析

``` js
// packages/react-reconciler/src/ReactFiberWorkLoop.new.js

export function batchedUpdates<A, R>(fn: A => R, a: A): R {
  const prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    // If there were legacy sync updates, flush them at the end of the outer
    // most batchedUpdates-like method.
    if (
      executionContext === NoContext &&
      // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !(__DEV__ && ReactCurrentActQueue.isBatchingLegacy)
    ) {
      resetRenderTimer();
      flushSyncCallbacksOnlyInLegacyMode();
    }
  }
}
```

同步场景：

``` js
class App extends React.Component<MyProps, MyState> {
  state = {
    num: 0
  }
  updateNum = () => {
    console.log('before setState', this.state.num);
    setTimeout(() => {
      this.setState({
        num: this.state.num + 1
      })
      console.log('after setState', this.state.num);
    })
  }
  render() {
    const { num } = this.state;
    console.log('app class render', num);
    return <button onClick={this.updateNum}>hello {num}</button>
  }
}
```

源码分析

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.new.js 

export function scheduleUpdateOnFiber(
    root: FiberRoot,
    fiber: Fiber,
    lane: Lane,
    eventTime: number,
) {
    // ...
      if (
      lane === SyncLane &&
      executionContext === NoContext &&
      (fiber.mode & ConcurrentMode) === NoMode &&
      // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !(__DEV__ && ReactCurrentActQueue.isBatchingLegacy)
    ) {
      // Flush the synchronous work now, unless we're already working or inside
      // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
      // scheduleCallbackForFiber to preserve the ability to schedule a callback
      // without immediately flushing it. We only do this for user-initiated
      // updates, to preserve historical behavior of legacy mode.
      resetRenderTimer();
      flushSyncCallbacksOnlyInLegacyMode();
    }
}

```



- 新版本 `React18.0.0` 使用 `ReactDOM.createRoot`

均是异步

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
