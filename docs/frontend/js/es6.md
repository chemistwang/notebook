# Javascript

## 一、变量
变量与内存之间的关系由三个部分组成：
1. 变量名
2. 内存绑定
3. 内存（内存地址）

用户改变变量值时，引擎会重新从内存中分配新的内存空间并存储新值，并将新的内存地址与变量绑定

const原理：变量名与内存地址之间建立不可变的绑定，当后面程序尝试新的内存空间时，引擎便会抛出错误。

但用const定义的对象，属性可以被修改

### 1. 变量的生命周期

 由两种因素决定：作用域，对其的引用
 
 延长生命周期，最常用的是闭包，原理：利用高阶函数来产生能够穿透作用域的引用
 
### 2. for...of 代替 for...in 配合解构

``` js
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

``` js
const fn = foo => `${foo}`;

//eg
arr.filter(item => item.length > 1);
```

b. 多参数---单行箭头函数

``` js
const fn = (foo, bar) => foo + bar;

//eg
arr.sort((a, b) => return a - b);

```

### 2. this穿透
a. 用于将函数内部的this延伸至上一层作用域中，即上一层的上下文会穿透到内层的箭头函数中
b. 箭头函数对上下文的绑定是强制的，无法通过apply或call方法改变
c. 箭头函数也没有arguments、callee和caller等对象
 
## 三、模板字符串
多行模板字符串会在每一行的最后添加一个”\n“字面量，所以在读取多行字符串的长度时，除最后一行以外，每一行的长度都会加1，即增加了”\n“的长度

## 四、对象字面量扩展语法 （对象字面量：即不用new）

``` js
// 函数类属性的省略语法
let obj = {
    a: function() {
    },
    b() { //语法糖，更像是一个方法，而不只是一个以函数为值的属性
    }
}
```

``` js
// 支持__proto__注入
class Machine extends EventEmitter { /*...*/ } //单一的实例创建一个类
let obj = {
    __proto__: new EventEmitter(), // ES2015允许直接向一个对象字面量注入__proto__
    method() { /*...*/ }
}
```

``` js
// 动态计算属性名
const a = 'x';
let obj = {
    [a + 'pre']: "value"
}
```

``` js
// 将属性名定义忽略
let obj = {
    a, //a:a
    b  //b:b
}
```

## 五、解构

``` js
//基本用法
const { name, age } = info;
const [ foo, bar ] = [ bar, foo ];
const [ foo, bar ] = [1, 2]; //数组被赋予的变量是按顺序的
const [ foo, ...bar] = [1,2,3,4,5];

//解构别名（用冒号后面的别名获得相应的返回值）
const { response: fieldName } = info;
console.log(fieldName)

//匹配缺省值
const { name, age } = { name: 'lucus'};
console.log(age); //undefined
const { name, age = 18} = { name: 'lucus'}; //定义默认值

//通过Array.map和深层匹配解构获取深层数据
//传入带有解构参数的箭头函数时，解构参数外必须有一个括号包裹
const data = sourceData.map(
    ({name, age, media: {m: image}}) => ({
        name, age, media, image
    })
)

```

## 六、函数参数

``` js
function fn(opt = {}, ...restArgs) {} //默认参数, 使用剩余参数，后面不能再加任何参数

Array.prototype.slice.call(arguments);//将类数组对象转化为一个新数组
[].slice.call(arguments); //简化
Array.from(arguments); //ES6
```

``` js
function merge(target = {}, ...objs) {
    for(const obj of objs) {
        const keys = Object.keys(obj);
        for(const key of keys) {
            target[key] = obj[key]
        }
    }
    return target
}
console.log(merge({a:1},{b:2},{c:3})); //{a:1,b:2,c:3}
```


## 七、新的数据结构

值类型：String | Number | Boolean | Null | Undefined
引用类型： Object | Array | RegExp | Date | Error





``` js
Array.of(a,b); //[a, b];

```




 

原生Js获取dom节点
``` html
<ul>
    <li></li>
    <li></li>
</ul>
```

``` html
<div id="container" data-code="code" data-long-name="name"></div>
```
``` js
let container = document.getElementById('container');
//取值+赋值
container.getAttribute('code'); //取值
container.getAttribute('long-name');
container.setAttribute('code', 'yourcode'); //赋值

//data-前缀可以通过dataset
container.dataset.code; //取值
container.dataset.longName;
container.dataset.code = 'changeCode'; //赋值
container.dataset.longName = 'changeLongName';

//删除
container.dataset.code = null; //设置为null
delete container.dataset.code; //delete
```


# JavaScript编程风格

> Programs must communicate clearly to people.
> Good use of style can help reduce the occurrence of errors.

# 前端模块化

Commonjs/AMD/CMD/UMD
RequireJS/SeaJs/FIS/Browserify/webpack




##1. IIFE(Innediately Invoked Function Expression)
立即调用的函数表达式

IIFE出现为了弥补JS在scope上的缺陷

- 全局作用域（global scope）
- 函数作用域（function scope）
只有function才能实现作用域隔离
- 块级作用域（block scope）=> ES6出现才有
> IIFE有效解决命名冲突问题
> 对依赖管理束手无策
> 维持脚本依赖关系，必须手动维护script相对顺序

## 2. AMD(asynchronous Module Definition)

RequireJS是该规范的实现
> 利用RequireJS来编写代码，所有依赖必须提前声明。在导入模块时，也会加载对应的依赖模块，然后再执行接下来的代码。
> AMD模块可以并行加载所有依赖模块，提高页面加载性能

``` js
define('./config.js', function(config) {
    
})
```

## 3. CMD(common Module Definition)


