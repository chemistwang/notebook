# pgagent 的使用

### ubuntu

1. 安装

``` bash
apt-get install pgagent
```


2. 进入数据库执行

``` sql
CREATE EXTENSION pgagent;
```

3. 执行

``` bash
/usr/bin/pgagent hostaddr=127.0.0.1 dbname=demo user=postgres password=chemputer123
```

4. 
