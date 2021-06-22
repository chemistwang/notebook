# 插件

grafana同样支持很多插件

## Redis

[官方文档地址](https://grafana.com/grafana/plugins/redis-datasource/)

1. 安装

``` bash
grafana-cli plugins install redis-datasource
```

2. 重启grafana服务

``` bash
sudo /bin/systemctl restart grafana-server
```

3. 面板中添加redis数据源


