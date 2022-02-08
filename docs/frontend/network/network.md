# 网络和并发



## 罗列常用的 http 状态码并简述其含义

- `1xx` `infomational`(信息性状态码) 接收的请求正在处理
- `2xx` `success`（成功状态码） 请求正常处理完毕
- `3xx` `redirection`（重定向状态码）需要进行附加操作以完成请求
- `4xx` `client Error` （客户端错误状态码）服务器无法处理请求
- `5xx` `server Error` (服务器错误状态码) 服务器处理请求出错

## 列出 http 所有请求方法

`GET` `HEAD` `POST` `PUT` `DELETE` `CONNECT` `OPTIONS` `TRACE` `PATCH`

### GET | POST 请求区别

get url 有大小限制；post 无限制
get

## http 的设置 keep-alive 的作用是什么

使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive 功能避免了建立或者重新建立连接(Web 服务器，基本上都支持 HTTP Keep-Alive)

缺点：对于提供静态内容的网站来说，这个功能通常很有用。但是，对于负担较重的网站来说，虽然为客户保留打开的连接有一定的好处，但它同样影响了性能，因为在处理暂停期间，本来可以释放的资源仍旧被占用。当 Web 服务器和应用服务器在同一台机器上运行时，Keep-Alive 功能对资源利用的影响尤其突出。

解决：Keep-Alive: timeout=5, max=100
(timeout：过期时间 5 秒（对应 httpd.conf 里的参数是：KeepAliveTimeout），max 是最多一百次请求，强制断掉连接。就是在 timeout 时间内又有新的连接过来，同时 max 会自动减 1，直到为 0，强制断掉。)

## HTTP/1.0/1.1/2.0 并发请求上的主要区别？

1. HTTP/1.0

每个 TCP 连接只能发送一个请求，当服务器响应后就会关闭这个连接，下一次请求需要再次建立 TCP 连接。

追问：这个连接指的是 HTTP 还是 TCP

2. HTTP/1.1

默认采用持久连接，Connection：keep-alive

追问：如果想关闭如何做
Connection：close

添加管道机制，在同一个 TCP 连接里，允许多个请求同时发送，一问一答形式。所有的数据通信都是有顺序的

缺点：A ｜ B ｜ C A 先到达开始响应 10s，B ｜ C 需要等待。队头阻塞

3. HTTP/2.0

添加双工模式，服务器也能同时处理多个请求，解决了队头阻塞问题。
多路复用，没有次序概念。

添加服务器推送问题

### HTTP/1.1 长连接和 HTTP/2.0 多路复用有什么区别

1.1: 同一时间一个 TCP 连接只能处理一个请求，采用一问一答的形式，上一个请求响应后才能处理下一个请求。

追问：听说 chrome 浏览器支持最大 6 个同域请求的并发

因为 chrome 支持最大 6 个 TCP 连接

2.0：同域名上的所有通信都在单个连接上完成，单个连接上可以并行交错的进行请求和相应。

### 为什么 HTTP1.1 不能实现多路复用

传输方式不同
HTTP/2.0 是基于二进制帧的协议
HTTP/1.1 是基于文本分割解析的协议

1.1 的报文结构里，服务器需要不断的读入字节，直到遇到换行符，处理的顺序是穿行的。

GET/HTTP/1.1
Accept：
host：
referer

POST

2.0 以帧为最小数据单位，每个帧都会有标识自己属于哪个流，多个帧组成一个流。

多路复用，其实就是一个 TCP 里面存在的多条流

### 前段代码里有什么方式能控制最大并发量？

### 如果任务有优先级的概念，需要允许高优任务的插入

实现一个控制并发的函数，接受并发量参数

:::details mock.js

```js
const urls = [
  {
    info: "link1",
    time: 3000,
    priority: 1,
  },
  {
    info: "link2",
    time: 2000,
    priority: 1,
  },
  {
    info: "link3",
    time: 5000,
    priority: 2,
  },
  {
    info: "link4",
    time: 1000,
    priority: 1,
  },
  {
    info: "link5",
    time: 1200,
    priority: 1,
  },
  {
    info: "link6",
    time: 2000,
    priority: 5,
  },
  {
    info: "link7",
    time: 800,
    priority: 1,
  },
  {
    info: "link8",
    time: 3000,
    priority: 1,
  },
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log("----" + url.info + "start!");
    setTimeout(() => {
      console.log(url.info + "OK");
      resolve();
    }, url.time);
  });
}

module.exports = {
  urls,
  loadImg,
};
```

:::

