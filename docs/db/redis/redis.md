# Redis

## 一、 Redis 数据类型

- string 字符串
- hash 对象
- list 简单字符串列表
- set string 类型的无序集合
- zset string 类型的有序集合，且不允许重复

## 二、 常用操作

```bash
/**
* 简单操作

del KEY      //删除
```

## 雪崩、穿透、并发

- 缓存雪崩：
  缓存同一时间大面积失效，导致所有请求转向数据库，CPU 和内存负载过高，甚至宕机

解决方案：
随机初始化失效时间（不要同一时间失效）

- 缓存穿透
  查询一个不存在的数据。查不到则不写入缓存，导致每次请求都要查数据库，造成缓存穿透。

解决方案：
参数校验
布隆过滤器

- 缓存击穿
  访问某一个热点 key

解决方案：
分布式锁（zookeeper 实现，redis 实现）

上线前：
高可用
eg: Redis Sentinel 、Redis Cluster
缓存预热
eg:系统上线后，将相关的缓存数据直接加载到缓存系统

运行中：
限流降级

挂掉之后：
RDB+AOF

## redis rdb aof 持久化区别

https://www.cnblogs.com/shizhengwen/p/9283973.html
