# 面试题

### typeof 返回哪些字符串

```js
"number";
"boolean";
"object";
"string";
"function";
"undefined";

typeof null; //null表示一个空对象指针
```

### 数组方法

```
toString()
valueOf()

push()
pop()
unshift()
shift()

sort()
reverse()

slice()
splice()

indexOf()
lastIndexOf()

every()
some()
filter()
map()
forEach()

concat()
reduce()
reduceRight()
```

### 字符串方法

```

```

### GET | POST 请求区别

get url 有大小限制；post 无限制
get

### this 指向问题

this 对象是在运行时基于函数的运行环境绑定的

### bind | call | apply 区别

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
```

### 事件委托

### for 循环中 break, continue, return 的区别

### for 循环

for(){}

```js
for(let i in ...) {
	i; //arr => index（MDN：不应该用于迭代一个 Array，其中索引顺序很重要。）
	i; //obj => key
}
```

```js
//for...of (代替for...in语句)
for(let i of ...) {
// for(const i of ...) 若不想修改变量，使用const
	i; //arr => value
	//不能遍历对象
}
```

### js 原型链

```js
function F() {}
let f = new F();

f.__proto__ === F.prototype; //true
//__proto__ 理解为实例内部的一个指针
//这个 实例的指针 与 构造函数的原型对象 有了连接,这个连接是个指针，而非副本

F.prototype.constructor === F;

//null没有原型，并作为原型链中的最后一个环节
//几个常用方法
//isPrototypeOf()
//Object.getPrototypeOf()
//hasOwnProperty() => 检测一个属性存在于实例（true）还是原型中（false）

//读取属性或方法时，会先在实例上读取，若有则返回，不再搜索原型。若没有，则根据内部指针（即 __proto__）继续在原型对象中查找，若有则返回。
```

### js 创建对象

- 工厂模式

> 函数封装特定的细节
> 缺点: 没有解决对象识别问题

```js
function Person(name, age) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.sayName = function() {
    alert(this.name);
  };
  return o;
}
```

- 构造函数模式

> 没有显式创建对象
> 直接将属性和方法赋值给了 this 对象
> 没有 return 语句
> 创建时需要 new 关键字
> 可以将实例标示为特定类型，使用 instanceof 验证
> 缺点：方法需要在每个实例创建一遍，没必要

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    alert(this.name);
  };
}
```

- 原型模式

> 优点：所有对象实例共享属性方法，减少内存消耗
> 缺点：共享引发的问题，当有属性时引用类型时，就会出现不可避免的共享 ,还有省略传参

```js
function Person() {}
Person.prototype.name = "";
Person.prototype.age = 0;
Person.prototype.sayName = function() {
  alert(this.name);
};
```

> 或者简写为下面这种形式，减少多余 prototype 的输入

```js
function Person(){}
Person.prototype = {
	constructor: Person, //若使用该简写方法，则constructor不再指向Person，需要手动添加为当前写法，但constructor的[[Enumable]]又会被设置为true（原先默认为false）
	name: '',
	age: 0;
	sayName: function(){
		alert(this.name)
	}
}
```

- 组合模式：构造函数（定义实例属性） + 原型（定义共享属性和方法）

> 认可度最高

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function() {
  alert(this.name);
};
```

### js 如何实现继承

- 原型链继承: Sub.prototype = new Super()

> 缺点: 原先的实例属性称为现在的原型属性；在创建子类的时候，不能向超类的构造函数中传递参数
> 实际中，很少单独使用

```js
function Super() {
  this.colors = ["red", "blue"];
}
function Sub() {}

Sub.prototype = new Super();
let instance1 = new Sub();
let instance2 = new Sub();
instance1.colors.push("green");
instance1.colors; //['red','blue','green']
instance2.colors; //['red','blue','green']
```

- 借用构造函数继承(伪造对象 | 经典继承): 在子类构造函数中调用超类构造函数

> 每个实例都有自己的属性副本，可以传参
> 缺点：构造函数固有问题，函数不可复用；若将方法添加到父类原型中，子类不可见
> 很少单独使用

```js
function Super(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}
function Sub(name) {
  Super.call(this, name);
}
Super.prototype.show = function() {}; //子类不可见

