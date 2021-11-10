# 与 postgresQL 的不同

1. 必须有 `from`

``` sql
-- psql
select current_date

-- oracle
select current_date
SQL 错误 [923] [42000]: ORA-00923: 未找到要求的 FROM 关键字

select current_date from dual
```

2. unnest

```sql
-- psql
select unnest(array ['01','02','03','04','05','06','07','08','09','10','11','12'])
-- psql mybatis
select unnest(array
    <foreach collection="array" item="type" index="index" open="[" close="]" separator=",">
        #{type}
    </foreach>
)


-- oracle
-- string
select column_value value FROM  table(sys.odcivarchar2list('1','2'))
-- number
select column_value value FROM  table(sys.odcinumberlist(1,2))

-- oracle mybatis
SELECT column_value type FROM table(sys.odcivarchar2list
    <foreach collection="array" item="type" index="index" open="(" close=")" separator=",">
        #{type}
    </foreach>
)
            
```

3. 执行顺序

```sql
-- psql
select count(1), someType as type from table group by type

-- oracle
select count(1), someType as type from table group by type
SQL 错误 [904] [42000]: ORA-00904: "type": 标识符无效

select count(1), someType as type from table group by someType
```