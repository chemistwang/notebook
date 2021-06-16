# 安装


::: tip
强烈推荐使用源码编译安装，这样后面添加模块的时候会非常方便。
:::

centos7.4

1. 下载

``` bash
wget http://nginx.org/download/nginx-1.20.1.tar.gz
```

2. 解压

tar -zxvf nginx-1.20.1.tar.gz -C /opt/module

3. 编译

``` bash
cd /opt/module/nginx-1.20.1/
./configure
make
make install
```

4. 修改相应配置文件

``` bash
cd /usr/local/nginx/conf
```

5. 启动nginx

``` bash
cd /usr/local/nginx/sbin
./nginx
```

6. 查看服务是否启动成功

``` bash
[root@VM-4-5-centos sbin]# ps -ef | grep nginx
root      9826     1  0 22:23 ?        00:00:00 nginx: master process ./ngin
nobody    9827  9826  0 22:23 ?        00:00:00 nginx: worker process
root      9842  9132  0 22:23 pts/1    00:00:00 grep --color=auto nginx
```