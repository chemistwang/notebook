## 配置https免费证书

1. centos7.6 

``` bash
[root@VM-4-5-centos ~]# cat /etc/centos-release
CentOS Linux release 7.6.1810 (Core)
```

2. 

``` bash
yum install epel-release
```

3. 

``` bash
sudo yum install snapd
```

4. 

``` bash
[root@VM-4-5-centos ~]# sudo systemctl enable --now snapd.socket
Created symlink from /etc/systemd/system/sockets.target.wants/snapd.socket to /usr/lib/systemd/system/snapd.socket.
```


5. 

``` bash
sudo ln -s /var/lib/snapd/snap /snap
```

6. 

``` bash
sudo snap install core 
sudo snap refresh core
```


7. 
 
``` bash
[root@VM-4-5-centos ~]# snap install --classic certbot
Warning: /var/lib/snapd/snap/bin was not found in your $PATH. If you've not restarted your session
         since you installed snapd, try doing that. Please see https://forum.snapcraft.io/t/9469
         for more details.

certbot 1.16.0 from Certbot Project (certbot-eff✓) installed
```

8. 

``` bash
[root@VM-4-5-centos ~]# certbot certonly --nginx
Saving debug log to /var/log/letsencrypt/letsencrypt.log
The nginx plugin is not working; there may be problems with your existing configuration.
The error was: NoInstallationError("Could not find a usable 'nginx' binary. Ensure nginx exists, the binary is executable, and your PATH is set correctly.")
```

```
ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx
ln -s /usr/local/nginx/conf/ /etc/nginx
```

9. 

``` bash
[root@VM-4-5-centos ~]# certbot certonly --nginx
Saving debug log to /var/log/letsencrypt/letsencrypt.log
The nginx plugin is not working; there may be problems with your existing configuration.
The error was: PluginError('Nginx build is missing SSL module (--with-http_ssl_module).')
```

``` bash
[root@VM-4-5-centos ~]# nginx -V
nginx version: nginx/1.20.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC)
configure arguments:

# 没有安装ssl模板，在nginx目录中重新构建
[root@VM-4-5-centos ~]# cd /opt/module/nginx-1.20.1/
[root@VM-4-5-centos nginx-1.20.1]# ./configure --with-http_ssl_module
[root@VM-4-5-centos nginx-1.20.1]# make && make install
```


``` bash
[root@VM-4-5-centos nginx-1.20.1]# nginx -V
nginx version: nginx/1.20.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC)
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --with-http_ssl_module
```

10. 