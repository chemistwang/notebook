# 拉流解决方案

## cyberplayer.js

[官方链接](http://cyberplayer.bcelive.com/demo/new/index.html)

代码DEMO

``` html
<div id="playercontainer"></div>
<script type="text/javascript" src="./cyberplayer.js"></script>
<script type="text/javascript">
    var player = cyberplayer("playercontainer").setup({
        flashplayer: '', //指定flashplayer存放地址
        width: 640,
        height: 360,
        image: '', //预览图
        file: "rtmp://58.200.131.2:1935/livetv/hunantv", // <—rtmp直播地址
        autostart: true,
        repeat: false, 
        stretching: "uniform",
        volume: 100,
        controls: true,
        rtmp: {
            reconnecttime: 5, // rtmp直播的重连次数
            bufferlength: 1 // 缓冲多少秒之后开始播放 默认1秒
        },
        ak: "xxxxxxxxxxxxxxxx" // 公有云平台注册即可获得accessKey
        // ak: "12af7d1089404e21aa53771154b20ac2"
    });
    player.play();
</script>
```

::: tip
- `chrome浏览器`需要允许加载flash插件
- 需要申请注册accessKey
- 需要在`cyberplay.js`同级目录下引用`cyberplayer.flash.swf`，查看源码发现在`cyberplayer.js`中显式引用了该文件，或者在配置选项中设置`flashplayer`参数
:::

::: details cyberplayer.flash.swf百度网盘资源
[链接](https://pan.baidu.com/s/1rZn9fJ__3SCls4UcmDaRbA)
密码：`vfru`
:::

## video.js

[官方链接](https://videojs.com/)

代码DEMO

``` html
<link href="https://vjs.zencdn.net/7.6.5/video-js.css" rel="stylesheet">
<script src='https://vjs.zencdn.net/7.6.5/video.js'></script>
<!-- 需要额外加载videojs-flash -->
<script src="https://cdn.jsdelivr.net/npm/videojs-flash@2/dist/videojs-flash.min.js"></script>


<div class="openFlashTips" style="width:300px;position:absolute;top:20px;left:225px;z-Index:9999;color:#fff">视频无法正常播放，请点击下方启用flash</div>
<video id='rtmp-player' class='video-js vjs-big-play-centered vjs-default-skin' autoplay controls preload='auto' width='600' height='400' poster='p/a/t/h/' data-setup='{}'>
    <source src='rtmp://58.200.131.2:1935/livetv/hunantv' type='rtmp/flv'/>
    <!-- 萤石云 -->
    <!-- <source src="rtmp://rtmp01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd" type="rtmp/flv"> -->

    <p class='vjs-no-js'>
    To view this video please enable JavaScript, and consider upgrading to a web browser that
    <a rel="noopener noreferrer" href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a>
    </p>
</video>

<object><embed width="300" height="70" class="openFlash" style="position:absolute;top:130px;left:225px;z-Index:9999" src="" type="application/x-shockwave-flash"></object>

<script>
    let rtmpPlayer = videojs('rtmp-player', {}, function () { console.log('rtmpPlayer播放器初始化成功') })
    rtmpPlayer.play();

    function flashChecker() {
        var hasFlash = 0;         //是否安装了flash
        var flashVersion = 0; //flash版本
        var isIE = /*@cc_on!@*/0;      //是否IE浏览器

        if (isIE) {
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swf) {
                hasFlash = 1;
                VSwf = swf.GetVariable("$version");
                flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                var swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    hasFlash = 1;
                    var words = swf.description.split(" ");
                    for (var i = 0; i < words.length; ++i) {
                        if (isNaN(parseInt(words[i]))) continue;
                        flashVersion = parseInt(words[i]);
                    }
                }
            }
        }
        return {f: hasFlash, v: flashVersion};
    }

    var fls = flashChecker();
    var s = "";
    if (fls.f) {
        document.getElementsByClassName("openFlash")[0].style.display = "none";
        document.getElementsByClassName("openFlashTips")[0].style.display = "none";
        document.write("您安装了flash,当前flash版本为: " + fls.v + ".x");
    }
    else {
        document.getElementsByClassName("openFlash")[0].style.display = "block";
        document.getElementsByClassName("openFlashTips")[0].style.display = "block";
        document.write("您没有安装flash");
    }
</script>
```

::: tip
- `chrome浏览器`需要允许加载flash插件
- 需要额外加载`videojs-flash.min.js`, videojs6.x版本移出flash插件，[CDN地址](https://www.bootcdn.cn/videojs-flash/)
:::

## ezuikit.js

海康威视旗下萤石云平台插件

```html
<script src="https://open.ys7.com/sdk/js/2.0/ezuikit.js"></script>

<video id="myPlayer"   
    width="400px"
    height="200px"
    playsInline
    webkit-playsinline
    autoplay
    controls
    poster="http://vjs.zencdn.net/v/oceans.png"
    >
    <source src="rtmp://58.200.131.2:1935/livetv/hunantv">
    <!-- <source src="rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd" type="rtmp/flv" /> -->
</video>

<button id="start">开始播放</button>
<button id="pause">暂停播放</button>
<button id="stop">停止播放</button>

<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  var player = new EZuikit.EZUIPlayer('myPlayer');

   // 日志
   player.on('log', log);

   function log(str){
       var div = document.createElement('DIV');
       div.innerHTML = (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') + JSON.stringify(str);
       document.body.appendChild(div);
   }


   player.on('play', function() {
       console.log('the video is playing');    
   })

   $("#start").click(function(){
       console.log("开始播放");
       player.play();
   });
   $("#pause").click(function(){
       console.log("暂停播放");
       player.pause();
   });
   $("#stop").click(function(){
       console.log("结束播放",player);
       player.stop();
   });
   
</script>
```

::: tip
- `chrome浏览器`需要加载flash
:::


## flv.js

[GITHUB链接](https://github.com/Bilibili/flv.js/)

代码DEMO

``` html
<script src="flv.min.js"></script>
<video id="videoElement"></video>
<script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://example.com/flv/video.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script>
```

::: tip
- `chrome浏览器`不需要加载flash
- 不支持 `rtmp` 协议
:::

::: warning
只支持 `H.264` 和 `AAC / MP3` 格式的编码
:::


## easy.js

[GITHUB链接](https://github.com/tsingsee/EasyPlayer.js)
[npm](https://www.npmjs.com/package/easy-player)

## ckplayer.js

[官方链接](https://www.ckplayer.com/)