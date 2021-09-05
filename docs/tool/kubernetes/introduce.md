# Kubernetes感性认识

::: tip 参考资料

[Kubernetes官方文档](https://kubernetes.io/)

[Kubernetes中文文档](https://kubernetes.io/zh/)

[Kubernetes GitHub地址](https://github.com/kubernetes/kubernetes)

:::


## 一. 使用Docker容器化封装应用程序的痛点

- 单机使用，无法有效管理集群
- 随着容器数量上升，管理成本攀升
- 没有有效的容灾/自愈机制
- 没有预设编排模板，无法实现快速、大规模容器调度
- 没有统一的配置管理中心工具
- 没有容器生命周期的管理工具
- 没有图形化运维管理工具

## 二. docker集群化解决方案 （资源管理器对比）

- `apache mesos` => 分布式资源管理框架，2019-5 Twitter使用k8s
- `docker swarm` => 轻量级，针对docker，2019-7 阿里云剔除
- `google kubernetes` => 10年容器化基础架构 `Borg`，用 `Go` 语言翻写





## 三. k8s是什么

- 用于容器化应用程序的部署，扩展和管理
- Google在2014年发布的一个开源项目，使用go语言开发
- 在其之前，Google使用Borg系统来调度庞大数量容器（据说Google数据中心运行20多亿个容器）和工作负载。
- 目标：让部署容器化应用简单高效

## 四. k8s优点

- 轻量级：消耗资源小
- 开源
- 弹性伸缩（实时根据服务器的并发情况，增加或缩减容器数量）
- 负载均衡（采用ipvs框架）
- 自动装箱，水平扩展，自我修复
- 服务发现和负载均衡
- 自动发布（默认滚动发布模式）和回滚
- 集中化配置管理和密钥管理
- 存储编排
- 任务批处理运行

## 五. k8s架构原理

![k8s逻辑架构图](https://cdn.herinapp.com/tower/k8s/k8s%E9%80%BB%E8%BE%91%E6%9E%B6%E6%9E%84%E5%9B%BE.jpg)

## 六. 四组基本概念

### 1. Pod/Pod控制器

```
(1) Pod

- Pod是k8s里能够被运行的最小的逻辑单元（原子单元）
- 一个Pod里面可以运行多个容器，又叫：边车（SideCar）模式，它们共享`UTS+NEET+IPC`名称空间
- 实现服务集群：只需要复制多个Pod副本即可，这也是k8s管理的先进之处，k8s如果继续扩容，缩容，只需要控制pod的数量即可
- pod内部容器创建之前，必须先创建pause容器，该容器共享网络、共享存储
- 服务容器之间访问使用localhost访问，相当于访问本地服务一样，性能非常高

(2) Pod控制器

- Pod控制器是Pod启动的一种模板，用来保证k8s里启动的Pod始终按照预期运行（副本数，生命周期，健康状态检查...）
- k8s常用控制器: Deployment/DaemonSet/ReplicaSet/StatefulSet/Job/CronJob
```

### 2. Name/Namespace

```
(1) Name

- "资源"有`apiVersion`, `kind`, `metadata`, `spec`, `status`等配置信息

(2) Namespace

- 随着项目增多，人员增加，集群规模的扩大，需要一种能够隔离k8s内各种“资源”的方法，即名称空间
- 名称空间可以理解为k8s内部的虚拟集群组
- 合理使用k8s名称空间，使得集群管理员能够更好的对交付到k8s里的服务进行分类管理和浏览
- k8s默认存在的名称空间: `default`, `kube-system`, `kube-public`
- 查询k8s特定“资源”需要带上相应名称空间，默认查询 `default`
```

### 3. Label/Label选择器

```
(1) Label

- 标签是k8s特色的管理方式，便于分类管理资源对象
- 一个标签可以对应多个资源，一个资源可以有多个标签，多对多关系
- 一个资源拥有多个标签，实现不同维度的管理
- 标签组成: key=value
- 与标签类似，还有一种“注解” （annotations）

(2) Label选择器

- 给资源打上标签后，可以使用标签选择器过滤指定标签
- 标签选择器目前有两个: 基于等值关系（等于，不等于）和基于集合关系（属于，不属于，存在）
- 许多资源支持内嵌标签选择器字段（matchLabels/matchExpressions）
```

### 4. Servie/Ingress

```
(1) Service

- 在k8s的世界里，虽然每个Pod都会被分配一个单独的IP地址，但这个IP地址会随着Pod的销毁而消失
- Service就是用来解决这个问题的核心概念
- 一个Service可以看做一组提供相同服务的Pod的对外访问接口
- Service作用于哪些Pod是通过标签选择器来定义的

(2) Ingress

- Ingress是k8s集群里工作在OSI网络参考模型下，第7层的应用，对外暴露的接口
- Service只能进行L4流量调度，表现形式是 ip+port
- Ingress则可以调度不同业务域，不同URL访问路径的业务流量
```

## 七. 部署核心组件及插件

1. 核心服务

- etcd

```
键值对数据库，存储k8s集群所有重要信息（持久化）官方定位为一个可信赖的分布式键值存储服务，能够为整个分布式集群存储关键数据，协助分布式集群的正常运转
```
 
- master节点
    - kube-apiserver
    > k8s网关, 所有服务访问统一入口
    > 提供集群管理的RESTFUL接口（包括鉴权，数据校验及集群状态变更）
    > 负责其他模块之间的数据交互，承担通信枢纽功能
    > 资源配额控制的入口
    > 提供完备的集群安全机制

    - kube-controller-manager
    > 控制器，维护k8s资源对象 CRUD,维护副本期望数目
    > 由一系列控制器组成，通过apiserver监控整个集群的状态，并确保集群处于预期的工作状态
    > Node Controller/Deployment Controller/Service Controller...

    - kube-scheduler
    > 调度器，使用调度算法，把请求资源调度某一个node节点, 选择择合适的节点进行分配任务
    > 预算策略（predict）
    > 优选策略（priorities）

- node节点
    - docker
    > 运行容器的基础环境，容器引擎

    - kube-kubelet 
    > 直接跟容器引擎交互实现容器的生命周期管理
    > 定时从某个地方获取节点上pod的预期状态（运行什么容器，运行的副本数量，网络或者存储如何配置等）,并调用对应的容器平台接口达到这个状态
    > 代理服务，负载均衡，在多个Pod之间来做负载均衡
    > 定时汇报当前节点的状态给apiserver，以供调度的时候使用
    > 镜像和容器的清理工作，保证节点上镜像不会占满磁盘空间，退出的容器不会占用太多资源
    
    - kube-proxy
    > 负责写入规则至 IPTABLES,IPVS，实现服务映射访问
    > k8s在每个节点上运行网络代理，service资源的载体,负载均衡，在多个Pod之间来做负载均衡
    > 建立了pod网络和集群网络的关系（clusterip => podip）
    > 负责建立和删除包括更新调度规则，通知apiserver自己的更新，或者从apiserver那里获取其他kube-proxy的调度规则变化来更新自己
    > 常用三种流量调度模式 Userspace（废弃）/Iptables（濒临废弃）/Ipvs （推荐）
    
    - fluentd  
    > 日志收集服务
 
2. 核心插件

- flannel/calico => CNI网络插件
- coredns => 服务发现插件, 可以为及群众的svc创建一个域名ip的对应关系解析
- traefik => 服务暴露用插件
- Dashboard => GUI管理插件, 给k8s提供一个b/s结构访问体系
- ingress contoller: 官方只能实现4层代理，ingress可以实现7层代理
- federation：提供一个可以跨集群中心多k8s统一管理功能
- prometheus: 提供一个k8s集群的监控能力
- efk：提供k8s集群日志统一分析介入平台

3. CLI客户端 （kubectl）


## 八. 深入认识k8s核心组件原理（资源对象）

1. ReplicaSet 副本控制器
> - 控制pod副本（服务集群）的数量,永远与预期设定的数量保持一致
> - ReplicaSet & ReplicationController区别：
>   - ReplicationController 单选
>   - ReplicaSet 单选+复合选择 （在新版本的k8s中，建议使用ReplicaSet）

2. Deployment 部署对象
> - 服务部署结构模型 + 滚动更新
> - ReplicaSet不支持滚动更新，Deployment对象支持滚动更新，通常和ReplicaSet一起使用

3. StatefulSet 有状态应用部署（对应Deployments和RS是为无状态服务设计）

```
1). 对于k8s来说，不能使用Deployment部署模型部署有状态的服务，通常情况下，Deployment被用来部署无状态服务。对于有状态服务的部署，使用StatefulSet进行有状态服务的部署
2). StatefulSet保证pod重新建立后，hostname不会发生变化，pod就可以通过hostname来关联数据

1. 稳定的持久化存储，即Pod重新调度后还是能访问到相同的持久化数据，基于PVC来实现
2. 稳定的网络标志，即Pod重新调度后其PodName和HostName不变，给予Headless Service（即没有Cluster IP的Service）来实现
3. 有序部署，有序扩展，即Pod是有顺序的，在部署或者扩展的时候要依据定义的顺序依次进行（从0到n-1，即在下一个Pod运行之前所有之前的Pod必须都是Running和Ready状态），基于init containers来实现
4. 有序收缩，有序删除（即从n-1到0）
```

名词解释
1) 有状态服务
    
    * 有实时的数据需要存储
    * 有状态服务集群中，把某一个服务抽离出去，一段时间之后再加入，集群网络无法使用
    * eg: DBMS

2）无状态服务

    * 没有-------------
    * -------------------------------------------------, 对集群服务没有任何影响
    * eg: LVS APACHE


4. DaemonSet: 确保所有Node运行同一个Pod

```
确保全部（或一些）Node运行一个Pod的副本。当有Node加入集群时，也会为他们新增一个Pod。当有Node从集群移除时，这些Pod也会被回收。删除DaemonSet将会删除它创建的所有Pod

使用DaemonSet的一些典型用法：

- 运行集群存储daemon，例如在每个Node上运行glusterd，ceph
- 在每个Node上运行日志收集daemon，eg fluentd，logstash
- 在每个Node上运行监控daemon，eg Prometheus Node Exporter
```

5. Job: 一次性任务

```
Job负责批处理任务，即仅执行一次的任务，它保证批处理任务的一个或多个Pod成功结束
```

6. Cronjob: 定时任务，管理基于时间的Job

```
- 在给定时间点只运行一次
- 周期性的给定时间点运行
```

7. Service

```
> 将一组pod关联起来，提供一个统一的入口，即使pod地址发生改变，这个统一入口也不会变化
> 防止Pod失联
> 定义一组Pod的访问策略
```

8. Label

```
> 标签，附加到某个资源上，用于关联对象，查询和筛选
> 一组pod有一个统一的标签
> service是通过标签和一组pod进行关联
```

9. Namespace

```
命名空间，将对象逻辑上隔离（默认情况，pod可以互相访问）
使用场景：
    1. 为不同的公司提供隔离的pod运行环境
    2. 为开发环境，测试环境，生成环境分别准备不同的名称空间进行隔离
```


## 九. 网络通讯模式

k8s的网络模型嘉定所有Pod都在一个可以直接连通的扁平的网络空间中，这在GCE（Google Compute Engine）里面是现成的网络模型，K8s假定这个网络已经存在，
而在私有云里搭建k8s集群，就不能假定这个网络已经存在，我们需要实现这个网络假设，将不同节点上的docker容器之间的互相访问先打通，然后运行k8s

1. 同一个Pod内的多个容器之间：lo
2. 各Pod之间的通讯：Overlay Network
3. Pod与Service之间的通讯：各节点的Iptables规则


Flannel是CoreOS团队针对k8s设计的一个网络规划服务，简单来说，它的功能是让集群中的不同节点主机创建的Docker容器都具有全集群唯一的虚拟IP地址。而且它还能在这些IP地址之间建立一个覆盖网络（Overlay Network），通过这个覆盖网络，将数据包原封不动地传递到目标容器内

ETCD之Flannel提供说明：

- 存储管理Flannel可分配的IP地址段资源
- 监控ETCD中每个Pod的实际地址，并在内存中建立维护Pod节点路由表



Kubernetes里的3种IP

Node IP：Node的ip地址。Node IP是Kubernetes集群中每个节点的物理网卡的IP地址，是一个真实存在的物理网络，所有属于这个网络的服务器都能通过这个网络直接通信，不管其中是否有部分节点不属于这个Kubernetes集群。这也表明在Kubernetes集群之外的节点访问Kubernetes集群之内的某个节点或者TCP/IP服务时，都必须通过NodeIP通信。
Pod IP：Pod的ip地址。Pod IP是每个Pod的IP地址，它是Docker Engine根据docker0网桥的IP地址段进行分配的，通常是一个虚拟的二层网络，前面说过，Kubernetes要求位于不同Node上的Pod都能够彼此直接通信，所以Kubernetes里一个Pod里的容器访问另外一个Pod里的容器时，就是通过Pod IP所在的虚拟二层网络进行通信的，而真实的TCP/IP流量是通过Node IP所在的物理网卡流出的。
Cluster IP：Service的ip地址。Cluster IP仅仅作用于Kubernetes Service这个对象，并由Kubernetes管理和分配IP地址；Cluster IP无法被Ping，因为没有一个“实体网络对象”来响应；Cluster IP只能结合Service Port组成一个具体的通信端口，单独的Cluster IP不具备TCP/IP通信的基础，并且它们属于Kubernetes集群这样一个封闭的空间，集群外的节点如果要访问这个通信端口，则需要做一些额外的工作。


## 十. 官方三种部署方式
 
### minikube 

本地快速运行单点k8s，仅用于尝试和学习

### kubeadm工具 

kubeadm init + kubeadm join 用于快速部署k8s集群（缺点：不清楚配置）

### 二进制 

手动部署每个组件，组成k8s集群




