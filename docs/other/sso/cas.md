

# SSO

## 前言

业务上需要整合一些系统，方便客户端访问，在查阅相关资料的时候，发现了一个专有名词 `UUMS`,  英文 `Universal User Management System`，翻译为`统一用户管理系统`。这个算是一个大概念吧，写在前面。

一个完整的用户认证中心应具备以下功能：

- 统一用户管理。实现用户信息的集中管理，并提供标准接口。
- 统一认证。
- 单点登录（SSO）。方便用户访问多个系统的技术，只需登录时进行一次注册，就可以在多个系统间自由穿梭。SSO实质是安全上下文（Security Context）或凭证（Credential）在多个应用系统之间的传递或共享。

应支持以下几种认证方式：

- 匿名认证方式：用户不需要任何认证，可以匿名的方式登录系统
- 用户名/密码认证：最基本的认证方式
- PKI/CA数字证书认证：通过数字证书方式认证用户身份
- IP地址认证：只能从指定的IP或者IP地址段访问系统
- 时间段认证：用户只能在某个指定时间段访问系统
- 访问次数认证：累计用户的访问次数，使用户的访问次数在一定的数值范围之内	

以上认证应采用模块化设计，管理员可灵活进行装载和卸载。



## SSO的实现方式

1. CAS流程
2. JWT
3. OAuth
4. OpenID


### CAS和OAuth2的区别

CAS：单点登录时保障客户端的用户资源的安全

OAuth2：保障服务端的用户资源的安全



### 方案汇总

- 同域下的单点登录： 在子域之间切换，设置顶域的cookie，但这不是真正的单点登录

- 不同域下的单点登录：推荐CAS，单点登录的标准流程



##  CAS

###  简介

中央认证服务（Central Authentication Service），是`Yale` 大学发起的一个企业级的、开源的项目，旨在为Web应用系统提供一种可靠的SSO解决方案。

### 原理：（后面上个官方图）

### 体系结构

从结构体系看，CAS 包括两部分： `CAS Server` 和 `CAS Client` 。

客户端就是我们的系统，服务端是认证中心。

`CAS Server` 负责完成对用户的认证工作，会为用户签发两个重要票据：`登录票据（TGT）`和`服务票据（ST）`来实现认证过程，需要独立部署。

`CAS Client` 负责处理对客户端受保护资源的访问请求，需要对请求方进行身份认证时，重定向到 CAS Server 进行认证。准确地来说，它以Filter 方式保护受保护的资源。对于访问受保护资源的每个 Web 请求，CAS Client 会分析该请求的 Http 请求中是否包含 ServiceTicket（服务票据，由 CAS Server发出用于标识目标服务）。CAS Client 与受保护的客户端应用部署在一起。

至于权限问题，`CAS Server`主要负责认证，也就是主要解决登录问题，登陆成功之后，还有权限处理问题，权限问题交由各个`CAS Client`自行处理，并不在`CAS Server`中完成

### 接口

1. `/login`：登录接口，用于登录到中心服务器
2. `/logout`：登出接口，用户从中心服务器登出
3. `/validate`：用于验证用户是否登录中心服务器
4. `/serviceValidate`：用于让各个service验证用户是否登录中心服务器

### 核心票据

CAS的核心就是其Ticket，及其在Ticket之上的一系列处理操作。CAS的主要票据有TGT、ST、PGT、PGTIOU、PT，其中TGT、ST是CAS1.0(基础模式)协议中就有的票据，PGT、PGTIOU、PT是CAS2.0(代理模式)协议中有的票据
　
`TGT（Ticket Granting Ticket）`

> TGT是CAS为用户签发的登录票据，拥有了TGT，用户就可以证明自己在CAS成功登录过。TGT封装了Cookie值以及此Cookie值对应的用户信息。用户在CAS认证成功后，生成一个TGT对象，放入自己的缓存（Session）；同时，CAS生成cookie（叫TGC，个人理解，其实就是TGT的SessionId），写入浏览器。TGT对象的ID就是cookie的值，当HTTP再次请求到来时，如果传过来的有CAS生成的cookie，则CAS以此cookie值（SessionId）为key查询缓存中有无TGT（Session），如果有的话，则说明用户之前登录过，如果没有，则用户需要重新登录。

