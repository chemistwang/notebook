# 简介

## 传统开发的问题

1. 需要手工管理很多模块
2. 需要手动获取依赖的 `JAR` 包
3. 需要管理 `JAR` 包版本
4. 需要管理 `JAR` 之间的依赖

> 若项目非常庞大，则不适合继续使用package划分模块，最好每一个模块对应一个工程，利于分工协作

## 是什么

`Maven`是一款服务于java平台的自动化构建工具

1. 可以将一个项目拆分多个工程
2. 规范方式下载 `JAR` 包和文档，内容可靠
3. 管理 `JAR` 包依赖
4. 编程程序
5. 测试代码是否正确
6. 打包 `JAR` 包 或 `WAR` 包
7. 部署项目


## 构建

构建是面向过程的，就是一些步骤。

1. 清理: 将之前编译得到class字节码文件删除 
2. 编译: `.java`编译为`.class`
3. 测试: 自动测试，自动调用`Junit`
4. 报告: 测试程序执行的结果
5. 打包: 动态web工程打war包，java工程打jar包
6. 安装: Maven特定概念，将打包得到的文件复制到”仓库“中的指定位置
7. 部署: 将动态web工程生成的war包复制到servlet容器指定目录下，使其可以运行（一般手动部署或用自动化工具）

## 核心概念

1. POM(项目对象模型)

一个文件，名称是`pom.xml`，maven把一个项目当作一个模型使用。用来控制`maven`构建项目的过程，管理`jar`依赖。

|  基本信息   |   |
|  ----  | ----  |
| modelVersion  | Maven模型对版本，对于Maven2和Maven3来说，它只能是4.0.0 |
| groupId  | 组织id，一般是公司域名倒写、域名倒写加项目名 |
| artifactId  | 项目名称、模块名称，对应groupId中项目的子项目 |
| version  | 项目版本号，若是不稳定版本，通常有 `-SNAPSHOT` |
| packaging  | 项目打包类型，可以是 `jar`,`war`,`rar`,`ear`,`pom`，默认是 `jar` |

> `GAV(groupId + artifactId + version)` 又称 **坐标**，在互联网上用来标识唯一的项目

|  依赖   |   |
|  ----  | ----  |
|  dependencies/dependency  | 依赖的`jar`包在此配置 |

|  配置属性   |   |
|  ----  | ----  |
|  properties  | 定义配置属性 |

|  构建   |   |
|  ----  | ----  |
|  build  | 构建相关配置 |

|  继承   |   |
|  ----  | ----  |
|  parent  | 有类似`Java`的继承机制，用parent声明要继承的父工程pom配置 |

|  聚合   |   |
|  ----  | ----  |
|  modules  |  |


2. 约定的目录结构

`maven`项目的目录和文件的位置都是规定的。

![maven目录结构](http://cdn.chemputer.top/notebook/maven/1.jpg)

``` bash
# 说明
src：源代码
main: 主程序
java: 主程序的java源码
resources: 主程序的配置文件
```

3. **坐标**

一个唯一的字符串，用来表示资源。

4. **依赖**

管理项目可以使用的JAR包

5. **仓库**

资源存放位置

::: tip 修改仓库位置
mac系统，如果是通过brew安装可以对 `/usr/local/Cellar/maven/3.6.3/libexec/conf/settings.xml` 文件进行修改

``` xml
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
```
:::

::: tip 分类
- 本地仓库：本机资源存储位置
- 远程仓库
    - 中央仓库：最权威
    - 中央仓库镜像：中央仓库备份
    - 私服：局域网内部署，eg: `Nexus`
:::


6. 生命周期

maven工具构建项目的过程

7. 插件和目标

插件：执行maven构建的时候用的工具

8. 继承
9. 聚合 

## 常用命令

1. `mvn clean`:  清理（会删除target目录） 
2. `mvn compile`:  编译主程序（在当前目录生产target目录，里面存放编译之后的字节码文件）
3. `mvn test-compile`:   编译测试程序 
4. `mvn test`:  执行测试 
5. `mvn package`: 打包 
6. `mvn install`: 安装主程序（会把本工程打包，并按照本工程坐标保存到本地仓库）


## 结合IDEA说明

在idea中内置了maven，不过一般不实用内置的，因为修改maven的设置不方便。使用自己安装的maven，需要覆盖idea中的默认设置。

![idea配置](http://cdn.chemputer.top/notebook/maven/2.jpg)