let instance1 = new Sub();
let instance2 = new Sub();
instance1.colors.push("green");
instance1.colors; //['red','blue','green']
instance2.colors; //['red','blue']
```

- 组合继承(伪经典继承)：原型链（原型属性方法继承） + 借用构造函数(实例属性继承)

> 最常用

```js
function Super(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}
function Sub(name) {
  Super.call(this, name);
}

Super.prototype.show = function() {};

Sub.prototype.constructor = Sub; //需要修复构造函数指向
Sub.prototype = new Super();
```

### 函数柯里化

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

### 下面输出

```js
let a = { x: 1 };
let b = { x: 2 };

console.log(a < b); //false
console.log(a <= b); //true
console.log(a > b); //false
console.log(a >= b); //true

// --------------------------------------

var a = [1, 2, 3];
var b = [1, 2, 3];
var c = [1, 2, 4];

console.log(a == b); //false
console.log(a === b); //false
console.log(a > c); //false
console.log(a < c); //true
```

> 只有数字和字符串可以进行比较，不是的都将转换
> 比较运算符的转化规则:

### 下面输出

```js
const myMap = new Map();
const myFunc = () => "greeting";

myMap.set(myFunc, "Hello world");

//method 1
myMap.get("greeting"); //undefined
//method 2
myMap.get(myFunc); //Hello world
//method 3
myMap.get(() => "greeting"); //undefined
```

### 下面输出

```js
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[c]); //456
console.log(a[b]); //456
```

> object 和 map 存储的都是键值对组合，但是：
> object 的键类型是 字符串，整数，或者 symbol
> map 的键类型 可以是任意类型

### Blob 对象

### 下面代码的输出

```js
3.toString() //Error
3..toString() //3
3...toString() //Error
```

> '.'运算优先级

### 下面代码输出

```js
[1, 2, 3].map(parseInt); //[1, NaN, NaN]
"1 2 3".replace(/\d/g, parseInt); //"1 NaN 3"
```

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

### 下面代码输出

```js
'abc'=== 'abc'; //true
1 === 1 //true
{a: 1} === {a: 1} //false
{} === {} //false


true + 1; //2
"3" + 0; //30
5 + "12"; //512
undefined + 11; //NaN

```

> 考察 ===

### 下面代码输出

```js
//1
var objA = { data: { a: "hello", b: 123 } };
var objB = Object.assign({}, objA);
objB.data.a = "changed";
console.log(objA.data.a); //changed

//2
var objA = { a: "hello", b: 123 };
var objB = Object.assign({}, objA);
objB.a = "changed";
console.log(objA.a); //hello
```

> Object.assign()拷贝的是（可枚举）属性值，若源值是一个对象的引用，它会复制其引用，即拷贝其地址
> 若要实现深拷贝，objB = JSON.parse(JSON.stringify(objA));

### 下面代码输出

```js
var name = "World"!
(function() {
	if (typeof name === 'undefined') {
		var name = 'Jack';
		console.log('Goodbye' + name);
	} else {
		console.log('Hello' + name);
	}
})(); //GoodbyeJack
```

> js 不是真正从上到下依次执行，在执行前要进行一个预解析，将 name 变量提升至当前函数作用域的最顶层，即

```js
var name = "World"!
(function() {
	var name;
	if (typeof name === 'undefined') {
		name = 'Jack';
		console.log('Goodbye' + name);
	} else {
		console.log('Hello' + name);
	}
})();
```

### 下面代码输出

```js
typeof [1, 2, 3]; //Object
typeof NaN; //number 属于number类型，只不过用number类型无法表示 ECMAScript标准中明确定义了NaN属于Number类型。
```

### 下面代码输出

```js
var i = 0;
console.log(i++); //0
```

### 下面代码输出

```js
function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}

Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  console.log(5);
}

Foo.getName(); //2 => 调用函数的getName方法
getName(); //4 => 函数声明提升，表达式覆盖
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2
new Foo().getName(); //3
new new Foo().getName(); //3
```

### 下面代码输出

```js
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

//2 3 5 4 1
```

### 通过 js 代码找出 class 为 first 的不重复的同学名称

```js
let metadatas = [
  { name: "zhangsan", class: "first" },
  { name: "lisi", class: "first_2" },
  { name: "wangwu", class: "first_3" },
  { name: "zhaoliu", class: "first" },
  { name: "zhangsan", class: "first" },
];

let arr = metadatas
  .filter((item) => item.class === "first")
  .map((item) => item.name);