::: details PromiseQueue.js

```js
// 实现一个控制并发的函数，接受并发量参数

const { loadImg, urls } = require("./mock");

class PromiseQueue {
  constructor(options = {}) {
    this.concurrent = options.concurrent || 1;
    this.currentCount = 0;
    this.pendingList = [];
  }

  add(task) {
    this.pendingList.push(task);
    this.run();
  }

  run() {
    if (
      this.pendingList.length === 0 ||
      this.concurrent === this.currentCount
    ) {
      return;
    }
    this.currentCount++;
    // const fn = this.pendingList.shift();
    const { fn } = this.pendingList
      .sort((a, b) => b.priority - a.priority)
      .shift();

    const promise = fn();
    promise
      .then(this.completeOne.bind(this))
      .catch(this.completeOne.bind(this));
  }

  completeOne() {
    this.currentCount--;
    this.run();
  }
}

const queue = new PromiseQueue({ concurrent: 3 });

const formatTask = (url) => {
  return {
    fn: () => loadImg(url),
    priority: url.priority,
  };
};

urls.forEach((url) => {
  // queue.add(() => loadImg(url))
  queue.add(formatTask(url));
});

const highPriorityTask = {
  priority: 10,
  info: "high!",
  time: 2000,
};

queue.add(formatTask(highPriorityTask));
```

:::

## 常见的 web 攻击方式有哪些

- XSS(Cross Site Scripting)

跨站脚本攻击

> 用户的输入变成代码，需要对用户输入数据进行 HTML 转义

- CSRF
- SQL 注入
- 文件上传漏洞
- DDos 攻击
- 其他

## API 安全措施（请求凭证措施）

- 静态权限凭证
- OAuth 权限凭证
- 自签名权限凭证



## JWT

https://jwt.io/

token 一般放在 Authorization 自定义头，而不是放在 Cookie。目的是解决跨域不能共享 Cookie 的问题

### 使用 ajax 都有哪些优劣

## AJAX

requestAnimationFrame
MutationObserver

### 1. 原生 XHR



### 2. \$.ajax

```js
$.ajax({
  type: "get/post",
  url: "",
  dataType: "json/jsonp/text/xml",
  success: function() {},
  error: function() {},
});
```

::: details 封装 ajax

```javascript
1. 创建实例 new XMLHttpRequest
2. 设置监听，onreadystatechange
3. 建立连接 open
4. 设置头信息
5. 发送请求 send
```

:::

### 3. fetch

```js
try {
  let response = await fetch(url);
  let data = response.json();
} catch (e) {
  console.log(e);
}
```

> fetch 不基于 XHR，是 ES 新规范的实现方式
> fetch 只对网络请求报错，对 400，500 都当做成功的请求
> fetch 默认不会带 cookie, 需要添加配置项
> fetch 无法原生监测请求的进度，而 XHR 可以
> fetch 可以设置 mode 为 cors 实现跨域访问

### 4. axios

