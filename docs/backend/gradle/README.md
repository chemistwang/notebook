# Gradle

## 前言

2012年基于Ant和Maven产生的Gradle，幕布了Ant和Maven的不足，带来了一些更高效的特点。它使用一种基于 `Groovy` 的特定领域语言（DSL）来声明项目设置，抛弃了基于 `XML` 的各种繁琐配置。面向java应用为主，当前其支持的语言限于Java、Groovy 和 Scala，计划未来将支持更多的语言。

## 安装

macOS

``` bash
brew install gradle
```

在ideal中的gradle路径需要配置为

`/usr/local/Cellar/gradle/6.0/libexec`


## gradle目录结构

``` bash
.
├── build.gradle
├── settings.gradle
└── src
    ├── main
    │   ├── java        # 放置正式代码目录
    │   └── resources   # 放置正式配置文件目录
    │   └── webapp      # 若是web项目，放置页面元素，eg: js,css,img,jsp,html等
    └── test
        ├── java        # 放置单元测试代码目录
        └── resources   # 放置测试配置文件目录
```

## grovvy简单语法

可以通过 `ideal` 的 `Tools` 下拉选项 `Groovy Console` 打开控制台。

``` grovvy
// 简单输出
println "hello grovvy"

// 定义变量
def a = 1
println(a)

// 定义集合
def list = [1,2,3]
list << 3   //添加元素
list.get(0) //获取元素  

// 定义map
def map = ['key1': 'value1', 'key2': 'value2']
map.key3 = 'value3'
println(map.get('key1'))

// 闭包
// 什么是闭包，闭包就是一段代码块。在gradle中，主要把闭包当做参数使用
// 定义闭包
def param = {
    println "hello param"
}

// 定义方法，方法里面需要闭包类型参数
def method(Closure closure) {
    closure()
}

// 调用方法
method(param)

/*********** 带参数闭包 ************/

def param = {
    v -> println "hello ${v}"
}

def method(Closure closure){
    closure("closure")
}

method(param)

```

## gradle配置文件

- build.gradle

```
plugins {
    id 'java'
}

group 'com.wyl'
version '1.0-SNAPSHOT'

sourceCompatibility = 1.8


/**
 * 指定所使用的仓库，mavenCentral()表示使用中央仓库，此刻项目中所需要的jar包都会默认从中央仓库下载到本地指定目录，默认在 /Users/wyl/.gradle/caches/modules-2/files-2.1 目录下
 * 
 * 可以配置本地仓库。下面表示先从本地仓库寻找依赖，若没有再从中央仓库下载
 * repositories {
 *  mavenLocal()
 *  mavenCentral()
 * }
 */
repositories {
    mavenCentral()
}

/**
 * gradle工程所有的jar包坐标都在dependencies属性内放置
 * 每一个jar包坐标都有3个基本元素组成：group，name，version
 * testCompile 表示jar包在测试的时候起作用，该属性为jar包的作用域
 * 在gradle添加坐标的时候都需要带上jar包的作用域
 */

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.12'
    // https://mvnrepository.com/artifact/org.springframework/spring-context
    compile group: 'org.springframework', name: 'spring-context', version: '5.3.3'
}

```