### react

前言

平时工作中收集到了很多动画，想整理一下，组成一个自己的素材库。另外也想加深一下对函数式编程思想的理解。

说实话，我一直对vue抱有偏见，所以借这个机会，尝试用下react构建我的工程。


先把官网的demo做了（https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app）

对标Vue的学习模式和框架，大致明确了常用的几个选择：
 - 脚手架 `create-react-app`
> 区别于做RN原生的 `create-react-native-app`脚手架
 - 路由  `react-router-dom`
 > 还有引用`react-router`的
 - UI `antd`
 > 本来想尝试下 `material UI`
 - 状态管理 `redux`
 > 还有用 `mobx`的，据说这个比较轻量



### 遇到的问题

背景：对比vue可以使用scoped来防止样式覆盖，react需要使用`node-sass`

下载运行之后报错 `Error: Node Sass version 5.0.0 is incompatible with ^4.0.0.`

发现自己下载的是 `"node-sass": "^5.0.0"`

结论：5.0 版本需要node15，而我自己的node环境是12.12，版本问题

```
npm uninstall node-sass
npm install node-sass@4.14.1
```


单个class名

多个class名

中划线class名











