# 开发

## create react app

直接使用官方推荐的脚手架[create react app](https://create-react-app.dev/)一键生成即可，但是默认使用`js`。入股哟需要使用ts，添加 `--template typescript` 即可。

``` bash
npx create-react-app my-app --template typescript
```

## 集成 less

`create react app` 是不支持 `less` 的，需要手动配置。

1. 暴露配置文件

打开 `package.json` 文件，执行 `npm run eject` 暴露被隐藏的配置文件。

``` json
  "scripts": {
    "start": "react-scripts start", //开启一个微服务
    "build": "react-scripts build", //构建项目
    "test": "react-scripts test", //测试
    "eject": "react-scripts eject" //释放配置
  },
```

2. 安装 `less-loader`

执行 `npm install less less-loader --save-dev`

3. 在 `webpack` 中配置规则即可

打开 `config/webpack/webpack.config.js`

``` js
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
// 新增
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

...

{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 3,
        sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
        modules: {
        mode: 'icss',
        },
    },
    'less-loader'
    ),
    sideEffects: true,
},
{
    test: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 3,
        sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
        modules: {
        mode: 'local',
        getLocalIdent: getCSSModuleLocalIdent,
        },
    },
    'less-loader'
    ),
},
...


```


4. 如果需要使用模块化，避免样式污染

- 修改 `index.less` 为 `index.module.less`
- 导入方式 `import './index.less'` 为 `import style from './index.module.less'`
- 在 `react-app-env.d` 添加 `ts` 声明，否则编译报错

``` ts
...

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

## 集成 react-router v6

``` bash
npm install react-router-dom@6
```

## 集成 react-redux

``` bash
npm install react-redux
```

## 集成 antd

``` bash
npm install antd
```

## 集成 axios

``` bash
npm install axios
```

## 配置代理

在 `src/` 创建 `setupProxy.js` 文件

``` js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://ip:port',
            changeOrigin: true,
            pathRewrite: { '^/': '' }
        })
    );
};
```