let set = new Set(arr);
let res = Array.from(set);
```

### 下面代码输出

```js
function demo1(x) {
  return arguments.length ? x : "demo";
}

let demo2 = (x) => {
  return arguments.length ? x : "demo";
};

demo1("a"); //1
demo2("a"); //Uncaught ReferenceError: arguments is not defined
```

> js 箭头函数是没有 this 和 arguments 变量的，如果这两个值可以打印，则一定来自父级作用域

### 数组 [{a:8}, {a:7}, {a: 9}, {a: 6}] 根据 a 属性进行数组内排序

```js
let arr = [{ a: 8 }, { a: 7 }, { a: 9 }, { a: 6 }];
arr.sort((a, b) => a.a - b.a);
```

### 数组与伪数组区别

伪数组：JavaScript 内置对象中常见的伪数组就是大名鼎鼎的 auguments

伪数组作用：若 Array 添加原型方法，直接添加 Array.prototype 会污染全局变量，可以使用伪数组实现，没有污染

### 对浏览器内核的理解和常见的浏览器

渲染引擎 + js 引擎

IE: Trident
FireFox:
Opera: Presto
Chrome: Blink (webkit 的分支)
Safari: Webkit

### == === 区别

> === 判断类型，若类型不同，直接返回；若相同，再比较值
> == 类型不同，先转化类型相同，比较；相同，直接比较

### Array.isArry() && instanceof Array 有哪些区别

### 列出 http 所有请求方法

GET | HEAD | POST | PUT | DELETE | CONNECT | OPTIONS | TRACE | PATCH

### http 的设置 keep-alive 的作用是什么

使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive 功能避免了建立或者重新建立连接(Web 服务器，基本上都支持 HTTP Keep-Alive)

缺点：对于提供静态内容的网站来说，这个功能通常很有用。但是，对于负担较重的网站来说，虽然为客户保留打开的连接有一定的好处，但它同样影响了性能，因为在处理暂停期间，本来可以释放的资源仍旧被占用。当 Web 服务器和应用服务器在同一台机器上运行时，Keep-Alive 功能对资源利用的影响尤其突出。

解决：Keep-Alive: timeout=5, max=100
(timeout：过期时间 5 秒（对应 httpd.conf 里的参数是：KeepAliveTimeout），max 是最多一百次请求，强制断掉连接。就是在 timeout 时间内又有新的连接过来，同时 max 会自动减 1，直到为 0，强制断掉。)

### 罗列常用的 http 状态码并简述其含义

1xx infomational(信息性状态码) 接收的请求正在处理
2xx success（成功状态码） 请求正常处理完毕
3xx redirection（重定向状态码）需要进行附加操作以完成请求
4xx client Error （客户端错误状态码）服务器无法处理请求
5xx server Error (服务器错误状态码) 服务器处理请求出错

### 常见的 web 攻击方式有哪些

- XSS(Cross Site Scripting)

跨站脚本攻击

> 用户的输入变成代码，需要对用户输入数据进行 HTML 转义

- CSRF
- SQL 注入
- 文件上传漏洞
- DDos 攻击
- 其他

### js 实现分页的逻辑

### mvvm 的理解（三要素）

### vuejs 绑定对象内部属性失败的原因或者解决方案

### 封装 ajax

```javascript
1. 创建实例 new XMLHttpRequest
2. 设置监听，onreadystatechange
3. 建立连接 open
4. 设置头信息
5. 发送请求 send
```

### 什么是空元素

```
eg: <img> <hr> <input> <link> ... 通常在一个空元素上使用一个闭标签是无效的
```

### getComputedStyle 和 element.style 区别

### html 语义化

```
代码结构: 使页面没有css的情况下，也能够呈现出很好的内容结构
有利于SEO: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
提升用户体验： 例如title、alt可以用于解释名称或者解释图片信息，以及label标签的灵活运用。
便于团队开发和维护: 语义化使得代码更具有可读性，让其他开发人员更加理解你的html结构，减少差异化。
方便其他设备解析: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。
```

### z-index 最大值（冷门） 2147483647 再大不起作用

### border: 0 与 border：none 的区别

### 使用 Promise 语法重写 setTimeout 函数

### 在一个 async 函数中调用使用 Promise 重写的 setTimeout 函数

### 常用正则

> /pattern/flag

- 基础概念

元字符：() [] {} ^ \$ . \* \ + ? |

字符类
[...] => 括号内任意字符
[^...] => 不包括括号内任意字符
. => 除换行符
\w => ASCII 字符 [a-z0-9A-Z]
\W => 非 ASCII 字符 [^a-z0-9a-z]
\s => 匹配空格
\S => 除空格
\d => 匹配数字 [0-9]
\D => 除数字 [^0-9]

重复
{n,m} >=n && <=m
{n,} >=n
{n} n
? {0,1}

- {1,n}

* {0,n}

锚字符 ^ \$

$` 匹配的前一个字符 
$& 匹配的字符
\$' 匹配的后一个字符

