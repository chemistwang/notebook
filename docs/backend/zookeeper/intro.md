# 简介
### zookeeper的选举机制

1. 半数机制:  集群中半数以上机器存活，集群可用。所以 Zookeeper 适合安装奇数台服务器
2. Zookeeper虽然在配置文件中并没有指定 Master 和 Slave， 但是 Zookeeper工作时，是有一个节点为 Leader，其他为 Follower，Leader是通过内部的选举机制临时产生的

### zookeeper的监听原理

原理：
1. 首先有一个 `main()` 线程
2. 在 `main()` 线程中创建 zookeeper客户端，这时就会创建两个线程，一个负责网络连接通信（connect）。一个负责监听（listener）
3. 通过 `connect` 线程将注册的监听事件发送给zookeeper
4. 在 zookeeper 的注册监听器列表中将注册的监听事件添加到列表中
5. zookeeper监听到有数据或路径变化，就会将这个消息发送给listener线程
6. listener线程内部调用了 process()方法

常见的监听：
1. 监听节点数据的变化

`get path [watch]`

2. 监听子节点增减的变化

`ls path [watch]`

### zookeeper的部署方式有哪几种？集群中的角色有哪些？集群最少需要几台机器？

1. 部署方式：单机模式，集群模式
2. 角色： `Leader` 和 `Follower`
3. 集群最少需要机器数： 3


### zookeeper常用命令

ls 
create
get 
delete 
set

### 节点类型

- 持久（Persistent）：客户端和服务端断开连接后，创建的节点不删除
- 短暂（Ephemeral）： 客户端和服务端断开连接后，创建节点自己删除


在分布式系统中，顺序号可以被用于为所有的事件进行全局排序，这样客户端可以通过顺序号推断事件的顺序



