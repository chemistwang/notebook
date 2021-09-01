# 拓展

## 视频截图并保存为文件

::: tip 思路

- 第一步： 绘制为 canvas
- 第二步： 保存为文件

:::

::: details DEMO

```js
let btn = document.getElementById("btn");
let video = document.getElementById("videoElement1");
btn.onclick = function() {
  // html2canvas(document.querySelector("#videoElement1")).then(canvas => {
  //     document.body.appendChild(canvas)
  // });
  let scale = 0.5;
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth * scale;
  canvas.height = video.videoHeight * scale;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image = document.createElement("img");
  // image.src = canvas.toDataURL();
  // saveimg(canvas.toDataURL())
  saveFile(canvas.toDataURL(), "yourName" + new Date());
};

//这里传入的url即是上面的pageData = canvas.toDataURL('image/jpeg', 1.0);
//第一种方法
function saveimg(Url) {
  var blob = new Blob([""], { type: "application/octet-stream" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = Url;
  a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
  var e = document.createEvent("MouseEvents");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
  URL.revokeObjectURL(url);
}
//第二种方法
//保存图片到本地
//调用的时候saveFile(pageData.replace("image/jpeg", "image/octet-stream"), new Date().getTime() + ".jpeg");
function saveFile(data, filename) {
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = data;
  save_link.download = filename;

  var event = document.createEvent("MouseEvents");
  event.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  save_link.dispatchEvent(event);
}
```

:::
