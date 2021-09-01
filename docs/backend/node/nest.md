# Nest

[官方网址](https://nestjs.com/)

### 项目

## 遇到问题

### 1. sequelize 版本

nestjs + sequelize

报错

```bash

```

::: tip 解决方案
将 `sequelize 6.6.4` 更换为 `sequelize 6.6.2`
:::

### 2. nest.js + sequelize

一直报错

```bash
 error TS2345: Argument of type '{ stationName: string; creator: string; }' is not assignable to parameter of type 'Station'.
  Type '{ stationName: string; creator: string; }' is missing the following properties from type 'Station': $add, $set, $get, $count, and 32 more.


```

[参考资料](https://github.com/opengovsg/checkfirst/pull/301)

将定义的 model 修改

```js
export class Station extends Model<Station> {
  // @PrimaryKey
  // @AutoIncrement
  // @Column
  // id: number;

  @Column({ field: "station_name" })
  stationName: string;

  @Column({
    type: DataType.STRING,
  })
  creator: string;
}
```

改为

```js
export class Station extends Model {
  // @PrimaryKey
  // @AutoIncrement
  // @Column
  // id: number;

  @Column({ field: "station_name" })
  stationName: string;

  @Column({
    type: DataType.STRING,
  })
  creator: string;
}
```
