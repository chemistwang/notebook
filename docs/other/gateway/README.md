## API 网关

参考资料地址： https://zhuanlan.zhihu.com/p/32660126

### 使用场景
1. Open API

企业需要将自身数据、能力等作为开发平台向外开放，通常会以rest的方式向外提供，最好的例子就是淘宝开放平台、腾讯公司的QQ开放平台、微信开放平台。 Open API开放平台必然涉及到客户应用的接入、API权限的管理、调用次数管理等，必然会有一个统一的入口进行管理，这正是API网关可以发挥作用的时候。

2. 微服务网关

在微服务架构中，有一个组件可以说是必不可少的，那就是微服务网关，微服务网关处理了负载均衡，缓存，路由，访问控制，服务代理，监控，日志等。API网关在微服务架构中正是以微服务网关的身份存在。

3. API服务管理平台

上述的微服务架构对企业来说有可能实施上是困难的，企业有很多遗留系统，要全部抽取为微服务器改动太大，对企业来说成本太高。但是由于不同系统间存在大量的API服务互相调用，因此需要对系统间服务调用进行管理，清晰地看到各系统调用关系，对系统间调用进行监控等。 API网关可以解决这些问题，我们可以认为如果没有大规模的实施微服务架构，那么对企业来说微服务网关就是企业的API服务管理平台。

### 企业整体架构地位

### 如何应用

1. Open API

合作伙伴需要到OpenAPI平台申请应用。

2. 微服务网关（内网API网关）



3. 











