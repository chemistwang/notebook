# 简介

## 读音分解

[post-gress-Q-L]

> 参考资料
> [菜鸟教程](https://www.runoob.com/postgresql/postgresql-tutorial.html)
> [postgresql 11.2中文手册](http://www.postgres.cn/docs/11/)
> [postgresql官方网站](https://www.postgresql.org/)

## 简介

- 可追溯1973
- 关系型数据库 relational
- multi-model
- 没有商业公司掌控
- BSD协议
- 有很多插件，增强组件，eg：posGis（地理信息组件）

## 体系结构

![体系结构](http://cdn.chemputer.top/notebook/psql/psql_structure.jpg)


- Postmaster是守护进程，第一个postgre进程，主要职责
	- 数据库的启停
	- 监听客户端连接
	- 为每个客户端连接衍生（fork）专用的postgres服务进程
	- 当postgres进程出错时尝试修复
	- 管理数据文件
	- 管理数据库的辅助进程
- Postgre进程实际上是postgres的子进程
	- 直接与客户端进程通讯
	- 负责接收客户端所有的请求
	- 包含数据库引擎，负责解析SQL和生成执行计划等
	- 根据命令需要调用各种辅助进程和访问内存结构
	- 负责返回命令执行结果给客户端
	- 在客户端断开连接时释放进程

- 本地内存
	- 本地内存是服务器进程独占的内存结构，每个postgre子进程都会分配一小块相应内存空间，随着连接会话的增加而增加，它不属于实例的一部分
	- work_mem：用于排序的内存
	- maintenance_work_mem：用于内部运维工作的内存，如VACUUM垃圾回收、创建和重建索引等
	- temp_buffers：用于存储临时表的数据