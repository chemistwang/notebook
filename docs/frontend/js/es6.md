# ES6

::: tip 参考资料
[阮一峰 ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)
:::

## 一、变量

变量与内存之间的关系由三个部分组成：

1. 变量名
2. 内存绑定
3. 内存（内存地址）

用户改变变量值时，引擎会重新从内存中分配新的内存空间并存储新值，并将新的内存地址与变量绑定

const 原理：变量名与内存地址之间建立不可变的绑定，当后面程序尝试新的内存空间时，引擎便会抛出错误。

但用 const 定义的对象，属性可以被修改

### 1. 变量的生命周期

由两种因素决定：作用域，对其的引用

延长生命周期，最常用的是闭包，原理：利用高阶函数来产生能够穿透作用域的引用

### 2. for...of 代替 for...in 配合解构

```js
const arr = [
    { name: 'lucus', age: 1},
    { name: 'rebecca', age: 2}
];
for(const { name, age} of arr) {
    console.log(`${name}, ${age}`);
}

//可以解决forEach不能被break控制语句终止
for(const [ index, { name, age}] of arr.entries()) {
    console.log(`${index}, ${name}, ${age}`);
    if (...) {
        ...
        break
    }
}

```

## 二、箭头函数

### 1. 用法

a. 单一参数---单行箭头函数

```js
const fn = (foo) => `${foo}`;

//eg
arr.filter((item) => item.length > 1);
```

b. 多参数---单行箭头函数

```js
const fn = (foo, bar) => foo + bar;

//eg
arr.sort((a, b) => return a - b);

```

### 2. this 穿透

a. 用于将函数内部的 this 延伸至上一层作用域中，即上一层的上下文会穿透到内层的箭头函数中
b. 箭头函数对上下文的绑定是强制的，无法通过 apply 或 call 方法改变
c. 箭头函数也没有 arguments、callee 和 caller 等对象

## 三、模板字符串

多行模板字符串会在每一行的最后添加一个”\n“字面量，所以在读取多行字符串的长度时，除最后一行以外，每一行的长度都会加 1，即增加了”\n“的长度

## 四、对象字面量扩展语法 （对象字面量：即不用 new）

```js
// 函数类属性的省略语法
let obj = {
  a: function() {},
  b() {
    //语法糖，更像是一个方法，而不只是一个以函数为值的属性
  },
};
```

```js
// 支持__proto__注入
class Machine extends EventEmitter {
  /*...*/
} //单一的实例创建一个类
let obj = {
  __proto__: new EventEmitter(), // ES2015允许直接向一个对象字面量注入__proto__
  method() {
    /*...*/
  },
};
```

```js
// 动态计算属性名
const a = "x";
let obj = {
  [a + "pre"]: "value",
};
```

```js
// 将属性名定义忽略
let obj = {
  a, //a:a
  b, //b:b
};
```

## 五、解构

```js
//基本用法
const { name, age } = info;
const [foo, bar] = [bar, foo];
const [foo, bar] = [1, 2]; //数组被赋予的变量是按顺序的
const [foo, ...bar] = [1, 2, 3, 4, 5];

//解构别名（用冒号后面的别名获得相应的返回值）
const { response: fieldName } = info;
console.log(fieldName);

//匹配缺省值
const { name, age } = { name: "lucus" };
console.log(age); //undefined
const { name, age = 18 } = { name: "lucus" }; //定义默认值

//通过Array.map和深层匹配解构获取深层数据
//传入带有解构参数的箭头函数时，解构参数外必须有一个括号包裹
const data = sourceData.map(({ name, age, media: { m: image } }) => ({
  name,
  age,
  media,
  image,
}));
```

## 六、函数参数

```js
function fn(opt = {}, ...restArgs) {} //默认参数, 使用剩余参数，后面不能再加任何参数

Array.prototype.slice.call(arguments); //将类数组对象转化为一个新数组
[].slice.call(arguments); //简化
Array.from(arguments); //ES6
```

```js
function merge(target = {}, ...objs) {
  for (const obj of objs) {
    const keys = Object.keys(obj);
    for (const key of keys) {
      target[key] = obj[key];
    }
  }
  return target;
}
console.log(merge({ a: 1 }, { b: 2 }, { c: 3 })); //{a:1,b:2,c:3}
```

## 七、新的数据结构

值类型：String | Number | Boolean | Null | Undefined
引用类型： Object | Array | RegExp | Date | Error

```js
Array.of(a, b); //[a, b];
```

原生 Js 获取 dom 节点

```html
<ul>
  <li></li>
  <li></li>
</ul>
```

```html
<div id="container" data-code="code" data-long-name="name"></div>
```

```js
let container = document.getElementById("container");
//取值+赋值
container.getAttribute("code"); //取值
container.getAttribute("long-name");
container.setAttribute("code", "yourcode"); //赋值

//data-前缀可以通过dataset
container.dataset.code; //取值
container.dataset.longName;
container.dataset.code = "changeCode"; //赋值
container.dataset.longName = "changeLongName";

//删除
container.dataset.code = null; //设置为null
delete container.dataset.code; //delete
```

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

---

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

---

### obj 与 map 之间的相互转换

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
