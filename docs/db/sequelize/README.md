# Sequelize

## 1. 安装

```js
// sequelize包
npm install --save sequelize
// 对应数据库驱动
npm install --save pg pg-hstore
```

## 2. 创建实例

```js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres", //数据库类型
  host: "127.0.0.1", //主机地址
  port: 5432, //端口
  username: "postgres", //用户名
  password: "chemputer123", //密码
  database: "chemputerdemo", //数据库
});

module.exports = sequelize;
```

## 3. 创建模型

```js
const { DataTypes } = require('sequelize');

const sequelize = require('../db/index')

const _Community = sequelize.define('community', {
    // 在这里定义模型属性
    id: {
      type: DataTypes.BIGINT, //数据类型
      unique: true,           //是否唯一
      autoIncrement: true     //自增
      primaryKey: true,       //是否为主键
      allowNull: false        //是否允许为null
      defaultValue: 1         //默认值
      field: 'community_id'   //自定义列名
      comment: '这里是注释'     //列注释
    },
    code: {
      type: DataTypes.BIGINT
      allowNull: false
    },
    module_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    field_name: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.BIGINT
    }

  }, {
    freezeTableName: true, //停止 Sequelize 执行自动复数化
    timestamps: false //停止 Sequelize 执行时间戳添加
    createdAt: false //不需要 createdAt
    updatedAt: 'updateTimestamp' //修改默认 updatedAt 字段名
  });

module.exports = _Community;
```

> 参考资料

- [数据类型](https://www.sequelize.com.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)

## 4. 操作模型

### 增

```js
const Community = require("./model/community");

async function add() {
  await Community.create({
    id: 1,
    code: 1,
    moduleName: "your module name",
    fieldName: "your field name",
    data: 123,
  });
}

add();
```

### 删

```js
const Community = require("../model/community");

async function deleteMethod() {
  await Community.destroy({
    where: {
      code: 1,
    },
  });
}

deleteMethod();
```

### 改

```js
const Community = require("../model/community");

async function update() {
  await Community.update(
    { moduleName: "chemputer" },
    {
      where: {
        id: 22222,
        moduleName: "chemputer",
      },
    }
  );
}

update();
```

### 查

```js
const Community = require("./model/community");

async function select() {
  const result = await Community.findAll({
    attributes: ["field_name"], //SELECT 属性
    where: {
      //WHERE 语句
      id: 1,
    },
  });
  console.log(JSON.stringify(result), "data");
}

select();
```
