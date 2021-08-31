# 基础

## 数据类型

一共 `8` 种数据类型，分别是 `Undefined`, `Null`, `Boolean`, `String`, `Symbol`, `Number`, `BigInt`, `Object`

其中 `Object` 有几个子类 `Array`/ `RegExp` /`Date`/`Error`

:::tip 参考资料
[ecmascript-language-types](https://tc39.es/ecma262/#sec-ecmascript-language-types)
:::

---

```js
// typeof 有哪些返回值 ?
```

:::details Result

```js
typeof undefined; //undefined
typeof null; //object -> null表示一个空对象指针
typeof true; //boolean
typeof "1"; //string
typeof Symbol(); //symbol
typeof 1; //number
typeof 1n; //bigint
typeof object; //object
```

:::

---

```js
// 代码输出
typeof [1, 2, 3]; //?
typeof NaN; //?
```

::: details Result

```js
typeof [1, 2, 3]; //Object
typeof NaN; //number
//属于 number 类型，只不过用 number 类型无法表示
//ECMAScript 标准中明确定义了 NaN 属于 Number 类型。
```

:::

---

```js
// 代码输出
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

::: details Result

```js
showCase(new String("A")); //Do not know!
// typeof new String('') object
showCase(String("A")); //Case A
// typeof String('') string
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
// 代码输出
console.log(x === undefined); //?
var x = 3;
var myVar = "global Value";
(function() {
  console.log(myVar); //?
  var myVar = "local Value";
})();
```

::: details Result

```js
//true
//undefined
```

:::

---

```js
// 代码输出
var uname = "jack";
function change() {
  alert(uname); //?
  var uname = "lily";
  alert(uname); //?
}
change(); //?
```

::: details Result

```js
//undefined
//lily
```

:::

---

```js
// 代码输出
foo();
function foo() {
  console.log("foo"); //?
}

bar();
var bar = function() {
  console.log("bar"); //?
};
```

::: details Result

```js
//foo
//Uncaught TypeError: bar is not a function
```

:::

---

```js
// 代码输出
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

::: details Result

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
// a,b,c 哪个是全局变量 ?
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

::: details Result

```js
//a,c
```

:::

## 作用域

## 数组

::: details 哪些改变原数组，哪些不改变

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

### set 与 array 之间的相互转换

```js
//set => array
let set = new Set([1, 2, 3]);
Array.from(set); //[1,2,3]

//array => set
let arr = [1, 2, 3];
let set = new Set(arr);
```

### 下面代码输出

```js
[1, 2, 3].map(parseInt); //[1, NaN, NaN]
"1 2 3".replace(/\d/g, parseInt); //"1 NaN 3"
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

### 数组 [{a:8}, {a:7}, {a: 9}, {a: 6}] 根据 a 属性进行数组内排序

```js
let arr = [{ a: 8 }, { a: 7 }, { a: 9 }, { a: 6 }];
arr.sort((a, b) => a.a - b.a);
```

### 数组与伪数组区别

伪数组：JavaScript 内置对象中常见的伪数组就是大名鼎鼎的 auguments

伪数组作用：若 Array 添加原型方法，直接添加 Array.prototype 会污染全局变量，可以使用伪数组实现，没有污染

### Array.isArry() && instanceof Array 有哪些区别

### 深拷贝和浅拷贝

- 深拷贝

`JSON.parse(JSON.stringify(obj))`

> 该方法存在局限性，若属性中包含 undefined function sysmbol 则转化过程中会被忽略，导致属性丢失

`JSON.assign()`

> 不是真正意义上的深拷贝，只拷贝基本数据类型

`Array.prototype.slice()`

> 不是真正意义上的深拷贝，只拷贝基本数据类型

- 浅拷贝

## 对象

不可变对象

https://segmentfault.com/a/1190000017294051

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

## 原型

### 代码输出

```js
console.log(typeof null); //object
console.log(null instanceOf Object); //false
```

### 原型链的基本原理

---

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
