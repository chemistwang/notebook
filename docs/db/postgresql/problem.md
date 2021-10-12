# 遇到的问题

## 数据库删除失败

删除数据库

```bash
DROP DATABASE devbe;
```

如果是强制删除，则会有下面的报错

```shell
ERROR:  database "devbe" is being accessed by other users
DETAIL:  There are 10 other sessions using the database.
```

解决方案：断开连接到这个数据库上的所有链接，再删除数据库

执行

``` bash
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE datname='yourdbname' AND pid<>pg_backend_pid(); 
```

> - pg_terminate_backend：用来终止与数据库的连接的进程id的函数。
> - pg_stat_activity：是一个系统表，用于存储服务进程的属性和状态。
> - pg_backend_pid()：是一个系统函数，获取附加到当前会话的服务器进程的ID。

再执行

```
DROP DATABASE devbe;
```


## 异常关机导致数据库连不上

``` bash
# brew services list
postgresql        started chemputer /Users/yagao/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
redis             started chemputer /Users/yagao/Library/LaunchAgents/homebrew.mxcl.redis.plist
redis@4.0         stopped
unbound           stopped
zookeeper         started chemputer /Users/yagao/Library/LaunchAgents/homebrew.mxcl.zookeeper.plist
```

`postgresql` 的 `started` 状态为 `黄色`，表示异常

1. 查看日志文件

```bash
# vi /usr/local/var/log/postgres.log
2021-10-12 10:00:49.408 CST [4369] HINT:  Is another postmaster (PID 638) running in data directory "/usr/local/var/postgres"?
2021-10-12 10:00:59.428 CST [4389] FATAL:  lock file "postmaster.pid" already exists
```

2. 找到 `postmaster.pid` 文件并删除

``` bash
rm /usr/local/var/postgres/postmaster.pid
```

3. 重启服务

``` bash
brew services restart postgresql
```