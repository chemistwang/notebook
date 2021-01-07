# springboot security

-----是什么

spring security是基于Spring AOP和Servlet过滤器的安全框架，它提供全面的安全性解决方案，同时在`Web请求级`和`方法调用级`处理什么确认和授权

----核心功能

- Authentication （你是谁，用户/设备/系统）
- Authorization（你能做什么，允许执行的操作）
- 攻击防护（防止伪造身份）

------原理技术

- Filter

- Servlet

- Spring DI

- Spring AOP

  

----- 常用的安全框架

- Spring Security
- Apache Shiro

 相同点

- 认证功能
- 授权功能
- 加密功能
- 会话功能
- 缓存支持
- remeberMe功能

不同点（优点）

- Spring Security基于Spring开发，项目中若使用Spring作为基础，配合Spring Security做权限更加方便，而Shiro需要和Spring进行整合
- Spring Security功能比Shiro更加丰富，例如安全防护方面
- Spring Security社区资源相对比Shiro更加丰富
- 若使用的是springboot，springcloud，三者可以无缝集成

不同点（缺点）

- Shiro配置和使用比较简单，Spring Security上手复杂
- Shiro 依赖性低，不需要任何框架和容器，可以独立运行，而Spring Security依赖Spring 容器



----- 小试牛刀

1.  启动springboot项目
2. 引入maven

``` xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
  <version>2.3.1.RELEASE</version>
</dependency>
```

3. 启动springboot 应用，会发现控制台会生成一个安全密码

![1](http://cdn.chemputer.top/notebook/springsecurity/1.jpg)

或者在`application.yml`文件中手动配置

![1](http://cdn.chemputer.top/notebook/springsecurity/2.jpg)



4. 基于内存的认证信息

代码实现1：重写 `WebSecurityConfigurerAdapter`中的`configure`方法

``` java
@Configuration
@EnableWebSecurity //启用Spring Security
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * 通过复写configure方法，进行创建用户
     * @param auth
     * @throws Exception
     */

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        /**
         * 基于内存的方式，构建两个用户账号: admin/123, chemputer/1234567
         */

        auth.inMemoryAuthentication()
                .passwordEncoder(new BCryptPasswordEncoder())
                .withUser("admin")
                .password(new BCryptPasswordEncoder().encode("123"))
                .roles();
        auth.inMemoryAuthentication()
                .passwordEncoder(new BCryptPasswordEncoder())
                .withUser("chemputer")
                .password(new BCryptPasswordEncoder().encode("1234567"))
                .roles();
    }
}
```

代码实现2：通过@Bean注入指定PasswordEncoder，加入这个之后，需要修改configure的密码加密

```java

@Configuration
@EnableWebSecurity //启用Spring Security
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * 通过复写configure方法，进行创建用户
     * @param auth
     * @throws Exception
     */

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        /**
         * 基于内存的方式，构建两个用户账号: admin/123, chemputer/1234567
         */

        auth.inMemoryAuthentication()
                .withUser("admin")
                .password(passwordEncoder().encode("123"))
                .roles();
        auth.inMemoryAuthentication()
                .withUser("chemputer")
                .password(passwordEncoder().encode("1234567"))
                .roles();
    }


    @Bean //注入PasswordEncoder
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
```

5. 基于内存的角色授权  

```java

@Configuration
@EnableWebSecurity //启用Spring Security
@EnableGlobalMethodSecurity(prePostEnabled = true) //2. 开启方法级别安全控制,会拦截注解了@PreAuthrize注解的配置
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * 通过复写configure方法，进行创建用户
     * @param auth
     * @throws Exception
     */

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        /**
         * 基于内存的方式，构建两个用户账号: admin/123, chemputer/1234567
         */

        auth.inMemoryAuthentication()
                .withUser("admin")
                .password(passwordEncoder().encode("123"))
                .roles("admin"); //1.通过roles()方法给指定的用户指定角色
        auth.inMemoryAuthentication()
                .withUser("chemputer")
                .password(passwordEncoder().encode("1234567"))
                .roles("normal");
    }
    @Bean //注入PasswordEncoder
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
```

``` java
@RestController
public class HomeController {

    @GetMapping("/hello/helloAdmin")
    @PreAuthorize("hasAnyRole('admin')") //3. 配置方法级别的权限控制
    public String helloAdmin(){
        return "hello admin...";
    }

    @GetMapping("/hello/helloUser")
    @PreAuthorize("hasAnyRole('admin','normal')") 
    public String helloUser(){
        return "hello user...";
    }
}
```



---- 实战演练

思路：

需求理解 =》架构设计 =》核心流程 =》 技术分解=》权限管理 =》数据库设计

需求理解：

![1](http://cdn.chemputer.top/notebook/springsecurity/temp/1.jpg)



![1](http://cdn.chemputer.top/notebook/springsecurity/temp/2.jpg)

![1](http://cdn.chemputer.top/notebook/springsecurity/temp/3.jpg)

![1](http://cdn.chemputer.top/notebook/springsecurity/temp/4.jpg)

技术分解：

- 安全认证Spring Security是什么

  ![1](http://cdn.chemputer.top/notebook/springsecurity/temp/5.jpg)

- JWT是什么

  Json Web Token 跨域身份验证解决方案

- BCR是什么

  Bcrypt 目前使用比较多的加密、解密算法

  最大特点：每次加密生成的Hash值不同 （对比之前自己的加密算法或MD5，同一个密码生成的Hash值是一样的）

数据库设计：

![1](http://cdn.chemputer.top/notebook/springsecurity/temp/6.jpg)



一个博客链接  https://blog.csdn.net/yuanlaijike/article/details/80249235

https://blog.csdn.net/HYDCS/article/details/107282166





=========================

Spring security 权限管理系统

### 一、简介
在企业应用中，认证和授权是非常重要的，业界出名两大框架是 `Shiro` 和 `Spring Security`

### 二、RBAC概念
`Role Based Access Control`缩写，基于角色的访问控制。一般分为用户（user），角色（role），权限（permission）三个实体







