# Hadoop-Yarn

### 介绍

- yarn是hadoop集群中的资源管理系统模块，从hadoop2.0开始引入yarn模块，yarn可为各类计算框架提供资源的管理和调度，`主要用于管理集群当中的资源`（主要是服务器各种硬件资源：CPU、内存、磁盘、网络IO等）以及`调度运行在yarn上的各种任务`。

- yarn实现分离做法是有一个全局的资源管理（`ResourceManager`，RM）和每个应用程序对应一个应用管理器（`ApplicationMaster`，AM）

- 调度分为两个层级：

1. 一级调度管理：计算资源管理（CPU，内存，网络IO，磁盘）
2. 二级调度管理：任务内部的计算模型管理（AppMaster的任务精细化管理）

### Yarn主要组件介绍与作用

Yarn总体上是 `Master/Slave` 结构，主要由 `ResourceManager`, `NodeManager`, `ApplicationMaster`, `Container` 组成

