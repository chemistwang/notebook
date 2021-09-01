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

##
