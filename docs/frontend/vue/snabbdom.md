# [Snabbdom](https://github.com/snabbdom/snabbdom)

## h函数如何工作

```js
// 用法
const vnode = h('a', {props: href: ''}, 'this is link');
const vnode = h('ul', {}, [
    h('li', {}, 'option one'),
    h('li', {}, 'option two')
])
// vnode结构
const vode = { sel, data, children, text, elm, key };
```

## diff算法原理 

## 手写diff算法