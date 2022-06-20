# 错误处理

Rust 没有异常

- 用 `Result<T,E>` 处理 `可恢复（recoverable）错误`
- 用 `panic!宏` 处理 `不可恢复（unrecoverable）错误`

