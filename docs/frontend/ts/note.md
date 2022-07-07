# 笔记

## declare 什么时候用



## type | interface 区别

[Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

`中文翻译`

`type` 和 `interface` 非常相似，大多数情况下可以自由选择。`interface` 的大多数特性都可以在 `type` 中使用。**最关键的区别是 `type` 不能添加新属性，相比较而言，`interface` 可以一直扩展。**

``` ts
// interface
interface I {
    name: string
}
interface I {
    title: string
}

const i: I = {
    name: 'name',
    title: 'title'
}
// type
type T = {
    name: string
}
type T = {
    title: string
}
// Duplicate identifier 'T'
```





