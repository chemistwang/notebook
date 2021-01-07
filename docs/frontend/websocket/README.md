# WebSocket

### websocket是html5新增的协议

- 客户端和服务端都可以主动推送消息，可以使文本也可以是二进制数据，通常发送json,方便处理
- 没有同源策略限制，不存在跨域问题
- 协议标识ws，加密wxs

WebSocket是HTML5开始提供的一种在**单个TCP**连接上进行**全双工**通讯的协议。

WebSocket 协议本质上是一个基于 TCP 的协议。

WebSocket 允许服务端主动向客户端推送数据,浏览器和服务器只需要做一个握手的动作。

浏览器通过Javascript向服务器发出建立WebSocket连接的请求，连接建立后，客户端和服务端可以通过TCP连接直接交换数据。

### 曾经替代方法

- Ajax轮询（Polling）：轮询是在特定的时间间隔，由client对server发出http请求，然后由server返回数据。缺点：client不断发出server请求，http请求可能包含较长的头部，真正有效数据很小，会浪费带宽资源。

- 轮询（Polling）
> 浏览器通过JavaScript启动一个定时器，然后以固定的间隔给服务器发请求
> 缺点
> 1. 实时性不够
> 2. 频繁请求会给服务器带来极大压力

- Comet
> 解决实时性问题
> 缺点
> 1. 多行程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大浪费服务器资源
> HTTP连接在长时间没有数据传输的情况下，链路上的任何一个网关都可能关闭这个链连接，而网关不可控。要求Comet连接必须定期发ping数据表示连接正常

### websockerAPI

1. WebSocket(url[, protocols])

``` js
//url: websocket服务器相应的url
//protocols: 单协议字符串
let ws = new WebSocket('ws://localhost:8080');
```
 2. WebSocket.readyState

``` js
let readyState = ws.readyState;
//0 正在链接中 WebSocket.CONNECTING
//1 已经链接并且可以通讯 WebSocket.OPEN
//2 链接正在关闭 WebSocket.CLOSING
//3 链接已经关闭或者没有链接成功 WebSocket.CLOSED
```

3.  WebSocket.onopen

``` js
//链接状态为OPEN调用
ws.onopen = function(event) {
    console.log("WebSocket is open now.");
}
```

4.  WebSocket.onmessage

``` js
//用于指定当从服务器接受到信息时的回调函数
ws.onmessage = function(event) {
    console.log("WebSocket message received:", event);
}
```

5. Websocket.onerror

``` js
//用于指定连接失败后的回调函数
ws.onerror = function() {
    console.error("WebSocket error observed:", event);
}
```

6. WebSocket.onclose

``` js
//用于指定连接关闭后的回调函数
ws.onclose = function(event) {
  console.log("WebSocket is closed now.");
};
```

7. WebSocket.close([code[, reason]]
该方法关闭WebSocket链接。

8. WebSocket.send(data)
向服务器发送数据。



# Socket.io与WebSocket
socket.io是对websocket的封装，因为不是所有的浏览器都支持websocket。

若客户端用到了socket.io,server端也必须对应使用

目的：构建可以在不同浏览器和移动设备上使用的实时应用。它会自动根据浏览器从websocket、ajax长轮询、iframe流等等各种方式中选择最佳的方式实现网络实时应用。

# Socket.io特点
- 实时分析：将数据推送到客户端，这些客户端会被表示为实时计数器
- 实时通信和聊天
- 二进制流传输：1.0版本开始，socket.io支持任何形式二进制传输
- 文档合并

# Socket.io由两部分组成
- socket.io: 一个服务端用于集成（或挂载）到Node.JS HTTP服务器
- socket.io-client: 一个加载到浏览器中的客户端

# 利用Socket.io创建一个实时在线聊天

## 第一步：基于node安装express框架，启动一个服务

``` bash
npm install --save express@4.15.2
```
``` js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/p/a/t/h');
})

const PORT = 3000;
http.listen(PORT, function() {
    console.log(`listening on *:${PORT}...`);
})
```

## 第二步：安装socket.io依赖包，监听connection事件

``` bash
npm install --save socket.io
```

``` js
const io = require('socket.io')(http);

io.on('connection', function(socket) {})
```

## 第三部：在index.html加socket.io.js

``` html
<script src="/socket.io/socket.io.js"></script>
<script>
    let socket = io();
</script>
```
> 本地客户端开发，可以在`node_modules/socket.io-client/dist/socket.io.js`找到js文件


## 第三部： 客户端发送事件、服务器端监听事件
客户端自定义socket事件，将其发出

``` html
<script>
...
socket.emit('your event', value)
...
</script>
```
``` js
io.on('connection', function(socket){
    socket.on('your event', function(msg) {
    console.log(msg)
    })
})
```

## 第四部: 广播

``` js
io.on('connection', function(socket) {
    socket.broadcast.emit('your msg');
})
```

