### SQL 思路整理

---

1. JOIN  => 笛卡尔积的一种运用

- Cross Join
- Full Outer Join
- Inner Join
- Left Outer Join
- Right Outer Join2


2. 主键
3. 外键 => 物理外键 + 逻辑外键

---

表与表之间的关系 （如何设计）

- 一对一
- 一对多
- 多对多

---

- 语言性能 + SQL慢查询（优先）
- 缓存系统
	- 同步 + 一致性问题
	- 会出现雪崩
	- 成本高
- 数据一致性  => 事务 （ACID四大特性） |  锁
- 脏读，幻读，不可重复读  => 遇到的场景 | 如何解决
- 索引 
	- 建立了索引，有时候也会进行全表扫描
	- 索引类型（FullText，BTree，Hash区别）

---

语言分类

GPL 通用编程语言 ： Java，Python
DSL领域特定编程语言：SQL，Gradle

---

SQL语言子分类

- DDL : Create Drop
- DML：Insert Update
- DQL：Select Where OrderBy
- TCL：RollBack Commit （C代表controller）控制方面
- DCL：Grant Revoke
- CCL：游标

---

调优的基本手段：

- explain
- 第三方开源：SQLAdvisor（美团）
- 小米SOAR



















