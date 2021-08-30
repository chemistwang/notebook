# 应用场景

学习技术前先了解应用场景将会让你对它的认识更充分吧

## 1. 异步处理

可以将一些比较耗时的操作放在其他系统中，通过MQ将需要处理的消息进行存储，其他系统可以消费MQ中的数据


![异步处理](http://cdn.chemputer.top/notebook/kafka/scene/1.png)


> 电商网站中，新用户注册，需要将用户的信息保存到数据库中，同时还需要额外发送注册邮件通知，以及短信注册码。因为发送邮件、发送注册短信需要连接外部服务器，需要额外等待，此时，可以用MQ进行异步处理，从而实现快速响应。

## 2. 系统解耦

原先一个微服务是通过接口（HTTP）调用另一个微服务，这时候耦合很严重，只要接口发生变化就会导致系统不可用

![系统解耦](http://cdn.chemputer.top/notebook/kafka/scene/2.png)

> 系统A有一个请求需要发送到系统B，而A又不需要等B的结果


## 3. 流量削峰

MQ低延迟、高可靠、高吞吐，可以应对大量并发

![流量削峰](http://cdn.chemputer.top/notebook/kafka/scene/3.png)

> 电商秒杀、12306抢票

## 4. 日志处理（大数据领域常见）/ 实时Spark流计算

可以使用MQ作为临时存储，或者一种通信管道

![日志处理](http://cdn.chemputer.top/notebook/kafka/scene/4.png)

> 大型电商网站（淘宝、京东）、App（抖音）需要分析用户行为，要根据用户的访问行为来发现用户喜好以及活跃情况，需要在页面收集大量用户访问信息