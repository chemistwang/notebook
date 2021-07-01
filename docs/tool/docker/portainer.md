# Portainer

[官方地址](https://www.portainer.io/)

管理docker的图形化界面

portainer是一个轻量级管理UI

## 安装

- Docker

[参考地址](https://documentation.portainer.io/v2.0/deploy/ceinstalldocker/)

## 启动

``` bash
docker run \
-d \
-p 9000:9000 \
--name portainer \
--restart always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /root/portainer-volumes:/data \
portainer/portainer
```

[参考地址](http://www.senra.me/docker-management-panel-series-portainer/)