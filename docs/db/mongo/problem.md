# 遇到的问题

## 创建空对象

::: tip 背景
想使用mongoose创建的一个字段为空对象
:::

凭空猜想的写法
``` js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let _Event = new Schema({
    'event': {type: Object, default: {}}
}, {timestamps: true});

module.exports = _Event;
```

这样写是不生效的,改为下面写法

```
'event': {
    type: Map,
    of: String
}
```

## 数据库连接问题

背景：
服务器迁移，业务一直跑的mongo4.4.4版本，而目标服务器跑的mongo3.2.22。
运行服务之后，控制台报错认 
`MongoError: Authentication failed.`

原因：

可能和认证方式有关

mongo3.2使用SCRAM-SHA-1认证
mongo4.4使用SCRAM-SHA-256认证


修改前：

``` 
mongoose.connect(`mongodb://127.0.0.1/${CONFIG.DB_NAME}`,options);
```



解决方案：添加`authSource`参数

修改后


```
// 数据库验证信息
const options = {
    user:CONFIG.DB_USER,
    pass:CONFIG.DB_SECRET,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false,
    useUnifiedTopology:true,
};

//连接数据库
mongoose.connect(`mongodb://127.0.0.1/${CONFIG.DB_NAME}?authSource=${CONFIG.DB_NAME}`,options);
```