- [axios 官网](https://axios-http.com/)

- [axios 中文网](http://www.axios-js.com/)

- [axios源码](https://github.com/axios/axios)

https://www.kancloud.cn/yunye/axios/234845

axios-retry

axios

```js
axios
  .get(url)
  .then((res) => {})
  .catch((err) => {
    console.log(err);
  });

//处理多个请求
function getUserAccount() {
  return axios.get("/user/account");
}
function getUserPermission() {
  return axios.get("/user/permission");
}

axios.all([getUserAccount(), getUserPermission()]).then(
  axios.spread(function(getUserAccount, getUserPermission) {
    console.log("两个请求都完成了");
  })
);

//拦截器
axios.interceptors.request.use();

axios.interceptors.response.use();
```

### 前端缓存

[资料](https://zhuanlan.zhihu.com/p/44789005)

基本网络请求三步骤：`请求`+`处理`+`响应`

- 后端：`处理`
- 前端：`请求`（B） + `响应`（B+S）

按缓存位置（ 优先级：由上到下，找到即返回；否则继续）

- Service Worker
- Memory Cache （内存缓存）
- Disk Cache (硬盘缓存)
- 网络请求

按失效策略

- Cache-Control
- ETag

## WebSocket

### websocket 是 html5 新增的协议

- 客户端和服务端都可以主动推送消息，可以使文本也可以是二进制数据，通常发送 json,方便处理
- 没有同源策略限制，不存在跨域问题
- 协议标识 ws，加密 wxs

WebSocket 是 HTML5 开始提供的一种在**单个 TCP**连接上进行**全双工**通讯的协议。

WebSocket 协议本质上是一个基于 TCP 的协议。

WebSocket 允许服务端主动向客户端推送数据,浏览器和服务器只需要做一个握手的动作。

浏览器通过 Javascript 向服务器发出建立 WebSocket 连接的请求，连接建立后，客户端和服务端可以通过 TCP 连接直接交换数据。

### 曾经替代方法

- Ajax 轮询（Polling）：轮询是在特定的时间间隔，由 client 对 server 发出 http 请求，然后由 server 返回数据。缺点：client 不断发出 server 请求，http 请求可能包含较长的头部，真正有效数据很小，会浪费带宽资源。

- 轮询（Polling）

  > 浏览器通过 JavaScript 启动一个定时器，然后以固定的间隔给服务器发请求
  > 缺点
  >
  > 1. 实时性不够
  > 2. 频繁请求会给服务器带来极大压力

- Comet
  > 解决实时性问题
  > 缺点
  >
  > 1. 多行程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大浪费服务器资源
  >    HTTP 连接在长时间没有数据传输的情况下，链路上的任何一个网关都可能关闭这个链连接，而网关不可控。要求 Comet 连接必须定期发 ping 数据表示连接正常

### websockerAPI

1. WebSocket(url[, protocols])

```js
//url: websocket服务器相应的url
//protocols: 单协议字符串
let ws = new WebSocket("ws://localhost:8080");
```

2.  WebSocket.readyState

```js
let readyState = ws.readyState;
//0 正在链接中 WebSocket.CONNECTING
//1 已经链接并且可以通讯 WebSocket.OPEN
//2 链接正在关闭 WebSocket.CLOSING
//3 链接已经关闭或者没有链接成功 WebSocket.CLOSED
```

3.  WebSocket.onopen

```js
//链接状态为OPEN调用
ws.onopen = function(event) {
  console.log("WebSocket is open now.");
};
```

4.  WebSocket.onmessage

```js
//用于指定当从服务器接受到信息时的回调函数
ws.onmessage = function(event) {
  console.log("WebSocket message received:", event);
};
```

5. Websocket.onerror

```js
//用于指定连接失败后的回调函数
ws.onerror = function() {
  console.error("WebSocket error observed:", event);
};
```

6. WebSocket.onclose

```js
//用于指定连接关闭后的回调函数
ws.onclose = function(event) {
  console.log("WebSocket is closed now.");
};
```

7. WebSocket.close([code[, reason]]
   该方法关闭 WebSocket 链接。

8. WebSocket.send(data)
   向服务器发送数据。

### Socket.io 与 WebSocket

socket.io 是对 websocket 的封装，因为不是所有的浏览器都支持 websocket。

若客户端用到了 socket.io,server 端也必须对应使用

目的：构建可以在不同浏览器和移动设备上使用的实时应用。它会自动根据浏览器从 websocket、ajax 长轮询、iframe 流等等各种方式中选择最佳的方式实现网络实时应用。

### Socket.io 特点

- 实时分析：将数据推送到客户端，这些客户端会被表示为实时计数器
- 实时通信和聊天
- 二进制流传输：1.0 版本开始，socket.io 支持任何形式二进制传输
- 文档合并

### Socket.io 由两部分组成

- socket.io: 一个服务端用于集成（或挂载）到 Node.JS HTTP 服务器
- socket.io-client: 一个加载到浏览器中的客户端

### 利用 Socket.io 创建一个实时在线聊天

#### 第一步：基于 node 安装 express 框架，启动一个服务

```bash
npm install --save express@4.15.2
```

```js
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/p/a/t/h");
});

const PORT = 3000;
http.listen(PORT, function() {
  console.log(`listening on *:${PORT}...`);
});
```

#### 第二步：安装 socket.io 依赖包，监听 connection 事件

```bash
npm install --save socket.io
```

```js
const io = require("socket.io")(http);

io.on("connection", function(socket) {});
```

#### 第三部：在 index.html 加 socket.io.js

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  let socket = io();
</script>
```

> 本地客户端开发，可以在`node_modules/socket.io-client/dist/socket.io.js`找到 js 文件

#### 第三部： 客户端发送事件、服务器端监听事件

客户端自定义 socket 事件，将其发出

```html
<script>
  ...
  socket.emit('your event', value)
  ...
</script>
```

```js
io.on("connection", function(socket) {
  socket.on("your event", function(msg) {
    console.log(msg);
  });
});
```

#### 第四部: 广播

```js
io.on("connection", function(socket) {
  socket.broadcast.emit("your msg");
});
```
