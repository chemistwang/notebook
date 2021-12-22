# 部署流程

## 1. 创建表空间

用 `sys` 用户以 `SYSDBA` 角色登录

``` sql
CREATE tablespace TS_DW_DATA_D_1 datafile 'TS_DW_DATA_D_1' SIZE 20M;
CREATE tablespace USERS datafile 'USERS' SIZE 20M;
```

## 2. 创建用户


``` sql
-- 用户名 oracleUser 密码 oracleUser123 表空间 TS_DW_DATA_D_1
CREATE USER DW_DATA IDENTIFIED BY demo123 DEFAULT tablespace TS_DW_DATA_D_1;
CREATE USER DBA_G IDENTIFIED BY demo123 DEFAULT tablespace USERS;
```


## 3. 分配授权

``` sql
GRANT CONNECT,resource,dba TO DW_DATA
GRANT CONNECT,resource,dba TO DBA_G
```


::: tip 常用查询

``` sql
-- 查看实例名
select instance_name from v$instance;

-- 查看数据库名
select name from v$database;

-- 查看用户
SELECT * FROM dba_users;

-- 查看当前用户角色权限
SELECT * FROM role_sys_privs;

-- 查看当前用户详细信息
SELECT * FROM user_users
```

:::