`TGC（Ticket Granting Cookie）`

> CASServer生成 TGC 放入自己的 Session 中，而TGC就是这个Session的唯一标识（SessionId），以 Cookie形式放到浏览器端，是CAS Server 用来明确用户身份的凭证。

`ST (Service Ticket)`

> ST是CAS为用户签发的访问某一服务票据。用户访问service时，service发现用户没有ST，则要求用户去CAS获取ST。用户向CAS发出获取ST的请求，如果用户的请求中包含cookie，则CAS会以此cookie值为key查询缓存中有无TGT，如果存在TGT，则用此TGT签发一个ST，返回给用户。用户凭借ST去访问service，service拿ST去CAS验证，验证通过后，允许用户访问资源。

为了保证ST的安全性：ST 是基于随机生成的，没有规律性。而且，CAS规定 ST 只能存活一定的时间，然后 CAS Server 会让它失效。而且，CAS 协议规定ST只能使用一次，无论 Service Ticket 验证是否成功， CASServer 都会清除服务端缓存中的该 Ticket ，从而可以确保一个 Service Ticket 不被使用两次。

`PGT（Proxy-Granting ticket）`
> 由 CAS Server 颁发给拥有 ST 凭证的服务， PGT 绑定一个用户的特定服务，使其拥有向 CAS Server 申请，获得 PT 的能力

`PGTIOU （Proxy-Granting Ticket I Owe You
> 作用是将通过凭证校验时的应答信息由 CAS Server 返回给 CAS Client ，同时，与该 PGTIOU 对应的 PGT 将通过回调链接传给 Web 应用。 Web 应用负责维护 PGTIOU 与 PGT 之 间映射关系的内容表；

`PT （Proxy Ticket）`
> 是应用程序代理用户身份对目标程序进行访问的凭证；


## 搭建

### 本地搭建

#### 第一步：准备Java环境

确保java环境为1.8（之前用的13一直起不来，没办法，降了版本）

``` bash
➜  ~ java -version
java version "1.8.0_211"
Java(TM) SE Runtime Environment (build 1.8.0_211-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.211-b12, mixed mode)
```

``` bash
➜  ~ java -version
openjdk version "1.8.0_252"
OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_252-b09)
OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.252-b09, mixed mode)
```

``` bash
➜  ~ java -version
java version "1.8.0_271"
Java(TM) SE Runtime Environment (build 1.8.0_271-b09)
Java HotSpot(TM) 64-Bit Server VM (build 25.271-b09, mixed mode)
```



### 第二步：拉取模板

1. 从github拉取模板 `https://github.com/apereo/cas-overlay-template/tree/5.3`（clone好慢，直接下载zip包）

``` bash
git clone -b 5.3 https://github.com/apereo/cas-overlay-template.git
```

> 5.3 是 5.x最后一个版本，使用maven构建，JDK版本是1.8+；而之后的6.x版本，使用gradle构建，而且JDK需要11+


### 第三步：准备HTTPS证书（本地开发需要，线上不需要）

CAS Service需要使用Https的方式，就需要证书，可以买也可以自己生成（访问使用http，cas会给出警告）

声明：
> 秘钥库口令 `herin123`
> 姓名姓氏：cas.chemputer.top

三步：
1. 生成秘钥

``` bash
keytool -genkey -alias casserver -keyalg RSA -keystore ~/Desktop/caskeystore
```
参数说明：
`-genkey` 生成秘钥
`-keyalg` 指定秘钥算法，此处指定RSA
`-alias` 指定别名
`-keystore` 指定秘钥库存储位置

> 注意：当问到 您的名字与姓氏是什么? 此时需要填写域名，作为之后的访问地址，其他随意。

会在指定目录下生成一个 `sslherin.keystore`文件

2. 生成证书

``` bash
keytool -export -alias casserver -storepass herin123 -file ~/Desktop/cas.cer -keystore ~/Desktop/caskeystore
```

