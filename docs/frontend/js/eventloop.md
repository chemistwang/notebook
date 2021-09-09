# 事件循环


:::tip 参考资料
[JavaScript中的事件循环介绍 -Jake Archibald](https://www.bilibili.com/video/BV1XQ4y1P7L7?from=search&seid=4063426400438383115) 👍
:::


## 运行机制

1. 同步任务都在主线程执行，形成一个执行栈（`execution context stack`）
2. 对于异步任务，主线程之外，存在任务队列（`task queue`）
3. 任务队列分为两大类，分别是宏任务（`macro task`）和微任务（`micro task`）
4. 只有同步任务全部完成，即执行栈清空，才会执行异步任务
5. 清空完当前微任务，才会再去执行下一个宏任务，如下代码

``` js
for (macroTask of macroTaskQueue) {
    // 1. Handle current MACRO-TASK
    handleMacroTask();
      
    // 2. Handle all MICRO-TASK
    for (microTask of microTaskQueue) {
        handleMicroTask(microTask);
    }
}
```


## 名词解释

### 宏任务 (macro task)

- `XHR` 回调
- 事件回调（鼠标键盘事件）
- `setImmediate`
- `setTimeout`
- `setInterval`
- indexedDB 数据库操作等 I/O

:::tip 说明
`setTimeout` 的延时参数始终 `相对于主程序执行完毕的时间`，并且多个 `setTimeout` 执行的先后顺序也是由这个延迟时间决定
:::

### 微任务 (micro task)

- `process.nextTick`
- `Promise.then`
- `MutationObserver`


## 练习

```js
// 代码输出
console.log("global");

setTimeout(function() {
  console.log("timeout1");
  new Promise(function(resolve) {
    console.log("timeout1_promise");
    resolve();
  }).then(function() {
    console.log("timeout1_then");
  });
}, 2000);

for (var i = 1; i <= 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
  console.log(i);
}

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("then1");
});

setTimeout(function() {
  console.log("timeout2");
  new Promise(function(resolve) {
    console.log("timeout2_promise");
    resolve();
  }).then(function() {
    console.log("timeout2_then");
  });
}, 1000);

new Promise(function(resolve) {
  console.log("promise2");
  resolve();
}).then(function() {
  console.log("then2");
});
```


:::details Answer
``` js
// global
// 1
// 2
// 3
// 4
// 5
// promise1
// promise2
// then1
// then2
// 6
// timeout2
// timeout2_promise
// timeout2_then
// timeout1
// timeout1_promise
// timeout1_then
// 6
// 6
// 6
// 6
```
:::


---

```js
// 代码输出
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

async1();

console.log("script end");
```

:::details Result
```js
//script start
//async1 start
//async2
//script end
//async1 end
//setTimeout
```

:::

---

```js
// 代码输出
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

async1();

new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});

console.log("script end");
```

:::details Answer
``` js
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```
:::

---

```js
// 代码输出
setTimeout(() => {
  console.log("setTimeout");
}, 0);

console.log("t1");

fetch("http://localhost:8888")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log("myJson");
  })
  .catch(function(err) {
    console.log(err);
  });

console.log("fetch zhi hou");

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async1();

console.log("t2");

new Promise((resolve) => {
  console.log("promise");
  resolve();
}).then(() => {
  console.log("promise.then");
});

console.log("t3");

async function async2() {
  console.log("async2");
}

console.log("t4");
```

:::details Answer
``` js
//t1
//fetch zhi hou
//async1 start
//async2
//t2
//promise
//t3
//t4
//async1 end
//promise.then

//setTimeout
//myJson
//error
```
:::

---

```js
// 代码输出
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);
```

:::details Answer

```js
//1
//2
//4
//3
```

:::



---

```js
// 代码输出
console.log("script start");

setTimeout(() => {
  console.log("setTimeout...");
}, 1 * 2000);

Promise.resolve()
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });

async function foo() {
  await bar();
  console.log("async1 end");
}

foo();

async function errorFunc() {
  try {
    await Promise.reject("error!!!");
  } catch (e) {
    console.log(e);
  }
  console.log("async1");
  return Promise.resolve("async1 success");
}

errorFunc().then((res) => console.log(res));

function bar() {
  console.log("async2 end");
}

console.log("script end");
```


:::details Answer
```js
//script start
//async2 end
//script end
//promise1
//async1 end
//error!!!
//async1
//promise2
//async1 success
//setTimeout...
```
:::


---


```js
// 代码输出
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
  });
  new Promise((resolve) => {
    console.log(4);
    resolve();
  }).then(() => {
    console.log(5);
  });
});

Promise.reject().then(
  () => {
    console.log(131);
  },
  () => {
    console.log(12);
  }
);

new Promise((resolve) => {
  console.log(7);
  resolve();
}).then(() => {
  console.log(8);
});

setTimeout(() => {
  console.log(9);
  Promise.resolve().then(() => {
    console.log(10);
  });
  new Promise((resolve) => {
    console.log(11);
    resolve();
  }).then(() => {
    console.log(121);
  });
});
```


:::details Answer
```js
// 1
// 7
// 12
// 8
// 2
// 4
// 3
// 5
// 9
// 11
// 10
// 121
```
:::


---

```js
// 代码输出
new Promise((resolve, reject) => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
    new Promise((resolve, reject) => {
      console.log(3);
      setTimeout(() => {
        reject();
      }, 3 * 1000);
      resolve();
    })
      .then(() => {
        console.log(4);
        new Promise((resolve, reject) => {
          console.log(5);
          resolve();
        })
          .then(() => {
            console.log(7);
          })
          .then(() => {
            console.log(9);
          });
      })
      .then(() => {
        console.log(8);
      });
  })
  .then(() => {
    console.log(6);
  });
```

:::details Answer
```js
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8 
// 9
```
:::


---

```js
// 代码输出
var age = 16;
var person = {
  age: 18,
  getAge: function() {
    var age = 22;
    setTimeout(function() {
      alert(this.age);
    }, 1000);
  },
};

person.getAge();
```

:::details Answer
```js
// 16
// 解析：若setTimeout的回调为箭头函数。则为18
```
:::


---

```js
// 代码输出
setTimeout(function() {
  console.log(1);
}, 0);
new Promise(function(a, b) {
  console.log(2);
  for (var i = 0; i < 1000; i++) {
    i == 999 && a();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});

console.log(5);
```

:::details Answer
``` js
// 2 
// 3
// 5
// 4
// 1
```
:::







## Web Worker

:::tip 参考资料
[阮一峰 Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
:::


- 作用：为 JS 创造多线程环境
- 优点：计算密集型或高延迟任务，被 Worker 线程负担，主线程（通常负责 UI 交互）就会很流畅不会被阻塞或拖慢
- 限制：`同源`
- 使用