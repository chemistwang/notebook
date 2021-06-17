# 安装

## Ubuntu

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