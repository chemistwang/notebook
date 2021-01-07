# k8s 使用


### 对devops的理解

python
docker+k8s
git+jenkins

docker 三驾马车 （k8s将此三者功能集合与一身）
- docker-compose 容器编排
- docker swarm 容器调度不同节点
- docker machine 主机不够，加入集群


### service

由于pod地址会发生改变，通过service可以为pod提供一个统一的访问入口

一类pod有一个service

------------------------使用k8s

### kubectl命令行管理工具（Tip）

```
kubectl -h
```

- **基础命令**
    - create 通过文件名或标准输入创建资源
    - expose 将一个资源公开为一个新的Service
    - run 在集群中运行一个特定的镜像
    - set 在对象上设置特定的功能
    - get 显示一个或多个资源
    - explain 文档参考资料
    - edit 使用默认的编辑器编辑一个资源
    - delete 通过文件名，标准输入，资源名称或标签选择器来删除资源 

- 部署命令
    - **rollout** 管理资源的发布
    - rolling-update 对给定的复制控制器滚动更新
    - **scale** 扩容或缩容Pod数量， Deployment,ReplicaSet,RC或Job
    - autoscale 创建一个自动选择扩容或缩容并设置Pod数量

- 集群管理命令
    - certificate 修改证书资源
    - cluster-info 显示集群信息
    - top 显示资源（CPU/Memory/Storage）使用。需要Heapster运行
    - **cordon** 标记节点不可调度
    - **uncordon** 标记节点可调度
    - **drain** 驱逐节点上的应用，准备下线维护
    - **taint** 修改节点taint标记

- **故障诊断和调试命令**
    - describe 显示特定资源或资源组的详细信息
    - logs 在一个Pod中打印一个容器日志。如果Pod只有一个容器，容器名称是可选的
    - attach 附加到一个运行的容器
    - exec 执行命令到容器
    - port-forward 转发一个或多个本地端口到一个pod
    - proxy 运行一个proxy到Kubernetes API server
    - cp 拷贝文件或目录到容器中
    - auth 检查授权

- 高级命令
    - **apply** 通过文件名或标准输入对资源应用配置
    - **patch** 使用补丁修改，更新资源的字段
    - **replace** 通过文件名或标准输入替换一个资源
    - convert 不同的API版本之间转换配置文件

- 设置命令
    - **label** 更新资源上的标签
    - annotate 更新资源上的注释
    - completion 用于实现kubectl工具自动补全

- 其他命令
    - api-versions 打印受支持的API版本
    - config 修改kubeconfig文件（用于访问API, 比如配置认证信息）
    - help 所有命令帮助
    - plugin 运行一个命令行插件
    - version 打印客户端和服务版本信息


### k8s使用

> 业务流程
> 创建服务
> 检查服务是否正常
> 发布服务
> 访问越来越多，服务的弹性伸缩
> 版本更新，滚动更新

#### 1） 管理和使用deployment

deployment
    - 创建指定数量的pod
    - 检查pod健康状态和数量

方法1： 基于deployment创建nginx pod，有一个副本

```
kubectl run nginx-dep1 --image=nginx:1.8 --replicas=1
kubectl get deployment
kubectl get pods
kubectl get pods -o wide
free -m #查看，确保有足够资源
```

方法2：通过kuboard创建pod
方法3：写yaml文件, 执行 `kubectl apply -f xxx.yaml`

```
apiVersion: apps/v1 #（要根据）
kind: Deployment  # 对象类型
metedata:
    name: ngx-dep4
    labels:     # 标签
        apps: ngx  # key: value
        dev: ngx-dev
        ...
spec:        # 创建pod的信息
    replicas: 1  # 副本数量
    selector:   # 选择器
        matchLabels:  #标签选择器
             apps: ngx  # key: value
    template:   # 基于什么模板创建pod
        metadata:
            labels:
                app: ngx
        spec:
            containers:
            -name: nginx
             image: nginx:1.8 
```

#### 2） 查看k8s对象状态

```
kubectl get namespace # 查看名称空间
kubectl get ns # (简写)

kubectl get nodes/pods/service/deployment... -o wide #查看更详细的信息
# 若不指定，则为默认的名称空间

# 选项
# -n kube-system 
# -A 显示所有


kubectl describe pod PODNAME -n NAMESPACE # 默认去default去找

kubectl logs -h
kubectl exec -it -h
```

#### 3）用service来发布服务

方法1: 首先创建yaml
执行yaml # kubectl apply -f xxx.yaml
此时可以看到端口映射信息  # kubectl get svc
此时就可以访问集群中的任意一个node节点，来访问web页面

方法2：kubeboard 编辑 => 访问方式 Service => NodePort => 保存



#### 4） 服务伸缩

根据客户端的请求流量实现弹性管理

方法1： 修改yaml文件中的 replicas数值，
        执行 # kubectl apply -f xxx.yaml
方法2： kubeboard

#### 5） 滚动更新

搭建harbor =》 代码改好之后发送至harbor =》 k8s从harbor拉取镜像启动容器

方法1：修改yaml文件执行
方法2：kubeboard





## 迁移

在k8s环境中，开发交付镜像，而不是源码

### 通用的迁移流程

1. 制作镜像 （Dockerfile）
    - 通常一个镜像中就运行一个服务
    - 三类：
        - 基础镜像
        - 运行环境
        - 项目镜像

2. 将镜像启动为pod


```
kubectl create deployment mynode --imgaes=node \
--dry-run \ #干跑模式，并不是真正的执行 
-o yaml>mynode.yaml #输出为yaml文件
```

3. 暴露应用（对内）

4. 对外发布应用（对外）

```
kubectl expose deployment mynode \
--target-port=8080 \
--type=NodePort \
--port=80 \
--dry-run -o yaml>mynodesvc.yaml

kubectl apply -f mynodesvc.yaml
kubectl get svc # 查看服务
```

5. 监控和日志收集

（jenkins+gitlab+ansible+docker+harbor+maven）

