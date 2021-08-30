# 命令

## postgresql

刚安装好 postgresql 时 postgres 用户是没有初始密码的。执行以下命令以 postgre 身份登陆数据库并修改密码：

```bash
sudo su postgres
psql -U postgres
alter user postgres with password 'new-password';
\q
```

查看所有数据库

```bash
\l
```

创建数据库

```bash
CREATE DATABASE devbe;
```

连接数据库

```bash
 \c devbe
```

查看数据库中的表

```
\dt
```

查看表结构

```
\d yourTableName
```

修改表字段

```
alter table yourTableName alter column yourColumnName type VARCHAR(255);
```

> 参考资料： https://www.yiibai.com/postgresql/postgresql_alter_command.html

## 进入 shell 命令

1. 命令

```bash
sudo su postgres # 安装后会默认创建postgres用户
psql --version # 查看版本
psql -l # 查看数据库
createdb xxx # 创建数据库
psql xxx # 进入xxx数据库命令行
select now(); # 查看当前时间
select version(); # 查看系统版本
\q # 退出当前数据库
dropdb xxx # 删除数据库
```

> postgresql 会创建一个默认的用户 postgres，密码随机

```bash
sudo passwd -d postgres # 删除用户 postgres 密码
sudo -u postgres passed # 设置用户 postgres 密码
```

2. 操作数据表

```bash
create table [tablename] (field1 type, field1 type); # 创建表
# create table [tablename] (name varchar(255), description text);
\dt # 查看表
\d [tablename] # 查看表的详细信息
alter table xxx rename to xxx; # 更换表名
drop table xxx; # 删除表
\i xxx.sql # 导入sql语句
```

> user 为关键字，不能创建名为 user 的表，若要创建则需要用双引号扩起来

3. 常用数据类型

- 数值型
  - integer(int)
  - real
  - serial => 序列型 +1
- 文字型
  - char => 不够则会补空格，相比 varchar 来说用的比较少
  - varchar
  - text
- 布尔型
  - boolean 逻辑删除物理删除
- 日期型
  - date
  - time
  - timestamp
- 特色类型
  - Array
  - ip 地址类型(inet)
  - JSON 型
  - XML 型

4. 表约束

```sql
create table posts (
	id serial primary key,
	title varchar(255) not null,
	content text check(length(content)>3),
	is_draft boolean default TRUE,
	is_del boolean default FALSE,
	created_date timestamp default 'now'
);
```

> 约束条件

- `not null` ：不能为空
- `unique`：在所有数据中必须唯一
- `check`：字段设置条件
- `default`：字段默认值
- `primary key(not null，unique)`: 主键，不能为空，且不能重复

### SQL 语句

1. `INSERT` 语句

```sql
insert into [tablename] (field,...) values (value, ...)
```

```sql
insert into posts (title,content) values ('',''); //content需要大于3 故报错
insert into posts (title,content) values (NULL,''); //title不能为null 故报错
insert into posts (title,content) values
('title1','content1'); //通过
select * from posts; //查看
```

2. `SELECT` 语句

```
select (fieldname) from [tablename];
```

```
\x //横向展示还是纵向展示
select title from posts;
```

3. `WHERE` 语句

   用来设定 select、update、delete 语句数据抽出的条件

```sql
select * from posts where fieldxxx > valuexx;
select * from posts where fieldxxx > valuexx and fieldxxx < valuexx;
select * from posts where fieldxxx != valuexxx;
select * from posts where fieldxx like 'value%'; //表示匹配value开头的所有
select * from posts where fieldxx like 'value_'; //表示匹配value开头紧接的一个
```

4. 数据抽出选项

```sql
-- order by 排序
-- limit 限制数量
-- offset 偏移量

select * from [tablename] order by (fieldname) asc;
select * from [tablename] order by (fieldname) desc;
select * from [tablename] order by (fieldname) desc limit (limitNum);
select * from [tablename] order by (fieldname) desc limit (limitNum) offset (offsetNum);
```

5. 统计抽出数据

```sql
-- distinct: 去重
-- sum: 求和
-- max/min: 最大/最小值
-- group by/having: having是对于group by的过滤条件

select distinct (fieldname)  from [tablename];
select sum(fieldname) from [tablename];
select max(fieldname) from [tablename];
select min(fieldname) from [tablename];

select * from [tablename] where score=(select max(score) from users); //子查询

select team,max(score) from users group by team;
select team,max(score) from users group by team having max(score) >= 25;
select team,max(score) from users group by team having max(score) >= 25 order by max(score);
```

6. 方便的函数

```sql
-- length 长度
-- concat 拼接函数
-- alias 别名
-- substring 拼接
-- random 随机函数，可应用于乱序抽用户

select player,length(player) from users;
select player,concat(player,'/','team') from users;
select player,concat(player,'/','team') as information from users;
select substring(team,1,1) as firstAlpha from users;
select concat('my',substring(team,1,1)) as info from users;

select random();
select * from users order by random();
select * from users order by random() limit 1; //随机抽用户
```

7. 更新和删除

```sql
update [table] set [field=newvalue,...] where ...
delete from [table] where ...
```

```sql
update users set score=10 where player='阿詹'; //注意单引号

update users set score=score+1 where team='勇士';

update users set score=score+1 where team in ('勇士','骑士');

delete from users where score>20;
```

8. 变更表结构

```bash
alter table [tablename] ...
create index ... # 创建索引
drop index ... # 删除索引
```

```sql
alter table  [tablename] add (field) varchar(255);
alter table  [tablename] drop (field);

alter table [tablename] rename player to nba_player;
alter table [tablename] alter nba_player type varchar(100);

create index index_name on users(nba_player);
drop index index_name;
```

> 增加索引的时候，查询会很快，但是追加会影响性能，是一把双刃剑

9. 操作多个表

```sql
select  [tablename1].(fieldName1),  [tablename2].(fieldName2) from tablename1,tablename2 where
select users.player,twitter.content from  users,twitters where users.id=twitter.user_id;
selecr u.player,t.content from users as u,twitter as t where u.id=t.user_id;
select u.player,t.content from users as u,twitter as t where u.id=t.user_id and u.id=1;
```

### 使用视图

    视图是一个虚表，数据库只存储视图的定义，换句话说，视图就是一个select语句，把业务系统中常用的select语句简化成一个类似的表的对象，便于简单读取和开发

```
create view view_name as ...（经常用的语句）
drop view view_name;
\dv //查看视图
```

开发建议：

> 在项目中，为了提高数据查询速度，可在表中加入索引 index。
> 对于经常需要查询的语句，可以提前建立视图 view，方便编码和管理。

### 使用事务

    数据库事务（database transaction）

    一个逻辑单元要成为事务，必须满足ACID（原子性/一致性/隔离性/持久性）

```
begin;
xxxxxxxx
commit;

begin;
xxxxxxxx
rollback;
```
