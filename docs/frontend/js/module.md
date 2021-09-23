# 模块化

```js
Commonjs / AMD / CMD / UMD;
RequireJS / SeaJs / FIS / Browserify / webpack;
```

## IIFE

### 1. 定义

IIFE: Immediately Invoked Function Expression，意为立即调用的函数表达式

### 2. 为什么需要 IIFE

IIFE 出现为了弥补 JS 在 scope 上的缺陷

- 全局作用域（global scope）
- 函数作用域（function scope）
  只有 function 才能实现作用域隔离
- 块级作用域（block scope）=> ES6 出现才有
  > IIFE 有效解决命名冲突问题
  > 对依赖管理束手无策
  > 维持脚本依赖关系，必须手动维护 script 相对顺序

在 JS 中，只有 function 才能实现作用域隔离，因此如果要将一段代码中的变量、函数等的定义隔离出来，只能将这段代码封装到一个函数中。

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

在刀耕火种的年代，作为脚本语言的 Javascript 为了避免全局变量污染，只能使用 `闭包` 来实现模块化。

```js
(functino(window){
	window.jQuery = window.$ = JQuery
})(window)
```

- 优点：有效解决命名冲突的问题
- 缺点：是对于依赖管理，还是束手无策。由于浏览器是从上至下执行脚本，因此为了维持脚本间的依赖关系，就必须手动维护好 script 标签的相对顺序。

## AMD

`AMD(Asynchronous Module Definition)` 是 `RequireJS` 在推广过程中对模块定义的规范化产出 (一个规范)

- AMD (可能更适合浏览器端)

对于依赖的模块，提前执行

```js
define("./config.js", function(config) {});
define(['./a', './b'], function(a, b){
	//依赖提前声明好
	...
	a.doSomething();
	b.doSomething();
})
```

> - 利用 RequireJS 来编写代码，所有依赖必须提前声明。在导入模块时，也会加载对应的依赖模块，然后再执行接下来的代码。
> - AMD 模块可以并行加载所有依赖模块，提高页面加载性能
> - 无需遍历就能找到，性能有所提升，缺点需要

## CMD

`CMD(Common Module Definition)` 是 `SeaJS` 在推广过程中对模块定义的规范化产出 （一个规范）

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

## UMD

`UMD(Universal Module Definition)`

## CommonJS

`CommonJS Modules/2.0` 是 `BravoJS` 在推广过程中对模块定义的规范化产出 （一个规范）

前三者一般用于浏览器，Nodejs 使用 CommonJS 规范

- `require`

用于加载模块文件, 后缀名默认为 `.js`

- `module`

规定 `module` 代表 当前模块, 是一个对象

- `exports`

对外接口，加载某个模块，其实是加载该模块的 `module.exports` 属性

> CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作

## ES6 Modules

ES6模块的设计思想是 `尽量的静态化` ，使得 `编译时` 就能确定模块的依赖关系，以及输入和输出的变量。

export/import 对模块进行导入导出

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
