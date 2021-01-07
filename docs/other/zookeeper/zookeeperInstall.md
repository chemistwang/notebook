
# 安装

``` bash
# zookeeper由java编写，需要安装前准备java环境
vi /etc/environment 
# /usr/bin/java/jdk1.8.0_231/bin  添加环境变量(貌似默认需要放在这个路径下)
source /etc/environment # 重启

# 安装解压
# wget https://downloads.apache.org/zookeeper/stable/apache-zookeeper-3.5.8.tar.gz # 下载
wget https://downloads.apache.org/zookeeper/stable/apache-zookeeper-3.5.8-bin.tar.gz # 下载

# 注意: 从3.5.5开始，需要下载带有bin名称的包, 可以直接使用，普通tar.gz只是源码包无法使用

tar -zxvf apache-zookeeper-3.5.8-bin.tar.gz -C /opt/module/ # 解压到指定目录

# 配置修改
cd /opt/module/apache-zookeeper-3.5.8-bin
mkdir zkData # 创建文件夹
mv conf/zoo_sample.cfg conf/zoo.cfg # 修改文件名
vi conf/zoo.cfg # 修改路径 dataDir=/opt/module/apache-zookeeper-3.5.8-bin/zkData

# 操作zookeeper
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkServer.sh start  # 启动zookeeper
[/opt/module/apache-zookeeper-3.5.8-bin] # jps   # 查看进程是否启动
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkServer.sh status # 查看状态
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkCli.sh # 启动客户端
quit # 退出客户端 
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkServer.sh stop # 停止 zookeeper
```

### 搭建集群

> 一般情况，使用单机模式作为开发环境，使用集群模式作为生产环境

1. 先给每个节点在 `zkData` 目录下创建`myid`文件，文件内容为 1~255 之间的整数并且唯一

``` bash
[/opt/module/apache-zookeeper-3.5.8-bin/zkData] # vi myid #
```

2. 修改 `zoo.cfg` 文件，增加如下配置

``` bash
########## cluster ##########
quorumListenOnAllIPs=true
server.1=t1.herin.ai:2182:2183
server.2=t2.herin.ai:2182:2183
server.3=t3.herin.ai:2182:2183

# server.1=62.234.154.80:2182:2183
# server.2=49.232.150.22:2182:2183
# server.3=49.232.138.134:2182:2183
```

说明：
1. 如果是云主机，需要开放对应端口的安全组
2. 如果是云主机，需要配置`quorumListenOnAllIPs=true`，用以监听所有网卡，这个和云服务器的一些虚拟技术有关，否则的话会抛异常
3. 2182: 表示这个服务器与与集群中Leader服务器交换信息的端口
4. 2183: 若集群中Leader服务器挂了，需要一个端口重新进行选举，选出一个新的Leader，这个端口用来执行选举时服务器相互通信的端口

3. 分别启动zookeeper

``` bash
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkServer.sh start #t1
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkServer.sh start #t2
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkServer.sh start #t3
```

> 因为选举机制是半数原则，需要启动两台才能正常访问状态

4. 查看zookeeper状态

``` bash
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkServer.sh status
/usr/bin/java/jdk1.8.0_231/bin/java
ZooKeeper JMX enabled by default
Using config: /opt/module/apache-zookeeper-3.5.8-bin/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost.
Mode: follower
# Mode: leader
```

### 客户端命令操作

1. 启动客户端

```
[/opt/module/apache-zookeeper-3.5.8-bin] # bin/zkCli.sh
```

2. 显示所有操作命令

```
[zk: localhost:2181(CONNECTED) 2] help
```

3. 查看当前znode中所包含的内容

```
[zk: localhost:2181(CONNECTED) 5] ls /
[zookeeper]
```

4. 查看当前znode中所包含的详细数据

```
[zk: localhost:2181(CONNECTED) 9] ls -s /
[zookeeper]cZxid = 0x0
ctime = Thu Jan 01 08:00:00 CST 1970
mZxid = 0x0
mtime = Thu Jan 01 08:00:00 CST 1970
pZxid = 0x0
cversion = -1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 0
numChildren = 1
```

5. 创建节点

``` bash
create /foo hello
create -e /tmp temp # 创建短暂节点，客户端断开后，节点数据不保留
create -s /seq seq # 创建顺序节点
```

6. 判断节点是否存在

```
stat /foo
```

7. 获取节点数据

```
get /foo
```
8. 更新节点数据

```
set /foo HELLO
```

9. 删除节点

```
delete /foo
```



### 开机自启动

[参考资料](https://www.xiaocaicai.com/2020/07/%E9%83%A8%E7%BD%B2-zookeeper-kafka%E9%9B%86%E7%BE%A4/)


``` bash
vi /etc/systemd/system/zookeeper.service
```

```
[Unit]
Description=Zookeeper service
Requires=network.target
After=network.target

[Service]
Type=forking #之前试过改为simple但是没成功，不知道原因
User=root
Group=root
ExecStart=/opt/module/apache-zookeeper-3.5.8-bin/bin/zkServer.sh start /opt/module/apache-zookeeper-3.5.8-bin/conf/zoo.cfg
ExecStop=/opt/module/apache-zookeeper-3.5.8-bin/bin/zkServer.sh stop
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

``` bash
 systemctl daemon-reload
 systemctl start zookeeper
 systemctl enable zookeeper
 systemctl status zookeeper
 systemctl stop zookeeper
```

 

 

 

 

 



