# 循环

### for 循环中 break, continue, return 的区别

### for 循环

for(){}

```js
for(let i in ...) {
	i; //arr => index（MDN：不应该用于迭代一个 Array，其中索引顺序很重要。）
	i; //obj => key
}
```

```js
//for...of (代替for...in语句)
for(let i of ...) {
// for(const i of ...) 若不想修改变量，使用const
	i; //arr => value
	//不能遍历对象
}
```