```js
let str = "=中文*";
console.log(str.replace(/中文/, "$`$&$'")); //==中文**
```

- 高级概念

$1-$9: 括号匹配是无限的，但是 RegExp 对象能捕获的只有 9 个

### 哪些方法可以用到正则

```js
String.prototype.search(); //返回首次匹配的索引，否则，返回 -1
String.prototype.searchAll(); //返回的是迭代器
String.prototype.split();
String.prototype.replace();
```

### 闭包（必须深入理解）

理解闭包，一定一定理解作用域链

> 当前作用域语句被执行完毕后，引擎会检查该作用域中被定义的变量（或常量）的被引用情况，若引用被全部解除，引擎便会认为其应该被清除

利用高阶函数产生能够穿透作用域的引用

### ES6 新特性

- 声明(let, const),块级作用域

var 只有声明本身会被提升，而赋值或其他运行逻辑会留在原地
let 块级作用域，没有变量提升,不允许重复声明
const 块级作用域，没有变量提升，不允许重复声明, 不可变(阻隔变量名称对应的内存地址被改变)，必须初始化赋值

> ES6 之前，js 只有全局作用域和函数作用域

- 箭头函数：

场景：为了方便在下一层作用域也能获得当前作用域的上下文对象

this 穿透：将函数内部的 this 延伸至上一层作用域中，即上一层的上下文会穿透到内层的箭头函数中

箭头函数对上下文的绑定是强制性的，无法通过 apply 或 call 改变

- 模板字符串

``

- 对象字面量扩展语法

```js
const obj = {
  a: "a",
  foo: function() {},
};
//语法糖
const obj = {
  a: "a",
  foo() {},
};
```

- 表达式解构

- 函数参数表达，传参

```js
function a(param = "p", ...arr) {} //默认参数值, 剩余参数
```

- 新数据结构 (Set, Map)

```js
//不能重复
const set = new Set();
const set = new Set([1, 2, 3]);

set.add(1); // 增加
set.delete(1); //删除
set.clear(); //清空
set.has(1); //是否包含
```

```js
//key不重复
const map = new Map();
map.set("foo", "hello");
map.get("foo");
map.delete("foo");
map.clear();
```

- 类语法（Classes）

实现继承用 `extends`

- Promise

- 代码模块化

- Symbol

- Proxy

- String

`String.fromCodePoint()`
`String.prototype.includes()`
`String.prototype.startsWith()`
`String.prototype.endsWith()`
`String.prototype.repeat()`

- Array

`Array.from()`
`Array.of()`
`Array.prototype.copyWithin()`
`Array.prototype.fill()`
`Array.prototype.find()`
`Array.prototype.findIndex()`

- Object

`Object.assign()`
`Object.is()`

### websocket

### API 安全措施（请求凭证措施）

- 静态权限凭证
- OAuth 权限凭证
- 自签名权限凭证

### 实现防抖（debounce）和节流 (throttle)

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

### 上传图片

### set 与 array 之间的相互转换

```js
//set => array
let set = new Set([1, 2, 3]);
Array.from(set); //[1,2,3]

