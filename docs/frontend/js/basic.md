# 基础

## 数据类型

一共 `8` 种数据类型，分别是 `Undefined`, `Null`, `Boolean`, `String`, `Symbol`, `Number`, `BigInt`, `Object`

其中 `Object` 有几个子类 `Array`/ `RegExp` /`Date`/`Error`

:::tip 参考资料
[ecmascript-language-types](https://tc39.es/ecma262/#sec-ecmascript-language-types)
:::

---

```js
// Q: typeof 有哪些返回值 ?
```

:::details Answer

```js
typeof undefined; //undefined
typeof null; //object -> null表示一个空对象指针
typeof true; //boolean
typeof "1"; //string
typeof Symbol(); //symbol
typeof 1; //number
typeof 1n; //bigint
typeof {}; //object
```

:::

---

```js
// Q: 代码输出
typeof [1, 2, 3]; //?
typeof NaN; //?
```

::: details Answer

```js
typeof [1, 2, 3]; //object
typeof NaN; //number
//属于 number 类型，只不过用 number 类型无法表示
//ECMAScript 标准中明确定义了 NaN 属于 Number 类型。
```

:::

---

```js
// Q: 代码输出
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
showCase(new String("A")); //?
showCase(String("A")); //?
```

::: details Answer

```js
showCase(new String("A")); //Do not know!
// typeof new String('') object
showCase(String("A")); //Case A
// typeof String('') string
```

:::

---

``` js
// Q: 判断数据类型
```

::: details Answer
``` js
Object.prototype.toString.call()
```
:::





## 数字

### 进制

- 二进制: 0b 开头
- 八进制: 0 开头
- 十六进制: 0x 开头

### 进制转换

```js
(10).toString(2); //"1010"
parseInt(1001, 2); //9
```

## 字符串

- 字符串方法

## 运算符

运算符优先级


### 赋值

```js
var a = 1;
function func() {
  a = b = 2;
}
func();
//a = 2
//b = 2
```

### 算术

### 复合赋值

### 递增/递减

```js
// 代码输出
var i = 0;
console.log(i++); //?
```

::: details result

```js
// 0
```

:::

### 对象访问

```js
// 代码输出
3.toString() //?
3..toString() //?
3...toString() //?
```

:::details Result

```js
//Error
//3
//Error
// '.'运算优先级
```

:::

### 相等

```js
// 代码输出
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

// --------------------------------------

var a = [1, 2, 3];
var b = [1, 2, 3];
var c = "1,2,3";

console.log(a == c); //true
console.log(b == c); //true
console.log(a == b); //false
```

> 只有数字和字符串可以进行比较，不是的都将转换
> 比较运算符的转化规则:

### 比较

### 逻辑

```js
// 代码输出
'abc'=== 'abc'; //true
1 === 1 //true
{a: 1} === {a: 1} //false
{} === {} //false


true + 1; //2
"3" + 0; //30
5 + "12"; //512
undefined + 11; //NaN

```

### == === 区别

> === 判断类型，若类型不同，直接返回；若相同，再比较值
> == 类型不同，先转化类型相同，比较；相同，直接比较

### 位运算符

& | ^ ~ << >> >>>

## 提升


```js
// Q: 代码输出
foo() //?
function foo(){
  console.log(a);
  var a = 2;
}

bar() //?
var bar = function(){

}
```

:::details Answer
``` js
// undefined
// Uncaught TypeError: foo is not a function
// 函数声明式会被提升，但是函数表达式不会
```
:::

---

``` js
// Q: 代码输出
foo(); //?
var foo;
function foo() { 
  console.log(1);
}
foo = function() { 
  console.log(2); 
};
```

:::details Answer

``` js
// 1
// 函数声明和变量声明都会被提升
// 但是函数会被优先提升，然后才是变量
// 会被解析为
function foo(){
  console.log(1);
}
foo();
foo = function(){
  console.log(2);
}
// var foo 是重复的声明，会被忽略
```

:::


---

```js
// Q: 代码输出
function change() {
  alert(typeof fn); //?
  function fn() {
    alert("hello");
  }
  var fn;
}
change();
```

:::details Answer
``` js
//function
```
:::



---

``` js
// Q: 代码输出
foo(); //?
function foo(){
  console.log(1)
}
var foo = function(){
  console.log(2);
}
function foo(){
  console.log(3);
}
```

:::details Answer

``` js
// 3
// 后面的函数声明可以覆盖前面
```

:::


---


```js
// Q: 代码输出
console.log(x === undefined); //?
var x = 3;
var myVar = "global Value";
(function() {
  console.log(myVar); //?
  var myVar = "local Value";
})();
```

::: details Answer

```js
//true
//undefined
```

:::

---

```js
// Q: 代码输出
var uname = "jack";
function change() {
  alert(uname); //?
  var uname = "lily";
  alert(uname); //?
}
change(); //?
```

::: details Answer

```js
//undefined
//lily
```

:::

---

```js
// Q: 代码输出
foo();
function foo() {
  console.log("foo"); //?
}

bar();
var bar = function() {
  console.log("bar"); //?
};
```

::: details Answer

```js
//foo
//Uncaught TypeError: bar is not a function
```

:::

---

```js
// Q: 代码输出
var name = "World"!
(function() {
	if (typeof name === 'undefined') {
		var name = 'Jack';
		console.log('Goodbye' + name); //?
	} else {
		console.log('Hello' + name); //?
	}
})();
```

::: details Answer

```js
// GoodbyeJack
```

```js {9,11}
/**
 * js 不是真正从上到下依次执行
 * 在执行前要进行一个预解析，
 * 将 name 变量提升至当前函数作用域的最顶层，即
 */

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

:::

---

```js
// Q: a,b,c 哪个是全局变量 ?
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
```

::: details Answer

```js
//a,c
```

:::


--- 

```js
// Q: 代码输出
const Greeters = [];
for (var i = 0; i < 10; i++) {
  Greeters.push(function() {
    return console.log(i);
  });
}

Greeters[0]();
Greeters[1]();
Greeters[2]();
```

:::details Answer

``` js
// 10
// 10
// 10
// 解析：只是 push 数组，并没有执行方法
```

:::








## 作用域






## 数组

``` js
Q: 哪些改变原数组，哪些不改变
```

::: details Answer

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

:::



---


``` js
Q: set 与 array 之间的相互转换
```

::: details Answer

```js
//set => array
let set = new Set([1, 2, 3]);
Array.from(set); //[1,2,3]

//array => set
let arr = [1, 2, 3];
let set = new Set(arr);
```

:::

---


```js
Q: 代码输出

[1, 2, 3].map(parseInt); 
"1 2 3".replace(/\d/g, parseInt); 
```

:::details Answer

```js
//[1, NaN, NaN]
// "1 NaN 3"
```

:::

---


```js
Q: 通过 js 代码找出 class 为 first 的不重复的同学名称

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

--- 

```js
Q: 数组 [{a:8}, {a:7}, {a: 9}, {a: 6}] 根据 a 属性进行数组内排序
```

:::details Answer

``` js
let arr = [{ a: 8 }, { a: 7 }, { a: 9 }, { a: 6 }];
arr.sort((a, b) => a.a - b.a);
```

:::


---

```js
Q: 数组与伪数组区别
```

:::details Answer

伪数组：JavaScript 内置对象中常见的伪数组就是大名鼎鼎的 auguments

伪数组作用：若 Array 添加原型方法，直接添加 Array.prototype 会污染全局变量，可以使用伪数组实现，没有污染

:::

---

``` js
Q: Array.isArry() && instanceof Array 有哪些区别
```

:::details Answer
:::


### 深拷贝和浅拷贝

- 深拷贝

`JSON.parse(JSON.stringify(obj))`

> 该方法存在局限性，若属性中包含 undefined function sysmbol 则转化过程中会被忽略，导致属性丢失

`JSON.assign()`

> 不是真正意义上的深拷贝，只拷贝基本数据类型

`Array.prototype.slice()`

> 不是真正意义上的深拷贝，只拷贝基本数据类型

- 浅拷贝



## 正则

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

