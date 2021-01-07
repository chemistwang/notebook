# 事件循环

::: tip
`one thread === one call stack === one thing at a time`
单线程 === 一个调用栈 === 每次只能做一件事
:::

[事件循环 + 任务队列](https://www.bilibili.com/video/BV1XQ4y1P7L7?from=search&seid=4063426400438383115)


任何时候js执行完毕，js调用栈从满到空之后,就执行微任务
所以：理论上，任务队列中的一个任务完毕，一个js栈空了，会执行微任务；一次样式计算完成了，一个js栈空了，执行微任务

`promise`也运用了微任务，这保证了，Promise的回调被执行的时候，不会有半途中的js需要被执行

微任务：运行到当前任务队列清空


任务队列

- 宏任务 (macro-task)
    - XHR回调
    - 事件回调（鼠标键盘事件）
    - setImmediate
    - setTimeout
    - setInterval
    - indexedDB数据库操作等I/O
    

- 微任务 (micro-task)
    - process.nextTick
    - promise.then
    - MutationObserver

    进入到任务队列的是具体的执行任务函数
    不同类型的任务会分别进入到他们所属类型的任务队列
    
    




``` js
console.log('global')

setTimeout(function () {
    console.log('timeout1')
    new Promise(function (resolve) {
        console.log('timeout1_promise')
        resolve()
    }).then(function () {
        console.log('timeout1_then')
    })
},2000)

for (var i = 1;i <= 5;i ++) {
    setTimeout(function() {
        console.log(i)
    },i*1000)
        console.log(i)
}

new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('then1')
})

setTimeout(function () {
    console.log('timeout2')
    new Promise(function (resolve) {
        console.log('timeout2_promise')
        resolve()
    }).then(function () {
        console.log('timeout2_then')
    })
}, 1000)

new Promise(function (resolve) {
    console.log('promise2')
    resolve()
}).then(function () {
    console.log('then2')
})
```

> 同步代码执行完之后才会检查是否有异步任务完成，并执行对应的回调
微任务在宏任务之前执行

> 在当前的微任务没有执行完成时，是不会执行下一个宏任务的

> setTimeout()的延时参数始终相对于主程序执行完毕的时间，并且多个setTimeout执行的先后顺序也是由这个延迟时间决定



``` js

async function async1(){
	console.log("async1 start");
	await async2();
	console.log("async1 end");
}

async function async2(){
	console.log("async2");
}

console.log('script start');

setTimeout(function(){
	console.log('setTimeout');
}, 0)

async1();

console.log('script end');


//script start
//async1 start
//async2
//script end
//async1 end
//setTimeout

```

``` js

async function async1() {
   console.log('async1 start')
   await async2()
   console.log('async1 end')
}
async function async2() {
   console.log('async2')
}
console.log('script start')
setTimeout(() => {
	console.log('setTimeout')
},0)
async1()
new Promise((resolve) => {
	console.log('promise1')
	resolve()
}).then(() => {
	console.log('promise2')
})
console.log('script end')

//script start
//async1 start
//async2
//promise1
//script end
//async1 end
//promise2
//setTimeout
```

``` js
setTimeout(() => {
	console.log('setTimeout')
}, 0)
console.log('t1')
fetch('http://localhost:8888')
 .then(function(response) {
   return response.json();
 })
 .then(function(myJson) {
   console.log('myJson');
 })
 .catch(function(err) {
 	console.log(err)
 })
console.log('fetch zhi hou')
async function async1() {
	console.log('async1 start')
	await async2()
	console.log('async1 end')
}
async1()
console.log('t2')
new Promise((resolve) => {
	console.log('promise')
	resolve()
}).then(() => {
	console.log('promise.then')
})
console.log('t3')
async function async2() {
	console.log('async2')
}
console.log('t4')

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


``` js
const promise = new Promise((resolve, reject) => {
	console.log(1)
	resolve()
	console.log(2)
});
promise.then(() => {
	console.log(3)
});
console.log(4)

//1
//2
//4
//3
```

``` js
console.log('script start');

setTimeout(() => {
  console.log('setTimeout...')
}, 1 * 2000);

Promise.resolve().then(function(){
  console.log('promise1')
}).then(function(){
  console.log('promise2')
})

async function foo(){
  await bar();
  console.log('async1 end')
}

foo();

async function errorFunc(){
  try {
    await Promise.reject('error!!!');
  } catch (e) {
    console.log(e)
  }
  console.log('async1')
  return Promise.resolve('async1 success')
}

errorFunc().then(res => console.log(res))

function bar(){
  console.log('async2 end')
}

console.log('script end');

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

``` js
console.log(1)

setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
  })
  new Promise((resolve) => {
    console.log(4)
    resolve();
  }).then(() => {
    console.log(5)
  })
})


Promise.reject().then(() => {
  console.log(131);
}, () => {
  console.log(12)
})

new Promise((resolve) => {
  console.log(7)
  resolve();
}).then(() => {
  console.log(8)
})

setTimeout(() => {
  console.log(9)
  Promise.resolve().then(() => {
    console.log(10)
  })
  new Promise((resolve) => {
    console.log(11)
    resolve();
  }).then(() => {
    console.log(121)
  })
})

//1 7 12 8 2 4 3 5 9 11 10 121
```


``` js
new Promise((resolve, reject) => {
  console.log(1)
  resolve();
}).then(() => {
  console.log(2)
  new Promise((resolve, reject) => {
    console.log(3)
    setTimeout(() => {
      reject();
    }, 3 * 1000);
    resolve();
  }).then(() => {
    console.log(4)
    new Promise((resolve,reject) => {
      console.log(5)
      resolve();
    }).then(() => {
      console.log(7)
    }).then(() => {
      console.log(9)
    })
  }).then(() => {
    console.log(8)
  })
}).then(() => {
  console.log(6)
}) 
// 1 2 3 4 5 6 7 8 9
```