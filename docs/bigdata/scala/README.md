# Scala

Spark的兴起，带动Scala语言的发展。

## 特点

- Scala是一门以Java虚拟机（JVM）为运行环境并将 `面向对象` 和 `函数式编程` 的最佳特性结合在一起的 `静态类型编程语言`
- Scala源代码（.scala）会被编译成Java字节码（.class），然后运行于JVM上，并可以调用现有的Java类库


## 安装

- MacOS

```
brew install scala
```

## HelloWorld

``` scala
object HelloScala {
	def main(args: Array[String]): Unit = {
		println("hello, scala!")
	}
}
```

``` bash
scalac HelloWorld.scala
```

会出现两个文件 `HelloScala.class` 和 `HelloScala$.class`

``` bash
scala HelloWorld.scala
# 输出 hello, scala!
```

## IDEA

`IDEA` 需要安装Scala插件 `Preferences` -> `Plugins`，下载 `Scala` 插件即可。

1. 打开项目，右键选择 `Add Frameworks Support`
2. 在左侧栏选择 `Scala`，并在右侧配置好自己的Scala路径 `/usr/local/Cellar/scala/2.13.1/idea/lib`
3. 即可在项目中创建 `Scala Class`

::: tip 注意
在idea中不要设置为 `/usr/local/Cellar/scala/2.13.1` 路径，否则执行的时候会报

``` bash
Error:scalac: Multiple 'scala-library*.jar' files (scala-library.jar, scala-library.jar) in Scala compiler classpath in Scala SDK scala-sdk-2.13.1
```
:::