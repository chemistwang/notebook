# 配置 Admin SDK

[SDK 官方地址](https://firebase.google.com/docs/reference/admin/node?hl=en&authuser=0)


生成一个 `admin SDK` 放在应用中，可以实现访问 `Firestore Database` 中的数据

以 `nodejs` 为例，[官方参考地址](https://firebase.google.com/docs/admin/setup/#node.js)

1. 第一步：新建项目导入 `firebase-admin`

``` bash
npm i firebase-admin
```

2. 第二步：生成 `private key` 并拷贝到工程项目中

`Firebase` -> `Project Overview` -> `Project settings` -> `Service accounts` -> `Firebase Admin SDK` -> `Generate new private key`

3. 第三步：连接 `Firestore Database`

``` js
let admin = require("firebase-admin");

let serviceAccount = require("/key/path/your.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


let db = admin.firestore();
db.collection('_users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    })
```