参数说明：
`-storepass` 刚刚生成秘钥文件时候设置的密码
`-file` 指定导出证书的文件名
`-keystore` 指定之前生成的秘钥文件的文件名

会在指定目录下生成`sslherin.cer`文件

3. 导入证书（导入到JDK的证书库才能使用）

找到自己环境java安装目录

```
sudo keytool -import -alias casserver -keystore /Library/Java/JavaVirtualMachines/jdk-13.0.1.jdk/Contents/Home/lib/security/cacerts -file Desktop/sslherin.cer -trustcacerts


# 1.8_211
sudo keytool -import -alias casserver -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home/jre/lib/security/cacerts -file ~/Desktop/cas.cer -trustcacerts



```

> 可以使用 /usr/libexec/java_home -V查看安装真路径
将证书导入到JDK信任库
把原来的`cacerts`文件先删掉（建议先备份），否则会报错`keytool 错误: java.io.IOException: Keystore was tampered with, or password was incorrect`


4. 修改hosts文件

``` bash
vi /etc/hosts
127.0.0.1 server.cas.com
127.0.0.1 app1.cas.com
127.0.0.1 app2.cas.com
```


### 服务器搭建（ubuntu）

方案：`SSL` + `Nginx` + `CAS5.3`

#### 第一步： 搭建 `CAS Service`

1. 从github拉取模板 `https://github.com/apereo/cas-overlay-template/tree/5.3`（clone好慢，直接下载zip包）

``` bash
git clone -b 5.3 https://github.com/apereo/cas-overlay-template.git
```

> 5.3 是 5.x最后一个版本，使用maven构建，JDK版本是1.8+；而之后的6.x版本，使用gradle构建，而且JDK需要11+

2. 拉取的代码是没有 `overlays`文件夹的，拖入 `idea` 后，会导入`org.apereo.cas.cas-server-webapp-tomcat-5.3.16`文件，前提需要配置好 `maven`环境

3. 在` cas-overlay-template` 项目根目录下新建 `src/main/resources` 目录

``` bash
mkdir -p src/main/resources
```

4. 将 `overlays/org.apereo.cas.cas-server-webapp-tomcat-5.3.16/WEB-INF/classes/application.properties`拷贝到 `src/main/resources/`路径下

``` bash
cp overlays/org.apereo.cas.cas-server-webapp-tomcat-5.3.16/WEB-INF/classes/application.properties src/main/resources/
```

5. `application.properties` 注释掉`SSL`相关代码，因为证书配置在`nginx`即可

``` bash
##
# CAS Server Context Configuration
#
server.context-path=/cas
server.port=8443

# server.ssl.key-store=file:/etc/cas/thekeystore
# server.ssl.key-store-password=changeit
# server.ssl.key-password=changeit

server.max-http-header-size=2097152
server.use-forward-headers=true
server.connection-timeout=20000
server.error.include-stacktrace=ALWAYS
```

6. 配置nginx

``` 
server{
        listen 80;
        server_name cas.yourexample.com;
        location / {
                proxy_pass http://127.0.0.1:8443;
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
    listen 443 ssl;
    ssl_certificate /etc/nginx/cert/yourSSL.pem;
    ssl_certificate_key /etc/nginx/cert/yourSSL.key;
}
```

7. 启动应用

``` bash
# 启动
./build.sh run
# 或后台启动
nohup ./build.sh run &
```

> 启动过程中，会报错，但是不用管，如果看到 READY 图标，就表示启动成功

8. 访问服务

浏览器输入`https://cas.yourexample.com/cas/login`，即可看到CAS默认页面，输入默认用户名密码即可登录。至此服务端初步搭建完成。


::: WARNING 人工填坑
在配置证书的时候，有几个坑


> 了解证书相关： https://help.aliyun.com/product/28533.html?spm=a2c4g.11186623.6.540.4fb3d39e3J1Nn2

1. 若按照上面的步骤，则不需要再在项目中导入关于tomcat的jks证书

2. 若还想在项目中导入证书，则以下方案择其一选择

方案一：

> 申请的阿里云SSL证书提供多个证书下载，例如 `Nginx` 、`IIS`、 `JKS`等。选择`JKS`类型下载，注意压缩包里面有配套的密码。

