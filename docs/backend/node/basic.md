# 基础

## 是什么

官网的话：

- nodejs 是一个基于 `chrome v8` 引擎的 javascript 运行环境
- nodejs 使用了一个 `事件驱动`、`非阻塞式I/O模型`，使其轻量又高效

```js
// 在 nodejs 里运行 javascript 跟在 chrome 里运行 javascript 有什么不同？
```

::: details Result
chrome 浏览器用的是同样的 javascript 引擎和模型

其实，在 nodejs 里写 js 和在 chrome 里写 js，几乎没有不一样！

不一样在哪：

- nodejs 没有浏览器 API，即 document、window 等
- 加入许多 nodejs API，即文件系统，进程等

对于开发者， nodejs：

- 在 chrome 里写 javascript 控制**浏览器**
- nodejs 用类似的方式，控制**整个计算机**

:::

---

```js
console.log(setTimeout);
console.log(setInterval);

// console.log(requestAnimationFrame) node提供了下面这个api
console.log(setImmediate);

// 文件
console.log(__filename);
console.log(__dirname);

// 进程
console.log(process);
// hrtime
// cpuUsage
// memoryUsage
// kill
// exit
// argv 用户启动node进程敲击的命令 =》 做一些命令行程序可以用到

// ------------
console.log(process.argv);

/**
 * 名称: 猜拳游戏
 * 需求点：
 * 用户输入 node game.js rock 与计算机进行猜拳
 */

let playerAction = process.argv[process.argv.length - 1];
console.log(playerAction);

//----

let count = 0;
process.stdin.on("data", (e) => {
  const playerAction = e.toString().trim();
  const result = game(playerAction);
  console.log(result);

  if (result === -1) {
    count++;
  }
  if (count === 3) {
    console.log("你太厉害了，不玩了");
    process.exit();
  }
});
```

## 架构图

