### 前言

搜索一下招聘信息，根据所需要的专业技能和任职条件来学习

专业技能：
1. 熟悉网络的日常维护和管理
2. 熟悉mysql的主从架构和读写分离
3. 掌握自动化运维工具docker，编写dockerfile脚本
4. 精通ansible自动运维工具，实现代码批量分发
5. 熟练编写shell脚本
6. 熟练使用zabbix监控mysql nginx
7. 精通elk日志分析，redis集群，gitlab
8. 熟悉linux服务器高可用，web服务器（nginx tomcat， apache）
9. 熟悉python，Django框架，c语言基础语法
10. 熟悉常用的负载均衡高可用技术 eg lvs nginx haproxy
11. 熟悉k8s部署和管理，熟悉项目迁移k8s流程


### 项目

项目一：Jenkins/Docker自动化系统部署
项目描述：
    结合jenkins和docker实现项目的自动化编译，部署，发布，回滚等操作，本项目中用到了jenkins，docker，gitlab，ansible，通过将业务封装为docker镜像，再通过启动docker镜像等方式实现服务的启动和发布
项目职责：
    1. docker搭建公司私有镜像仓库，拉取镜像
    2。 搭建jenkins，gitlab部署环境
    3. jenkins配置使用gitlab创建项目
    4. 使用shell脚本实现上传代码
    5. 对docker自动化系统进行后期维护

项目二：java项目迁移k8s容器云【亮点】
项目描述：
    因为业务发展，需要将现有运行在物理机中的业务迁移到k8s环境中，其中主要以java项目为主，项目基本流程包括：
    1. 首先部署本地docker镜像存储仓库，选择的是harbor
    2. 然后开始制作镜像，包括基础镜像，java运行环境镜像
    3. 与开发沟通，拿到项目代码，将项目代码构建到运行环境镜像，生成项目镜像
    4. 将项目镜像推送到harbor，并通过k8s启动镜像
    5. 在k8s中发布应用
    6. 项目版本迭代即重复以上过程
    7。 k8s根据需求自动扩容，出现异常快速回滚

项目职责：
1. 编写dockerfile文件
2. 打包制作三类镜像
3. 部署docker harbor
4. 编写项目相关yaml文件
5. 测试，维护k8s中的pod状态

### 感想

其实呀，在搭建了一个小型的`Kubernetes`集群之后，我才初步感受到容器化的强大，在一个`Docker`中跑一个服务确实方便，但容器集群的调度才将这项技术的潜力发挥的淋漓尽致。


### 测试

可以根据以下来任务职责测试自己是否达标

- 。。。
- 。。。