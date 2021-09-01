# Koa

- koa
- koa-mount
- koa-static

- 核心功能：

  - 比 express 更极致的 request/response 简化
    - ctx.status = 200
    - ctx.body = ’hello world‘
  - 使用 async function 实现的中间件
    - 有 ’暂停执行‘ 的能力
    - 在异步的情况下也符合洋葱模型
  - 精简内核，所有额外功能都移到中间件里实现

- Express vs Koa
  - express 门槛更低， koa 更强大优雅
  - express 封装更多东西，开发更快速，koa 可定制性更高
