# 安装

## mac 安装（单机版）

可以直接使用 brew 安装单机版

> kafka 会依赖 zookeeper，但是 brew 会帮你装好

```bash
brew install kafka
```

使用命令直接感受下

```bash
# 创建topic
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic mytopic
```

```bash
# 删除topic
kafka-topics --delete --zookeeper localhost:2181 --topic mytopic
```

```bash
# 列出创建的主题
kafka-topics --list --zookeeper localhost:2181
```

```bash
# 生产
kafka-console-producer --broker-list localhost:9092 --topic mytopic
```

```bash
# 查看主题中的消息
kafka-console-consumer --bootstrap-server localhost:9092 --topic mytopic --from-beginning
```

```bash
# 消费
kafka-console-consumer --bootstrap-server localhost:9092 --topic mytopic --from-beginning
```

## linux 安装（集群）

::: tip

1. `kafka`集群必须要有`zookeeper`
2. 每一个 kafka 节点都需要修改`broker.id` (每个节点的标识，不能重复)
3. 配置`log.dirs`数据存储目录
   :::

1) 下载解压

```bash
wget https://downloads.apache.org/kafka/2.4.1/kafka_2.12-2.4.1.tgz
tar -zxvf kafka_2.12-2.4.1.tgz -C /opt/module
```

2. 修改 `server.properties` 文件

```bash
cd /opt/module/kafka_2.12-2.4.1/config
vi server.properties
```

```bash
# 指定broker的id
# 搭建集群每个id必须不一样
# 从1开始是因为我安装的zookeeper从1开始，方便对照
broker.id=1 # 其他两台修改为2、3

# 端口
advertised.listeners=PLAINTEXT://t1.chemputer.ai:9092

# 指定Kafka的数据位置
log.dirs=/opt/module/kafka_2.12-2.4.1/log

# zookeeper集群
zookeeper.connect=t1.chemputer.ai:2181,t2.chemputer.ai:2181,t3.chemputer.ai:2181
```

3. 启动服务

```bash
bin/kafka-server-start.sh config/server.properties
```

后台运行加上 `-daemon` 参数即可

```bash
bin/kafka-server-start.sh -daemon config/server.properties
```

::: warning 可能遇到的问题

[/opt/module/kafka_2.12-2.4.1] # bin/kafka-server-start.sh config/server.properties
Java HotSpot(TM) 64-Bit Server VM warning: INFO: os::commit_memory(0x00000000c0000000, 1073741824, 0) failed; error='Cannot allocate memory' (errno=12)

原因：云服务器内存不够

解决方案：
将 `kafka-server-start.sh`的`export KAFKA_HEAP_OPTS="-Xmx1G -Xms1G"`修改为
`export KAFKA_HEAP_OPTS="-Xmx256M -Xms128M"`

:::

4. 设置开机自启动

```bash
vi /etc/systemd/system/kafka.service
```

