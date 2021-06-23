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
travis login --pro --github-token yourGithubToken
Successfully logged in as chemistwang!
```

::: warning
这一步试了下面几个命令通过用户名密码都不能成功登陆
```bash
travis login --com
travis login --org
travis login --auto
```

`--pro`需要加上，否则后面的 `travis encrypt-file ~/.ssh/id_rsa --pro` 命令用不了，会提示 `not logged in, please run travis login --pro`
:::


``` bash
travis encrypt-file super_secret.txt --pro
not logged in, please run travis login --pro
```

github-token的生成参考 [](https://github.com/settings/tokens)

在 `Select scopes` 这一栏勾选 `repo`


6. 

``` bash
➜  notebook git:(master) ✗ travis encrypt-file ~/.ssh/id_rsa --add
Detected repository as chemistwang/notebook, is this correct? |yes| yes 
encrypting /Users/wyl/.ssh/id_rsa for chemistwang/notebook
storing result as id_rsa.enc
storing secure env variables for decryption


Overwrite the config file /Users/wyl/Desktop/notebook/.travis.yml with the content below?

This reformats the existing file.

---
language: node_js
node_js:
- '12'
branchs:
  only:
  - master
script: npm run build
before_install:
- openssl aes-256-cbc -K $encrypted_3d92ad42968a_key -iv $encrypted_3d92ad42968a_iv
  -in id_rsa.enc -out ~\/.ssh/id_rsa -d


(y/N)
y

Make sure to add id_rsa.enc to the git repository.
Make sure not to add /Users/wyl/.ssh/id_rsa to the git repository.
Commit all changes to your .travis.yml.
```

7. 部署脚本

```
language: node_js
node_js:
- '12'
branchs:
  only:
  - master
script: npm run build
before_install:
- openssl aes-256-cbc -K $encrypted_3d92ad42968a_key -iv $encrypted_3d92ad42968a_iv
  -in id_rsa.enc -out ~/.ssh/id_rsa -d
addons:
  ssh_known_hosts: 1.15.222.63
after_success:
# - rm -rf <部署服务器用户名>@<部署服务器地址>:/home/xxx/project-file/*
- scp -o stricthostkeychecking=no -r ./dist/* root@1.15.222.63:/root/notebook
```