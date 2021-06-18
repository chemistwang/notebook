# 安装

## CentOS

1. 下载

``` bash
wget https://github.com/prometheus/prometheus/releases/download/v2.27.1/prometheus-2.27.1.linux-amd64.tar.gz
```

2. 解压

``` bash
tar -zxvf prometheus-2.27.1.linux-amd64.tar.gz -C /opt/module/
```

3. 启动

``` bash
# & 代表后台运行，不占用终端窗口
cd /opt/module/prometheus-2.27.1.linux-amd64
./prometheus --config.file=prometheus.yml & 
```

4. 查看运行状态

``` bash
[root@VM-4-5-centos prometheus-2.27.1.linux-amd64]# ss -naltp | grep 9090
LISTEN     0      128       [::]:9090                  [::]:*                   users:(("prometheus",pid=17263,fd=8))
```

或者

``` bash
[root@VM-4-5-centos prometheus-2.27.1.linux-amd64]# lsof -i:9090
COMMAND     PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
prometheu 17263 root    3u  IPv6 8955573      0t0  TCP VM-4-5-centos:50748->VM-4-5-centos:websm (ESTABLISHED)
prometheu 17263 root    7u  IPv6 8955574      0t0  TCP VM-4-5-centos:websm->VM-4-5-centos:50748 (ESTABLISHED)
prometheu 17263 root    8u  IPv6 8955442      0t0  TCP *:websm (LISTEN)
```

5. 访问页面

通过 `http://yourIP:9090`可以查看默认监控页面
