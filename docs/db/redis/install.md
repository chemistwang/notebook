# 安装

[官方网站](https://redis.io/)

## 1. 下载

```
wget https://download.redis.io/releases/redis-6.2.4.tar.gz
```

## 2. 解压到指定文件夹

``` bash
tar -zxvf redis-6.2.4.tar.gz -C /opt/module
```

## 3. 编译

``` bash
cd /opt/module/redis-6.2.4
make
```

## 4. 确认

``` bash
make install
cd src && make install
make[1]: 进入目录“/opt/module/redis-6.2.4/src”

Hint: It's a good idea to run 'make test' ;)

    INSTALL redis-server
    INSTALL redis-benchmark
    INSTALL redis-cli
make[1]: 离开目录“/opt/module/redis-6.2.4/src”
```

## 5. 创建日志文件

``` bash
mkdir /var/log/redis
touch /var/log/redis/redis-server.log
```

## 6. 修改配置文件

``` bash
# 先做备份
cp /opt/module/redis-6.2.4/redis.conf /opt/module/redis-6.2.4/redis.conf/redis.conf.bak
# 修改配置文件
vi /opt/module/redis-6.2.4/redis.conf

# 开启后台运行
# daemonize no
daemonize yes

# 设置日志文件路径
#logfile ""
logfile /var/log/redis/redis-server.log

```

## 7. 启动

redis默认安装路径为 `/usr/local/bin`

``` bash
redis-server /opt/module/redis-6.2.4/redis.conf
```


## 8. 查看端口

``` bash
ps -ef|grep redis
root     32517     1  0 09:51 ?        00:00:00 redis-server 127.0.0.1:6379
root     32765 25195  0 09:53 pts/1    00:00:00 grep --color=auto redis
```