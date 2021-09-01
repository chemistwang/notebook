# 函数

## 原生函数

- String()
- Number()
- Boolean()
- Function()
- Date()
- Error()
- Symbol()
- RegExp()
- Array()
- Object()
- BigInt()

## 闭包

可以理解用闭包来保存状态

理解闭包，一定一定理解作用域链

> 当前作用域语句被执行完毕后，引擎会检查该作用域中被定义的变量（或常量）的被引用情况，若引用被全部解除，引擎便会认为其应该被清除

利用高阶函数产生能够穿透作用域的引用

```js
// 实现防抖（debounce）和节流 (throttle)
```

::: details Result

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

this 对象是在运行时基于函数的运行环境绑定的

:::details bind | call | apply 区别
三者都是绑定 this

```js
//this: 只是负责绑定this并返回新的方法，并不执行
//绑定之后不再改变

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


// call 和 apply 的区别是什么，哪个性能更好一些
apply 转化的是内置的 call，并非 Function.prototype.call
apply 最后还是转化成 call 来执行的，call 要更快毫无疑问
```

:::

```js
// 代码输出
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

::: details Result

```js
//10 1
```

:::

### 下面代码输出

```js
const Greeters = [];
for (var i = 0; i < 10; i++) {
  Greeters.push(function() {
    return console.log(i);
  });
}

Greeters[0](); //10
Greeters[1](); //10
Greeters[2](); //10
```

> 只是 push 数组，并没有执行方法

```js
// var length = 10;
// function fn(){
// 	console.log(this.length);
// }
// var obj = {
// 	length: 5,
// 	method: function(fn) {
//     fn();
// 		arguments[0]();
// 	}
// }
// obj.method(fn); //10 1

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

//0
//1
//0

// this是运行时绑定的，不是编写时绑定，它的上下文取决于函数调用时的各种条件
// this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式

//调用栈（重要）: 为了达到当前执行位置所调用的所有函数
//调用位置:

//函数调用会被this绑定到当前上下文对象中,只有最顶层或者最后一层会影响调用位置

//箭头函数this，根据外层（函数或者全局）作用域决定this,箭头函数的绑定无法被修改
```

### 代码输出

```js
function change() {
  alert(typeof fn);
  function fn() {
    alert("hello");
  }
  var fn;
}
change(); //function
```

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
// 实现一个add方法，结果满足以下预期
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```