![node架构图](http://cdn.chemputer.top/notebook/node/architecture.png)


## 可以做什么

### 1.web 服务

eg: `腾讯视频`

需求点：

- 搜索引擎优化 + 首屏速度优化 = 服务端渲染
- 服务端渲染 + 前后端同构 = nodejs

### 2. 构建工作流：

eg: `gulp`/`webpack`

需求点：

- 构建工具不会永远不出问题
- 构建工具不会永远满足需求

- 使用 nodejs 做 js 构建工具，是最保险的选择（语言学习成本）

### 3. 开发工具

eg: `Visual Studio Code`

### 4. 游戏

eg: `wayward`

开发工具和游戏的需求点：
可扩展性：

- 大型应用需要给使用者自定义模块的能力
- 使用 nodejs 做复杂本地应用
  - 可以利用 js 的灵活性提供外部扩展
  - js 庞大的开发者基数让他们的灵活性得到利用

### 5. 客户端应用

eg: `twitch.tv`

- 在已有网站的情况下需要新卡发客户端应用
- 用 nodejs 客户端技术（electron）实现，最大限度复用现有工程

### 6. BFF

- 对用户侧提供 HTTP 服务
- 使用后端 RPC 服务

- 特点：

1. 不需要太强的服务器运算能力
2. 对程序灵活性有较高要求

- 优点：

对 web 本身，nodejs 最适合做 BFF

1. 对前端：前端有能力自由组装后台数据，减少大量业务沟通成本，加快业务迭代速度；前端自主决定与后台通讯方式，着手于 web 应用性能优化
2. 对后端：RPC 调用

- 难点：

1. RPC 调用，进程管理

## Commonjs

`<script>`

- 脚本变多时，需要手动管理加载顺序,增加管理成本
- 不同脚本之间逻辑调用，需要通过全局变量的方式
- nodejs 没有`<script>`标签，需要有一个自己的机制 （Commonjs）

Commonjs 模块规范

- javascript 社区发起，在 nodejs 上应用并推广
- 后续也影响到了浏览器端 javascript

## 内置模块

https://ppambler.github.io/time-geekbang/02-NodeJS%E5%BC%80%E5%8F%91%E5%AE%9E%E6%88%98/02-%E6%8A%80%E6%9C%AF%E9%A2%84%E7%A0%94%E7%AF%87/04-built-in-module.html

源码路径： `/lib` 目录
V8 相关路径： `/src` 目录

- EventEmitter
  - 观察者模式
    - addEventListener
    - removeEventListener
  - 调用 vs 抛事件
    - 关键在于 "不知道被通知者存在"
    - 以及 "没有人听还能继续下去"

## 事件

```js
// event.js
const EventEmitter = require("events");

// console.log(EventEmitter)

class Chemputer extends EventEmitter {
  constructor() {
    super();
    setInterval(() => {
      this.emit("hello", { price: Math.random() * 100 });
    }, 3000);
  }
}

const chemputer = new Chemputer();

chemputer.addListener("hello", (e) => {
  console.log("yeah!", e);
});
```

## 非阻塞 I/O

- I/O 即 Input/Output，即一个系统的输入和输出
- 阻塞 I/O 和非阻塞 I/O 的区别就在于：**系统接收输入再到输出期间，能不能接收其他输入**。

- 理解非阻塞 I/O 的要点在于

  - 确定一个进行 Input/Output 的系统
  - 思考在 I/O 过程中，能不能进行其他 I/O

- 事件循环: 非阻塞 I/O 的基础

每个事件循环都是一个全新的调用栈

```js
const eventloop = {
  queue: [],
  fsqueue: [],
  timeoutqueue: [],
  loop() {
    while (this.queue.length) {
      let callback = this.queue.shift();
      callback();
    }
    setTimeout(this.loop.bind(this), 50);
  },
  add(callback) {
    this.queue.push(callback);
  },
};

eventloop.loop();

setTimeout(() => {
  eventloop.add(function() {
    console.log(1);
  });
}, 500);

setTimeout(() => {
  eventloop.add(function() {
    console.log(2);
  });
}, 800);
```

## callback

- 回调函数格式规范 - error-first callback - Node-style callback
  第一个参数是 error，后面的参数才是结果

异步：

- 回调地狱
- 异步并发

异步流程控制：

- npm： async.js
- thunk （一种编程范式）

```js
// try {
//     interview(function(e){
//         console.log(e)
//     })
// } catch (error) {
//     console.log(error, 'error')
// }

// interview(function(res){
//     // if (res instanceof Error) {
//     //     return console.log('cry')
//     // }
//     if (res) {
//         return console.log('cry')
//     }
//     console.log('smile')
// })

interview(function(res) {
  if (res) {
    return console.log("cry at 1st round");
  }
  interview(function(res) {
    if (res) {
      return console.log("cry at 2nd round");
    }
    interview(function(res) {
      if (res) {
        return console.log("cry at 3rd round");
      }
      return console.log("smile");
    });
  });
});

function interview(callback) {
  setTimeout(() => {
    if (Math.random() < 0.6) {
      callback(null, "success");
    } else {
      callback(new Error("fail"));
      // throw new Error('fail') //捕获不到
    }
  }, 1000);
}
```

## 什么是 HTTP 服务器

- HTTP 是什么
  - 应用层协议
  - 五层网络协议

> 1. 物理层 2. 数据链路层 3. 网络层 4. 运输层 5. 应用层

- 一个网页请求，包含 2 次 HTTP 包交换：

  - 浏览器向 HTTP 服务器发送请求 HTTP 包
  - HTTP 服务器向浏览器返回 HTTP 包

- HTTP 服务要做什么事情
  - 解析进来的 HTTP 请求报文
  - 返回对应的 HTTP 返回报文

```js
// 简单实现一个 HTTP 服务器
```

:::details Result

```js
const http = require("http");

http
  .createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello");
    console.log(req);
  })
  .listen(3000);
```

:::
