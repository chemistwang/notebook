# 安装

## linux

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