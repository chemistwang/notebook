# 配置http2

鉴于 `http2` 协议的诸多优点，想升级一下自己的静态网页。

官方 `Nginx` 默认不包含h2模块，需要加入参数编译

1. 查看编译模块, 发现只有 `ssl` 模块

``` bash {6}
[root@smartcentos ~]# nginx -V
nginx version: nginx/1.20.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC)
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --with-http_ssl_module
```

2. 编译 `--with-http_v2_module` 模块

``` bash
cd /opt/module/nginx-1.20.1 # 找到安装地址
./configure --help # 查看是否支持 --with-http_v2_module 
./configure --with-http_v2_module --with-http_ssl_module # 别忘记之前添加的模块
gmake && gmake install
```

3. 检查

``` bash {6}
[root@smartcentos nginx-1.20.1]# nginx -V
nginx version: nginx/1.20.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC)
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --with-http_v2_module --with-http_ssl_module
```

4. 修改 `nginx.conf`

```

```

``` bash
openssl version # 查看openssl版本
OpenSSL 1.0.2k-fips  26 Jan 201
```