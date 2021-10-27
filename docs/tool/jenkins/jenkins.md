# Jenkins自动化部署前端页面

### 一些自动化工具

- Selenium
- jenkins
- ansible
- puppet
- nagios
- chef

### jenkins有哪些功能

- 定时拉取代码并编译（开发）
- 静态代码分析（开发）
- 定时打包发布测试版（开发，测试）
- 自定义额外的操作，如跑单元测试等（开发）
- 出错提醒（开发，测试）

### tmp

1. admin账号创建用户
2. 添加git凭证
3. docker进程用Unix Socket而不是TCP端口，在默认情况下，Unix socket属于root用户，需要root权限才能访问

> docker守护进程启动的时候，会默认赋予名字为docker的用户组读写Unix socket的权限，因此只要创建docker用户组，并将当前用户加入到docker用户组中，那么当前用户就有权限访问Unix socket了，进而可以执行docker相关命令

``` bash
sudo groupadd docker #添加docker用户组
sudo gpasswd -a $USER docker #将登陆用户加入到docker用户组中
newgrp docker #更新用户组
docker  ps #测试
```


考虑到环境迁移，使用 `docker`

## 第一步：安装部署Jenkins

1. 拉取镜像 `jenkinsci/blueocean`

``` bash
docker pull jenkinsci/blueocean 
```

::: tip 可以配置一下镜像源
```
"registry-mirrors": [
  "https://lkqzb0m7.mirror.aliyuncs.com"
]
```
:::

2. 运行容器

``` bash
docker run \
-d \
-p 10001:8080 \
-u root \
--restart=always \
-v /root/jenkins-volumes:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
jenkinsci/blueocean
```

---

``` bash
# macOS
docker run \
-d \
-p 10001:8080 \
-u root \
-v /Users/chemputer/jenkinsocean-volumes:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v $(which docker):/usr/bin/docker \
jenkinsci/blueocean
```

---


``` yml
# 待修改的jenkins的dockerfile
version: '3'
services:
  jenkins-compose:
    image: jenkins
    user: root    # 表示在容器中以 root 用户运行
    ports:
     - "8088:8080"
     - "50000:50000"
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock # 表示 Docker 守护进程监听的 Unix 套接字。要在 Jenkins 容器中使用 docker 命令，则此选项是必需的。
     - /home/demo/jenkins-compose:/var/jenkins_home
```

::: warning 小情况
``` bash
# 运行之前需要执行
# 需要修改下目录权限, 因为当映射本地数据卷时，/home/docker/jenkins目录的拥有者为root用户，而容器中jenkins user的uid为1000
chown -R 1000:1000 /root/jenkins
```
:::

3. 配置 `nginx.conf`

``` bash {4}
server{
        listen 80;
        server_name tool.chemputer.top;
        location /jenkins {
                proxy_pass http://127.0.0.1:10001;
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
    listen 443 ssl;
    ssl_certificate /etc/nginx/cert/chemputer.com.pem;
    ssl_certificate_key /etc/nginx/cert/chemputer.com.key;
}
```

4. 访问页面

如果正常配置通过 `http://tool.chemputer.top` 是可以访问成功的，但是自己想通过 `nginx` 进行域名分类，所以想在 `nginx` 挂载 `/jenkins` 路径。 但是随后发现访问失败 `404`，进而排查错误。

5. 在服务器访问目标端口

``` bash
curl 127.0.0.1:10001        
```

``` html
<html><head><meta http-equiv='refresh' content='1;url=/login?from=%2F'/><script>window.location.replace('/login?from=%2F');</script></head><body style='background-color:white; color:white;'>Authentication required
<!--
-->
</body></html>
```

发现 `jenkins` 会切分路由，强制将 `/jenkins` 替换掉。需要在 `启动 jenkinsci/blueocean 时设置环境变量并修改nginx配置` 


6. 设置环境变量

``` bash {6,7}
docker run \
-d \
-p 10003:8080 \
--restart=always \
-e TZ="Asia/Shanghai" \
-e JENKINS_OPTS="--prefix=/jenkins" \
-e JENKINS_ARGS="--prefix=/jenkins" \
-v /root/jenkins-volumes:/var/jenkins-volumes \
-v /var/run/docker.sock:/var/run/docker.sock \
jenkinsci/blueocean
```

7. 修改 `nginx` 配置

``` bash {4,5}
server{
        listen 80;
        server_name tool.chemputer.top;
        location /jenkins {
                proxy_pass http://127.0.0.1:10001/jenkins;
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
    listen 443 ssl;
    ssl_certificate /etc/nginx/cert/chemputer.com.pem;
    ssl_certificate_key /etc/nginx/cert/chemputer.com.key;
}
```

8. 重启

``` bash
nginx -s reload
```

::: warning 小情况
这里碰到一个小问题，启动之后日志没有报错，但是访问页面在不停刷新，容器也并没有重启，F12打开控制台发现，jenkins一直在访问 `127.0.0.1:7890` 这个地址，不清楚是否是云服务安全组策略的问题，我将 `7890` 端口放开之后就可以成功登陆了。但是随后将 `7890` 关闭之后，竟然可以进入系统。。。
:::


## 第二步：配置 Jenkins 打包

前端打包工具普遍使用 `node`，需要现在 `Jenkins` 中安装 `nodejs` 插件

1. 安装 `nodejs` 插件然后重启

![安装nodejs插件](http://cdn.chemputer.top/notebook/jenkins/step1.jpg)

2. 配置 `jenkins` `nodejs` 环境

![配置环境](http://cdn.chemputer.top/notebook/jenkins/step2.jpg)

3. 创建任务

![创建任务](http://cdn.chemputer.top/notebook/jenkins/step3.jpg)

4. 关联远程仓库地址



## 第三步：上传至服务器


## 第四步：git push代码执行自动构建








    


