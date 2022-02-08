# 跟月影学可视化

`可视化系统` = `数据引擎` + `渲染引擎`

**可视化更重要的是利用 WebGL 这样的图形系统，来更高效地实现更多有趣的图形**

## 可视化体系

### 1. 视觉

**理论基础** 
- 数学
    - 向量基础、向量乘法
    - 参数方程、坐标系
    - 三角剖分、仿射变换

- 图形学
    - 4大图形系统的绘图原理、方法、局限性
    - GPU、像素、颜色、滤镜、纹理
    - 像素动画、2D动画、3D动画
    - 透视、光照、阴影、3D渲染
    - 用户交互

**图形库和工具**
- 图形库 `OGL` `SpriteJS` `ThreeJS` `ClayGL` `BabylonJS`
- 工具 `D3` `Vega`

### 2. 数据

**数据分析**
- 数据可视化的基本方法
- 数据图表的组成
- 数据的可视化设计

**数据处理**
- 分类信息与空间信息
- 设计变量与数据拟合
- 时间信息处理
- 从数据拓扑结构到建立视觉层次

**可视化设计**
- 视觉层次
- 设计原则与误区

### 3. 性能

- `Canvas`、`SVG`、`WebGL`性能优化
- 性能基准和性能检测的一般方法
- 海量数据处理性能优化

## 常用工具库（4类）

**1. 图表库** *专业各种类型图表* 

- [Echarts](https://echarts.apache.org/zh/index.html)
- [Chartist](http://gionkunz.github.io/chartist-js/)
- [Chart.js](https://www.chartjs.org/)

**2. 地理库** *专业处理地图、地理位置*

- [Mapbox](https://www.mapbox.com/)
- [Leaflet](https://leafletjs.com/)
- [Deck.gl](https://deck.gl/)
- [CesiumJS](https://cesium.com/platform/cesiumjs/)

**3. 渲染库** *专业视觉呈现*

- [SpriteJS](http://spritejs.com/#/zh-cn/index) `2D`
- [ThreeJS](https://threejs.org/) `3D`
- [BabylonJS](https://www.babylonjs.com/) `3D`
- [SpriteJS3D](http://minimal.be/lab/Sprite3D/) `3D`

**4. 数据驱动框架** *处理数据*

- [D3.js](https://d3js.org/)

## 图形系统

![技术栈](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class3/1.jpg)

- **HTML+CSS**

普通的Web网页

- **SVG**

弥补绘制`矢量图形`的不足

- **Canvas2D**

`Browser`提供的`Canvas API`其中一种上下文

- **WebGL**

另一种上下文，是`OpenGL ES`规范在 Web 端的实现

![技术栈](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class3/2.jpg)

## 计算机系统绘图原理

![技术栈](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class3/3.jpg)

- 光栅（Raster）：几乎所有的现代图形系统都是基于光栅来绘制图形的，光栅就是指构成图像的**像素阵列**。
- 像素（Pixel）：一个像素对应图像上的一个点，它通常保存图像上的某个具体位置的颜色等信息。
- 帧缓存（Frame Buffer）：在绘图过程中，像素信息被存放于帧缓存中，帧缓存是一块内存地址。
- CPU（Central Processing Unit）：中央处理单元，负责逻辑计算。
- GPU（Graphics Processing Unit）：图形处理单元，负责图形计算。

![技术栈](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class3/4.jpg)

绘图过程：

1. 数据经过CPU处理，成为具有特定结构的几何信息
2. 这些信息送到GPU处理
3. GPU经过2个步骤生成光栅信息
4. 光栅信息输出到帧缓存
5. 渲染到屏幕

> 前一步输出就是后一步的输入，该过程称为**渲染管线（RenderPiplines）**

## WebGL绘制三角形

浏览器 `WebGL API` 是 `OpenGL ES` 的 `JavaScript` 绑定版本，赋予开发者操作 `GPU` 能力。

1. 创建WebGL上下文

```js
const canves = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
```

2. 创建WebGL程序（WebGL Program）

**本质是一个WebGLProgram 对象。相对于GPU而言，是最终运行的着色器程序**

```js
/**
 * 第一步：创建着色器 
 */

// 顶点着色器（Vertex Shader）：负责处理图形的顶点信息
const vertex = `
  attribute vec2 position;
  void main() { 
      gl_PointSize = 1.0;
      gl_Position = vec4(position, 1.0, 1.0);
  }
`;

// 片元着色器（Fragment Shader）：负责处理图形的像素信息
const fragment = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }    
`;

/**
 * 第二步：分别创建成 shader 对象
 */
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);


/**
 * 第三步：创建 WebGLProgram 对象，并将这两个 shader 关联到这个 WebGL 程序上
 */
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);


/**
 * 第四步：通过 useProgram 选择启用这个 WebGLProgram 对象。
 * 绘制图形时，GPU 就会执行通过 WebGLProgram 设定的 两个 shader 程序
 */
gl.useProgram(program);
```

:::tip 顶点和图元
绘图时，WebGL 以**顶点**和**图元**描述图形几何信息
- 顶点：几何图形的顶点
- 图元：WebGL 可直接处理的图形单元，由 WebGL 的绘图模式决定，有点、线、三角形等等
:::

3. 将数据存入缓冲区

**WebGL 需要用类型数组定义数据。JavaScript 通常用类型化数组来处理二进制缓冲区**

```js
/**
 * 第一步：定义顶点（当前绘制的是一个平面三角形）
 */
const points = new Float32Array([
  -1, -1,
  0, 1,
  1, -1,
]);


/**
 * 第二步：定义好的数据写入 WebGL 的缓冲区
 */

//创建一个缓存对象
const bufferId = gl.createBuffer();
// 绑定为当前操作对象
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
// 把当前数据写入混存对象
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

```


4. 将缓冲区数据读到GPU

```js
// 获取顶点着色器中的position变量的地址
const vPosition = gl.getAttribLocation(program, 'position');
// 给变量设置长度和类型
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
// 激活这个变量
gl.enableVertexAttribArray(vPosition);
```

5. GPU执行WebGL程序，输出结果

```js
//当前画布的内容清除
gl.clear(gl.COLOR_BUFFER_BIT);
// 以三角形为图元绘制
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
```

![技术栈](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class3/5.jpg)


## 视觉理论基础【数学】

1. 坐标系与坐标映射

- HTML 窗口坐标系
- SVG
- Canvas
- WebGL

