# 异步

```js
// 使用 Promise 语法重写 setTimeout 函数

// 在一个 async 函数中调用使用 Promise 重写的 setTimeout 函数
```

## Promise

:::tip 参考资料
`PromiseA+规范` [promisesaplus](https://promisesaplus.com/) 
:::


- promise

  - 当前事件循环得不到的结果，但是未来的事件循环会给到你结果
  - 是一个状态机
    - pending
    - fulfilled/resolved
    - rejected

- .then 和.catch

  - resolved 状态的 Promise 会回调后面的第一个.then
  - rejected 状态的 Promise 会回调后面的第一个.catch
  - 任何一个 rejected 状态且后面没有.catch 的 Promise，都会造成浏览器/node 环境的全局错误

- 执行 then 和 catch 会返回一个新 Promise，该 Promise 最终状态根据 then 和 catch 的回调函数执行结果决定
  - 如果回调函数最终是 `throw`，该 Promise 是 `rejected` 状态
  - 如果回调函数最终是 `return`， 该 Promise 是 `resolved`状态
  - 但如果回调函数最终 return 了一个 `promise`，该 promise 会和回调函数 return 的 promise 状态保持一致

```js
let promise = new Promise(function(resolve, reject) {
  // resolve(3)
  reject(3);
});

let a = promise
  .then((res) => {
    console.log(res, "res");
    throw new Error();
  })
  .catch((err) => {
    // console.log(err, 'err');
    return "xxx";
  });

setTimeout(() => {
  console.log(a, "a");
}, 300);
```

## async/await

- async/await

  - async function 是 Promise 的语法糖封装
  - 异步编程的终极方案 - 以同步的方式写异步

    - await 关键字可以 “暂停” async function 的执行
    - await 关键字可以以同步的写法获取 Promise 的执行结果
    - try-catch 可以获取 await 所得到的错误

  - 一个穿越事件循环存在的 function

```js
// console.log(async function(){
//     return 4;
// })

// console.log(function(){
//     return new Promise(resolve => {
//         resolve(4);
//     })
// })

// --- [AsyncFunction]
// --- [Function]

// console.log(async function(){
//     return 4;
// }())
// console.log(function(){
//     return new Promise(resolve => {
//         resolve(4);
//     })
// }())
// --- Promise { 4 }
// --- Promise { 4 }

(function() {
  const result = (async function() {
    var content = await new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(6)
        reject(new Error(8));
      }, 500);
    });
    console.log(content);
    return 4;
  })();
  setTimeout(() => {
    console.log(result);
  }, 800);
})();
```
