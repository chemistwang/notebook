# 内存

```js
// 平时有关注过前端的内存处理吗

// 你了解 js 中的内存管理吗？什么情况下会导致内存泄漏呢
```

## 内存的生命周期

- 内存分配：声明变量、函数、对象的时候
- 内存使用：读写内存，在使用变量、函数等
- 内存回收：使用完毕，由垃圾回收机制自动回收不再使用的内存

## 内存的分配

```js
const n = 123;
const s = "sss";
```

## 内存的使用

```js
const a = 10;
console.log(a); //使用
```

## 垃圾回收机制

垃圾回收的算法主要依赖于引用的概念

4.1 引用计数法

看一个对象是否有指向它的引用，若没有其他对象指向它，说明当前对象不在被需要

循环引用！

若两个对象互相引用，尽管不再被使用，但引用计数法无法识别，导致内存泄漏

4.2 标记清除法

将“不再使用的对象”定义为“无法到达的对象”

从根部 js 的全局对象出发，定时扫描内存中对象，凡是无法从根部到达的对象，就会被标记为不再使用，稍后进行回收

- 垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记
- 将从根部触发能够触及到的对象标记清除
- 剩下的还有标记的变量被视为准备删除的变量
- 垃圾回收器销毁带有标记的值，回收内存空间

## 常见的内存泄漏

5.1 全局变量

```js
function foo() {
  bar1 = "aaa";
  this.bar2 = "aaa"; //this指向window
}
foo();
```

5.2 未被清理的定时器和回调函数

setInterval
setTimeout

clearInterval
clearTimeout

5.3 闭包

5.4 DOM 引用

```js
var element = {
  images: document.getElementById("id"),
};
element.images = null;
```

## 如何避免

- 尽量减少全局变量
- 使用完数据后，及时解除引用，比如 null
- 避免死循环等持续执行的操作

## 实现一个 sizeOf 函数

需求：接受一个对象参数，计算传入对象所占的 `Bytes` 数

知识点：

1. （js 分配内存大小有何不同）
2. What's the difference between ES6 Set and WeakSet?

::: details Result

```js
// sizeOf.js

const seen = new WeakSet();

function sizeOfObject(object) {
  if (object === null) {
    return 0;
  }
  let bytes = 0;

  const properties = Object.keys(object);
  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];
    if (typeof object[key] === "object" && object[key] === null) {
      //判断是否为同一个引用
      if (seen.has(object[key])) {
        continue;
      }

      seen.add(object[key]);
    }
    bytes += calculator(key);
    bytes += calculator(object[key]);
  }

  return bytes;
}

function calculator(object) {
  const objectType = typeof object;

  switch (objectType) {
    case "string": {
      return object.length * 2;
    }
    case "boolean": {
      return 4;
    }
    case "number": {
      return 8;
    }
    case "object": {
      if (Array.isArray(object)) {
        return object.map(calculator).reduce(function(acc, curr) {
          return acc + curr;
        }, 0);
      } else {
        return sizeOfObject(object);
      }
    }
    default: {
      return 0;
    }
  }
}

const testData = {
  a: 111,
  b: "ccc",
  22: false,
  c: {
    a: 1,
    b: 2,
  },
};

console.log(calculator(testData));
```

:::
