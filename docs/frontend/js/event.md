# 事件

## 深入理解浏览器的事件机制


https://juejin.cn/post/6914600144621027336


Q: 浏览器里面的事件都会按照一定的规则去传递，这个规则是什么

Q: 事件代理，事件委托是什么


### 事件委托

## 平时有没有用过发布订阅模式，比如 vue event bus、node eventemitter3

1. 这种模式，事件的触发和回调之间是异步的还是同步的。

```js
const event = new Event();
event.on(console.log);

event.emit(1); //先输出？
console.log(111); //先输出？
```

需要看具体的实现：
node eventEmitter3: 同步

2. 实现一个简单的 eventEmitter

3. 如果我想实现设置最大监听数(针对某一个 event)

::: details EventEmitter.js

```js
// event-emitter.js
class EventEmitter {
  constructor(options = {}) {
    this.events = {};
    //    {
    //        name1: [cb1,cb2,cb3],
    //        name2: []
    //    }
    this.maxListeners = options.maxListeners || Infinity;
  }

  emit(event, ...args) {
    const cbs = this.events[event];
    if (!cbs) {
      console.warn(`${event} is not registered`);
      return this;
    }
    cbs.forEach((cb) => cb.apply(this, args));
    return this;
  }

  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    if (
      this.maxListeners !== Infinity &&
      this.events[event].length > this.maxListeners
    ) {
      console.warn(`${event} has reached max listeners`);
      return this;
    }
    this.events[event].push(cb);
    return this;
  }

  once(event, cb) {
    const func = (...args) => {
      this.off(event, func);
      cb.apply(this, args);
    };
    this.on(event, func);
    return this;
  }

  off(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      this.events[event] = this.events[event].filter((item) => item !== cb);
    }
    return this;
  }
}

const add = (a, b) => console.log(a + b);
const log = (...args) => console.log(...args);
const event = new EventEmitter({
  maxListeners: 3,
});

event.on("add", add);
event.on("log", log);
event.emit("add", 1, 2); //3
event.emit("log", "hi"); //hi
event.off("add");
event.emit("add", 1, 2); //Error:add event is not registered.
event.once("once", add);
event.emit("once", 1, 2);
```

:::
