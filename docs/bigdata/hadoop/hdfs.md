# Hadoop-HDFS

### HDFS

1. 适用场景
- 存储非常大的文件：MB/GB/TB级别，需要`高吞吐`，对`延时性没有要求`
- 采用流式数据访问方式：即`一次写入，多次读取`,数据集经常从数据源生成或者拷贝一次，然后在其上做很多分析工作
- 运行于廉价机器，`节约成本`
- 需要`高容错性`
- 为数据存储提供`扩展能力`


2. 不适用场景
- 牺牲延时
- 大量小文件元数据保存在`NameNode内存中`,整个文件系统数量会受限于NameNode的内存大小
- 不支持文件任意offset修改，不支持多个写入器

3. 架构
HDFS是一个 `主/从（Master/Slave）体系架构`
HDFS由四部分组成：
`HDFS Client（客户端）` :
- 文件切分：文件上传至HDFS时，Client将文件切分为一个个Block，然后进行存储
- 与NameNode交互，获取文件的位置信息
- 与DataNode交互，读取或者写入数据
- 提供一些命令管理和访问HDFS
`NameNode（master，管理者）`：
- 管理HDFS名称空间
- 管理数据块（Block）映射信息
- 配置副本策略
- 处理客户端读写请求
`DataNode（slave）`：
- 存储实际的数据块
- 执行数据块的读/写操作
`Secondary NameNode（并非NameNode热备，当NameNode挂掉，它并不能马上替换NameNode并提供服务）`：
- 辅助NameNode，分担其工作量
- 定期合并`fsimage(镜像文件)`和`fsedits（日志文件）`，并推送给NameNode
- 在紧急情况下，可辅助恢复NameNode

### NameNode
1. 作用
- NameNode在内存中保存着整个文件系统的`名称空间`和文件数据块的`地址映射`
- 整个HDFS可存储的文件数受限于 `NameNode的内存大小`

2. 信息
- NameNode元数据信息
文件名，文件目录结构，文件属性（生成时间，副本数，权限）每个文件的块列表，列表中的块与块所在的DataNode之间的地址映射关系
- NameNode文件操作
NameNode负责文件元数据的操作，DataNode负责处理文件内容的读写请求，数据流不经过NameNode，会询问它跟哪个DataNode联系
- NameNode副本
文件数据块到底存放到哪些DataNode上，是由NameNode决定的，NN根据全局情况作出放置副本的决定
- NameNode心跳机制
全权管理数据块的复制，周期性接受心跳和块的状态报告信息

### DataNode
提供真实文件数据的存储服务
1. 作用
- DataNode以数据块的形式存储HDFS文件
- DataNode响应HDFS客户端读写请求
- DataNode周期性向NameNode汇报心跳信息
- --------------------------数据块信息
- --------------------------缓存数据块信息

### HDFS副本机制与机架感知

1. 副本机制
所有文件都是以block块的方式存在HDFS文件系统中，作用如下：
- 一个文件有可能大于集群中任意一个磁盘，引入块机制，可以很好解决
- 使用块作为文件存储的逻辑单位可以简化存储子系统
- 块非常适用于数据备份进而提供数据容错能力

Hadoop1.x中，block默认64M，
Hadoop2.x中，block默认128M

2. 机架感知
HDFS分布式文件系统的内部的副本存放策略

### HDFS命令

- ls
格式: hdfs dfs -ls URI
作用：类似于Linux命令，显示文件列表

``` bash
hdfs dfs -ls /
```

- ls -R
格式：hdfs dfs -ls -R URI
作用：在整个目录下递归执行ls，与UNIX中的ls -R类似

```bash
hdfs dfs -lsr /
```

- mkdir
格式：hdfs dfs [-p] -mkdir <paths>
作用：以<paths>中的URI作为参数，创建目录。使用-p参数可以递归创建目录

- put
格式：hdfs dfs -put <localsrc> ... <dist>
作用：将单个的源文件src或者多个源文件srcs从本地文件系统拷贝到目标文件系统中

``` bash
hdfs dfs -put /root/a.txt /tmp
```

- moveFromLocal
格式：hdfs dfs moveFromLocal <localsrc> <dist>
作用：和put命令类似，但是源文件localsrc拷贝之后自身被删除

``` bash
hdfs dfs -moveFromLocal /root/install.log /
```

- get
格式：hdfs dfs -get [-ignorecrc] [-crc] <src> <localdst>
作用：将文件拷贝到本地文件系统

``` bash
hdfs dfs -get /install.log /
```

- mv
格式：hdfs dfs -mv URI <dest>
作用：将hdfs上的文件从原路径移动到目标路径（移动之后文件删除），该命令不能跨文件系统

``` bash
hdfs dfs -mv /install.log /dir
```

- rm
格式：hdfs dfs -rm [-r] [-skipTrash] URI 
作用：删除参数指定的文件，只能删除文件和非空目录
若指定-skipTrash选项，则可以跳过回收站直接删除文件；否则在回收站可用时，将文件暂时放到回收站中

``` bash
hdfs dfs -rm -r /dir
```

