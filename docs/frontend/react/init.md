# Build Your Own React

> 参考资料:
> [build-your-own-react](https://pomb.us/build-your-own-react/)

### 前言

只需要 `3` 行代码就可以用 `React`。

第一步: 定义一个 `React element`

```js
const element = <h1 title="foo">Hello</h1>;
```

第二步: 从 `DOM` 获取一个 `node`

```js
const container = document.getElementById("root");
```

第三步：在 `container` 中渲染 `React element`

```js
ReactDOM.render(element, container);
```

在 **第一步** 中实际上调用了 `React.createElement` 方法，参数包含了标签名、属性和它的子元素。

```js
const element = React.createElement("h1", { title: "foo" }, "Hello");
```

下面这个对象是这个方法输出的结果

```js
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
};
```

它有两个属性：`type` 和 `props`（目前只关心这俩）

`type` 定义了我们要取创建什么类型的 `DOM` 标签；

`props` 是另一个对象，它包含了所有来自 `JSX` 的各项属性；

`children` 在上面这个例子里是个 `string`，其实多数情况是 `array`，毕竟文档多数情况是树 🌲。

剩下了一处代码，那就是 `ReactDOM.render` ， 我们用自己的方式来实现

```js
const node = document.createElement(element.type);
node["title"] = element.props.title;

const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

node.appendChild(text);
container.appendChild(node);
```

最后面把 `textNode` 放在 `h1` 中，然后把 `h1` 放到 `container` 里面。

这下就和刚才一样了，区别是没有用 `React`

### 第一步：`createElement` 函数

我们从一个新的`app`开始。这次我们借助`React`思想来自己实现。

那先从实现 `createElement` 开始。

```js
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
const container = document.getElementById("root");
ReactDOM.render(element, container);
```

将 `JSX` 转换为 `JS`，可以看到 `createElement`是如何调用的

```js
const element = React.createElement(
  "div",
  { id: "foo" },
  React.createElement("a", null, "bar"),
  React.createElement("b")
);
```

在上一步看到，既然 `element` 是一个包含 `type` 和 `props` 的 `object`。那么我们只需要创建它就好了。

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}
```

这样，`createElement('div')`返回

```js
{
  "type": "div",
  "props": { "children": [] }
}
```

`createElement("div", null, a)`返回

```js
{
  "type": "div",
  "props": { "children": [a] }
}
```

`createElement("div", null, a, b)`返回

```js
{
  "type": "div",
  "props": { "children": [a, b] }
}
```

> `children` 数组可能也会包含 `string` 或者 `numbers` 这样的值，所以我们对这类不是对象的值创建一个特殊类型：`TEXT_ELEMENT`

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
```

> 为了便于区分，我们需要一个听上去像 `React` 的名字，同时也能达到教学目的。

就叫 `Didact` 吧。

```js
const Didact = {
  createElement,
};
element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
);
```

如果还想用 `JSX` 语法的话，怎么告诉 `babel` 是要用 `Didact` 的 `createElement`呢

```js
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
```

像上面 👆 一样有一个类似的注释就好了。

### 第二步：`render`函数

接下来，我们需要实现一个 `ReactDOM.render` 方法。

```js
function render(element, container) {
  // TODO create dom nodes
}
```

现在只考虑如何添加，剩下的时间再去实现更新和删除。

```js
function render(element, container) {
  // TODO create dom nodes
  const dom = document.createElement(element.type)
  ​element.props.children.forEach(child =>
      render(child, dom)
  )
  container.appendChild(dom)
}
```

根据 `element` 类型生成 `DOM`，然后将 `node` 放到 `container`中，对于 `child` 递归就好了。

```js
function render(element, container) {
  // TODO create dom nodes
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
    ​element.props.children.forEach(child =>
        render(child, dom)
    )
  container.appendChild(dom)
}
```

对于 `TEXT_ELEMENT` 类型的节点需要特殊处理。

```js
function render(element, container) {
  // TODO create dom nodes
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
  const isProperty = key => key !== "children"
    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name]
      })

    ​element.props.children.forEach(child =>
        render(child, dom)
    )
  container.appendChild(dom)
}
```

最后加上 `element` 的属性。

