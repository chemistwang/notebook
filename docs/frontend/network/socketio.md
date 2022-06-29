# Socket.io

## Socket.io 与 WebSocket

socket.io 是对 websocket 的封装，因为不是所有的浏览器都支持 websocket。

若客户端用到了 socket.io,server 端也必须对应使用

目的：构建可以在不同浏览器和移动设备上使用的实时应用。它会自动根据浏览器从 websocket、ajax 长轮询、iframe 流等等各种方式中选择最佳的方式实现网络实时应用。

## Socket.io 特点

- 实时分析：将数据推送到客户端，这些客户端会被表示为实时计数器
- 实时通信和聊天
- 二进制流传输：1.0 版本开始，socket.io 支持任何形式二进制传输
- 文档合并

## Socket.io 由两部分组成

- socket.io: 一个服务端用于集成（或挂载）到 Node.JS HTTP 服务器
- socket.io-client: 一个加载到浏览器中的客户端

## 利用 Socket.io 创建一个实时在线聊天

### 第一步：基于 node 安装 express 框架，启动一个服务

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

### 第二步：安装 socket.io 依赖包，监听 connection 事件

```bash
npm install --save socket.io
```

```js
const io = require("socket.io")(http);

io.on("connection", function(socket) {});
```

### 第三步：在 index.html 加 socket.io.js

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  let socket = io();
</script>
```

> 本地客户端开发，可以在`node_modules/socket.io-client/dist/socket.io.js`找到 js 文件

### 第四步： 客户端发送事件、服务器端监听事件

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

### 第五部: 广播

```js
io.on("connection", function(socket) {
  socket.broadcast.emit("your msg");
});
```