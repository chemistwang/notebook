# Spring Cloud

单体应用存在的问题

- 随着业务的发展，开发变得越来越复杂
- 修改，新增某个模块，需要对整个系统进行测试，重新部署
- 一个模块出现问题，很可能导致整个系统崩溃
- 多个开发团队同时对数据进行管理，很容易产生安全漏洞
- 各个模块使用同一种技术，很难根据实际情况选择更合适的技术框架，局限性很大
- 模块内容过于复杂，若员工离职，可能很长时间才能完成工作交接

### 1. 微服务概述

> 分布式，在架构层面上解耦合
> 集群：物理层面分担压力（运维）
> 分布式：软件设计层面，将大型项目架构拆分若干微服务（开发）

- 优点 - 各个服务开发，测试，部署相互独立 - 新需求出现时，不用考虑兼容性，影响度等 - 各服务只需要对外提供接口，不限制语言框架

- 缺点 - 服务独立，数据独立，保证各个服务数据等一致性，是问题也是难点

![微服务落地框架对比](http://cdn.chemputer.top/notebook/springcloud/diff.jpg)

- 为什么选 spring cloud - spring cloud 完全基于 spring boot，服务调用基于 rest api，整合各种成熟产品和框架，同时给予 spring boot 也使得整体的开发，配置，部署都非常方便 - spring 系列的产品功能齐全，简单好用，性能优越，文档规范，因此 spring cloud 是微服务架构中一个非常优越的实现方案

![spring cloud架构图](http://cdn.chemputer.top/notebook/springcloud/architecture.jpg)

![spring cloud核心组件](http://cdn.chemputer.top/notebook/springcloud/component.jpg)

- 服务治理核心 - 服务提供者 - 服务消费者 - 注册中心
  > 在分布式系统架构中，每个微服务在启动时，将自己的信息存储在注册中心，叫做服务注册
  > 服务消费者从注册中心获取服务提供者的网络信息，通过该信息调用服务，叫做服务发现

> spring cloud 的服务治理使用 Eureka 来实现，Eureka 是 Netflix 开源的基于 rest 的服务治理解决方案，spring cloud 集成了 Eureka，提供服务注册和的服务发现的功能，可以和基于 spring boot 搭建的微服务应用轻松完成整合，开箱即用
> spring cloud eureka 相当于二次封装

- Spring Cloud Eureka - eureka server 注册中心 - eureka client ,所有要进行注册的微服务通过 eureka client 连接到 eureka server，完成注册

​
