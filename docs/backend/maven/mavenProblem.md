# 遇到的问题

1. `错误: 找不到或无法加载主类 org.apache.maven.wrapper.MavenWrapperMain `

问题：使用`maven`相关命令的时候会报上面的错误

解决：执行 `mvn -N io.takari:maven:wrapper`

原因：没有`.mvn`和相应的`jar`文件；一句话就是说这个jar没有被安装到maven的类库中，所以无法启动此类，需要自行安装