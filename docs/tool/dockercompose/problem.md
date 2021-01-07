# 遇到的问题

::: tip 背景
使用docker-compose编排的时候，偶尔会出现node服务端连不上mongo的问题
推测的原因是：虽然在docker-compose上指定了`depends_on`属性，但是它只能确保容器的启动，却不能知道被依赖的服务是否启动完毕.，在一个服务必须要依赖另一个服务完成的时候，这样就会有问题。
:::

找到的一些方法：

``` js
init().then((mongo) => main({ mongo })).catch(e => init())

function init(){
  return MongoClient.connect(mongoConnectionURL)
}

function main({ mongo }){
  const server = express()
  server.listen(port, host);
}
```
但是上述方法对于我没有效果。


后来发现，这个问题，官网的文档已经有描述了（。。。发现自己最大的问题就是不好好查官网文档）
 [](https://docs.docker.com/compose/startup-order/)

大致意思和之前猜测的一样（小窃喜）

后面就是使用了推荐的脚本 `wait-for-it`
github地址 [](https://github.com/vishnubob/wait-for-it)

改写的 `docker-compose.yml` 文件

``` yml
version: "3"
services:
  node-dev:
    build: .
    image: girlsguns-dev
    container_name: girlsguns_node-dev
    restart: always 
    ports:
      - 3501:3501
    depends_on:
      - mongo-dev
      - redis-dev
    command: ["./wait-for-it.sh", "mongo-dev:27017", "--", "node", "server.js"]
    networks:
      - girlsguns-network-dev
  mongo-dev:
    image: mongo:4.2.6
...
```


解决！


遇到的问题：

编写启动之后遇到控制台输出 `node-dev exited with code 126`
原因：所执行的wait-for-it.sh脚本权限不足，给sh赋予相应的执行权限：`chmod +x wait-for-it.sh`
发现权限的修改git也能执行。。。





