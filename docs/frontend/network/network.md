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

## Cache

这里指`前端缓存`，即`浏览器缓存`

:::tip 参考资料
- [一文读懂前端缓存](https://zhuanlan.zhihu.com/p/44789005)
- [谈一谈对浏览器的强缓存和协商缓存的理解](https://github.com/yiliang114/Blog/issues/6)
::: 

按缓存位置（优先级：由上到下，找到即返回；否则继续）

- Service Worker
- Memory Cache （内存缓存）
- Disk Cache (硬盘缓存)
- 网络请求

### Service Worker

位置：Chrome F12 -> Application -> Cache Storage

按失效策略

- Cache-Control
- ETag


