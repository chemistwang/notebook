# 报错处理

1. antd 英文显示

antd 目前的默认文案是英文

```js
// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

2. useState

```js
React Hook "useState" cannot be called in a class component. React Hooks must be called in a React function component or a custom React Hook function
```

3. strict-mode

```js
Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DomWrapper which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
```

4. bind this

```js
你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。
```

5.

```js
Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
```

6.

```js
 Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
```

7.

```js
Uncaught Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
```

8.

```js
antd表单组件报错 Cannot read property ‘setFieldsValue‘ of null
```


- https://www.v2ex.com/t/754630