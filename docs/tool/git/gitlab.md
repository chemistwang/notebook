# GitLab

[GitLab官网地址](https://about.gitlab.com/)

## 需求配置

GitLab官方对服务器配置有一定对要求，比如推荐 `4核CPU` 和 `4G内存` 

::: tip 参考资料
[官方需求配置](https://docs.gitlab.com/ee/install/requirements.html)
:::


## 安装

### Ubuntu

::: tip 参考资料
[Ubuntu官网安装地址](https://about.gitlab.com/install/#ubuntu)
:::


1. 安装配置必要依赖

``` bash
sudo apt-get update
sudo apt-get install -y curl openssh-server ca-certificates tzdata perl
```

如果需要发送通知邮件

``` bash
sudo apt-get install -y postfix
```

2. 添加gitlab包仓库并安装

``` bash
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
```

``` bash
apt-get install gitlab-ee
```


## 启动

1. 启动

``` bash
gitlab-ctl start
```

2. 查看日志

``` bash
gitlab-ctl tail
```

发现有几项服务报错

``` bash
## [分析] prometheus 端口被占用

==> /var/log/gitlab/prometheus/state <==

==> /var/log/gitlab/prometheus/current <==
2021-06-23_01:20:43.41663 level=info ts=2021-06-23T01:20:43.416Z caller=web.go:532 component=web msg="Start listening for connections" address=localhost:9090
2021-06-23_01:20:43.41702 level=error ts=2021-06-23T01:20:43.416Z caller=main.go:608 msg="Unable to start web listener" err="listen tcp 127.0.0.1:9090: bind: address already in use"


## [nginx] 端口被占用
==> /var/log/gitlab/nginx/error.log <==
2021/06/22 18:48:54 [emerg] 8157#0: invalid port in "*:" of the "listen" directive in /var/opt/gitlab/nginx/conf/gitlab-http.conf:36

==> /var/log/gitlab/nginx/state <==

==> /var/log/gitlab/nginx/current <==
2021-06-23_01:20:41.06646 2021/06/23 09:20:40 [emerg] 28393#0: bind() to 0.0.0.0:80 failed (98: Address already in use)


## [grafana] 端口被占用
==> /var/log/gitlab/grafana/current <==
2021-06-23_01:20:46.39111 failed to open listener on address localhost:3000: listen tcp 127.0.0.1:3000: bind: address already in use
```

3. 修改配置文件中的相应端口

``` bash
vi /etc/gitlab/gitlab.rb

#external_url 'GENERATED_EXTERNAL_URL'
external_url 'http://192.168.0.200'

# nginx['listen_port'] = nil
nginx['listen_port'] = 10001

# prometheus['listen_address'] = 'localhost:9090'
prometheus['listen_address'] = 'localhost:10002'

# grafana['http_port'] = 3000
grafana['http_port'] = 10003
```

当修改 `nginx['listen_port'] = 10001` 时，执行 `gitlab-ctl reconfigure` 会同步修改 `/var/opt/gitlab/nginx/conf/gitlab-http.conf` 的

``` conf
server {
  listen *:10001;

  server_name 192.168.0.200;
  #...
}
```

::: tip 参考资料
[官方配置地址](https://docs.gitlab.com/omnibus/settings/configuration.html)
:::



4. 重新加载配置文件并重启服务

``` bash
gitlab-ctl reconfigure
gitlab-ctl restart
```

5. 访问页面

访问 `http://yourIp:yourNginxPort` 登陆即可。可能需要等一会，服务启动需要几秒种时间。


### CentOS 【后续补充】



## 文件路径

使用什么数据库来存储 GitLab 数据
PostgreSQL数据库

``` bash
# GitLab
/etc/gitlab/gitlab.rb               # GitLab 配置文件
/opt/gitlab                         # GitLab 及所有组件配置
/var/opt/gitlab/git-data            # GitLab Repository 存储目录 
/var/opt/gitlab/backups             # GitLab 备份目录 
/var/log/gitlab                     # GitLab 各组件日志目录

# PostgreSQL组件
/var/opt/gitlab/postgresql          # PostgreSQL 安装目录
/var/log/gitlab/postgresql          # PostgreSQL 日志目录
/var/log/gitlab/postgres-exporter   # PostgreSQL-Exporter 日志目录
/var/opt/gitlab/postgresql/data     # PostgreSQL 数据目录

# Redis组件
/var/opt/gitlab/redis # Redis 安装目录
/var/log/gitlab/redis # Redis 日志目录
```

## 常用命令

``` bash
gitlab-ctl reconfigure # 重新加载配置项
gitlab-ctl start       # 启动所有 gitlab 组件
gitlab-ctl stop        # 停止所有 gitlab 组件
gitlab-ctl restart     # 重启所有 gitlab 组件
gitlab-ctl status      # 查看服务状态
gitlab-ctl show-config #查看gitlab配置信息
```

## GitLab服务构成

### 1. 查看版本号

``` bash
cat /opt/gitlab/embedded/service/gitlab-rails/VERSION # 查看版本号
13.12.4-ee
```

### 2. 服务启动项


| 服务项  | 功能  | 端口  | 访问路径  |  文档地址 | 说明 |
|---|---|---|---|---|---|
| alertmanager  |   |   |   |   
| gitaly |   |   |   |   
| gitlab-exporter  |   |   |   |   
| gitlab-workhorse   |   |   |   |   
| grafana  |   |   |   |   
| logrotate | 日志文件管理工具  |   |   |   
| nginx  | 静态web服务器 |   |   |   
| node-exporter  |   |   |   |   
| postgresql  | 数据库  |   |   |   
| postgres-exporter  |   |   |   |   
| prometheus  |   |   |   |   
| puma  |   |   |   | [puma文档](https://docs.gitlab.com/omnibus/settings/puma.html) |  官方提示从 `GitLab 14.0` 之后，`Puma` 将会取代 `Unicorn` | 
| redis  | 缓存数据库  |   |   |   
| redis-exporter  |   |   |   |   
| sidekiq  | 用于在后台执行队列任务(异步执行)  |   |   |   

## 检查定位问题

1. 查看所有服务状态

``` bash
gitlab-ctl status
run: alertmanager: (pid 13574) 15s; run: log: (pid 10640) 151513s
run: gitaly: (pid 13615) 14s; run: log: (pid 10013) 151616s
run: gitlab-exporter: (pid 13667) 13s; run: log: (pid 10544) 151529s
down: gitlab-workhorse: 1s, normally up, want up; run: log: (pid 10447) 151548s
run: grafana: (pid 13693) 12s; run: log: (pid 11246) 151456s
run: logrotate: (pid 13716) 12s; run: log: (pid 9932) 151626s
run: node-exporter: (pid 13802) 12s; run: log: (pid 10524) 151535s
run: postgres-exporter: (pid 13840) 11s; run: log: (pid 11073) 151507s
run: postgresql: (pid 13851) 11s; run: log: (pid 10169) 151608s
run: prometheus: (pid 13876) 10s; run: log: (pid 10593) 151519s
run: puma: (pid 13905) 9s; run: log: (pid 10358) 151560s
run: redis: (pid 13930) 9s; run: log: (pid 9962) 151620s
run: redis-exporter: (pid 13936) 9s; run: log: (pid 10562) 151525s
run: sidekiq: (pid 13996) 6s; run: log: (pid 10381) 151554s
```

2. 定位问题

从服务状态信息中显示数据库 `gitlab-workhorse` 的状态是 `down`，即服务停止。检查相关错误日志信息。

``` bash
gitlab-ctl tail gitlab-workhorse
```