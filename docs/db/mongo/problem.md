# 遇到的问题

## null

```bash
db.createUser({
user: "xxx",
pwd: "xxxuser",
roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
```

```bash
mongod --config /opt/module/mongodb/mongod.conf

mongod --shutdown --dbpath /var/lib/mongodb

mongod --shutdown --config /opt/module/mongodb/mongod.conf

[Unit]
Description=mongodb
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
ExecStart=/usr/local/bin/mongod --config /opt/module/mongodb/mongod.conf
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/usr/local/bin/mongod --shutdown --config /opt/module/mongodb/mongod.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target

/opt/module/mongodb

/usr/local/bin/mongod

/var/lib/mongo

/var/log/mongodb/mongod.log
```

## 创建空对象

::: tip 背景
想使用 mongoose 创建的一个字段为空对象
:::

凭空猜想的写法

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let _Event = new Schema(
  {
    event: { type: Object, default: {} },
  },
  { timestamps: true }
);

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

::: tip 背景
服务器迁移，业务一直跑的 `mongo4.4.4` 版本，而目标服务器跑的 `mongo3.2.22`。
运行服务之后，控制台报错认
`MongoError: Authentication failed.`
:::

::: warning 原因猜想

可能和认证方式有关

mongo3.2 使用 `SCRAM-SHA-1` 认证
mongo4.4 使用 `SCRAM-SHA-256` 认证
::::

修改前：

```js
mongoose.connect(`mongodb://127.0.0.1/${CONFIG.DB_NAME}`, options);
```

解决方案：添加`authSource`参数

修改后

```js
// 数据库验证信息
const options = {
  user: CONFIG.DB_USER,
  pass: CONFIG.DB_SECRET,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

//连接数据库
mongoose.connect(
  `mongodb://127.0.0.1/${CONFIG.DB_NAME}?authSource=${CONFIG.DB_NAME}`,
  options
);
```

## 客户端通过 SSH 连接服务器失败

::: tip 背景
SSH 连接服务器数据库，本机可以登陆，但是数据库连不上
:::

1. SSH 隧道问题

配备的密钥是可以登陆服务器的，排除 SSH 的问题

2. bindIp

`mongo` 的配置文件中 `bindIp` 这一项即使修改为 `0.0.0.0`，也无法连接，排除

3. 数据库版本问题

不管 `3.x` 还是 `4.x` 在其他服务器上都可以有效连接，排除

4. 客户端修改 `localhost` 为 `127.0.0.1`

修改之后发现可以连接，定位到 `/etc/hosts` 发现 `127.0.0.1 localhost` 被注释掉，导致主机找不到。

笑哭了，这个问题一度定位为客户端版本，mongo 版本，甚至想到服务器版本。。。
