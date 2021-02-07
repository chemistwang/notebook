# Oozie

## 简介

一个基于工作流引擎的开源框架，由 `Cloudera` 公司贡献给 Apache，提供对Hadoop MapReduce、Pig Jobs的任务调度与协调。Oozie需要部署到Java Servlet容器中运行。主要用于定时调度任务，多任务可以按照执行的逻辑顺序调度。


## 功能模块

### 模块

1. Workflow

顺序执行流程节点，支持fork（分支多个节点），join（合并多个节点为一个）

2. Coordinator

定时触发workflow

3. Bundle Job

绑定多个Coordinator

### 常用节点

1. 控制流节点（Control Flow Nodes）

控制流节点一般都是定义在工作流开始或者结束的位置，eg：start，end，kill等。以及提供工作流的执行路径机制，eg：decission，fork，join等。

2. 动作节点（Action Nodes）

负责执行具体动作的节点，eg：拷贝文件，执行某个shell脚本等。

## 部署


