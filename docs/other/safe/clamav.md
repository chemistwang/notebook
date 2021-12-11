# Clamav

[参考资料](https://blog.51cto.com/driver2ice/2432927)


## 安装

``` bash
# 下载
wget https://www.clamav.net/downloads/production/clamav-0.104.1.linux.x86_64.rpm

# 安装
rpm -ivh clamav-0.104.1.linux.x86_64.rpm

# 会被安装到 /usr/local/bin 目录下
```

## 新增用户

``` bash
groupadd clamav && useradd -g clamav clamav && id clamav
```

## 日志存放目录

``` bash
mkdir -p /usr/local/clamav/logs
touch /usr/local/clamav/logs/clamd.log
touch /usr/local/clamav/logs/freshclam.log
chown clamav:clamav /usr/local/clamav/logs/clamd.log
chown clamav:clamav /usr/local/clamav/logs/freshclam.log
```

## 病毒存放目录

``` bash
mkdir -p /usr/local/clamav/update
chown -R root:clamav /usr/local/clamav/
chown -R clamav:clamav /usr/local/clamav/update
```

## 配置clamav

``` bash
cd /usr/local/etc/
cp clamd.conf.sample clamd.conf
cp freshclam.conf.sample freshclam.conf
```

``` bash
vi clamd.conf
#注销Example 一行
#Example
#添加配置项
LogFile /usr/local/clamav/logs/clamd.log
PidFile /usr/local/clamav/update/clamd.pid
DatabaseDirectory /usr/local/clamav/update
```

``` bash
vi freshclam.conf
#注销Example 一行
#Example
#添加配置项
DatabaseDirectory /usr/local/clamav/update
UpdateLogFile /usr/local/clamav/logs/freshclam.log
PidFile /usr/local/clamav/update/clamd.pid
```

## 更新病毒库

``` bash
cd /usr/local/bin
./freshclam
```


## 扫毒

