# JDBC

## 前言

java中，数据库存取技术

- JDBC （Java Database Connectivity）直接访问数据库
- JDO（Java Data Object）技术
- 第三方O/R工具,eg:Hibernate,Mybatis

> JDBC是java访问数据库的基石，JDO，Hibernate，Mybatis只是更好的封装了JDBC

## 简介

- **独立于**特定数据库管理系统，通用的SQL数据库存取和操作的公共接口（API）

## 本质

SUN公司指定的一套接口（interface）

接口都有调用者和实现者。
面向接口调用，面向接口写实现类，这都属于面向接口编程。

为什么面向接口编程？
解耦合：降低程序耦合度，提高程序的扩展力
多态机制是非常典型的面向抽象编程。（不要面向具体编程）

eg: Animal a = new Cat(); 而不是 Cat c = new Cat();

## 数据库连接

- 方法1：

``` java
@Test
public void testConnection1() throws SQLException{
	//获取Driver的实现类对象
	Driver driver = new com.mysql.cj.jdbc.Driver();
	//协议:ip地址:默认mysql端口号:customer数据库
	String url = "jdbc:mysql://localhost:3306/customer";
	
	Properties info = new Properties();
	info.setProperty("user", "root");
	info.setProperty("password", "chemputer123");
	
	Connection conn = driver.connect(url, info);
	
	System.out.println(conn);
}
```

- 方法2：（对方法1的迭代）



## JDBC编程六步

- 第一步：注册驱动（作用：告诉Java程序，即将要连接的是哪个品牌数据库）
- 第二步：获取连接（表示JVM的进程和数据库进程之间的通道打开了，属于进程之间的通信。重量级，使用完之后一定要关闭）
- 第三步：获取数据库操作对象（专门执行sql语句的对象）
- 第四步：执行SQL语句（DQL，DML。。。）
- 第五步：处理查询结果集（只有当第四步执行的是select语句的时候，才有这一步的处理查询结果集）
- 第六步：释放资源（使用完资源之后一定要关闭资源，Java和数据库属于进程间的通信，开启之后一定要关闭）
