# WebSocket

## websocket 是 html5 新增的协议

- 客户端和服务端都可以主动推送消息，可以使文本也可以是二进制数据，通常发送 json,方便处理
- 没有同源策略限制，不存在跨域问题
- 协议标识 ws，加密 wxs

WebSocket 是 HTML5 开始提供的一种在**单个 TCP**连接上进行**全双工**通讯的协议。

WebSocket 协议本质上是一个基于 TCP 的协议。

WebSocket 允许服务端主动向客户端推送数据,浏览器和服务器只需要做一个握手的动作。

浏览器通过 Javascript 向服务器发出建立 WebSocket 连接的请求，连接建立后，客户端和服务端可以通过 TCP 连接直接交换数据。

## 曾经替代方法

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

## websockerAPI

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


## 掉线重连
