# Docker 

## 1. 目的

docker是一种容器技术，解决软件跨环境迁移的问题

## 2. 架构

- 镜像（images）: 模板
- 容器（container）: 镜像的实例化
- 仓库（registry）: 是集中存放镜像文件的场所

![docker架构](https://cdn.herinapp.com/tower/docker/docker.jpg)

## 3. 安装docker

- mac

> 资源地址：NAS/资源/0.安装源文件/3.开发/Docker/Docker.dmg


- ubuntu

```
1. apt-get update
2. apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
3. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
4. add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable" //x86
5. apt-get update
6. apt-get install docker-ce docker-ce-cli containerd.io
7. docker run hello-world //测试是否成功
8. docker -v 查看docker版本
9. docker info
```


- centos

```
1. sudo yum install -y yum-utils
2. sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
3. sudo yum install docker-ce docker-ce-cli containerd.io
4. yum list docker-ce --showduplicates | sort -r # 可选，查看docker版本
5. sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io # 可选，安装指定版本
6. docker run hello-world //测试是否成功
```

> [官方安装参考链接](https://docs.docker.com/)

## 4. 配置国内镜像加速器(阿里云)

> 默认是从dockerhub上下载镜像，国内阿里云镜像速度会快

> 1. 登录阿里云
> 2. 点击控制台
> 3. 搜索 `容器镜像服务`
> 4. 左侧栏选择 `镜像加速器`
> 5. 根据操作文档添加加速器地址


- mac 

![mac添加镜像](https://cdn.herinapp.com/tower/docker/registry-mirror.jpg)

- linux

根据官网操作文档配置即可

## 5. 常用命令

- 启动docker服务(linux)


``` bash
systemctl start docker //启动
systemctl stop docker //停止
systemctl restart docker //重启
systemctl status docker //查看docker状态
systemctl enable docker //设置开机启动docker服务
```

- 搜索镜像

``` bash
docker search ubuntu //在dockerhub搜索ubuntu镜像
docker search ubuntu --filter=stars=999 //搜索星数大于999的ubuntu镜像
```


- 镜像操作

``` bash
docker pull hello-world //拉取hello-world镜像，默认最新版本 :latest
docker pull mongo:4.2.5 //拉取mongo镜像，版本为4.2.5
//指定版本时，先去dockerhub网站上找对应的官方维护版本,否则找不到

docker images //查看本机镜像列表
docker images -q //查看本机镜像（只展示镜像id）
docker images --digests //显示摘要信息
docker images --no-trunc //不截断信息

docker rmi -f hello-world //删除单个镜像 (-f表示强制删除)
docker rmi ubuntu mongo redis //删除多个镜像
docker rmi $(docker images -qa) //全部删除
docker save -o Desktop/nginx.tar nginx //镜像的备份
docker load -i Desktop/nginx //镜像的恢复
```

- 容器操作

运行容器

``` bash
docker run \
-it \
--name myubuntu \
ubuntu \ 
/bin/bash //启动容器

docker start <containerId/containerName> //启动容器
docker restart <containerId/containerName> //重启容器

```

> 参数说明:
> -i:保持容器运行。通常与-t同时使用。加入it这两个参数后，容器创建后自动进入容器中；退出容器后，容器自动关闭
> -t:为容器重新分配一个伪输入终端，通常与-i同时使用
> -d:以守护（后台）模式运行，需要使用docker exec进入容器。退出后，容器不会关闭
> -it创建的容器一般称为交互式容器，-id创建的容器一般称为守护式容器
> --name:为创建的容器命名


查看容器

``` bash
docker ps //查看正在运行的容器
docker ps -a //查看所有容器
docker ps -l //最近一个运行的容器
docker ps -n 10 //最近10个创建的容器
docker ps -q //只显示容器id
docker inspect <containerId/containerName> //查看容器内部细节（以json串的形式表现
docker logs -t -f --tail 3 //-t 加入时间戳 -f 跟随最新日志打印 --tail n 显示最后n条
docker top 容器id或容器名//查看容器内运行的进程
```

进入容器

```
docker attach <containerId/containerName> //重新进入运行中的容器
docker exec -t myubuntu ls //在myubuntu容器中执行ls命令
```

停止容器

```
docker stop <containerId/containerName> //停止容器
docker kill <containerId/containerName> //强制停止容器
```

删除容器

```
docker rm <containerId/containerName> //删除已经关闭的容器
docker rm $(docker ps -qa) //删除全部容器（方法1）
docker ps -qa | xargs docker rm //删除全部容器（方法2）
```

## 6. 容器数据卷

``` bash
docker run -it -v /hostpath:/containerpath ubuntu
docker run -it -v /hostpath:/ontainerpath:ro ubuntu //ro =》readonly
```

数据卷概念

- 数据卷是宿主机中的一个目录或文件
- 当容器目录和数据卷目录绑定后，对方的修改会立即同步
- 一个数据卷可以被多个容器同时挂载
- 一个容器也可以挂载多个数据卷

作用

- docker容器删除后，容器中产生的数据也会随之销毁，数据卷提供容器数据持久化
- docker容器不能直接与外部机器交换文件，通过数据卷间接通信
- 容器之间进行数据交互，通过数据卷

注意事项

- 目录必须是绝对路径
- 若目录不存在，则会自动创建
- 可以挂载多个数据卷


## 7. docker 网络通讯

通讯的三种方式

- 虚拟ip访问

安装docker时，docker会默认创建一个内部的桥接网络docker0，每创建一个容器分配一个虚拟网卡，容器之间可以根据ip互相访问

```
docker inspect <containerId/containerName> //查看容器详情中的 IPAddress
```

> 缺点：必须知道每个容器确切的ip，实际使用中并不实用

- 参数link

运行容器的时候加上参数link，charming_morse是另外一个容器的name，c2为该容器的别名

```
docker run -it --name c1 --link charming_morse:c2 ubuntu
```

> 缺点：对容器创建的顺序有要求，若集群内多个容器要互访，使用就不方便
> 最新官方推荐使用--network进行访问，--link应该要被抛弃了，官方已经不推荐使用（待证实）

- 创建bridge网络

docker存在3种网络，host，null，bridge，默认创建的都是bridge网络
 
```
docker network ls //查看所有网络
docker network create --driver <null/host/bridge> mybridge //新建一个网络桥接
docker network inspect mybridge //查看网络ip
docker port <containerId/containerName> //查看指定容器的端口映射
```

```
docker run -it \
--name xxx \
--network yournetworkname
--network-alias aliasname
ubuntu
```

```
docker run -it --name ccc --network hahaha --network-alias ccc ubuntu
docker run -it --name vvv --network hahaha --network-alias vvv ubuntu
```
```
docker run -it --name ccc --network hahaha --network-alias xxx ubuntu
docker run -it --name vvv --network hahaha --network-alias xxx1 ubuntu/ping
```

> 访问容器中的服务可以用<网络别名>：<服务端口>，网络别名，不用顾虑ip的变动


## 8. 搭建私有docker仓库

- 1. 拉取镜像并创建

```
docker pull registry //拉取registry镜像
docker run -d -p 5000:5000 --restart always --name registry registry //后台启动registry仓库
```

- 2. 打开浏览器输入 `http://yourIp:5000/v2/_catalog`; 显示`{"repositories":[]}`表示私有仓库搭建成功并且内容为空

- 3. 修改宿主机daemon.json

```
{"insecure-registries": ["yourIp:5000"]}
```

- 4. 重启docker服务

```
systemctl restart docker
```

- 5. 给要提交的镜像打上标签

```
docker tag ubuntu yourIp:5000/ubuntu
```

- 6. 推送至私有仓库

```
docker push yourIp:5000/ubuntu
```

- 7. 拉取私有仓库镜像

```
docker pull yourIp:5000/ubuntu
```







