# SQOOP

## 简介

sql to hadoop

Sqoop是一款开源工具，主要用于Hadoop(Hive)与传统的数据库(mysql、postgresql)间进行数据传递，可以将一个关系型数据库中的数据导入到Hadoop的HDFS中，也可以将HDFS中的数据导入到关系数据库中。

Sqoop项目开始于2009年，最早是作为Hadoop一个第三方模块存在，后来为了让使用者能够快速部署，也让开发人员更快速的迭代开发，Sqoop独立成为一个Apache项目。

Sqoop2最新版本1.99.7。2与1不兼容并且特征不完整，目前并不打算用于生产部署。

## 原理

将导入或导出命令翻译成mapreduce程序来实现。
在翻译出的mapreduce中主要对`inputformat`和`outputformat`进行定制。

## 安装

安装Sqoop的前提是已经具备Java和Hadoop的环境

[下载地址]("https://downloads.apache.org/sqoop/1.4.7/sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz")

1. 修改配置文件

``` bash
vi /opt/module/sqoop-1.4.7.bin__hadoop-2.6.0/conf/sqoop-env-template.sh
```

2. 拷贝JDBC驱动

``` bash
mv postgresql-42.2.2.jar /opt/module/sqoop-1.4.7.bin__hadoop-2.6.0/lib
```


3. 验证Sqoop

``` bash
bin/sqoop help
```

4. 测试Sqoop是否能够成功连接数据库

``` bash
bin/sqoop list-databases --connect jdbc:postgresql://192.168.0.35:5432/postgres --username postgres --password chemputer123
```

出现如下输出

``` bash
postgres
yagao
template1
template0
gisdb
devbe
sso
chemputerdemo
kettle
```


## 简单使用案例

### 导入数据

在Sqoop中，”导入“概念指：从非大数据集群（RDBMS）向大数据集群（HDFS，HIVE，HBASE）中传输数据，即使用 `import` 关键字

- RDBMS -> HDFS

1. 全部导入

``` bash
bin/sqoop import \
--connect jdbc:postgresql://192.168.0.35:5432/postgres \
--username postgres \
--password chemputer123 \
--table access_car_flow \
--target-dir /wyl/demo \
--delete-target-dir \
--num-mappers 1 \
--fields-terminated-by "\t"
```

2. 查询导入

``` bash
bin/sqoop import \
--connect jdbc:postgresql://192.168.0.35:5432/postgres \
--username postgres \
--password chemputer123 \
--target-dir /wyl/demo \
--delete-target-dir \
--num-mappers 1 \
--fields-terminated-by "\t" \
--query 'select access_id from access_car_flow where access_id >= 10 and $CONDITIONS;'
```

::: tip
1. 在 `where` 语句中必须包含 `$CONDITIONS`
2. `--query` 和 `--table` 不要一起出现
3. 若 `--query` 后面使用的是双引号，则 `$CONDITIONS` 前面必须加转义符，防止 shell 识别为自己的变量
:::


3. 导入指定列

``` bash
bin/sqoop import \
--connect jdbc:postgresql://192.168.0.35:5432/postgres \
--username postgres \
--password chemputer123 \
--target-dir /wyl/demo \
--delete-target-dir \
--num-mappers 1 \
--fields-terminated-by "\t" \
--columns name,age \
--table student
```

::: tip
columns若涉及到多列，用逗号分隔，分隔时不要添加空格
:::


4. 使用sqoop关键字筛选查询导入数据

``` bash
bin/sqoop import \
--connect jdbc:postgresql://192.168.0.35:5432/postgres \
--username postgres \
--password chemputer123 \
--target-dir /wyl/demo \
--delete-target-dir \
--num-mappers 1 \
--fields-terminated-by "\t" \
--table student \
--where "id=1"
```

- RDBMS -> Hive

- RDBMS -> HBase


### 导出数据

在Sqoop中，”导出“指：从大数据集（HDFS，HIVE，HBASE）向非大数据集群（RDBMS）中传输数据，即使用 `export` 关键字

1. Hive/HDFS -> RDBMS



2. 

