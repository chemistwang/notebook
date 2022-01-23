# Rust

参考资料：

- [英文官网](https://www.rust-lang.org/)
- [中文官网](https://www.rust-lang.org/zh-CN/)
- [cargo包仓库](https://crates.io/)
- [cargo包仓库文档](https://docs.rs/)
- [rust quiz](https://dtolnay.github.io/rust-quiz/1)

## 前言

擅长的场景：

- 需要运行时的速度
- 需要内存安全
- 更好的利用多处理器

与其他语言比较：

- C/C++性能非常好，但类型系统和内存都不太安全
- Java/C#，拥有GC，能保证内存安全，也有很多特性，但是性能不行。
- Rust
    - 安全
    - 无需GC
    - 易于维护，调试，代码安全高效

擅长的领域：

- 高性能 Web Service
- WebAssembly
- 命令行工具
- 网络编程
- 嵌入式设备
- 系统编程

```bash
rustc --version # 查看版本
rustc 1.53.0 (53cb7b09b 2021-06-17)
```

## Hello World

```rust
fn main() {
    println!("Hello World!");
}
//println! 是一个 Rust macro（宏）
```

```bash
rustc main.rs # 编译 c代表compiler
./main # 运行
```

> rustc 只适合简单的Rust程序

## Cargo

Cargo是Rust的构建系统和包管理工具

```bash
cargo --version
cargo 1.53.0 (4369396ce 2021-04-27)
```

``` bash
cargo new hello_cargo # 使用Cargo创建项目
tree hello_cargo
hello_cargo
├── Cargo.toml
└── src
    └── main.rs

cargo build # 使用Cargo构建项目
cargo run # 使用Cargo构建和运行(编译代码 + 执行结果)
cargo check # 检查代码确保编译，比cargo build快的多，编写时可反复使用提高效率
cargo build --release # 为发布构建
```


在 `Rust` 里，代码的包称为 `crate`


## 数据类型

- 标量类型 （scalar）

    - 整数
    - 浮点数
    - 布尔值
    - 字符

- 复合类型（compound）

    - 元组
    - 数组

## 所有权

- 每一个值都有一个对应的变量作为它的所有者
- 在同一时间内，值有且仅有一个所有者
- 当所有者离开自己的作用域时，它持有的值就会被释放掉 


## 生命周期