- cp
格式：hdfs dfs -cp URI <dest>
作用：将文件拷贝
-f 选项将覆盖目标，如已经存在
-p 选项将保留文件属性（时间戳，所有权，许可，ACL，XAttr）

``` bash
hdfs dfs -cp /dir1/a.txt /dir2/b.txt
```

- cat
格式：hdfs dfs -cat URI
作用：将参数所指的文件内容输出到stdout

``` bash
hdfs dfs -cat /install.log
```

- chmod
格式：hdfs dfs -chmod [-R] URI
作用：改变文件权限，若使用-R选项，则对整个目录进行有效递归执行

``` bash
hdfs dfs -chmod -R 777 /install.log
```
- chown
格式：hdfs dfs -chmod [-R] URI
作用：改变文件和所属用户和用户组

- appendToFile
格式：hdfs dfs -appendFile <localsrc> <dst>
作用：追加一个或多个文件到hdfs指定文件中，也可从命令行读取输入

``` bash
hdfs dfs -appendToFile a.xml b.xml /big.xml
```

- getMerge
作用：将很多hdfs文件合并成一个大文件下载到本地

``` bash
hdfs dfs -getmerge /*.xml ./hello.xml
```


### HDFS高级命令

-  配额设置

HDFS的配额设定针对目录而非针对账号

``` bash
hdfs dfs -count -q -h /dir # 查看配额信息
```

1. 数额限制

``` bash
hdfs dfs -mkdir -p /user/root/dir # 创建hdfs文件夹
hdfs dfsadmin -setQuota 2 dir # 该文件夹下面设置最多上传2个文件,实际只能上传1个（即 n-1）
hdfs dfsadmin -clrQuota /user/root/dir # 清除文件数量限制
```

2. 空间大小限额

设置空间配额时，设置的空间至少是 `block_size * 3` 大小

``` bash
hdfs dfsadmin -setSpaceQuota 384M /user/root/dir # 限制空间大小128*3MB
hdfs dfs -put /root/a.txt /user/root/dir
hdfs dfsadmin -clrSpaceQuota /user/root/dir # 清除空间配额限制
```

``` bash
# 生成任意大小文件的命令
dd if=/dev/zero of=1.txt bs=1M count=2 # 生成2M的文件
```

- 安全模式

安全模式是hadoop的一种`保护机制`，用户保证集群中的数据块的安全性。当集群启动时，会首先进入安全模式，用于检查数据块的完整性(默认副本率要 >= 0.999f)

在`安全模式`状态下，文件系统只接受`读`数据请求，而不接受`删除`、`修改`等变更请求。当整个系统达到安全标准时，HDFS自动离开安全模式。

``` bash
# 安全模式操作命令
hdfs dfsadmin -safemode get # 查看安全模式状态
hdfs dfsadmin -safemode enter # 进入安全模式
hdfs dfsadmin -safemode leave # 离开安全模式
```

### HDFS基准测试

实际生产环境中，haddop环境搭建完后之后，第一件事进行`压力测试`。

- 写入速度

``` bash
# 向HDFS中写入数据，10个文件，每个文件10MB,文件会被存放到/benchmarks/TestDFSIO
hadoop jar /p/a/t/h/hadoop-2.6.5/share/hadoop/mapreduce/hadoop-mapreduce-client-jobclient-2.6.5.jar TestDFSIO -write -nrFiles 10 -fileSize 10MB
```

``` bash
# 执行完之后查看写入速度结果
hdfs dfs -text /benchmarks/TestDFSIO/io_write/part-00000
```

- 读取速度

``` bash
hadoop jar /p/a/t/h/hadoop-2.6.5/share/hadoop/mapreduce/hadoop-mapreduce-client-jobclient-2.6.5.jar TestDFSIO -read -nrFiles 10 -fileSize 10MB
```

``` bash
hdfs dfs -text /benchmarks/TestDFSIO/io_read/part-00000
```

读写操作会在当前路径下生成一个 `TestDFSIO_results.log`文件。

```
----- TestDFSIO ----- : write
           Date & time: Fri Jan 29 14:52:59 CST 2021
       Number of files: 10
Total MBytes processed: 100.0
     Throughput mb/sec: 10.639429726566656
Average IO rate mb/sec: 13.003843307495117
 IO rate std deviation: 7.792847627864068
    Test exec time sec: 28.06

----- TestDFSIO ----- : read
           Date & time: Fri Jan 29 15:18:37 CST 2021
       Number of files: 10
Total MBytes processed: 100.0
     Throughput mb/sec: 90.25270758122744
Average IO rate mb/sec: 104.56736755371094
 IO rate std deviation: 41.857501221550734
    Test exec time sec: 28.037
```

- 清除测试数据

```bash
hadoop jar /p/a/t/h/hadoop-2.6.5/share/hadoop/mapreduce/hadoop-mapreduce-client-jobclient-2.6.5.jar TestDFSIO -clean
```

### HDFS文件写入过程

### HDFS文件读取过程

### HDFS的元数据辅助管理

