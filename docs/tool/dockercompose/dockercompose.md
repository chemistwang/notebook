# Docker Compose

[官方文档](https://docs.docker.com/compose/)

## 1. 目的

一个编排多容器分布式部署的工具，提供命令集管理容器化应用的完整开发周期，包括服务构建，启动和停止。

一个项目的完整环境包括 应用节点（app），数据库（mysql），缓存（redis）。为了管理方便，可以将这些节点全部构建在一个容器中运行，但是不推荐。因为违背了Docker中运行环境隔离的设计初衷（每个节点都有其运行环境，若合在一起，自然它们的环境也要撮合在一起）。

Docker Compose可以解决多节点项目环境的维护，通过docker-compose.yml描述项目中各节点容器信息，及依赖信息，然后通过docker compose相关命令一键构建或启动。

## 2. 安装

- mac 
> 安装docker时自动安装
        
- linux-x86_64
> 资源地址：NAS/资源/0.安装源文件/3.开发/Docker/docker-compose-Linux-x86_64
> 1. 下载该文件
> 2. 将该文件名改为 `docker-compose`
> 3. 放在 `/usr/local/bin` 目录下
> 4. 路径为 `/usr/local/bin/docker-compose`
> 5. 执行 `chmod +x /usr/local/bin/docker-compose`
> 6. 检查 `docker-compose --version`

[官方安装地址](https://docs.docker.com/compose/install/)

## 3. 常用命令

```
docker-compose up //启动
docker-compose up -d //使用守护进程模式启动
docker-compose ps  //查看正在运行的服务
docker-compose logs //查看日志
docker-compose stop //停止服务
docker-compose start //启动服务
docker-compose down //停止当前的服务并移除容器以及配置文件中的网桥
```

> docker-compose只管理当前文件路径


## 4. docker-compose.yml 示例

``` yml
version: "3"                            # docker-compose语法版本号
services:                               # 服务组
  web:                                  # 自定义web服务名
    build: .                            # 构建当前路径下的Dockerfile
    image: youImageName                 # 自己构建的服务镜像
    container_name: yourContainerName   # 容器名
    restart: always                     # 意外退出会重新启动
    ports:                              # 暴露宿主机端口
      - 3333:3333                       # 容器内部3333映射到宿主机3333端口
    depends_on:                         # 容器依赖，会先启用依赖的容器
      - mongohahaha                     # 依赖名要与下面自定义的服务名保持一致
      - redislululu
    networks:                           # 容器网络
      - dev-network     
 mongohahaha:                           # 自定义mongo服务名
    image: mongo                        # 镜像名            
    container_name: dockermongo
    restart: always
    ports:
      - 9001: 27017                     # 暴露端口
    environment:                              # 若开启数据库验证，则需要配置此选项
      MONGO_INITDB_ROOT_USERNAME: yourName    # 初始化数据库用户名
      MONGO_INITDB_ROOT_PASSWORD: yourPwd     # 初始化数据库密码
      MONGO_INITDB_DATABASE: yourDBName       # 初始化数据库
    networks:
      - dev-network
    volumes:                    # 挂载数据卷（宿主机绝对路径:容器绝对路径）
      - ./init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro #只读,初始化数据库用户名密码
      - /Users/chemputer/Desktop/docker-volumes/mongo:/data/db
 redislululu:                   # 自定义redis服务名
    image: redis
    container_name: dockerredis
    restart: always 
    networks:
      - dev-network
    volumes:
      - /Users/chemputer/Desktop/docker-volumes/redis:/data
networks:                       # 容器网络
  dev-network:                  # 自定义容器网络名
    driver: bridge              # 网络类型
```

## 5. init-mongo.js 示例 （开启数据库认证时设定）

``` js
db.createUser({
    user: 'chemputer',
    pwd: 'xxxxxx',
    roles: [{
        role: 'readWrite',
        db: 'MY_DB_NAME',
    }],
});
```

## 6. docker compose注意事项

- 文件名必须是 `docker-compose.yml`
- node连接mongodb时

``` javascript

// 数据库验证信息
const options = {
    user: CONFIG.DB_USER, //mongo容器不对宿主机暴露端口，可以取消验证
    pass: CONFIG.DB_SECRET,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
};
//连接数据库
// let url = `mongodb://127.0.0.1/${CONFIG.DB_NAME}`; //以前的写法
let url = `mongodb://mongohahaha/${CONFIG.DB_NAME}`; //现在的写法

//yml中自定义的服务名是什么,这里的链接名就写什么
```

- node连接redis时

``` javascript
//redis
const Redis = require('ioredis');
const redisConfig = {
    port: 6379, // Redis port
    // host: "127.0.0.1", // Redis host //以前的写法
    host: "redislululu", // Redis host //现在的写法
}
const redis = new Redis(redisConfig);

//yml中自定义的服务名是什么,这里的链接名就写什么
```




