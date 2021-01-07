# AJAX

requestAnimationFrame
MutationObserver


## 1. 原生XHR
## 2. $.ajax
``` js
$.ajax({
    type: 'get/post',
    url: '',
    dataType: 'json/jsonp/text/xml',
    success: function() {},
    error: function() {}
})
```

## 3. fetch
``` js
try {
    let response = await fetch(url);
    let data = response.json();
} catch (e) {
    console.log(e);
}
```
> fetch不基于XHR，是ES新规范的实现方式
> fetch只对网络请求报错，对400，500都当做成功的请求
> fetch默认不会带cookie, 需要添加配置项
> fetch无法原生监测请求的进度，而XHR可以
> fetch可以设置mode为cors实现跨域访问

## 4. axios

axios-retry

axios



``` js
axios.get(url)
.then(res => {})
.catch(err => { console.log(err) });

//处理多个请求
function getUserAccount() {
    return axios.get('/user/account');
}
function getUserPermission() {
    return axios.get('/user/permission');
}

axios.all([getUserAccount(), getUserPermission()])
.then(axios.spread(function (getUserAccount, getUserPermission) {
    console.log('两个请求都完成了');
}));

//拦截器
axios.interceptors.request.use();

axios.interceptors.response.use();


```


