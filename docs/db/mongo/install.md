# 安装

## Ubuntu

### apt工具安装

1. 查看linux版本

``` shell
ubuntu@VM-0-15-ubuntu:~$ lsb_release -a
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 18.04.1 LTS
Release:	18.04
Codename:	bionic
```

2. 按步骤执行 `（Ubuntu 18.04.1 LTS）`

``` shell
1. wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
2. echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
3. sudo apt-get update
4. sudo apt-get install -y mongodb-org
5. 不想更新可执行
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
6. sudo service mongod start //启动
7. sudo service mongod status //检查mongod状态
8. sudo service mongod stop //停止
9. sudo service mongod restart //重启
10. mongo //进入mongo shell
11. pgrep mongo -l //查看进程
```

### 源码包安装

1. 根据ubuntu版本信息选择合适的依赖

``` bash
sudo apt-get install libcurl3 openssl liblzma5
```

2. 下载

``` bash
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-4.4.6.tgz
```

3. 解压

```bash
tar -zxvf mongodb-linux-x86_64-ubuntu1604-4.4.6.tgz -C /opt/module
# 修改下文件夹名
mv mongodb-linux-x86_64-ubuntu1604-4.4.6 mongodb
```

4. 创建软链接

```bash
sudo ln -s /opt/module/mongodb/bin/* /usr/local/bin
```


5. 创建数据日志文件夹

```bash
# 创建mongo数据日志文件夹
sudo mkdir -p /var/lib/mongo
sudo mkdir -p /var/log/mongodb

useradd mongod # 创建用户
sudo chown -R mongod:mongod /var/lib/mongo
sudo chown -R mongod:mongod /var/log/mongodb
```

6. 启动

```bash
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
```

7. 检查进程和端口

``` bash
pgrep mongo -l                                                          
184614 mongod
```
``` bash
ps -ef | grep mongo       
root     184614      1  0 10:49 ?        00:00:14 mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
root     185379 185331  0 11:20 pts/1    00:00:00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn --exclude-dir=.idea --exclude-dir=.tox mongo
```

8. 创建配置文件

通过源码包安装是没有默认的 `mongod.conf` 文件，需要手动创建

[官网基础配置项](https://docs.mongodb.com/manual/administration/configuration/#std-label-base-config)


```bash
touch /opt/module/mongodb/mongod.conf
```


```yaml
processManagement:
   fork: true
net:
   bindIp: 127.0.0.1
   port: 27017
storage:
   dbPath: /var/lib/mongo
systemLog:
   destination: file
   path: "/var/log/mongodb/mongod.log"
   logAppend: true
storage:
   journal:
      enabled: true
security:
   authorization: enabled
setParameter:
   enableLocalhostAuthBypass: false # 这个选项在创建用户的时候不用做校验
```

```bash
sudo chown -R mongod:mongod /opt/module/mongodb/mongod.conf
```


9. 关闭服务重启

```bash
mongod --shutdown
There doesn't seem to be a server running with dbpath: /data/db
```
需要指定数据存放路径

```bash
mongod --shutdown --dbpath /var/lib/mongo
```

```bash
mongod --config /opt/module/mongodb/mongod.conf
about to fork child process, waiting until server is ready for connections.
forked process: 185572
child process started successfully, parent exiting
```


10. 使用 `systemctl` 管理 `mongod`


创建 `mongod.service` 文件

```bash
touch /lib/systemd/system/mongod.service

```

``` bash
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target
Documentation=https://docs.mongodb.org/manual

[Service]
User=mongod
Group=mongod
ExecStart=/usr/local/bin/mongod --quiet --config /opt/module/mongodb/mongod.conf --auth
ExecStop=/usr/local/bin/mongod --shutdown --config /opt/module/mongodb/mongod.conf
# file size
LimitFSIZE=infinity
# cpu time
LimitCPU=infinity
# virtual memory size
LimitAS=infinity
# open files
LimitNOFILE=64000
# processes/threads
LimitNPROC=64000
# locked memory
LimitMEMLOCK=infinity
# total threads (user+kernel)
TasksMax=infinity
TasksAccounting=false

# Recommended limits for for mongod as specified in
# http://docs.mongodb.org/manual/reference/ulimit/#recommended-settings

[Install]
WantedBy=multi-user.target
```


::: danger 问题未解决
很奇怪手动执行 ExecStart 后面的命令，mongo可以成功启动。但是执行 `systemctl start mongod` 就会失败
:::


## CentOS

[官方安装地址](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat-tarball/)

1. 需要先安装社区版所需要的依赖

``` bash
sudo yum install libcurl openssl xz-libs
```

2. 下载对应版本

``` bash
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.4.6.tgz
```

3. 解压到指定目录

``` bash
tar -zxvf mongodb-linux-x86_64-rhel70-4.4.6.tgz -C /opt/module/
```

4. 配置环境变量

``` bash
# 个人比较喜欢创建软连接
sudo ln -s /opt/module/mongodb-linux-x86_64-rhel70-4.4.6/bin/* /usr/local/bin/
```

5. 创建mongo相关目录

``` bash
sudo mkdir -p /var/lib/mongo   # mongo数据文件夹
sudo mkdir -p /var/log/mongodb # mongo日志文件夹
```

6. 为创建的目录设置用户组

``` bash
useradd mongod # 创建用户
sudo chown -R mongod:mongod /var/lib/mongo
sudo chown -R mongod:mongod /var/log/mongodb
```

7. 启动mongo

```bash
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
```