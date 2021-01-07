# 安装 

## mac安装

```
initdb /usr/local/var/postgres #初始化数据库
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start # 启动数据库
psql postgres #进入默认数据库
```



## ubantu安装

```
1. apt-cache show postgresql
2. sudo apt-get install postgresql
3. psql --version
4. nmap 127.0.0.1
```
