# 常见直播流协议

## RTMP （Real Time Messaging Protocol）

Adobe 公司，私有协议，该协议基于 TCP，是一个协议族。

RTMP 采用的封装格式是 FLV

- `RTMP`: 在 TCP 之上，默认使用端口 1935
- `RTMPT`: 封装在 HTTP 请求之上，可穿透防火墙
- `RTMPS`: 增加了 TLS/SSL 安全功能
- `RTMPE`: 在 RTMP 基础上增加了加密功能

## HTTP-FLV

FLV（Flash Video）是 Adobe 公司设计开发的一种流行的流媒体格式，由于其视频文件体积轻巧、封装简单等特点，使其很适合在互联网上进行应用。此外，FLV 可以使用 Flash Player 进行播放，

## HLS （HTTP Live Streaming）

`Apple` 公司，包括一个 `m3u8` 的索引文件，`TS` 媒体分片文件和 `key` 加密串文件


| 协议           | HTTP-FLV  | RTMP    | HLS        | DASH        |
| -------------- | -------- | ------- | ---------- | ------------ |
| 传输层         | http 流  | tcp 流  | http       | http         |
| 视频格式       | flv      | flv tag | Ts 文件    | mp4 3gp webm |
| 延时           | 低       | 低      | 很高       | 高           |
| 数据分段       | 连续流   | 连续流  | 切片文件   | 切片文件     |
| html5 播放     | 暂不支持 | 不支持  | 大部分支持 | 极大部分支持 |
| 服务器编程难易 | 简单     | 一般    | 一般+      | 中等         |


## webRTC 协议

## websocket 协议


## RTSP （Real Time Streaming Protocol）

- 简介：研究不多，一般多为监控流（据说是行业标准）

## 国标 GB28181

### 背景

公安部标准

### 现状

国标 GB28181 流媒体服务，目前监控摄像头接入最通用的方式就是通过 GB28181 协议，此协议目前越来越普及。但是 GB28181 协议中视频流是 RTP 封装的 PS 流，不可以直接在 WEB 页面中播放，这点让用户在使用过程中有诸多不便。

### 原理

GB28181 协议获取到的视频流为 PS 封装的 RTP 数据包，PS 包是没法直接用 web、播放器直接播放的。需要将获取到的 PS 流转成 ES 流，然后打包提供 RTMP、HLS、RTSP、HTTP-FLV 格式进行直播流分发。如此就实现了通过 GB28181 协议将安防摄像头流转成可 Web、手机、微信、客户端等直播、回放、控制的互联网直播方式。
