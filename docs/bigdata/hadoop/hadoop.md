# 大数据

1. 大数据概念

无法在一定时间范围内用常规软件工具进行捕捉，管理和处理的数据集合。

2. 大数据特点

- Volume（大量）
- Velocity（高速）
- Variety（多样）
非结构化数据越来越多，网络日志、音频、视频、图片、地理位置信息
- Value（低价值密度）
价值密度的高低与数据总量的大小成反比


# 存储磁盘基本介绍

- SCSI接口硬盘
> 受到线缆及其`阵列卡`和`传输协议`限制，有固定插法。该盘已经完全停止发售。
- SAS接口硬盘
> 分为两种协议：SAS1.0和SAS2.0
- FDE/SDE接口硬盘
> IBM研发的SAS硬件加密硬盘
- SATA硬盘
> 具有较强的`纠错`能力，大大提高`数据传输`安全性
- SSD固态硬盘

# 交换机

一种存储转发设备
主要作用：交换机主要功能包括物理编址，网络拓扑结构，错误校验，帧序列以及流控。

# IDC（Internet Data Center）
互联网数据中心

# RAID（Redundant Arrays of Independent Disks）
磁盘阵列

# Hadoop

- HDFS 分布式文件系统
- MapReduce 分布式计算系统
- Yarn 分布式集群资源管理

### 历史版本
1.x：hadoop版本中第二代开源版本，主要修复0.x版本的一些bug
2.x：架构产生重大变化，引入yarn平台
3.x：加入多namenode特性

### 3大发行版公司
Apache
HortonWorks
ClouderaManager

### 模型架构

第一种：NameNode与ResourceManager单节点架构模型
- 文件系统核心模块
`NameNode`：集群当中的主节点，主要用于管理集群当中的各种数据
`secondaryNameNode`: 主要能用于hadoop当中元数据信息的辅助管理
`DataNode`：集群当中的从节点，主要用于存储集群当中的各种数据

- 数据计算核心模块
`ResourceManager`：接受用户的计算请求任务，并负责集群的资源分配
`NodeManager`：负责执行主节点AppMaster分配的任务

第二种：NameNode单节点与ResourceManager高可用架构模型
- 文件系统核心模块 同上
- 数据计算核心模块
`ResourceManager`：接受用户的计算请求任务，并负责集群的资源分配，以及计算任务的划分，通过zookeeper实现ResourceManager的高可用
`NodeManager`：负责执行主节点ResourceManager分配的任务


第三种：NameNode高可用与ResourceManager单节点架构模型
第四种：NameNode与ResourceManager高可用架构模型



### 查看界面的三个端口

http://xxx:50070 查看HDFS
http://xxx:8088/cluster 查看YARN集群
http://xxx:19888/jobhistory 查看历史完成的任务


