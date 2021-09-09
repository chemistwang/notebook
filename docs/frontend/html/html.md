# HTML标签


:::tip 参考资料
[HTML Living Standard](https://html.spec.whatwg.org/multipage/)
:::

## video

``` html
<video class="className" id="idName" >
    <source src="p/a/t/h" type="video/mp4"></source>
</video>
```

- width: 播放器宽度
- height: 播放器高度
- autoplay: 视频就绪后马上播放
- controls: 向用户展示控件
- loop: 媒介文件完成播放后再次开始播放
- muted: 视频的音频输出被静音
- src: 播放视频的url

## embed

``` html
<embed src="xxx.swf" type="application/x-shockwave-flash"/>
```

- type: 规定被嵌入内容的MIME类型 

> MIME（Mutipurpose Internet Mail Extensions）多用途互联网邮件扩展类型

eg: `application/x-shockwave-flash` 扩展名 `swf`