//array => set
let arr = [1, 2, 3];
let set = new Set(arr);
```

### obj 与 map 之间的相互转换

### 设计模式

- 发布订阅模式
- 观察者模式

### 深拷贝和浅拷贝

- 深拷贝

`JSON.parse(JSON.stringify(obj))`

> 该方法存在局限性，若属性中包含 undefined function sysmbol 则转化过程中会被忽略，导致属性丢失

`JSON.assign()`

> 不是真正意义上的深拷贝，只拷贝基本数据类型

`Array.prototype.slice()`

> 不是真正意义上的深拷贝，只拷贝基本数据类型

- 浅拷贝

### 简述 webpack 特性，类似的工具有哪些

### 使用递归算法计算斐波那契数列 0，1，1，2，3...第 n 位上的值

```js
//方法1：递归
function Fibonacci(n) {
  if (!n) return 0;
  if (n === 1 || n === 2) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```

> 效率低，重复计算，运行 Fibonacci(50) 会出现假死现象， 递归需要堆栈， 数字过大内存不够

```js
//方法2: for循环
function Fibonacci() {
  if (n === 1 || n === 2) return 1;

  let n1 = 1;
  let n2 = 1;

  let sum = 0;
  for (let i = 2; i < n; i++) {
    sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }
  return sum;
}
```

### 编写一个方法，去除数组 arr 中的重复元素

```js
let a1 = { a: 1 };
let a2 = { a: 2 };
let a3 = { a: 3 };
let arr = [a1, { a: 2 }, a2, { a: 2 }, { a: 3 }, a3, { b: 2 }];

Array.from(new Set(arr.map((item) => JSON.stringify(item)))).map((item) =>
  JSON.parse(item)
);
```

### 判断一个字符串出现次数最多的字符，统计这个次数

```js
let arr = testString.split("");
let o = {};
for (let i = 0; i < arr.length; i++) {
  if (o[arr[i]]) {
    o[arr[i]]++;
  } else {
    o[arr[i]] = 1;
  }
}
let key = "";
let count = 0;
for (let i in o) {
  if (o[i] > count) {
    count = o[i];
    key = i;
  }
}
```

### 编写一个方法，实现如下功能，将任何一个数字按照指定的小数点位数【五舍六入】后输出

| 输入     | 保留小数位数 | 输出   |
| -------- | ------------ | ------ |
| 12       | 0            | 12     |
| 12       | 3            | 12.000 |
| 12.25687 | 2            | 12.26  |
| 12.25687 | 1            | 12.2   |

```js
```

### 给定一个二维数组的排列组合算法

```js
let arr = [
  ["1", "2", "4"],
  ["1", "2", "3", "5"],
  ["2", "3", "6"],
];

let results = [];
let result = [];
doExchange(resArr, 0);
function doExchange(arr, index) {
  for (let i = 0; i < arr[index].length; i++) {
    result[index] = arr[index][i];
    if (index != arr.length - 1) {
      doExchange(arr, index + 1);
    } else {
      results.push(result.join(""));
    }
  }
}
console.log(results);
```

### 冒泡排序算法

```js
function bubbleSort(arr){
	for(let i=0;i<arr.length - 1;i++){
		for(let j=0;j<arr.length-1-i;j++>) {
			if (arr[j] > arr[j+1]) {
				let tmp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = tmp;
			}
		}
	}
	return arr;
}
```

> 冒泡排序原理：比较相邻两个元素的大小，第一轮最后一个元素最大，这样依次比较

### 快速排序算法

```js
let arr = [1, 232, 542, 1235, 123, 53, 235, 5];

function quickSort(arr, begin, end) {
  //递归出口
  if (begin >= end) return;
  var l = begin; // 左指针
  var r = end; //右指针
  var temp = arr[begin]; //基准数，这里取数组第一个数
  //左右指针相遇的时候退出扫描循环
  while (l < r) {
    //右指针从右向左扫描，碰到第一个小于基准数的时候停住
    while (l < r && arr[r] >= temp) r--;
    //左指针从左向右扫描，碰到第一个大于基准数的时候停住
    while (l < r && arr[l] <= temp) l++;
    //交换左右指针所停位置的数
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
  //最后交换基准数与指针相遇位置的数
  [arr[begin], arr[l]] = [arr[l], arr[begin]];
  //递归处理左右数组
  quickSort(arr, begin, l - 1);
  quickSort(arr, l + 1, end);
}

quickSort(arr, 0, 5);
console.log(arr);
```

### MVC 的理解

### 使用 ajax 都有哪些优劣

### 原型链的基本原理

### 编写一个随机颜色字符串的函数

```js
function randomColor() {
  let str = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let template = "#xxxxxx";
  return template.replace(/x/gi, () => {
    let index = Math.floor(Math.random() * str.length);
    return str[index];
  });
}
```

### 将以下语句变成以每个单词首字母大写的形式

```js
// THIS IS A TEST => This Is A Test
// this is a TEST => This Is A Test
// this is a test => This Is A Test

function transfer(str) {
  // return str.toLowerCase().split(' ').map(item => item.replace(item[0], (i)=>i.toUpperCase())).join(' '); //我的写法
  return str
    .toLowerCase()
    .replace(/(\s|^)[a-z]/g, (char) => char.toUpperCase()); //大神写法
}
```

### 编写代码，可以如此调用 [1,2,'2',1,3,'2'].unique() 进行数组去重

```js
Array.prototype.unique = function() {
  return [...new Set(this)];
};
```

### 编写函数，返回 url 查询参数组成的对象

```js
function params(url) {
  let o = {};
  let paramsList = url.match(/(\w+)=(\w+)/gi);
  for (const param of paramsList) {
    let tmp = param.split("=");
    o[tmp[0]] = tmp[1];
  }
  return o;
}
```

### 代码输出

```js
var length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  },
};
obj.method(fn); //10 1
```

### 代码输出

```js
var a = 1;
function func() {
  a = b = 2;
}
func();
//a = 2
//b = 2
```

### 代码输出

```js
console.log(x === undefined);
var x = 3;
var myVar = "global Value";
(function() {
  console.log(myVar);
  var myVar = "local Value";
})();
//true undefined
```

### 代码输出

```js
foo();
function foo() {
  console.log("foo");
}