```
[Unit]
Description=Kafka
After=zookeeper.service

[Service]
Type=simple
User=root
Group=root
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/bin/java/jdk1.8.0_231/bin"
ExecStart=/opt/module/kafka_2.12-2.4.1/bin/kafka-server-start.sh /opt/module/kafka_2.12-2.4.1/config/server.properties
ExecStop=/opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh
TimeoutSec=30
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

::: warning 启动失败
之前`Environment`这一项没有配置`/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:`导致启动不起来，查看 `systemctl status kafka` 显示 `code=exited, status=127`，查看 `journalctl -xe`没有找到问题。

应该关闭重启策略，可以看到更多的报错信息，注释掉 `TimeoutSec=30 Restart=on-failure`；再次 执行 `systemctl start kafka`发现，

```
● kafka.service - Kafka
   Loaded: loaded (/etc/systemd/system/kafka.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Fri 2020-11-20 11:18:45 CST; 3s ago
  Process: 4747 ExecStop=/opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh (code=exited, status=1/FAILURE)
  Process: 4739 ExecStart=/opt/module/kafka_2.12-2.4.1/bin/kafka-server-start.sh /opt/module/kafka_2.12-2.4.1/config/server.properties (code=exited, status=127)
 Main PID: 4739 (code=exited, status=127)

Nov 20 11:18:45 t2 systemd[1]: kafka.service: Main process exited, code=exited, status=127/n/a
Nov 20 11:18:45 t2 kafka-server-stop.sh[4747]: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: 17: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: ps: not found
Nov 20 11:18:45 t2 kafka-server-stop.sh[4747]: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: 17: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: grep: not found
Nov 20 11:18:45 t2 kafka-server-stop.sh[4747]: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: 17: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: grep: not found
Nov 20 11:18:45 t2 kafka-server-stop.sh[4747]: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: 17: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: grep: not found
Nov 20 11:18:45 t2 kafka-server-stop.sh[4747]: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: 17: /opt/module/kafka_2.12-2.4.1/bin/kafka-server-stop.sh: awk: not found
Nov 20 11:18:45 t2 kafka-server-stop.sh[4747]: No kafka server to stop
Nov 20 11:18:45 t2 systemd[1]: kafka.service: Control process exited, code=exited status=1
Nov 20 11:18:45 t2 systemd[1]: kafka.service: Unit entered failed state.
Nov 20 11:18:45 t2 systemd[1]: kafka.service: Failed with result 'exit-code'.
```

看到 `ps: not found`.. grep: not found.. awk: not found`，很关键有木有，需要指定路径，加上之后，启动成功。

:::

## 基础操作

1. 创建 topic

::: tip 创建 topic

创建一个 topic（主题）。kafka 中所有的消息都是保存在主题中，要生产消息到 kafka，首先必须要有一个确定的主题。

:::

```bash
# 创建名为yourTopicName的主题
bin/kafka-topics.sh --create --bootstrap-server t2.chemputer.ai:9092 --topic yourTopicName

# 查看目前Kafka中的主题
bin/kafka-topics.sh --list --bootstrap-server t2.chemputer.ai:9092
```

2. 生产消息到 Kafka

使用 Kafka 内置测试程序，生产一些消息到 Kafka 的`yourTopicName`主题中

```bash
bin/kafka-console-producer.sh --broker-list t2.chemputer.ai:9092 --topic yourTopicName
```

3. 从 Kafka 消费消息

```bash
bin/kafka-console-consumer.sh --bootstrap-server t2.chemputer.ai:9092 --topic yourTopicName --from-beginning
```

## kafkaTool

一个图形化工具

- 浏览 Kafka 集群节点
- 创建 topic/删除 topic
- 浏览 Zookeeper 中的数据

## 基准测试

::: tip 基准测试

基准测试`(benchmark testing)`是一种测量和评估软件性能指标的活动。可以通过基准测试了解到软件、硬件的性能水平。主要测试负载的执行时间、传输速度、吞吐量、资源占用率等

:::

1. 生产消息基准测试

- 启动 Kafka 集群

- 创建一个 1 个分区 1 个副本的 topic：`benchmark`

```bash
bin/kafka-topics.sh \
--zookeeper t2.chemputer.ai:2181 \
--create \
--topic benchmark \
--partitions 1 \
--replication-factor 1
```

- 同时运行生产者、消费者基准测试程序

```bash
bin/kafka-producer-perf-test.sh \
--topic benchmark \
--num-records 5000000 \
--throughput -1 \
--record-size 1000 \
--producer-props bootstrap.servers=t1.chemputer.ai:9092,t2.chemputer.ai:9092,t3.chemputer.ai:9092 \
acks=1
```

```bash
# 参数说明
--topic topic名字
--num-records 总共指定生产数据量（默认5000w）
--throughput 指定吞吐量-限流（-1 不指定）
--record-size record数据大小（字节）
--producer-props bootstrap.servers 指定Kafka集群地址，ACK模式
```

- 观察结果（仅供参考）

```bash
3329 records sent, 665.5 records/sec (0.63 MB/sec), 1787.6 ms avg latency, 4450.0 ms max latency.
```

2. 消费消息基准测试

```bash
bin/kafka-consumer-perf-test.sh \
--broker-list t1.chemputer.ai:9092,t2.chemputer.ai:9092,t3.chemputer.ai:9092 \
--topic benchmark \
--fetch-size 1048576 \
--messages 5000000
```

```bash
# 参数说明
--broker-list  指定kafka集群地址
--topic 指定topic名称
--fetch-size 每次拉取的数据大小
--messages  总共消费的消息个数
```
