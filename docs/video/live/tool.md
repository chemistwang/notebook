# 工具软件

## ffmpeg

`Windows` `Linux` `IOS` `Android`

::: tip
老大的地位不可动摇，市面上可见播放器的底层实现
:::

## ffplay

ffplay 是 ffmpeg 工程中提供的播放器,功能相当的强大.缺点是其不是图形化界面的，必须通过键盘来操作

::: tip
wiki 上说它是一个简单的播放器（嗯，得琢磨一下），基于 SDL 与[FFmpeg 库](/video/ffmpeg)，[官网网站](https://ffmpeg.org/ffplay.html)
:::

简单的使用方法

```bash
ffplay xxx.flv
```

| 按键    | 作用         |
| ------- | ------------ |
| q, ESC  | 退出         |
| f       | 切换全屏     |
| p, 空格 | 暂停         |
| w       | 显示音频波形 |
| s       | 逐帧显示     |

参考资料：
[【雷霄骅】ffplay 的快捷键以及选项](https://blog.csdn.net/leixiaohua1020/article/details/15186441)

## VLC

::: tip
目前我觉得最好用的播放器了，[官网网站](https://www.videolan.org/)
:::

## IINA

`MacOS`

::: tip
Mac 上最好看的播放器，[官网网站](https://www.iina.io/)
:::

## ijkplayer

`IOS` `Android`

[GITHUB 地址](https://github.com/bilibili/ijkplayer)

::: tip

- 手机端
- 基于 ffplay.c
  :::

## QMPlay2

`Windows` `Linux`

[GITHUB 地址](https://github.com/zaps166/QMPlay2)

## ZLMediaKit

`Windows` `Linux`

[GITHUB 地址](https://github.com/xia-chu/ZLMediaKit)

::: tip
跨平台的 RTMP/RTSP
:::

## EasyDarwin

`Windows` `Linux`

[GITHUB 地址](https://github.com/EasyDarwin/EasyDarwin)

## SRS

`Linux`

[GITHUB 地址](https://github.com/ossrs/srs)

## nginx-rtmp-module

`Linux`

[GITHUB 地址](https://github.com/arut/nginx-rtmp-module)

## OBS

`Windows` `MacOS` `Linux`

[官网地址](https://obsproject.com/)

::: tip
很方便的推流软件
:::

# RTMP

Real Time Messaging Protocal
实时消息传输协议

该协议基于 TCP，是一个协议族

Adobe System 公司为 Flash 播放器和服务器之间音频、视频和数据传输开发的开放协议
RTMP =》 在 TCP 之上，默认使用端口 1935
RTMPT =》封装在 HTTP 请求之上，可穿透防火墙
RTMPS =》 增加了 TLS/SSL 安全功能
RTMPE =》 在 RTMP 基础上增加了加密功能
多种变种

可用的直播流地址

1. 自己搭建视频服务器测试
2. 直接使用直播地址

```js
//RTMP协议直播源
rtmp://live.hkstv.hk.lxdns.com/live/hks //香港卫视

//RTSP协议直播源
rtsp://218.204.223.237:554/live/1/66251FC11353191F/e7ooqwcfbqjoo80j.sdp //珠海过澳门大厅摄像头监控
rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov //大熊兔（点播）

//HTTP协议直播源
http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8 //香港卫视
http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8 //CCTV1高清
http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8 //CCTV3高清
http://ivi.bupt.edu.cn/hls/cctv5hd.m3u8 //CCTV5高清
http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8 //CCTV5+高清
http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8 //CCTV6高清
http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8 //苹果提供的测试源（点播）
```

| 协议           | httpflv  | rtmp    | hls        | dash         |
| -------------- | -------- | ------- | ---------- | ------------ |
| 传输层         | http 流  | tcp 流  | http       | http         |
| 视频格式       | flv      | flv tag | Ts 文件    | mp4 3gp webm |
| 延时           | 低       | 低      | 很高       | 高           |
| 数据分段       | 连续流   | 连续流  | 切片文件   | 切片文件     |
| html5 播放     | 暂不支持 | 不支持  | 大部分支持 | 极大部分支持 |
| 服务器编程难易 | 简单     | 一般    | 一般+      | 中等         |

## 4.rtmp/rtsp 转码为 http 流

1. 客户端直接转

`fluent-ffmpeg`
`node-media-server`

2. 远程服务器转

## 5. 不需要转码，并且不需要使用 flash 插件，使用 flv.js

flv.js
[flv.js](https://github.com/bilibili/flv.js)
