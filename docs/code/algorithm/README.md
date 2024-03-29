# 算法

如果是像我一样非计算机专业的同学们，推荐先去看看 [labuladong](https://labuladong.gitee.io/algo/) 的算法梳理。

## 实现超出整数存储范围的两个大正整数相加 function add(a,b) 注意：参数a和b以及函数的返回值都是字符串


## 深度优先遍历和广度优先遍历

- 介绍下深度优先遍历和广度优先遍历，如何实现？

- 请分别用深度优先思想和广度优先思想实现一个拷贝函数


## 贪心算法


贪心选择性质 - 每一步都会做出一个局部最优选择，最终的结果就是全局最优


### 区间调度问题

经典贪心算法 Interval Scheduling 区间调度

有许多 [start, end] 闭区间，设计一个算法，算出这些区间中，最多有几个互不相交的区间


``` js
function intervalSchedule(intvs: number[][]) {}


// 比如 intvs = [[1,3], [2,4], [3,6]];
// 这些区间最多有两个区间互不相交，即[1,3], [3,6], intervalSchedule函数此时应该返回2
```

### 贪心求解

1. 可以每次都选择可选区间中开始最早的那个？

不行。有的区间可能开始很早，结束很晚 eg: [0,10] [1,2][2,3]

2. 可以每次选择可选区间里时间最短的那个？

不行。[1,3][2,4][3,6] [1,3][2,4]相交

### 正确思路

1. 从可选区间intvs里，选择一个end最小的区间x
2. 把所有与x相交的区间从intvs中剔除
3. 重复1，2，直到把intvs剔除空

``` js
// 我的做法
function foo(intvs){
    // 边界条件
    if (intvs.length === 0) return 0;
    // 排序
    let sortIntvs = intvs.sort((a, b) => a[1] - b[1])
    
    for(let i = 0; i<sortIntvs.length - 1; i++) {
        let [curStart, curEnd] = sortIntvs[i];
        let [itemStart, itemEnd] = sortIntvs[i+1];

        if (itemStart < curEnd) {
            sortIntvs.splice(i+1, 1)
        }
    }

    return sortIntvs.length;
}
```

``` js
// 大佬做法
function foo(intvs) {
    if (intvs.length === 0) return 0;
    const sortArray = intvs.sort((a,b) => a[1] - b[1]);
    let count = 1; //有几个区间互不相交
    let xEnd = sortArray[0][1];
    for(let item of intvs) {
        const start = item[0];
        if (start >= xEnd) {
            count++;
            xEnd = item[1];
        }
    }
    return count;
}
```

## 实现发牌

用 `splice` 算法复杂度比较高

## 实现排列组合

https://www.jb51.net/article/78734.htm

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

### 生成 uuid

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

### 随机生成 5 位数字

```js
//随机生成5位数字
function randomNum() {
  return parseInt(Math.random() * 90000 + 10000);
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
tmp;

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

### js 实现分页的逻辑

### getComputedStyle 和 element.style 区别
