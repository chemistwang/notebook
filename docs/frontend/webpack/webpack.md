# webpack
静态模块打包器(module bundler),当webpack处理应用程序时，会递归构建依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle。

# 四个核心概念
- 入口(entry)

- 输出(output)


- loader
- 插件(plugins)

``` js
const path = require('path');

const config = {
   entry: './path/to/my/entry/file.js',
   output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
   },
   module: {
    
   },
   plugins: [
        
   ],
   mode: 'production' //'development/production',可以启用相应模式下的webpack内置的优化
}

module.exports = config;

```

