# Azkaban

## 是什么

Azkaban是由`Linkedin`公司推出的一个批量工作流任务调度器，主要用于在一个工作流内一个特定的顺序运行一组工作和流程，它的配置是通过简单的 `key:value` 对的方式，通过配置中的 `Dependencies` 来设置依赖关系， `Azkaban` 使用 job 配置文件建立任务之间的依赖关系，并提供一个易于使用的web用户界面维护和跟踪你的工作流。

## 为什么需要工作流调度系统

1. 一个完整的数据分析系统通常是由大量任务单元组成

Shell脚本程序，Java程序，MapReduce程序，Hive脚本等

2. 各任务单元之间存在时间先后及前后依赖关系

3. 为了很好的组织复杂的执行计划，需要一个工作流调度系统来调度执行

## 特点

1. 兼容任何版本的hadoop
2. 易于使用的web用户界面
3. 简单的工作流的上传
4. 方便设置任务之间的关系
5. 调度工作流
6. 模块化和可插拔的插件机制
7. 认证/授权（权限的工作）
8. 能够杀死并重新启动工作流
9. 有关失败和成功的电子邮件提醒

## 常见的工作流调度系统

1. 简单任务调度，直接使用 `crontab` 实现
2. 复杂的任务调度， 开发调度平台或使用现成的开源调度系统，eg: `ooize`, `azkaban` 等

## 架构

1. `Azkaban WebServer`: 整个 Azkaban 工作流系统的主要管理者，用户登录认证，负责project管理，定时执行工作流，跟踪工作流执行进度等一系列任务。
2. `Azkaban Executor Server`: 负责具体的工作流的提交、执行、通过 mysql 数据库来协调任务的执行
3. `关系型数据库（MySQL）`: 存储大部分执行流状态，`Azkaban WebServer` 和  `Azkaban ExecutorServer` 都需要访问数据库

## 三种部署模式

1. solo server mode

该模式中 `WebServer` 和 `Executor Server` 运行在同一个进程中。进程名是 `AzkabanSingleServer`。使用自带的`H2数据库`。这种模式包含 `Azakaban` 的所有特性，但一般用来 `学习和测试`。

2. two-server mode

该模式使用 `MySQL` 数据库，`Web Server` 和 `Executor Server` 运行在不同的进程中。

3. multiple-executor mode

该模式使用 `MySQL` 数据库，`Web Server` 和 `Executor Server` 运行在不同的进程中。且有多个 `Executor Server`，该模式适用于大规模应用。

## 编译

Azkaban3.x在安装前需要自己编译成二进制包。

需要注意的是不同版本的 `Azkaban` 依赖 `Gradle` 版本不同，可以在解压之后的 `/gradle/wrapper/gradle-wrapper.properties` 查看。

1. 下载对应grale包

在编译时程序会自动去图中所示的地址进行下载，但是下载速度很慢。为避免影响编译过程，建议先手动下载至 /gradle/wrapper/ 目录下：

``` bash
# wget https://services.gradle.org/distributions/gradle-4.6-all.zip
```

2. 修改配置文件

然后修改配置文件 gradle-wrapper.properties 中的 distributionUrl 属性，指明使用本地的 gradle。

```
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
# distributionUrl=https\://services.gradle.org/distributions/gradle-4.6-all.zip
distributionUrl=gradle-4.6-all.zip
```

3. 编译

在根目录下执行编译命令，编译成功后会有 BUILD SUCCESSFUL 的提示：

``` bash
./gradlew build installDist -x test
```

## 部署 

- Solo server mode 部署

1. 解压

`Solo Server` 模式安装包在编译后的 `/azkaban-solo-server/build/distributions`目录下。上传至服务器解压即可：

``` bash
# 解压至/opt/module文件夹下
tar -zxvf azkaban-solo-server-0.1.0-SNAPSHOT.tar.gz -C /opt/module
```

2. 修改时区

这一步不是必须的。但是因为 Azkaban 默认采用的时区是 `America/Los_Angeles`，如果你的调度任务中有定时任务的话，就需要进行相应的更改，这里我更改为常用的 `Asia/Shanghai`

``` bash
vi /opt/module/azkaban-solo-server-0.1.0-SNAPSHOT/conf/azkaban.properties
```


```
# default.timezone.id=America/Los_Angeles
default.timezone.id=Asia/Shanghai
```

3. 启动

``` bash
/opt/module/azkaban-solo-server-0.1.0-SNAPSHOT/bin/start-solo.sh
```

这个时候发下服务并没有启动，查看 `opt/module/azkaban-solo-server-0.1.0-SNAPSHOT/soloServerLog__2021-02-07+11:51:02.out` 日志发现报错：

```
Exception in thread "main" java.lang.NoClassDefFoundError: Could not initialize class org.apache.derby.jdbc.AutoloadedDriver40
        at java.lang.Class.forName0(Native Method)
        at java.lang.Class.forName(Class.java:348)
        at java.sql.DriverManager.isDriverAllowed(DriverManager.java:556)
        at java.sql.DriverManager.isDriverAllowed(DriverManager.java:548)
        at java.sql.DriverManager.getDrivers(DriverManager.java:446)
        at org.apache.commons.dbcp2.BasicDataSource.<clinit>(BasicDataSource.java:81)
        at azkaban.database.DataSourceUtils.getH2DataSource(DataSourceUtils.java:75)
        at azkaban.database.DataSourceUtils.getDataSource(DataSourceUtils.java:56)
        at azkaban.database.AzkabanDatabaseSetup.<init>(AzkabanDatabaseSetup.java:78)
        at azkaban.database.AzkabanDatabaseUpdater.runDatabaseUpdater(AzkabanDatabaseUpdater.java:81)
        at azkaban.soloserver.AzkabanSingleServer.start(AzkabanSingleServer.java:93)
        at azkaban.soloserver.AzkabanSingleServer.main(AzkabanSingleServer.java:58)
```

**原因**： 在azkaban的server和executor中缺少一个叫`derby.jar`的包。

**解决方案**：下载 `https://mvnrepository.com/artifact/org.apache.derby/derby/10.14.2.0` jar包，放置在 `/opt/module/azkaban-solo-server-0.1.0-SNAPSHOT/lib` 目录下，重新启动。

4. 验证

**验证方式一**：使用 jps 命令查看是否有 AzkabanSingleServer 进程：

``` bash
/opt/module/azkaban-solo-server-0.1.0-SNAPSHOT/lib # jps                                                                    root@hadoop
13104 AzkabanSingleServer
4261 JournalNode
13223 Jps
5145 NameNode
5418 DFSZKFailoverController
5259 DataNode
21357 NodeManager
31934 RunJar
4078 QuorumPeerMain
```

**验证方式二**：访问 8081 端口，查看 Web UI 界面，默认的登录名密码都是 `azkaban`，如果需要修改或新增用户，可以在 `conf/azkaban-users.xml` 文件中进行配置：