> 将JKS证书拷贝到与application.properties的同级目录

> 修改 `application.properties`相关

```
server.ssl.key-store=classpath: yourJKS.jks # 下载的证书名
server.ssl.key-store-password=xxxxxx # 下载的配套密码
server.ssl.key-password=xxxxxx # 下载的配套密码
#server.ssl.key-store-type=JKS
```


方案二：

> 证书转化命令：https://developer.aliyun.com/article/713812

> 自己转化，将 pem证书转化，转化的时候需要输入密码，则此时`application.properties`文件的密码不再是下载的密码，以你输入的为准。

如果密码不匹配则在启动应用的时候，会报下面的错误：
`Caused by: java.io.IOException: keystore password was incorrect`
`Caused by: java.security.UnrecoverableKeyException: failed to decrypt safe contents entry: javax.crypto.BadPaddingException: Given final block not properly padded. Such issues can arise if a bad key is used during decryption.`


执行完上面任意一个方案之后，此时很关键的一步：proxy_pass的协议一定要改成 `https`!
坑惨了有木有！否则访问的时候会报 `Bad Request - This combination of host and port requires TLS. `，这个问题让我苦找了一星期。
推测是转发8443的时候，你的应用是`https`启动了，但nginx还是转发到`http`这个协议上。

``` 
server{
        listen 80;
        server_name cas.yourexample.com;
        location / 
                proxy_pass https://127.0.0.1:8443;
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
    listen 443 ssl;
    ssl_certificate /etc/nginx/cert/yourSSL.pem;
    ssl_certificate_key /etc/nginx/cert/yourSSL.key;
}
```

:::








2. 在` cas-overlay-template` 项目中，新建 `src/main/resources` 目录，并将 `overlays/org.apereo.cas.cas-server-webapp-tomcat-5.3.16/WEB-INF/classes/application.properties` 文件和刚刚生成的 `sslherin.keystore` 文件拷贝进来

3. 修改 `application.properties`

```
server.ssl.key-store=classpath:keystore
server.ssl.key-store-password=herin123
server.ssl.key-password=herin123
```

4. 执行 `nohup ./build.sh run &` 后台启动

> 启动过程中，也可能会报错，但是不用管，如果看到 READY 图标，就表示启动成功

5. 启动成功后，在浏览器输入 `https://cas.chemputer.top:8443/cas/login`即启动成功，输入配置的用户名密码即可访问



服务端部署：

参考资料地址 `https://developer.aliyun.com/article/713812`

1. 找到申请好的pem和key文件

``` bash
cd /etc/nginx/cert
```
2.  将pem文件（包括证书和私钥）转换成pk12格式文件：

``` bash
openssl pkcs12 -export -in herinapp.com.pem -inkey herinapp.com.key -out lsl_herinapp.pk12 -name tomcat_herinapp
```
> 回车之后需要输入密码： herin123

3. 生成keystore(再将证书由.p12格式转换成.jks格式)

``` bash
keytool -importkeystore -srckeystore lsl_herinapp.pk12 -srcstoretype PKCS12 -deststoretype JKS -destkeystore lsl_herinapp.jks
```
或
``` bash
 keytool -importkeystore -srckeystore lsl_herinapp.jks -destkeystore lsl_herinapp.jks -deststoretype pkcs12
```




#### 第二步：搭建 `CAS Client` 

某`Client`需要接入 `CAS Server`进行验证，则该 `Client` 必须提前在 `CAS Server` 上配置其信息

1. 配置信息方式：





启动可能的报错：

1. `javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target`

> 在jdk环境中导入生成的证书
> 还有可能：注意看自己idea的JDK home path: /Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home
我的mac上装了一个
/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
1.8一直指向这个路径，以至于我一直以为证书有问题，搞了好久！


2. `java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty`



#### 第三步：搭建 `CAS Client` 



### 第四步：`CAS Client`接入 `CAS Server`

- JAVA解决方案


- NODE解决方案


#### 第五步：对接数据库


#### 第六步：修改CAS默认界面












