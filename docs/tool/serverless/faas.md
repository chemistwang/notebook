# FAAS

## 基础组件

- Gateway

    - 为函数调用提供一个路由，起到一个代理转发的作用
    - 内置UI界面，可以访问函数商店
    - Prometheus收集监控指标
    - 接受 AlertManager 通知，自动伸缩

- Provider

    - 本质上是操作 K8s 的 API
    - List / Create / Delete 一个函数
    - 获取函数
    - 缩放函数
    - 调用函数

- queue-worker

    - 依赖于 NATS 和 NATS Streaming

::: tip 同步函数 + 异步函数

- 同步函数
    - 路由是： /function/：name
    - 等待
    - 结束时得到结果
    - 明确知道成功还是失败

- 异步函数
    - 路由是： /async-function/:name
    - http 的状态码为202 - 即使响应码
    - 从 queue-worker 中调用函数
    - 默认情况下，函数的执行结果时被丢弃的

:::


- watchdog
    - 职责是调用函数，healthcheck 和 超时
    - 任何二进制都会被 watchdog 变成一个函数
    - 小型的 http server


