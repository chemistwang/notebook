# DOM 事件

## 事件流

定义：描述的是从页面接收事件的 `顺序`

- `IE`：`Bubble`（事件冒泡）

![bubble](http://cdn.chemputer.top/notebook/js/dom/bubble.jpg)

- `Netscape`：`Capture`（事件捕获）

![bubble](http://cdn.chemputer.top/notebook/js/dom/capture.jpg)


## 标准事件流

`DOM2级事件` 规定的事件流包括 `3` 个阶段：`事件捕获`, `处于目标阶段`, `事件冒泡`

![eventstream](http://cdn.chemputer.top/notebook/js/dom/eventstream.jpg)


## 事件处理程序

定义：响应某个事件的 `函数`

- `HTML` 事件处理程序

``` html
<input onclick="clickFunc(event, this)">
```

``` js
function clickFunc(e, target){
  console.log(e); //event对象
  console.log(target) //事件目标元素
}
```


- `DOM0` 事件处理程序

``` js
let btn = document.getElementById('btn');
btn.onclick = function(event){
  console.log(event);
  console.log('click')
}
btn.onclick = null; //可以移除事件
```

:::tip 说明
发生在 `Bubble` 阶段
:::

- `DOM1` 事件处理程序

1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型。

- `DOM2` 事件处理程序

``` js
let btn = document.getElementById('btn');
btn.addEventListener('click', function(event){
  console.log(event);
  console.log('click');
}, false)
```

:::tip 说明
第三个参数：
- `false`：发生在 `Bubble` 阶段（默认值）
- `true`：发生在 `Capture` 阶段
:::

- 原生 `自定义` 处理程序

:::tip 参考资料
[Document.createEvent()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent)
:::

## 事件对象（event）

|  属性/方法   | 类型  | 说明 |
|  ----  | ----  |---- |
| bubbles  | Boolean | 事件是否冒泡 |
| cancelable  | Boolean | 事件是否可以取消默认行为 |
| currentTarget  | Element | 当前正在处理的元素 |
| eventPhase  | Number | 事件阶段 |
| type  | String | 事件类型 |
| target  | Element | 事件目标 |
| preventDefault()  | Function | 取消事件默认行为 |
| stopPropagation()  | Function | 取消捕获或冒泡 |


## 事件委托

原理：利用 `事件冒泡`

:::tip 优点
- 减少事件注册，提高页面运行性能
- 简化DOM节点更新，对应事件更新
:::

:::warning 缺点
- 对不支持冒泡的事件不支持
- 层级过多，冒泡会被某一层阻止
- 建议就近委托
- 可能多次触发
:::

## 事件发布订阅模式应用

- vue eventBus
- node eventemitter3

### vue eventBus

本质：在Vue里面再注册一个 `Vue实例`

1. 第一步：定义实例

``` js
// main.js
Vue.prototype.$bus = new Vue();
```

2. 第二步：定义bus

``` vue
// components/message.vue
<template>
    <div></div>
</template>

<script>
export default {
    name: 'message',
    created(){
        console.log(this)
        this.$bus.$on('my-message-bus', function(msg){
            console.log(msg)
        })
    },
    beforeDestroy(){
        this.$bus.$off('my-message-bus')
    }

}
</script>
```

3. 第三步：注入

``` js
// App.vue
// ...
import message from "./components/message.vue";
export default {
  name: "App",
  components: {
    message
  }
};
// ...
```

4. 第四步：触发

``` vue
<template>
  <div>
    <button @click="send('some msg')">Event Bus</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    send(msg) {
      this.$bus.$emit("my-message-bus", msg);
    },
  }
};
</script>
```



### node eventemitter3


### 思考题

1. 这种模式，事件的触发和回调之间是异步的还是同步的。

```js
const event = new Event();
event.on(console.log);

event.emit(1); //先输出？
console.log(111); //先输出？
```

:::details Answer
需要看具体的实现：
`vue eventBus` & `node eventEmitter3` 均是同步
:::


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
