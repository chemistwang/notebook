# 对象

## 创建

- `new`

``` js
let o = new Object();
```

- 对象字面量

``` js
let o = {}
```


## 属性描述符

- `value`

- `writable`: 是否可以修改属性值

``` js {4}
var o = {};
Object.defineProperty(o, 'a', {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: true
})
o.a = 3
o.a; //2
```

`'use strict'` 严格模式下尝试修改会报错

- `enumerable`

- `configurable`





## 不可变对象

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


## 原型



```js
// 代码输出
console.log(typeof null); //object
console.log(null instanceOf Object); //false
```

### 原型链的基本原理


:::tips 参考资料
https://github.com/mqyqingfeng/Blog/issues/2
:::


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

---

```js
// 代码输出
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

:::details Answer
``` js
// 2
// 4
// 1
// 1
// 2
// 3
// 3
```
:::


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
