# 代码实现

## Java

1. 添加 Maven 依赖

``` xml
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.8</version>
</dependency>
```

2. 代码

``` java
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;

import java.util.List;
import java.util.concurrent.CountDownLatch;


public class ZooKeeperDemo {

    private static final String CONNECTION_STRING = "t1.herin.ai:2181,t2.herin.ai:2181,t3.herin.ai:2181";
    private static final int SESSION_TIMEOUT = 5000;

    private static CountDownLatch latch = new CountDownLatch(1);

    public static void main(String[] args) throws Exception {
        //连接zookeeper
        ZooKeeper zk = new ZooKeeper(CONNECTION_STRING, SESSION_TIMEOUT, new Watcher() {
            @Override
            public void process(WatchedEvent watchedEvent) {
                if (watchedEvent.getState() == Event.KeeperState.SyncConnected) {
                    latch.countDown();
                }
            }
        });
        latch.await();
        //获取ZooKeeper客户端对象
        System.out.println(zk);


        List<String> children = zk.getChildren("/", null);
        for(String node:children) {
            System.out.println(node);
        }

    }

}
```

## Node

[node-zookeeper-client参考链接](https://www.npmjs.com/package/node-zookeeper-client)

```
npm install node-zookeeper-client
```

``` js
const zookeeper = require('node-zookeeper-client');

const CONNECTION_STRING = 't1.herin.ai:2181,t2.herin.ai:2182,t3.herin.ai:2181';
const OPTIONS = {
    sessionTimeout: 5000
};

const zk = zookeeper.createClient(CONNECTION_STRING, OPTIONS);
zk.on('connected', function(){
    //列出子节点
    zk.getChildren('/', function(err,children,stat) {
        if (err) {
            console.log(err.stack);
            return;
        }
        console.log(children)
    }) 

    //判断节点是否存在
    zk.exists('/foo', function(err,stat){
        if (stat) {
            console.log('node exists');
        } else {
            console.log('node does not exist')
        }
    })

    //创建节点
    zk.create('/foo1', new Buffer('hello'), function(error, path) {
        console.log(path, 'path')
    })

    //获取节点数据
    zk.getData('/foo', function(error, data, stat) {
        console.log(data.toString())
    })

    //更新节点数据
    zk.setData('/foo', new Buffer('hi'), function(error, stat) {
        console.log(stat)
    })

    //删除节点
    zk.remove('/foo', function(error){
        if (!error) {
            console.log('node is deleted');
        }
    })

    zk.close();

});
zk.connect();
```