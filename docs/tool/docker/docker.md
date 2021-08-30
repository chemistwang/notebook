# Docker

## 1. 目的

docker 是一种容器技术，解决软件跨环境迁移的问题

## 2. 架构

- 镜像（images）: 模板
- 容器（container）: 镜像的实例化
- 仓库（registry）: 是集中存放镜像文件的场所

![docker架构](http://cdn.chemputer.top/notebook/docker/architecture.jpg)

## 3. 安装 docker

- MacOS

> [官方下载地址](https://desktop.docker.com/mac/stable/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)

- Ubuntu

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

- CentOS

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

> 默认是从 dockerhub 上下载镜像，国内阿里云镜像速度会快

> 1. 登录阿里云
> 2. 点击控制台
> 3. 搜索 `容器镜像服务`
> 4. 左侧栏选择 `镜像加速器`
> 5. 根据操作文档添加加速器地址

- mac

![mac添加镜像](https://cdn.herinapp.com/tower/docker/registry-mirror.jpg)

- linux

根据官网操作文档配置即可

## 5. 镜像

```bash
docker commit //提交容器副本，使之成为一个新的容器
docker commit -m test -a wyl 23587838141b wyl/tomcat:0.1

docker run -p 8888:8080 tomcat //docker对外暴露8888端口
docker run -P -it tomcat //docker随机分配端口
```

## 6. 常用命令

- 启动 docker 服务(linux)

```bash
systemctl start docker # 启动
systemctl stop docker # 停止
systemctl restart docker # 重启
systemctl status docker # 查看docker状态
systemctl enable docker # 设置开机启动docker服务
```

- 搜索镜像

```bash
docker search ubuntu # 在dockerhub搜索ubuntu镜像
docker search ubuntu --filter=stars=999 # 搜索星数大于999的ubuntu镜像
```

- 镜像操作

```bash
docker pull hello-world # 拉取hello-world镜像，默认最新版本 :latest
docker pull mongo:4.2.5 # 拉取mongo镜像，版本为4.2.5
# 指定版本时，先去dockerhub网站上找对应的官方维护版本,否则找不到

docker images # 查看本机镜像列表
docker images -q # 查看本机镜像（只展示镜像id）
docker images --digests # 显示摘要信息
docker images --no-trunc # 不截断信息

docker rmi -f hello-world # 删除单个镜像 (-f表示强制删除)
docker rmi ubuntu mongo redis # 删除多个镜像
docker rmi $(docker images -qa) # 全部删除
docker save -o Desktop/nginx.tar nginx # 镜像的备份
docker load -i Desktop/nginx #镜像的恢复
```

- 容器操作

运行容器

```bash
docker run \
-it \
--name myubuntu \
ubuntu \
/bin/bash //启动容器

docker start <containerId/containerName> #启动容器
docker restart <containerId/containerName> #重启容器

```

> 参数说明:
> -i:保持容器运行。通常与-t 同时使用。加入 it 这两个参数后，容器创建后自动进入容器中；退出容器后，容器自动关闭
> -t:为容器重新分配一个伪输入终端，通常与-i 同时使用
> -d:以守护（后台）模式运行，需要使用 docker exec 进入容器。退出后，容器不会关闭
> -it 创建的容器一般称为交互式容器，-id 创建的容器一般称为守护式容器
> --name:为创建的容器命名

查看容器

```bash
docker ps # 查看正在运行的容器
docker ps -a # 查看所有容器
docker ps -l # 最近一个运行的容器
docker ps -n 10 # 最近10个创建的容器
docker ps -q # 只显示容器id
docker inspect <containerId/containerName> # 查看容器内部细节（以json串的形式表现
docker logs -t -f --tail 3 # -t 加入时间戳 -f 跟随最新日志打印 --tail n 显示最后n条
docker top 容器id或容器名 # 查看容器内运行的进程
```

进入容器

```bash
docker attach <containerId/containerName> # 重新进入运行中的容器
docker exec -t myubuntu ls # 在myubuntu容器中执行ls命令
```

停止容器

```bash
docker stop <containerId/containerName> # 停止容器
docker kill <containerId/containerName> # 强制停止容器
```

删除容器

```bash
docker container prune # 删除停止的容器
docker rm <containerId/containerName> # 删除已经关闭的容器
docker rm $(docker ps -qa) # 删除全部容器（方法1）
docker ps -qa | xargs docker rm # 删除全部容器（方法2）
```

## 7. 容器数据卷

1. 数据卷概念

- 数据卷是宿主机中的一个目录或文件
- 当容器目录和数据卷目录绑定后，对方的修改会立即同步
- 一个数据卷可以被多个容器同时挂载
- 一个容器也可以挂载多个数据卷

2. 作用

- docker 容器删除后，容器中产生的数据也会随之销毁，数据卷提供容器数据持久化
- docker 容器不能直接与外部机器交换文件，通过数据卷间接通信
- 容器之间进行数据交互，通过数据卷

- 为了能保存数据，在 docker 中我们使用卷 //类似 redis 的 rdb aof

3. 注意事项

- 目录必须是绝对路径
- 若目录不存在，则会自动创建
- 可以挂载多个数据卷

4. 实现方式

两种方式

- 使用命令

```bash
docker run -it -v /宿主机:/容器内的目录 镜像名 （类似于U盘的挂载对接，产生联系）
docker inspect id //查看binds volums字段查看是否绑定
//可以实现宿主机和容器之间的同步

docker run -it -v /宿主机:/容器内目录:ro 镜像名（ro read only 只读不可写，容器内只能查看不能修改，宿主机单向）
```

```bash
docker run -it --name xxx --volumes-from xxx containerId
```

```bash
docker run -it -v /hostpath:/containerpath ubuntu
docker run -it -v /hostpath:/ontainerpath:ro ubuntu # ro =》readonly
```

- 用 dockerfile 添加

```bash
# dockefile
FROM centos
VOLUME ["/container1", "/container2"]
CMD echo "finish---"
CMD /bin/bash
```

```bash
docker build -f /host/dockerfile -t yourname . //构建
```

> 若挂载目录时出现 `permission denied`，在挂载目录后多加一个 `--privileged=true` 即可

## 8. docker 网络通讯

通讯的三种方式

- 虚拟 ip 访问

安装 docker 时，docker 会默认创建一个内部的桥接网络 docker0，每创建一个容器分配一个虚拟网卡，容器之间可以根据 ip 互相访问

```bash
docker inspect <containerId/containerName> # 查看容器详情中的 IPAddress
```

> 缺点：必须知道每个容器确切的 ip，实际使用中并不实用

- 参数 link

运行容器的时候加上参数 link，charming_morse 是另外一个容器的 name，c2 为该容器的别名

```bash
docker run -it --name c1 --link charming_morse:c2 ubuntu
```

> 缺点：对容器创建的顺序有要求，若集群内多个容器要互访，使用就不方便
> 最新官方推荐使用--network 进行访问，--link 应该要被抛弃了，官方已经不推荐使用（待证实）

- 创建 bridge 网络

docker 存在 3 种网络，host，null，bridge，默认创建的都是 bridge 网络

```bash
docker network ls # 查看所有网络
docker network create --driver <null/host/bridge> mybridge # 新建一个网络桥接
docker network inspect mybridge # 查看网络ip
docker port <containerId/containerName> # 查看指定容器的端口映射
```

```bash
docker run -it \
--name xxx \
--network yournetworkname \
--network-alias aliasname \
ubuntu
```

```bash
docker run -it --name ccc --network hahaha --network-alias ccc ubuntu
docker run -it --name vvv --network hahaha --network-alias vvv ubuntu
```

```bash
docker run -it --name ccc --network hahaha --network-alias xxx ubuntu
docker run -it --name vvv --network hahaha --network-alias xxx1 ubuntu/ping
```

> 访问容器中的服务可以用<网络别名>：<服务端口>，网络别名，不用顾虑 ip 的变动

## 9. Dockerfile

1. 是什么

用来构建 docker 镜像的构建文件，是由一系列命令和参数构成的脚本

2. 如何构建

- vi Dockerfile
- docker build
- docker run

3. 基础知识

- 每条保留字指令都必须为大写，且后面至少跟随一个参数
- 指令从上到下，顺序执行
- #表示注释
- 每条指令都会创建一个新的镜像层，并对镜像进行提交

4. docker 执行 dockerfile 的大致流程

- docker 从基础镜像运行一个容器
- 执行一条指令并对容器作出修改
- 执行类似 docker commit 操作提交一个新的镜像层
- docker 再基于刚提交的镜像运行一个新容器
- 执行 dockerfile 下一条指令直到所有指令都完成

5. 总结

dockerfile，docker image， docker container 代表软件的三个不同阶段

- dockerfile 是软件的原材料 =》面向开发
- docker image 是软件的交付品 =》成为交付标准
- docker container 是软件的运行态 =》涉及部署与运维

6. 保留字

- `FROM` =》基础镜像，当前新镜像是基于哪个镜像的
- `MAINTAINER` =》镜像维护者的姓名和邮箱地址
- `RUN` =》容器构建时需要运行的命令
- `EXPOSE` =》当前容器对外暴露出的端口
- `WORKDIR` =》指定在创建容器后，终端默认登陆进来的工作目录，一个落脚点
- `ENV` =》用来在构建镜像过程中设置环境变量
- `ADD` =》将宿主机目录下的文件拷贝进镜像且 ADD 命令会自动处理 URL 和解压 tar 压缩包
- `COPY` =》拷贝文件和目录到镜像中
  - COPY src dest
  - COPY ["src", "dest"]
- `VOLUME` =》容器数据卷，用于数据保存和持久化工作
- `CMD` =》 指定一个容器启动时要运行的命令
  - dockerfile 中可以有多个 CMD 指令，但是只有最后一个生效
  - CMD 会被 docker run 之后的参数替换
- `ENTRYPOINT` =》会追加，不会被覆盖
- `ONBUILD` =》当构建一个被继承的 dockerfile 时运行命令，父镜像在被子继承后，父镜像的 onbuild 会被触发

7. 编写 dockerFile

`scratch` Base 镜像

> docker hub 中 99%镜像都是通过在 base 镜像中安装和配置需要的软件构建

8. 查看历史

```bash
docker history imagesName
```

9. 本地镜像发布到阿里云

- 创建仓库镜像 命名空间 + 仓库名称
- docker login --username=664176327@qq.com registry.cn-hangzhou.aliyuncs.com
- docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/chemputer/mytomcat:[镜像版本号]
- docker push registry.cn-hangzhou.aliyuncs.com/chemputer/mytomcat:[镜像版本号]

## 10. 搭建私有 docker 仓库

- 1. 拉取镜像并创建

```bash
docker pull registry # 拉取registry镜像
docker run -d -p 5000:5000 --restart always --name registry registry # 后台启动registry仓库
```

- 2. 打开浏览器输入 `http://yourIp:5000/v2/_catalog`;  显示`{"repositories":[]}`表示私有仓库搭建成功并且内容为空

- 3. 修改宿主机 daemon.json

```
{"insecure-registries": ["yourIp:5000"]}
```

- 4. 重启 docker 服务

```bash
systemctl restart docker
```

- 5. 给要提交的镜像打上标签

```bash
docker tag ubuntu yourIp:5000/ubuntu
```

- 6. 推送至私有仓库

```bash
docker push yourIp:5000/ubuntu
```

- 7. 拉取私有仓库镜像

```bash
docker pull yourIp:5000/ubuntu
```
