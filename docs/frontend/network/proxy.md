# 代理

## macOS 命令行配置代理

安装代理之后，在终端更新 `brew` 或者下载是不起作用的，原因是终端不同于浏览器需要额外配置。

1. 查看代理端口

我的是 `7890`

2. 配置 bash （mac osx系统默认命令行）

``` bash
# 编辑文件
vi ~/.bash_profile

# 新增
alias proxy='export http_proxy=127.0.0.1:7890;export https_proxy=$http_proxy'
alias unproxy='unset http_proxy;unset https_proxy'
```

``` bash
# 加载生效
source ~/.bash_profile
```

3. 检查是否生效

``` bash
proxy # 开启
curl ipinfo.io # 检查

{
  "ip": "x.x.x.x",
  "city": "Singapore",
  "region": "Singapore",
  "country": "SG",
  "loc": "1.2897,103.8501",
  "org": "AS9833 Blinkload Technology Co., Ltd",
  "postal": "018989",
  "timezone": "Asia/Singapore",
  "readme": "https://ipinfo.io/missingauth"
}%
```

``` bash
unproxy # 关闭
curl ipinfo.io # 检查

{
  "ip": "x.x.x.x",
  "city": "Xi’an",
  "region": "Shaanxi",
  "country": "CN",
  "loc": "34.2583,108.9286",
  "org": "AS4134 CHINANET-BACKBONE",
  "timezone": "Asia/Shanghai",
  "readme": "https://ipinfo.io/missingauth"
}%
```

此时开启proxy后，对于系统级命令已经完成了代理，但其他譬如git或者golang在使用时需要环境变量支持。

``` bash
# 查看当前用户（global）配置
git config --global  --list

# 设置git环境变量
git config --global http.proxy 'http://127.0.0.1:7890'
```