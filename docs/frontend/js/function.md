# 函数

## 原生函数

- `String()` | `Number()`| `Boolean()` | `Symbol()` | `Array()` | `BigInt()`
- `Object()` | `Function()` | `Date()` | `Error()` | `RegExp()`


## 闭包


### 变量的生命周期

由两种因素决定：作用域，对其的引用

延长生命周期，最常用的是闭包，原理：利用高阶函数来产生能够穿透作用域的引用

### 名词解读

- `当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。` 出自: `《你不知道的Javascript(上卷)》`
- 个人的理解: 闭包就就是一种 `现象`, 这种现象在其他语言普遍存在，比如另一个我非常喜欢的语言 `Rust`

### 如何实现

就是一个普普通通的函数，只不过其他函数的状态会被 `GC` 回收，而该函数可以保存状态。

<!-- 利用高阶函数产生能够穿透作用域的引用 -->

### 如何理解

从两个方面： 

- `垃圾回收机制`

当前作用域语句被执行完毕后，引擎会检查该作用域中被定义的变量（或常量）的被引用情况，若引用被全部解除，引擎便会认为其应该被清除

- `作用域链`

保存该作用域的引用


---

``` js
// Q: 代码输出
function Foo() {
  var i = 0;
  return function() {
    console.log(i++);
  };
}
  
var f1 = Foo();

f2 = Foo();

f1();
f1();
f2();
f1();
```

::: details Answer

```js
// 0
// 1
// 0
// 2
```

:::


---

```js
// Q: 实现防抖（debounce）和节流 (throttle)
```

::: details Answer

- 防抖 (控制次数)

事件持续触发，但只有当事件停止触发后 n 秒才执行函数。

```js
debounce = function(func, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

let btn = document.getElementById("btn");
btn.onclick = debounce(function() {
  console.log("防抖发送数据");
}, 1000);
```

- 节流（控制频率）

事件持续触发时，每 n 秒执行一次函数

```js
function throttle(func, delay) {
  let prev = 0; //将初始时间戳设置为0，保证第一次触发就一定执行函数
  return function() {
    // const context = this;
    // const args = arguments;
    const now = +new Date();
    if (now - prev > delay) {
      func.apply(this);
      prev = now;
    }
  };
}
let btn = document.getElementById("btn");
btn.onclick = throttle(function() {
  console.log("截流发送数据");
}, 1000);
```

:::

## this 指向

### 为什么用 this

更 `优雅` 传递上下文

### this 绑定规则

`this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式`

- 默认绑定 (优先级最低)

1. 全局对象默认绑定 `window`

``` js
function foo(){
  console.log(this.a)
}
var a = 2;
foo(); //2 -> 调用位置：直接调用，只能使用默认绑定
```

2. `'use strict'` 全局对象无法默认绑定

``` js {3,4,6}
'use strict'
function foo(){
  console.log(this) //undefined 函数内部undefined
  console.log(this.a) //Uncaught TypeError: Cannot read property 'a' of undefined
}
console.log(this) //window
var a = 2;
foo(); 
```


- 隐式绑定

是否有上下文

缺点：容易造成 `this` 丢失绑定对象

---

```js
// Q: 代码输出
var length = 10;
function fn() {
  console.log(this.length); //?
}
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  },
};
obj.method(fn);
```

::: details Answer

```js
//10
//1
```

:::

---


- 显式绑定


1. 硬绑定

绑定方法：`call`, `apply`, `bind`

``` js
// Q: bind , call , apply 区别
```
:::details Answer

```js
// 相同点：三者都是绑定 this
// 不同点：bind 只是负责绑定 this 并返回新的方法，并不执行, 绑定之后不再改变

let o = { name: "o" };
let p = { name: "p" };

function show(city) {
  this.name + city;
}

show.bind(o).bind(p)(); //o

//call: 立即执行,参数以字符串形式
show.call(o, "lucus");

//apply: 立即执行,参数以数组形式
show.apply(o, ["lucus"]);
```

:::

---

``` js
// Q: call 和 apply 的区别是什么，哪个性能更好一些
```

