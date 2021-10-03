# 问题

```js
// 值班人表
module.exports = (sequelize, DataTypes) => {
  const _DutyPerson = sequelize.define(
    "duty_person",
    {
      id: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: "值班人员中间表id",
      },
      classIdMemberId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "class_id_member_id",
        comment: "class和member联合id",
      },
      classId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "class_id",
        comment: "班次id",
        // primaryKey: true,
      },
      memberId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: "member_id",
        comment: "值班人员id",
      },
      memberTitle: {
        type: DataTypes.STRING,
        field: "member_title",
        comment: "值班头衔",
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return _DutyPerson;
};
```

```js
DutyPerson.hasOne(DutyMember, { foreignKey: "id", sourceKey: "memberId" });
```

```js
(node:57580) UnhandledPromiseRejectionWarning: SequelizeDatabaseError: there is no unique constraint matching given keys for referenced table "duty_person"
```

[参考资料](https://www.quora.com/What-does-There-is-no-unique-constraint-matching-given-keys-for-referenced-table-mean-in-PostgreSQL-and-how-do-you-fix-it)

```
暂时结论：memberId必须为主键
```



## 小技巧

https://qastack.cn/programming/21961818/sequelize-convert-entity-to-plain-object


有坑，raw和nest并不会合并同类项
