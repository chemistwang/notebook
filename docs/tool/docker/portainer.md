# portainer

管理docker的图形化界面

portainer是一个轻量级管理UI


# 启动

```
docker run -d \
-p 9000:9000 \
-d 
--name portainer \
--restart always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /root/portainer-volumes:/data \
portainer/portainer
```

