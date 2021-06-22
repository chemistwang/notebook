# Travis CI

::: tip 背景
我目前的笔记是托管在 `github` 上的，有 `travis` 很好的支持 
:::

## 使用travis实现持续集成

[参考地址](https://juejin.cn/post/6844904128859078669)

1. 注册

在[官网](https://travis-ci.com/)使用`github`账号登陆

2. 开启仓库

3. 为项目配置 `Travis`

在项目根目录创建 `.travis.yml` 文件，并对其进行修改

``` yml
language: node_js
node_js:
  - "12"
branchs:
  only:
    - master
script: npm run build
```

把该文件 `push` 上去。

去 `travis-ci.com` 查看该项目的运行结果，通过测试会显示绿色状态。

::: tip
关联可能会有时间延迟，自己关联的时候刷了20分钟，都没有关联上，一度以为自己哪里配错了。过了几天，突然发现正常关联。
:::



4. 安装 travis

```
gem install travis
```

5. 使用 `github-token` 登陆

```bash
travis login --github-token yourGithubToken
Successfully logged in as chemistwang!
```

::: warning
这一步试了下面几个命令通过用户名密码都不能成功登陆
```bash
travis login --com
travis login --org
travis login --auto
```
:::

github-token的生成参考 [](https://github.com/settings/tokens)

在 `Select scopes` 这一栏勾选 `repo`


6. 
