## MY_BATIS

### 是什么
ORM（Object Relational Mapping）框架 

即：把字段映射为对象的属性


```
User 
id int,
name varchar(10) not null,
age int not null
(映射之前)
1. 导入JDBC驱动包
2. 通过DriverManager注册驱动
3. 创建连接
4. 创建Statement
5. CRUD
6. 操作结果集
7. 关闭连接

=> 为什么需要建立关联？

Class User{
    private Integer id;
    private String name;
    private Integer age;
}
（映射之后）

```