Hadoop集群中，NameNode的所有元数据信息都保存在了FsImage和Edits中。配置信息在`hdfs-site.xml`的`dfs.namenode.name.dir`和 `dfs.namenode.edits.dir`

- FsImage: 元数据镜像文件。一般称为检查点
- Edits：记录了最近一段时间对元数据的操作日志


### HDFS API操作

- 依赖

``` xml
<!-- hadoop-common
hadoop-client
hadoop-hdfs
hadoop-mapreduce-client-core -->

      <!-- https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-common -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-common</artifactId>
            <version>2.6.5</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-client -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>2.6.5</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-hdfs -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-hdfs</artifactId>
            <version>2.6.5</version>
        </dependency>


        <!-- https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-mapreduce-client-core -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-mapreduce-client-core</artifactId>
            <version>2.6.5</version>
        </dependency>

```

- 访问文件系统

1. 使用URL方式访问数据（了解）
2. 使用文件系统方式访问数据（掌握）

`org.apache.hadoop.conf.Confiuration`: 该类对象封装了客户端或者服务器的配置
`org.apache.hadoop.fs.FileSystem`: 文件系统对象

``` java
// 第一种
@Test
public void getFileSystem() throws IOException {
    Configuration configuration = new Configuration();
    configuration.set("fs.defaultFS", "hdfs://192.168.0.241:8020/");
    FileSystem fileSystem = FileSystem.get(configuration);
    System.out.println(fileSystem.toString());
}
// 第二种
@Test
public void getFileSystem2() throws URISyntaxException, IOException {
    FileSystem fileSystem = FileSystem.get(new URI("hdfs://192.168.0.241:8020/"), new Configuration());
    System.out.println(fileSystem);
}
// 第三种
@Test
public void getFileSystem3() throws IOException {
    Configuration configuration = new Configuration();
    configuration.set("fs.defaultFS", "hdfs://192.168.0.241:8020/");
    FileSystem fileSystem = FileSystem.newInstance(configuration);
    System.out.println(fileSystem.toString());
}
// 第四种
@Test
public void getFileSystem4() throws URISyntaxException, IOException {
    FileSystem fileSystem = FileSystem.newInstance(new URI("hdfs://192.168.0.241:8020/"), new Configuration());
    System.out.println(fileSystem.toString());
}
```

- 遍历HDFS所有文件

``` java
// 遍历文件
       FileSystem fileSystem = FileSystem.get(new URI("hdfs://192.168.0.242:8020/"), new Configuration(), "root");
        System.out.println(fileSystem + "fileSystem");
        RemoteIterator<LocatedFileStatus> locatedFileStatusRemoteIterator = fileSystem.listFiles(new Path("/"), true);
        while (locatedFileStatusRemoteIterator.hasNext()) {
            LocatedFileStatus next = locatedFileStatusRemoteIterator.next();
            System.out.println(next.getPath().toString());
        }
        fileSystem.close();
```

- 创建文件夹

``` java
    @Test
    public void mkdir() throws IOException, URISyntaxException, InterruptedException {
        FileSystem fileSystem = FileSystem.get(new URI("hdfs://192.168.0.242:8020/"), new Configuration(), "root");
        boolean mkdirs = fileSystem.mkdirs(new Path("/p/a/t/h"));
        fileSystem.close();
    }
```


- 下载文件

``` java
    @Test
    public void downLoad2() throws URISyntaxException, IOException, InterruptedException {
        FileSystem fileSystem = FileSystem.get(new URI("hdfs://192.168.0.242:8020/"), new Configuration(), "root");
        fileSystem.copyToLocalFile(new Path("/chemputer/out.txt"), new Path("/Users/yagao/Desktop/xxx.txt"));
    }

```


- 上传文件

``` java
    @Test
    public void upload() throws URISyntaxException, IOException, InterruptedException {
        FileSystem fileSystem = FileSystem.get(new URI("hdfs://192.168.0.242:8020/"), new Configuration(), "root");
        fileSystem.copyFromLocalFile(new Path("/Users/yagao/Desktop/xxx.txt"), new Path("/chemputer/out.txt"));
        fileSystem.close();
    }
```

- 合并文件

``` java

    @Test
    public void mergeFile () throws IOException, URISyntaxException, InterruptedException {

        FileSystem fileSystem = FileSystem.get(new URI("hdfs://192.168.0.242:8020/"), new Configuration(), "root");
        FSDataOutputStream outputStream = fileSystem.create(new Path("/bigFile.txt"));

        //获取本地文件系统
        LocalFileSystem local = FileSystem.getLocal(new Configuration());

        //通过本地文件系统获取文件列表，为一个集合
        FileStatus[] fileStatuses = local.listStatus(new Path("/Users/yagao/Desktop/txt"));

        for (FileStatus fileStatus:fileStatuses) {
            FSDataInputStream inputStream = local.open(fileStatus.getPath());
            IOUtils.copy(inputStream, outputStream);
            IOUtils.closeQuietly(inputStream);
        }

        IOUtils.closeQuietly(outputStream);
        local.close();
        fileSystem.close();

    }
```


