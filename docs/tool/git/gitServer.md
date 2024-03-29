# Git Server

[廖雪峰搭建git服务器教程](https://www.liaoxuefeng.com/wiki/896043488029600/899998870925664)

1. 安装git

2. 创建git用户运行git服务

``` bash
sudo adduser git
```

3. 在git目录下创建 `authorized_keys` 文件

``` bash
su git
cd ~
mkdir .ssh
vi authorized_keys
```

将需要登录的用户的 `id_rsa.pub` 添加到 `authorized_keys` 文件里

::: danger 注意
用`vi`添加我的 `id_rsa.pub` 时候，由于没有 `insert` 之后直接粘贴，导致的公钥少了开头的 s，导致后续的失败（创建git用户登陆不上，clone不了代码），这个问题搞了一下午，谨记谨记
:::


4. 创建仓库文件夹

``` bash
mkdir /home/git/repo
git init --bare chemputer.git
```

5. 拉取仓库

``` bash
git clone git@yourIp:/home/git/repo/chemputer.git
```

若ssh修改端口则

``` bash
git clone ssh://git@yourIp:2222/home/git/repo/chemputer.git
```

6. 禁用shell登陆

出于安全考虑，创建的git用户不允许登陆服务器，通过 `root` 编辑 `/etc/passwd`文件

``` bash 
git:x:1000:1000:,,,:/home/git:/bin/bash
# 修改为
git:x:1000:1000:,,,:/home/git:/usr/bin/git-shell
```