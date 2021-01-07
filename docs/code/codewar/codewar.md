# KATA

## [Replace With Alphabet Position](https://www.codewars.com/kata/546f922b54af40e1e90001da/train/javascript)

#### 我的思路

``` js
function alphabetPosition(text) {
  let alphabetString = "abcdefghijklmnopqrstuvwxyz";

  let arrText = [];
  for(let i=0;i<text.length;i++) {
    if (alphabetString.indexOf(text[i].toLowerCase()) !== -1) {
      arrText.push(alphabetString.indexOf(text[i].toLowerCase()) + 1)
    }
  }
  text = arrText.join(' ');
  return text;
}
```

> 穷举了全部的字母，按照索引计算

#### 大佬思路

``` js
function alphabetPosition(text) {
   return text
     .toUpperCase()
     .match(/[a-z]/gi)
     .map( (c) => c.charCodeAt() - 64)
     .join(' ');
 }
```

> `charCodeAt`, 没想到吧

## [Complementary DNA](https://www.codewars.com/kata/554e4a2f232cdd87d9000038/train/javascript)

#### 我的思路

``` js
function DNAStrand(dna){
  //your code here
  return dna.replace(/[a-z]/gi, function(i){
    if (i === "A") return "T";
    if (i === "T") return "A";
    if (i === "G") return "C";
    if (i === "C") return "G";
  })
}
```
> 很无耻的穷举了所有的配对

#### 大佬思路

 ``` js
const DNA_PAIRS = {
  "A": "T",
  "T": "A",
  "G": "C",
  "C": "G"
}
function dnaFunc(str){
	return str.replace(/./gi, function(i){
		return DNA_PAIRS[i]
	})
}
 ```

> 正则 + 封装的对象，优雅

## [Create Phone Number](https://www.codewars.com/kata/525f50e3b73515a6db000b83/train/javascript)

#### 我的思路

``` js
function createPhoneNumber(numbers){
  return "(" + numbers.slice(0,3).join("") + ")" + " " + numbers.slice(3,6).join("") + "-" + numbers.slice(6,10).join("")
}
```
> 生涩的字符串拼接

#### 大佬思路

``` js
function formatFunc(arr){
	let format = "(xxx) xxx-xxxx";
	for(let i = 0; i<arr.length; i++) {
		format = format.replace("x", arr[i])
	}
	return format;
}
```
> 创建模板，正则替换，优雅


## [Sum of Digits / Digital Root](https://www.codewars.com/kata/541c8630095125aba6000c00/train/javascript)

#### 我的思路

``` js
function digital_root(n) {
  return n.toString().length > 1 ? digital_root(n.toString().split("").map(Number).reduce((total,num) => total + num)) : n;
}
```

> 借鉴了函数式编程的思想，用了一大堆链式调用更显美感，写完之后舒了一口气直到。。。

#### 大佬思路

``` js
function digital_root(n) {
  return (n - 1) % 9 + 1;
}
```

> ??? 一面不甘心的尝试着各种可能找到这个解决方案的漏洞，一面MMP，最后突感智商被碾压。


## [Objectify a URL Query String](https://www.codewars.com/kata/5286d92ec6b5a9045c000087/train/javascript)

有思路，但实现的时候被对象这块搞晕了

``` js
function convertQueryToMap(query) {
  // add your code here
  if (!query) return {};
  let list = query.split('&');

  let obj = {};

  for(let item of list) {
    let [keyString, value] = item.split('=');
    let keyList = keyString.split('.');
    let o = obj;

    for(let i=0;i<keyList.length;i++) {

      if (i < keyList.length - 1){
        if (!o[keyList[i]]) {
          o[keyList[i]] = {};
        }
        o = o[keyList[i]];
      } else {
        o[keyList[i]] = decodeURIComponent(value);
      }
    }
    // console.log(keyList, value)
  } 
  return obj;
}
```

