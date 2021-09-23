# 对象

## 简单创建

- `new`

``` js
let o = new Object();
```

- 对象字面量

``` js
let o = {}
```

---

``` js
Q: Object.create()、new Object() 和 {} 的区别
```

:::details Answer
:::



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


```js
// 代码输出
var objA = { data: { a: "hello", b: 123 } };
var objB = Object.assign({}, objA);
objB.data.a = "changed";
console.log(objA.data.a);
```

:::details Answer
```js
//changed
```
:::

---

```js
// 代码输出
var objA = { a: "hello", b: 123 };
var objB = Object.assign({}, objA);
objB.a = "changed";
console.log(objA.a);
```

:::details Answer
``` js
//hello
// 解析:
// Object.assign()拷贝的是（可枚举）属性值
// 若源值是一个对象的引用，它会复制其引用，即拷贝其地址
// 若要实现深拷贝，objB = JSON.parse(JSON.stringify(objA));
```
:::


## 原型



```js
// 代码输出
console.log(typeof null); //object
console.log(null instanceOf Object); //false
```

### 原型链的基本原理


:::tip 参考资料
[JavaScript深入之从原型到原型链 #2](https://github.com/mqyqingfeng/Blog/issues/2)
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


## 高级创建

在遇到重复创建的情况时，使用 `简单创建` 的 `2` 种方法会造成大量冗余代码。

### 1. 工厂模式

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
var p = Person('chemputer', 24)
```

::: tip 优点
函数封装特定的细节，暂时解决创建多个对象问题
:::

::: warning 缺点
没有解决对象识别问题，这样创建的多个均是 `Object` 的实例
:::


### 2. 构造函数模式

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    alert(this.name);
  };
}
var p = new Person('chemputer', 24)
```

::: tip 优点
- 没有显式创建对象
- 直接将属性和方法赋值给了 `this` 对象
- 没有 `return` 语句
- 创建时需要 `new` 关键字
- 可以将实例标示为特定类型，使用 `instanceof` 验证
:::

::: warning 缺点
方法需要在每个实例创建一遍，没必要
:::


### 3. 原型模式

```js
function Person() {}
Person.prototype.name = "";
Person.prototype.age = 0;
Person.prototype.sayName = function() {
  alert(this.name);
};
// 或简写为，减少多余 prototype 的输入
function Person(){}
Person.prototype = {
    /** 
     * 若使用该简写方法
     * 则constructor不再指向Person，需要手动添加为当前写法
     * 但constructor的[[Enumable]]又会被设置为true（原先默认为false）
    */
	constructor: Person, 
	name: '',
	age: 0;
	sayName: function(){
		alert(this.name)
	}
}
```

::: tip 优点
所有对象实例共享属性方法，减少内存消耗
:::

::: warning 缺点
共享引发的问题，当有属性时引用类型时，就会出现不可避免的共享 ,还有省略传参
:::


### 4. 组合模式：构造函数（定义实例属性） + 原型（定义共享属性和方法）

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function() {
  alert(this.name);
};
```

::: tip 优点
认可度最高
:::



## 继承

ECMAScript实现继承主要是依靠原型链

### 1. 原型链继承

实现思路：`Sub.prototype = new Super()`

本质：`重写原型对象`

```js {6}
function Super() {
  this.colors = ["red", "blue"];
}
function Sub() {}

Sub.prototype = new Super();
let instance1 = new Sub();
let instance2 = new Sub();
instance1.colors.push("green");
console.log(instance1.colors); //['red','blue','green']
console.log(instance2.colors); //['red','blue','green']
```

::: warning 缺点
- 原先的 `实例属性` 变为现在的 `原型属性`，即 `引用类型属性` 被 `共享`
- 在创建子类的时候，`不能` 向超类的构造函数中 `传递参数`
- 实际中，很少单独使用
:::


### 2. 借用构造函数继承

也称为：`伪造对象` 或 `经典继承`

实现思路：`在子类构造函数中调用超类构造函数`

```js {6}
function Super(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}
function Sub(name) {
  Super.call(this, name);
}
Super.prototype.show = function() {console.log('show')}; //子类不可见

let instance1 = new Sub();
let instance2 = new Sub();
instance1.colors.push("green");
console.log(instance1.colors); //['red','blue','green']
console.log(instance2.colors); //['red','blue']
instance1.show(); //Uncaught TypeError: instance1.show is not a function
```

:::tip 优点
每个实例都有自己的属性副本，可以传参
:::


::: warning 缺点
- 构造函数固有问题，函数不可复用；若将方法添加到父类原型中，子类不可见
- 很少单独使用
:::


### 3. 组合继承

也称为：`伪经典继承`

实现思路：`属性（构造函数）+ 方法（原型链）`

```js {10}
function Super(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}
function Sub(name) {
  Super.call(this, name);
}
Super.prototype.show = function() {console.log('show')};
Sub.prototype = new Super();
Sub.prototype.constructor = Sub; //需要修复构造函数指向，否则指向的是Super
```

:::tip 优点
最常用
:::

:::warning 缺点
无论什么情况，都会调用 `2` 次 `Super` 的构造函数

```js {6,9}
function Super(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}
function Sub(name) {
  Super.call(this, name); //第 2 次调用
}
Super.prototype.show = function() {console.log('show')};
Sub.prototype = new Super(); // 第 1 次调用
Sub.prototype.constructor = Sub;
```
:::

### 4. 原型式继承

实现思路：同原型链继承

不同点：封装一个函数，不用在外面显式创建自定义类型

``` js
function object(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```

`ECMAScript5` 新增 `Object.create()` 方法规范原型式继承

:::tip 优点
同 `1. 原型链继承`
:::

:::warning 缺点
同 `1. 原型链继承`
:::

### 5. 寄生式继承

实现思路：在 `原型式继承` 基础之上，对实例化的对象进行增强

``` js {5}
function object(o) {
    function F(){}
    F.prototype = o;
    let f = new F();
    f.someMethod = function(){};
    return f;
}
```

:::warning 缺点
函数不能复用而降低效率
:::


### 6. 寄生组合式继承 👍 

实现思路：`属性（构造函数）+ 方法（原型链混合）`

```js
function inheritPrototype(subType, superType) {
    // var prototype = object(superType.prototype);
    function F(){}
    F.prototype = superType.prototype;
    let f = new F();
    f.constructor = subType;
    subType.prototype = f;
}
```

:::tip 优点
- 只会调用 `1` 次 `Super` 的构造函数
- 目前最有效
:::

### 7. `Class` 继承

`ES6` 新增，上述做法需要编写大量代码并且正确实现原型链


``` js {11}
class Person {
    constructor(name){
        this.name = name;
    }
    show(){
        console.log(this.name)
    }
}
class Man extends Person{
    constructor(name, age){
        super(name);
        this.age = age;
    }
    manShow(){
        console.log(this.age)
    }
}
```

### 原理


``` js
Q: ES5/ES6 的继承除了写法以外还有什么区别
```