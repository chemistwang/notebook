# 常见直播流协议

## 1. RTMP （Real Time Messaging Protocol）

- 简介：Adobe 公司，私有协议，基于 TCP，默认端口 1935
- RTMP 采用的封装格式是 FLV

## 2. RTSP （Real Time Streaming Protocol）

- 简介：研究不多，一般多为监控流（据说是行业标准）

## 3. HLS （HTTP Live Streaming）

- 简介：Apple 公司，包括一个 m3u8 的索引文件，TS 媒体分片文件和 key 加密串文件

## 4. http-flv 协议

FLV（Flash Video）是 Adobe 公司设计开发的一种流行的流媒体格式，由于其视频文件体积轻巧、封装简单等特点，使其很适合在互联网上进行应用。此外，FLV 可以使用 Flash Player 进行播放，

## 5. webRTC 协议

## 6. websocket 协议

## 7. 国标 GB28181

背景：公安部标准

国标 GB28181 流媒体服务，目前监控摄像头接入最通用的方式就是通过 GB28181 协议，此协议目前越来越普及。但是 GB28181 协议中视频流是 RTP 封装的 PS 流，不可以直接在 WEB 页面中播放，这点让用户在使用过程中有诸多不便。

协议转换
WEB 页面可以播放的格式有 RTMP、FLV、HLS、Websocket 等一些视频格式。因此我们需要做的事就是将摄像头的视频流转成这几种格式。

GB28181 协议获取到的视频流为 PS 封装的 RTP 数据包，PS 包是没法直接用 web、播放器直接播放的。需要将获取到的 PS 流转成 ES 流，然后打包提供 RTMP、HLS、RTSP、HTTP-FLV 格式进行直播流分发。如此就实现了通过 GB28181 协议将安防摄像头流转成可 Web、手机、微信、客户端等直播、回放、控制的互联网直播方式。
