# 遇到的问题

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