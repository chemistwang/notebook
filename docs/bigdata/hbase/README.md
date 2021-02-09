# HBase

## 简介

1. 定义: 一种分布式、可扩展、支持海量数据存储的 `NoSQL` 数据库。
2. 数据模型:逻辑上，HBase的数据模型同关系型数据库很类似，数据存储在一张表中，有行有列。但从Hbase的底层物理存储结构（K-V）来看，HBase更像是一个 `multi-dimensional map`

## 逻辑结构

![逻辑结构](http://cdn.chemputer.top/notebook/hbase/logic.png)

## 物理结构

![逻辑结构](http://cdn.chemputer.top/notebook/hbase/physics.png)

## 数据模型

1. **Name Space**

命名空间，类似于关系型数据库的database概念，每个命名空间下有多个表。
HBase有2个自带的命名空间，分别是 `hbase` 和 `default`。

- hbase: 存放HBase内置的表
- default: 用户默认使用的命名空间

2. **Region**

类似于关系型数据库的表概念。不同的是。HBase定义表时只需要声明列族即可，不需要声明具体的列。这意味着，往HBase写入数据的时候，字段可以 `动态、按需` 指定。因此，和关系型数据库相比，HBase能够轻松应对字段变更的场景。

3. **Row**

HBase表中的每行数据都由一个 `RowKey` 和多个 `Column` 组成，数据是按照 `RowKey` 的 `字典顺序存储`，并且查询数据时只能根据 `RowKey` 进行检索，所以 `RowKey` 的设计十分重要。

4. **Column**

HBase中的每个列都由 `Column Family(列族)` 和 `Column Qualifier(列限定符)` 进行限定。建表时，只需要指明列族，而列限定符无需预先定义。eg info:name info:age

5. **Time Stamp**

用于标识数据的不同版本（version），每条数据写入时，若不指定时间戳，系统会自动为其加上该字段，其值为写入HBase的时间。

6. **Cell**

由 `RowKey`, `Column Family`, `Column Qualifier`, `Time Stamp` 唯一确定的单元。cell中的数据是没有类型的，全部都是字节码形式存储。

## 基础架构角色

1. Region Server （DML）

Region Server 为 Region 的管理者，其实现类为 `HRegionServer`，主要作用：
- 对于数据的操作：get，put，delete
- 对于Region的操作：splitRegion，compactRegion

2. Master（DDL）

Master 是所有 Region Server 的管理者，其实现类的 `HMaster`，主要作用：
- 对于表的操作：create，delete，alter
- 对于RegionServer的操作：分配regions到每个RegionServer，监控每个RegionServer的状态，负载均衡和故障转移

3. Zookeeper

HBase通过Zookeeper来做master的高可用、RegionServer的监控、元数据的入口以及集群配置的维护等工作。

4. HDFS

HDFS为HBase提供最终的底层数据存储服务，同时为HBase提供高可用的支持。

## 安装

1. 下载解压

``` bash
wget https://downloads.apache.org/hbase/2.3.4/hbase-2.3.4-bin.tar.gz
tar -zxvf 
```

2. 修改配置文件

``` bash
vi /opt/module/hbase-2.3.4/conf/hbase-env.sh
export JAVA_HOME=/root/jdk1.8.0_271
```

::: tip
进入命令行报错：
``` bash
[ERROR] Terminal initialization failed; falling back to unsupported
java.lang.IncompatibleClassChangeError: Found class jline.Terminal, but interface was expected
```
原因：jline的jar包版本太低

解决方案：替换为2.12 /opt/bigdata/hbase-2.0.5/lib/jline-2.12.jar

:::

## Shell操作

1. 基本操作

- 进入HBase客户端命令行

``` bash
bin/hbase shell
```

- 查看帮助命令

``` bash
hbase(main):001:0> help
```

- 查看当前数据库中有哪些表

```
hbase(main):002:0> list
```

2. 表的操作



## API

1. 添加依赖

``` xml
<dependency>
    <groupId>org.apache.hbase</groupId>
    <artifactId>hbase-client</artifactId>
    <version>2.0.5</version>
</dependency>
```

2. 


## HBase与Hive的对比

- Hive
1. 数据仓库
Hive的本质相当于将HDFS中已经存储的文件在MySQL中做了一个双射关系，以方便使用HQL去管理查询。
2. 用于数据分析、清洗
Hive适用于离线的数据分析和清洗，延迟较高
3. 基于HDFS、MapReduce
Hive存储的数据依旧在DataNode上，编写的HQL语句终将是转化为MapReduce代码执行。
 
- HBase
1. 数据库
是一种`面向列族存储`的非关系型数据库
2. 用于存储结构化和非结构化数据
适用于单表非关系型数据的存储，不适合做关联查询，类似join等操作
3. 基于HDFS
数据持久化存储的体现形式是HFile，存放于DataNode中，被RegionServer以Region的形式进行管理
4. 延迟较低，接入在线业务使用
面对大量的企业数据，HBase可以直线单表大量数据的存储，同时提供了高效的数据访问速度

