# 函数

## IIFE

### 1. 定义

IIFE: Immediately Invoked Function Expression，意为立即调用的函数表达式

### 2. 为什么需要 IIFE

只有全局作用域（global scope）、函数作用域（function scope），从 ES6 开始才有块级作用域（block scope）。

在 JS 中，只有 function，只有 function，只有 function 才能实现作用域隔离，因此如果要将一段代码中的变量、函数等的定义隔离出来，只能将这段代码封装到一个函数中。

### 3. IIFE 的常见形式

```js
(function foo() {
  console.log("IIFE");
})(); //较常见
// or
(function foo() {
  console.log("IIFE");
})();
```

### 4. IIFE 的函数名和参数

```js
var a = 2;
(function IIFE(global) {
  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2
})(window);

console.log(a); // 2
```

> [宿宝臣的博客](http://softlab.sdut.edu.cn/blog/subaochen/2016/02/%E8%AF%B4%E4%B8%80%E8%AF%B4js%E7%9A%84iife/)

## 模块化

### 1. IIFE

在刀耕火种的年代，作为脚本语言的 Javascript 为了避免全局变量污染，只能使用闭包来实现模块化。

```js
(functino(window){
	window.jQuery = window.$ = JQuery
})(window)
```

- 优点：有效解决命名冲突的问题
- 缺点：是对于依赖管理，还是束手无策。由于浏览器是从上至下执行脚本，因此为了维持脚本间的依赖关系，就必须手动维护好 script 标签的相对顺序。

### 2. AMD

`AMD(Asynchronous Module Definition)`是`RequireJS`在推广过程中对模块定义的规范化产出 (一个规范)

- AMD (可能更适合浏览器端)

对于依赖的模块，提前执行

```js
define(['./a', './b'], function(a, b){
	//依赖提前声明好
	...
	a.doSomething();
	b.doSomething();
})
```

> 无需遍历就能找到，性能有所提升，缺点需要

### 3. CMD

`CMD(Common Module Definition)`是`SeaJS`在推广过程中对模块定义的规范化产出 （一个规范）

- CMD （可能更适合服务器端）

对于依赖的模块，延迟执行， 推崇 as lazy as possible

```js
define(function(require,exports,module){
	var a = require('./a');
	a.doSomething();
	...
	var b = require('./b');
	b.doSomething();
	...
})
```

> 代码在运行时，不知道依赖，需要遍历所有的 require 关键字，找到后面的依赖，具体将 function toString()后，用正则匹配出 require 关键字后面的依赖，牺牲性能获取更多开发便利

### 4. CommonJS

`CommonJS Modules/2.0`是`BravoJS`在推广过程中对模块定义的规范化产出 （一个规范）

- CommonJS

前三者一般用于浏览器，Nodejs 使用 CommonJS 规范

规定 `module` 代表 当前模块, 是一个对象
它的 `exports` 属性, 是对外的接口，加载某个模块，其实是加载该模块的 `module.exports` 属性

若在命令行调用某个模块，eg: `node something.js`，则 `module.parent`为`null`，为入口脚本

内置 `require` 用于加载模块文件, 后缀名默认为 `.js`

### 5. UMD

### 6. ES6 Modules

- ES6

export/import 对模块进行导入导出

### 7.

### export 和 export default 的区别

ES5 中，用 `module.exports` 和 `exports` 导出模块，用 `require` 引入模块
ES6 中，新增 `export` 和 `export default` 导出模块，用 `import` 导入模块

```js
const a = {};
export default a;
import a from "...";

export const b = function() {};
import { b } from "...";
```

## 函数式编程

### 多种 js 编程方式

- 命令式编程：通过详细描述行为的编程方式
- 基于原型的面向对象编程
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
