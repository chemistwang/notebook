# Hadoop-MapReduce

### 介绍

MapReduce的思想核心是"分而治之"，适用于大量复杂的任务处理场景。

- `Map`：负责"分"，即把复杂的任务分解为若干个"简单的任务"来并行处理。可以进行拆分的前提是这些小人物可以进行并行计算，彼此之间几乎没有依赖关系。

- `Reduce`: 负责"合"，即对map阶段的结果进行全局汇总。

- MapReduce运行在`yarn`集群: `ResourceManager` + `NodeManager`

一个完整的mapreduce程序在分布式运行时有三类实例进程：
1. `MRAppMaster`负责整个程序的过程调度及状态协调
2. `MapTask`负责map阶段的整个数据处理流程
3. `ReduceTask`负责reduce阶段的整个数据处理流程


### MapReduce编程规范

3个阶段8个步骤

- Map阶段2个步骤

1. 设置`InputFormat`类，将数据切分为 `Key-Value(K1和V1)对，输入到第二步`
2. 自定义`Map`逻辑，将第一步的结果转化成另外的`Key-Value(K2和V2)对，输出结果`

- Shuffle阶段4个步骤

3. 对输出的`Key-Value`对进行`分区`
4. 对不同分区的数据按照相同的Key`排序`
5. (可选)对分组过得数据初步`规约`,降低数据的网络拷贝
6. 对数据进行`分组`,相同`Key`的`Value`放入一个集合中

- Reduce阶段2个步骤

7. 对多个Map任务的结果进行`排序以及合并`，编写Reduce函数实现自己的逻辑，对输入的Key-Value进行处理，转为新的`Key-Value(K3和V3)`输出
8. 设置`OutputFormat`处理并保存Reduce输出的Key-Value数据


### MapReduce运行模式

- 集群运行模式

1. 将MapReduce程序提交给Yarn集群，分发到很多的节点上并发执行
2. 处理的数据和输出结果应该位于HDFS文件系统
3. 提交集群的实现步骤：将程序打成JAR包，并上传。然后在集群中用hadoop命令启动

``` bash
hadoop jar xxxx.jar MapReduce.WordCount
```

### MapReduce分区

- 概述

在MapReduce中，通过指定分区，会将同一个分区的数据发送到同一个Reduce中进行处理。Reduce当中默认分区只有一个。

- 分区步骤

1. 自定义 `Mapper`
2. 自定义 `Partitioner`
3. 自定义 `Reducer`
4. 主类中设置分区类和 `ReduceTask` 个数


### MapReduce计数器

计数器是收集作业统计信息的有效手段之一，用于质量控制或应用级统计。

- hadoop内置计数器列表

1. MapReduce任务计数器 `org.apache.hadoop.mapreduce.TaskCounter`
2. 文件系统计数器 `org.apache.hadoop.mapreduce.FileSystemCounter`
3. FileInputFormat计数器 `org.apache.hadoop.mapreduce.lib.input.FileInputFormatCounter`
4. FileOutputFormat计数器 `org.apache.hadoop.mapreduce.lib.output.FileOutputFormatCounter`
5. 作业计数器 `org.apache.hadoop.mapreduce.JobCounter`

- 自定义计数器

1. 通过 `context` 上下文对象

``` java
Counter counter = context.getCounter("MY_COUNTER", "partition_counter");
//每次执行该方法，计数器变量值+1
counter.increment(1L);
```

2. 通过枚举

``` java
context.getCounter(Counter.MY_INPUT_RECORDS).increment(1L);
```


### MapReduce排序和序列化

- 序列化（Serialization）是指把结构化对象转化为字节流
- Java序列化是一个重量级序列化框架，不便于在网络中传输。
- Hadoop自己开发了一套序列化机制（Writable）
- WritableComparable是Writable子接口，既可以实现序列化，也可以对key进行比较。通过自定义key实现WritableComparable实现排序功能


### 规约Combiner

- 概念

每一个map都可能产生大量的本地输出，Combiner的作用就是对map的输出先做一次合并，以减少map和reduce节点之间的数据传输量，以提高网络IO性能。是MapReduce的一种优化手段之一。

1. combiner是MR程序中Mapper和Reducer之外的一种组件
2. combiner组件的父类就是Reducer
3. combiner和reducer区别在于运行的位置：Combiner在每一个maptask所在的节点运行；Reducer接受全局所有的Mapper的输出结果
4. combiner的意义就是对每一个maptask输出进行局部汇总，以减小网络传输量


- 实现步骤

1. 自定义Combiner继承Reducer，重写reduce方法
2. 在job中设置 `job.setCombinerClass(CustomCombiner.class)`

combiner能够应用的前提是不能影响最终的业务逻辑，而且，combiner的输出kv应与reducer的输入kv类型对应