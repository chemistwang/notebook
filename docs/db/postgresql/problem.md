# 遇到的问题

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