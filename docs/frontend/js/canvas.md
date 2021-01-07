# Canvas
## canvas元素
``` html
<!--规定元素id,宽度,高度-->
<canvas id="myCanvas" width="x" height="y">Your browser is not support canvas...</canvas>
```
> 不支持canvas的浏览器会忽略容器并在其中渲染后备内容
> 支持canvas的浏览器会忽略在容器中包含的内容，并且只是正常渲染canvas

> 设置canvas的宽高必须在标签内，在style中则不生效


## 1. 2D上下文对象
坐标: 左上角,原点坐标为(0,0)

``` js
let canvas = document.querySelector('#yourCanvasId');
let ctx = canvas.getContext('2d');

```

###  绘制矩形

``` js
ctx.fillRect(x,y,w,h); //绘制一个填充的矩形
ctx.clearRect(x,y,w,h); //绘制一个矩形的边框
ctx.strokeRect(x,y,w,h); //清除指定矩形区域，让清除部分完全透明
```

### 绘制路径

``` js
ctx.beginPath(); 
ctx.closePath();
ctx.stroke();
ctx.fill();
```

- 移动笔触
 
``` js
ctx.moveTo(x,y); //该函数不能画出任何东西，只是将笔触移动到指定坐标
```

- 画直线

``` js
ctx.moveTo(x,y); //该函数不能画出任何东西，只是将笔触移动到指定坐标
```

- 画圆弧

``` js
/**
* x,y为圆心坐标
* radius为半径
* startAngle,endAngle为弧度，均已x轴为基准
* anticlockwise 逆时针为true,顺时针为false
*/
ctx.arc(x, y , radius, startAngle, endAngle, anticlockwise);
```
> arc = (Math.PI/180)*角度


## 2. 3D上下文对象