:::details Answer
- apply 转化的是内置的 call，并非 `Function.prototype.call`
- apply 最后还是转化成 call 来执行的，call 要更快毫无疑问
:::

2. API 调用的上下文 

``` js
function foo(el) {
  console.log(el, this.id)
}
var obj = {
  id: 'awesome'
}
let list = [1,2,3]
list.forEach(foo, obj); //1 awesome 2 awesome 3 awesome
```


- `new` 绑定

第一步： 创建（或者说构造）一个全新的对象。 

第二步：这个新对象会被执行 [[ 原型 ]] 连接。 

第三步：这个新对象会绑定到函数调用的 this。 

第四步：如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。


### 箭头函数

- 箭头函数不使用上述 `4` 种规则

- 根据外层（函数或者全局）`作用域` 决定 this

- 箭头函数的绑定无法被修改

:::tip 参考资料
[再来40道this面试题酸爽继续(1.2w字用手整理)](https://juejin.cn/post/6844904083707396109)
:::

```js
// Q: 代码输出
function demo1(x) {
  return arguments.length ? x : "demo";
}

let demo2 = (x) => {
  return arguments.length ? x : "demo";
};

demo1("a");
demo2("a");
```

::: details Answer
```js
//1
//Uncaught ReferenceError: arguments is not defined
解析：
js 箭头函数是没有 this 和 arguments 变量的
如果这两个值可以打印，则一定来自父级作用域
```

:::



### 手写 `new` `call` `apply` `bind` 的实现

- 实现 `new`


::: details Answer
``` js
function create () {
  var Con = [].shift.call(arguments);
  var obj = Object.create(Con.prototype);
  var ret = Con.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}
```
:::

- 实现 `call`

::: details Answer
``` js
Function.prototype.call3 = function(context) {
  context = (context !== null && context !== undefined) ? Object(context) : window;
  var fn = Symbol();
  context[fn] = this;

  let args = [...arguments].slice(1);
  let result = context[fn](...args);

  delete context[fn];
  return result;
};

```
:::

- 实现 `apply`

::: details Answer
``` js
Function.prototype.apply3 = function(context, arr) {
  context = context ? Object(context) : window;
  let fn = Symbol();
  context[fn] = this;

  let result = arr ? context[fn](...arr) : context[fn]();
  delete context[fn];
  return result;
};

```
:::

- 实现 `bind`

::: details Answer
``` js
Function.prototype.bind2 = function(context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function() {
    var innerArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(innerArgs)
    );
  };

  var fNOP = function() {};
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
```
:::



## 函数式编程

### 多种 js 编程方式

- 命令式编程：通过详细描述行为的编程方式
- 面向对象编程: 基于原型的
- 元编程：对 js 执行模型数据进行编写和操作的编程方式

区别于 `命令式编程`

`函数式编程`特点:

- 纯函数，避免副作用
- js 高阶函数（将函数作为输入或者输出）
- 使用 `map`, `filter`, `reduce` 而不是 `for`, `while`
- 避免数据变动
- 解决数据变变动，持久化数据结构（闭包）（immutable）

> 命令式语言技术对全局作用域的依赖使得 js 存在不安全性
> 函数式程序类似一个用来转换数据的机器
> 使之运行，使之正确，使之快速

js 的对象系统，提供封装数据与操作，然而有时封装被用来限制某些元素的可见性，称为数据隐藏；
js 对象系统中，并没有提供直接隐藏数据的方式，因此使用一, 种叫闭包的方式隐藏数据；

闭包也是一种函数，使用闭包函数技术，能够与大多数面向对象一样，实现有效的数据隐藏
闭包就是一个函数，捕获作用域内的外部绑定

很多高阶函数的强大之处都与变量作用域，尤其是闭包密切相关

- 确定抽象，并为其构建函数
- 利用已有的函数来构建更为复杂的抽象
- 通过将现有的函数传给其他的函数来构建更加复杂的抽象

## 函数柯里化

> 高阶函数的特殊用法
> Currying，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

好处:

- 参数复用
- 提前确认
- 延迟运行
-

```js
Q: 实现一个add方法，结果满足以下预期
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```


``` js
Q: 实现 (5).add(3).minus(2) 功能
```