bar();
var bar = function() {
  console.log("bar");
};

//foo Error
```

### 代码输出

```js
console.log(typeof null); //object
console.log(null instanceOf Object); //false
```

### 代码输出

```js
var uname = "jack";
function change() {
  alert(uname);
  var uname = "lily";
  alert(uname);
}
change(); //undefined lily
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

### 代码输出

```js
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

person.getAge(); //16; 若setTimeout的回调为箭头函数。则为18
```

### 代码输出

```js
function showCase(value) {
  switch (value) {
    case "A":
      console.log("Case A");
      break;
    case "B":
      console.log("Case B");
      break;
    case undefined:
      console.log("undefined");
      break;
    default:
      console.log("Do not know!");
  }
}
showCase(new String("A")); //Case A  typeof new String('') object
showCase(String("A")); //undefined typeof String() string
```

### 位运算符

### a,b,c 哪个是全局变量

```js
var a = 1;
function foo() {
  if (a == 1) {
    var b = 2;
    if (b == 2) {
      c = 3;
    }
  }
}
foo();
//a,c
```

### 页面加载顺序

eg: onload 事件会在页面或图像加载完成后立即发生

### 随机生成 5 位数字

```js
//随机生成5位数字
function randomNum() {
  return parseInt(Math.random() * 90000 + 10000);
}
```

```js
tmp;

// 输入 | 保留小数位数 | 输出
// --- | --- | ---
// 12 | 0 | 12
// 12 | 3 | 12.000
// 12.25687 | 2 | 12.26
// 12.25687 | 1 | 12.2

function transfer(number, counts) {
  if (number.toString().search(/\./gi) > 0) {
    // return
    // console.log(String(number).split('.'));
    let [integer, deci] = String(number).split(".");
    if (deci.length > counts) {
    } else {
      let deciStr = "0".repeat(counts - 1);
      return `${number}${deciStr}`;
    }
  } else {
    let deciStr = "0".repeat(counts);
    return `${number}.${deciStr}`;
  }
}

console.log(transfer(12.1123, 1), "xxxxxx");

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

### 进制

- 二进制: 0b 开头
- 八进制: 0 开头
- 十六进制: 0x 开头

- 位运算符
  & | ^ ~ << >> >>>
- 进制转换

```js
(10).toString(2); //"1010"
parseInt(1001, 2); //9
```

### 生成 uuid

### webworker

[资料](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

- 作用：为 JS 创造多线程环境
- 优点：计算密集型或高延迟任务，被 Worker 线程负担，主线程（通常负责 UI 交互）就会很流畅不会被阻塞或拖慢
- 限制：
  > 同源：
- 使用：

### 前端缓存

[资料](https://zhuanlan.zhihu.com/p/44789005)

基本网络请求三步骤：`请求`+`处理`+`响应`

- 后端：`处理`
- 前端：`请求`（B） + `响应`（B+S）

按缓存位置（ 优先级：由上到下，找到即返回；否则继续）

- Service Worker
- Memory Cache （内存缓存）
- Disk Cache (硬盘缓存)
- 网络请求

按失效策略

- Cache-Control
- ETag
