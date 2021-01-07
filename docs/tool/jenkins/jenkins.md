# devOps

Selenium

jenkins

ansible

puppet

nagios

chef



持续集成
持续部署
持续交付

优点：1.降低风险
    2. 减少重复过程
    3. 任何时间，任何地点生成可部署的软件
    4. 增强项目的可见性
    5. 建立团队对开发产品的信心


持续集成工具 Jenkins





### docker安装jenkins

1. 拉取jenkins镜像

```
docker pull jenkinsci/blueocean 

```

ps


```
  "registry-mirrors": [
    "https://lkqzb0m7.mirror.aliyuncs.com"
  ]
```



2. 运行容器


```
# 运行之前需要执行
# 需要修改下目录权限, 因为当映射本地数据卷时，/home/docker/jenkins目录的拥有者为root用户，而容器中jenkins user的uid为1000

chown -R 1000:1000 /root/jenkins
```


``` linux
docker run \
-d \
-p 8080:8080 \
-u root \
-v /root/jenkins-volumes:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
jenkinsci/blueocean
```


``` myMac
docker run \
-d \
-p 8080:8080 \
-u root \
-v /Users/yagao/Desktop/jenkinsocean-volumes:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v $(which docker):/usr/bin/docker \
jenkinsci/blueocean
```


``` myMac (jenkins/jenkins)
docker run \
-d \
-p 8080:8080 \
-p 50000:50000 \
-v /Users/yagao/Desktop/doublejenkins-volumes:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v $(which docker):/usr/bin/docker \
jenkins/jenkins
```



``` 待修改的jenkins的dockerfile
version: '3'

services:
  jenkins-compose:
    image: jenkins
    user: root    # 表示在容器中以 root 用户运行
    ports:
     - "8088:8080"
     - "50000:50000"
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock #示 Docker 守护进程监听的 Unix 套接字。要在 Jenkins 容器中使用 docker 命令，则此选项是必需的。
     - /home/demo/jenkins-compose:/var/jenkins_home

```




3. admin账号创建用户
4. 添加git凭证
5. docker进程用Unix Socket而不是TCP端口，在默认情况下，Unix socket属于root用户，需要root权限才能访问

> docker守护进程启动的时候，会默认赋予名字为docker的用户组读写Unix socket的权限，因此只要创建docker用户组，并将当前用户加入到docker用户组中，那么当前用户就有权限访问Unix socket了，进而可以执行docker相关命令

```
# linux
sudo groupadd docker #添加docker用户组
sudo gpasswd -a $USER docker #将登陆用户加入到docker用户组中
newgrp docker #更新用户组
docker  ps #测试
```

```
# mac


```


6. 构建

```
# 可选方案
docker-compose up -d --build
```














### 方案
jenkins有哪些功能
1. 定时拉取代码并编译（开发）
2. 静态代码分析（开发）
3. 定时打包发布测试版（开发，测试）
4. 自定义额外的操作，如跑单元测试等（开发）
5. 出错提醒（开发，测试）
    


