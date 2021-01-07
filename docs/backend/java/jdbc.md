# JDBC

## 前言

java中，数据库存取技术

- JDBC （Java Database Connectivity）直接访问数据库
- JDO（Java Data Object）技术
- 第三方O/R工具,eg:Hibernate,Mybatis

> JDBC是java访问数据库的基石，JDO，Hibernate，Mybatis只是更好的封装了JDBC

## 简介

- **独立于**特定数据库管理系统，通用的SQL数据库存取和操作的公共接口（API）

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
	info.setProperty("password", "herin123");
	
	Connection conn = driver.connect(url, info);
	
	System.out.println(conn);
}
```

- 方法2：（对方法1的迭代）


