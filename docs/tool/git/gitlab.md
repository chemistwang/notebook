# Gitlab

[官网地址](https://about.gitlab.com/)

## 安装

### Ubuntu

[官网安装地址](https://about.gitlab.com/install/#ubuntu)

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

3. 修改配置文件

``` bash
vi /etc/gitlab/gitlab.rb
```


### CentOS

...


## 配置文件路径

``` bash
/etc/gitlab/gitlab.rb # gitlab配置文件

/var/opt/gitlab/backups # 备份默认目录
```

[参考地址](https://cloud.tencent.com/developer/article/1139779)


## Gitlab服务构成

[参考地址](https://www.cnblogs.com/niuben/p/10867877.html)

- Nginx：静态web服务器。
- gitlab-shell：用于处理Git命令和修改authorized keys列表。
- gitlab-workhorse: 轻量级的反向代理服务器。
- logrotate：日志文件管理工具。
- postgresql：数据库。
- redis：缓存数据库。
- sidekiq：用于在后台执行队列任务（异步执行）。
- unicorn：An HTTP server for Rack applications，GitLab Rails应用是托管在这个服务器上面的。


## 常用命令

``` bash

cat /opt/gitlab/embedded/service/gitlab-rails/VERSION # 查看版本号

gitlab-ctl start # 启动所有 gitlab 组件；

gitlab-ctl stop # 停止所有 gitlab 组件；

gitlab-ctl restart # 重启所有 gitlab 组件；

gitlab-ctl status # 查看服务状态；

gitlab-ctl reconfigure # 启动服务；

```


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

从服务状态信息中显示数据库 gitlab-workhorse 的状态是 `down`，即服务停止

``` bash
gitlab-ctl tail gitlab-workhorse
```