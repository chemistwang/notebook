# Spark

## 概述

1. Spark是什么

Spark是一种基于内存的快速、通用、可扩展的大数据分析计算引擎

2. Spark 和 Hadoop

Hadoop的MapReduce是最为熟知的计算框架，Spark和Hadoop的关系

- 时间节点上看：

```
Haddop:
- 2006年1月，Doug Cutting加入Yahoo，领导Hadoop开发
- 2008年1月，Hadoop成为Apache顶级项目
- 2011年1.0正式发布
- 2012年3月稳定版发布
- 2013年10月发布2.x（Yarn）版本
```

```
Spark:
- 2009年，Spark诞生于伯克利大学的AMPLab实验室
- 2010年，伯克利大学正式开源了Spark项目
- 2013年6月，Spark成为了Apache基金会下的项目
- 2014年2月，Spark以飞快的速度成为了Apache顶级项目
- 2015年至今，Spark愈发火爆，大量国内公司开始重点部署或使用Spark
```

- 功能上看：

```
Hadoop:
- Hadoop由Java语言编写，在分布式服务器集群上存储海量数据并运行分布式分析应用的开源框架
- HDFS作为Hadoop分布式文件系统,处在Hadoop生态圈的最下层，存储所有数据，支持Hadoop所有服务
- MapReduce是一种编程模型，作为Hadoop分布式计算模型，是Hadoop核心
- HBase是对Google的BigTable的开源实现，但又有不同。Hbase是一个基于HDFS的分布式数据库，擅长实时随机读/写大规模数据集
```

```
Spark:
- 由Scala语言开发的快速、通用、可扩展的大数据分析引擎
- Spark Core中提供了Spark最基础与最核心的功能
- Spark SQL是Spark用来操作结构化数据的组件。通过Spark SQL，用户可以使用SQL或Apache Hive版本SQL（HQL）来查询数据
- Spark Streaming 是Spark平台上针对实时数据进行流式计算的组件，提供了丰富的处理数据流的API
```

综上，Spark出现时间相对较晚，主要功能用于 `数据计算`

3. Spark VS Hadoop

Spark和Hadoop的根本差异是多个作业之间的数据通信问题：Spark多个作业之间数据通信是基于内存，而Hadoop是基于磁盘

但在实际的生产环境中，由于内存的限制，可能会由于内存资源不足导致Job执行失败，此时，MapReduce其实是一个更好的选择，所以Spark并不能完全替代MR

4. Spark核心模块

- Apache Spark Core: 下列组件均基于此进行扩展
- Spark SQL: 操作结构化组件
- Spark Streaming: 实时流计算组件
- Spark MLlib: 机器学习
- Spark GraphX: 图形计算



