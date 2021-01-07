# 遇到的问题

### mybatis查询postgresql查不到数据

最初是用mapper的xml方式写的，后面看到可以用注解的方式写，就想尝试一下

前提：

DAO层

```java
@Mapper
public interface SysUserDAO {

    @Insert("INSERT into sys_user_table (user_id,user_name,pass_word,description,createTime) values (uuid_generate_v4(),#{username},#{password},'',now())")
    void saveSysUser(SysUserEntity sysUserEntity);

    @Select("SELECT * FROM sys_user_table")
    List<SysUserEntity> selectSysUser();

    @Select("SELECT * FROM sys_user_table WHERE user_id = #{id}")
    SysUserEntity selectById(String id);

    @Select("SELECT * FROM sys_user_table WHERE user_name = #{username}")
    SysUserEntity selectByName(String username);
}
```

建表语句：

```sql
DROP TABLE IF EXISTS sys_user_table;
CREATE TABLE sys_user_table (
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR (45) NOT NULL,
  pass_word VARCHAR (100) NOT NULL,
  description VARCHAR (800) NULL DEFAULT NULL,
  createTime TIMESTAMP,
  PRIMARY KEY (user_id)
)
```

实体类：

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SysUserEntity {

    private String userId;

    @NotBlank(message = "用户名不能为空")
    private String username;
    @NotBlank(message = "密码不能为空")
    private String password;
    private String description;
    private LocalDateTime createTime;

}
```



就是简单的一个查询

`SELECT * FROM sys_user_table WHERE user_name = #{username}`

但是数据一直是这个

```
SysUserEntity(userId=null, username=null, password=null, description=, createTime=2020-10-13T11:12:27.705751)
```

作为一个新手小白，一度怀疑是语法问题，最后是因为我的mybatis中需要加

``` yml
mybatis:
  mapper-locations: classpath:com/herin/devbe/mapper/*.xml # mapper配置文件位置（中间需要用/分割）
  type-aliases-package: com.herin.devbe.entity # 存放数据库对应表的对象（实体对象）
  configuration:
    map-underscore-to-camel-case: true
```

`驼峰转换`就可以了！

> 我刻意的将建表的字段和实体类的字段用不同方式分清楚，结果被坑到了。。。不过值！


### mybatis返回@Insert语句之后的id

情景：
插入数据的时候需要将user_id作为唯一值写在两张表里面，但是我的user_id是使用psql的方法生成的，并没有在程序中生成。我不想在把数据插入之后在数据库查询一次再写入另一张表中。

以前的DAO层代码：

``` java
@Mapper
public interface SysUserDAO {

    @Insert("INSERT into sys_user_table (user_id,user_name,pass_word,description,createTime) values (uuid_generate_v4(),#{username},#{password},'',now())")
    void saveSysUser(SysUserEntity sysUserEntity);
}
```

修改成

``` java
@Mapper
public interface SysUserDAO {

    @Insert("INSERT into sys_user_table (user_id,user_name,pass_word,description,createTime) values (uuid_generate_v4(),#{username},#{password},'',now())")
    @Options(useGeneratedKeys=true, keyProperty="userId")
    void saveSysUser(SysUserEntity sysUserEntity);
}
```

service 层

```
...
 sysUserDAO.saveSysUser(sysUserEntity);
 System.out.println(sysUserEntity.getUserId() + "uuid");
...
```



### mybatis中的#{}和${}区别（待定研究）