现在，就有了一个我们自己的库，可以在 `DOM` 上渲染 `JSX`。

### 第三步：`Concurrent` 模式

但是...在我们添加更多的代码之前需要做一次重构。

因为在递归的调用上存在一个问题。

一旦程序开始，在渲染整个 `element` 树之前是不会停下来的。如果 `element` 树过于庞大，它可能会长时间阻塞主线程。

如果浏览器需要优先处理诸如用户输入和动画，就不得不等待渲染结束。

现在我们准备把渲染切分成一个个小的单元，当一个单元结束后，如果有其他需要浏览器完成的事情，就先停止渲染。

```js
let nextUnitOfWork = null
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```

用 `requestIdleCallback` 去实现循环。你可以把 `requestIdleCallback` 当成是一个定时器，区别在于只有在浏览器主线程空闲的时候才会执行回调，而不是我们手动调用。

> React 现在不再用 `requestIdleCallback`，而是 `schedule`。但是原理是一样的。

`requestIdleCallback`有一个 `deadline` 参数，可以用于检查浏览器调用前我们还有多少时间。

在开始循环之前我们需要把 `first unit` 赋值，`performUnitOfWork` 不仅需要写入执行的过程，也需要把 `next unit` 返回。

### 第四步：`Fibers`

我们需要一个数据结构来组织一个个渲染单元：`fiber` 树 🌲。

每一个 `element` 都会对应一个`fiber`,每一个 `fiber` 也会对应一个渲染单元。

用一个例子 🌰 说明下。

假设一个`element`树长这样：

```js
Didact.render(
  <div>
    <h1>
      <p />
      <a />
    </h1>
    <h2 />
  </div>,
  container
);
```

在渲染过程中，我们会创建 `root fiber`，并将它设为 `nextUnitOfWork`。剩下的工作交给 `performUnitOfWork` 函数执行。每一个 `fiber` 都要做 `3` 件事：

1. `DOM` 中添加 `element`
2. 为每一个 `element` 的 `children` 创建 `fiber`
3. 选择 `nextUnitOfWork`

这种数据结构的其中一个目的是方便找到下一个`unit`，这就是为什么每一个 `fiber` 都需要关联它的 `first child`, `next sibling` 和 `parent`

当一个 `fiber` 结束之后，

如果它有 `child`，就会进行下一个 `unit`

用我们的这个例子来说，`div fiber` 之后就到了 `h1 fiber`

如果当前 `fiber` 没有 `child`，就到了它的 `sibling`

`p` 没有 `child`，所以就轮到 `a fiber`

如果既没有 `child` 也没有 `sibling`，就会去找 `parent sibling`

如果 `parent` 没有 `sibling`,就继续向上查找，直到 `root`。至此，我们就认为完成了本次渲染。

### 第五步：`Render`和 `Commit` 阶段

现在又有另一个问题。

每次我们向 `DOM` 添加新 `node` 的时候，浏览器都会随时打断。这样就会看到一个不完整的 `UI`。可我们并不想这样。

### 第六步：`Reconciliation` 协调

至此，我们完成了在 `DOM` 中添加的操作，那么更新和删除呢？

这就我们现在要做的事情，需要把从 `render` 函数中拿到的 `elements` 去和上一次我们提交给 `DOM` 的 `fiber` 树进行比对。

所以在提交给 `DOM` 之后需要保存一份，称为 `currentRoot`

### 第七步：`Function`组件

下面就需要给`Function`组件添加相应的支撑。

### 第八步：`Hooks`

最后，我们现在有 `Function` 组件了。
添加一下 `state`去改变它的状态

### 结语

除了帮你理解`React`是怎么实现之外，其中一个目的是想让你更深入的理解 `React` 源码。这就是为什么我们经常用一些相同的变量名和函数名。

举个例子 🌰 ，如果在真实的 `React app` 中调试你的 `Function` 组件，调用栈会给你展示：

- workLoop
- performUnitOfWork
- updateFunctionComponent

我们没有包含很多 `React` 的特性和优化。例如，下面 👇 这些就和`React`中不一样。

- 在 Didact 中，`render` 阶段遍历了整个 树 🌲，相反，React 会根据一些提示跳过那些没有改变的子树 🌲

-
