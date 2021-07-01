# 编码经历

记录学习springboot项目的经历

前言

因为项目紧急，匆匆看完java的相关基础知识，秉着`先让车跑起来`的理念，其中java的多线程没有深入学习，hashmap，List，Collection等重要的Api没有学习，IO流直接略过，就开始SpringMVC，学了2天全部都是在配置xml的bean文件，感受了一下SpringMVC的不友好，这才满满的开始学springboot。


### 一、idea相关使用

我下载的版本时 `IntelliJ IDEA 2018.3` 版本，激活码的话，有个博主会即时更新，[激活码地址](http://soft-hub.cn/article/ll2d7f50fa62eb45f0171c5321f9fc926f.zip)

> 还是要支持正版的哈，逃。。。


### 二、初始化springboot 并启动

- 导入maven包
- 重新导入等
- 


### 三、写接口

### 四、解决跨域问题

``` java
@Configuration
public class CrosConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080")
//                .allowedOrigins("https://test-dev.herinapp.com")
                .allowedMethods("GET","HEAD","POST","PUT","DELETE","OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(36000);
    }
}
```


### 五、打包并在服务器上运行

打包springboot

```bash
mvn package
```

后台运行springboot

``` bash
nohup java -jar test.jar >temp.txt &
```

或者编辑一个 `start.sh` 脚本

``` shell
#!/bin/bash
#这里可替换为你自己的执行程序
APP_NAME=YOUR_APP_NAME

#使用说明，用来提示输入参数
usage() {
 echo "Usage: sh gwp.sh [start|stop|restart|status]"
 exit 1
}

#检查程序是否在运行
is_exist(){
 pid=`ps -ef|grep $APP_NAME|grep -v grep|awk '{print $2}' `
 #如果不存在返回1，存在返回0
 if [ -z "${pid}" ]; then
 return 1
 else
 return 0
 fi
}

#启动方法
start(){
 is_exist
 if [ $? -eq "0" ]; then
 echo "${APP_NAME} is already running. pid=${pid} ."
 else
 nohup java -Xmx512m -Xms512m -jar /p/a/t/h/$APP_NAME --spring.profiles.active=test >/p/a/t/h/nohup.out&
 echo "${APP_NAME} start success"
 fi
}

#停止方法
stop(){
 is_exist
 if [ $? -eq "0" ]; then
 kill -9 $pid
 else
 echo "${APP_NAME} is not running"
 fi
}


#输出运行状态
status(){
 is_exist
 if [ $? -eq "0" ]; then
 echo "${APP_NAME} is running. Pid is ${pid}"
 else
 echo "${APP_NAME} is NOT running."
 fi
}

#重启
restart(){
 stop
 start
}

#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$1" in
 "start")
 start
 ;;
 "stop")
 stop
 ;;
 "status")
 status
 ;;
 "restart")
 restart
 ;;
 *)
 usage
 ;;
esac
```


### 六、封装返回体

### 七、参数校验

``` xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
  <version>2.3.3.RELEASE</version>
</dependency>
```



### 八、插入数据时设置自增

`sql`

``` sql
CREATE TABLE devbe_abbr(
  id SERIAL PRIMARY KEY NOT NULL,
);
```

`entity`层

``` java
public class Abbr {

    private Integer id;

    @NotBlank(message = "中文名不能为空")
    @Pattern(regexp = "[\u4E00-\u9FA5]+", message = "中文名只允许输入中文")
    private String cname;
    @Pattern(regexp = "^[A-Za-z]+$", message = "英文名只能输入英文")
    @NotBlank(message = "英文名不能为空")
    private String ename;
    @NotBlank(message = "缩略名不能为空")
    @Pattern(regexp = "^[A-Za-z]+$", message = "缩略名只能输入英文")
    private String abbr;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
```

`dao`层

``` java
@Mapper
public interface AbbrDAO {
//    新增
    void saveAbbr(Abbr abbr);
}
```

`mybatis`

``` xml
  <insert id="saveAbbr" parameterType="Abbr" useGeneratedKeys="true" keyProperty="id">
    insert into devbe_abbr
    (cname,ename,abbr,createTime,updateTime)
    values
    (#{cname},#{ename},#{abbr},now(),now())
  </insert>
```

> 设置自增，总觉得不好，想用uuid代替

### 九、插入数据使用uuid

PostgreSQL 中可以调用`uuid_generate_v1()` 或` uuid_generate_v4()` 等函数生成 uuid

```
select uuid_generate_v1();
select uuid_generate_v4();
```

提示函数均不存在，需要依赖第三方模块 `uuid-ossp`

执行

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

uuid-ossp 模块包含的所有函数，和 `uuid_generate_v1()` 与 `uuid_generate_v4()` 之间的区别请查看链接
https://www.postgresql.org/docs/9.4/static/uuid-ossp.html

可以通过下面命令查看扩展是否已经成功安装在所需的数据库中

```
SELECT * FROM pg_extension;
```

` entity`层

> 需要将 `id` 变为 `String` 类型

``` java
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class Abbr {

    private String id;

    @NotBlank(message = "中文名不能为空")
    @Pattern(regexp = "[\u4E00-\u9FA5]+", message = "中文名只允许输入中文")
    private String cname;
    @Pattern(regexp = "^[A-Za-z]+$", message = "英文名只能输入英文")
    @NotBlank(message = "英文名不能为空")
    private String ename;
    @NotBlank(message = "缩略名不能为空")
    @Pattern(regexp = "^[A-Za-z]+$", message = "缩略名只能输入英文")
    private String abbr;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
```


`mybatis`

``` xml
<insert id="saveAbbr" parameterType="Abbr">
  insert into devbe_abbr
  (id,cname,ename,abbr,createTime,updateTime)
  values
  (uuid_generate_v4(),#{cname},#{ename},#{abbr},now(),now())
</insert>
```

现在已经解决了插入的问题了，但是查找更新删除的时候需要在mybatis中比较uuid，这样原来的sql会发生错误，原因是uuid是一个特殊的数据类型，看上去只是像一个文本字符串，但却不能直接比较。

查找报错 `Error querying database.  Cause: org.postgresql.util.PSQLException: ERROR: operator does not exist: uuid = character varying`
解决方法：将`#{id}`变为 `'${id}'`即可

``` xml
<!--根据id查找-->
<select id="findAbbrById" resultType="Abbr">
  select * from devbe_abbr where id='${id}'
</select>
```



### 十、权限校验

开发后台绕不过的就是权限校验了，我选择了springboot全家桶的`Spring security`







> 拦截器 `/*` `/**` 区别
> `/*` 匹配一级，即/add, /query 等
> `/**` 匹配多级，即 /add, /add/user/ /add/user/user 等



