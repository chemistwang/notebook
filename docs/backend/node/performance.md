# 性能

## 性能工具

### 1. HTTP 服务的性能测试

- 想要优化性能，首先做性能检查
- 压力测试工具
  - ab： apache bench
    - Transfer rate: 吞吐量
  - webbench
- 找到服务器性能瓶颈所在(在压测的时候观察)
  - top
  - iostat

### 2. Node.js 性能分析工具

- Nodejs 自带 profile

```bash
node --prof app.js # 会生成一个类似 isolate-0x103802000-95166-v8 名的文件
node --prof-process isolate-0x103802000-95166-v8.log > profile.txt # 将分析结果输出到 profile.txt 文件中
```

- Chrome devtool

```bash
node --inspect-brk app.js # 浏览器打开 chrome://inspect
```

- Clinic.js

```bash
npm i clinic
```

## 代码优化

### 1. Javascript 代码性能优化

- 计算性能优化的本质

  - 减少不必要的计算
  - 空间换时间

- nodejs HTTP 服务性能优化准则：
  - 尽量提前计算

### 2. 内存管理优化

- 垃圾回收

  - 新生代
    - 容量小，垃圾回收更快
  - 老生代
    - 容量大，垃圾回收更慢

- 减少内存使用，也是提高服务性能的手段

  - Node.js Buffer 内存分配策略（节省内存最好的方式就是：使用池）

- 如果有内存泄露，会导致服务性能大大降低

### 3. Node.js C++插件

```bash
npm i node-gyp
npm i bindings # 帮助加载不同环境下的 .node 文件
```

编译出来的 `.node` 文件跟 `平台(linux | macOS | windows)` 和 `nodejs版本` 是强关联的

- 将计算量转移到 C++ 进行
  - 收益：C++ 运算比 JS 更快的部分
  - 成本：C++ 变量和 v8 变量的转换
- 收益是否抵得过成本？

## 多进程优化

### 1. Nodejs 子进程与线程

- 进程

  - 操作系统挂载运行程序的单元
  - 拥有一些独立的资源，如内存等

- 线程

  - 进行运算调度的单元
  - 进程内的线程共享进程内的资源

- nodejs 的事件循环

  - 主线程：运行 v8 与 javascript
  - 多个子线程：通过事件循环被调度

- 使用子进程或线程利用更多 CPU 资源

### 2.Node.js cluster 模块实战与源码解读

### 3. 进程守护与管理

- Nodejs 的稳定性

## 架构优化

### 1. 动静分离

- 静态内容
  - 基本不会变动，也不会因为请求参数不同而变化
  - -> CDN 分发，HTTP 缓存等
- 动态内容
  - 各种因为请求参数不同而变动，且变种的数量几乎不可枚举
  - -> 用大量的源站机器承载，结合反向代理进行负载均衡

可以用 `ab` 做压测，在`nginx`上部署静态资源远超于部署在`nodejs`

### 2. 反向代理与缓存服务

- 路径匹配：可以把 `nodejs` 路径匹配的工作量转交给 `nginx`

- upstream: 负载均衡
- proxy_pass：反向代理
- proxy_cache：在 `nginx` 这一层面做缓存，节省 `node` 服务时间
- redis：`nodejs` 可以选择 `redis` 做缓存
