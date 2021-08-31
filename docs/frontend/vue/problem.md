# 碰到的问题

### 使用 `elementUI` `@keyup.enter`语法糖不生效

```html
<div>
  <el-input
    @keyup.enter.native="queryAbbrMethod"
    style="width:50%"
    v-model.trim="searchInput"
    placeholder="搜索的中文名称或英文名称"
  ></el-input>
  <el-button @click="queryAbbrMethod" type="primary" icon="el-icon-search"
    >搜索</el-button
  >
  <el-button @click="clear" icon="el-icon-delete">清空</el-button>
</div>
```

因为 element-ui 对 input 做了封装，使用@keyup.enter="fn"触发 Enter 键事件就不会触发，解决：后面追加.native。@keyup.enter.native="submitForm" 即可解决。

---

### vue 配置开发、线上环境切换

`vue-cli 4.x`版本

参考资料 `https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-serve`

```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint"
},
```

默认做了整合：

`vue-cli-service serve`的 --mode 默认为 `development`

`vue-cli-service build`的 --mode 默认为 `production`

所以在 `axios`中直接判断即可

```js
import axios from "axios";
let BASE_URL = "";

console.log(process.env.NODE_ENV, "process.env.NODE_ENV=========");

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:10002/DEVBE";
} else {
  BASE_URL = "https://test-devbe.herinapp.com/DEVBE";
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
```
