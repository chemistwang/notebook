# 常见直播流协议

## 1. RTMP （Real Time Messaging Protocol） RTMP 采用的封装格式是 FLV

- 简介：Adobe 公司，私有协议，基于 TCP，默认端口 1935

- 可用于测试的 rtmp 流

```
rtmp://media3.sinovision.net:1935/live/livestream //美国中文电视
rtmp://58.200.131.2:1935/livetv/hunantv //湖南卫视
```

## 2. RTSP （Real Time Streaming Protocol）

- 简介：研究不多，一般多为监控流（据说是行业标准）

## 3. HLS （HTTP Live Streaming）

- 简介：Apple 公司，包括一个 m3u8 的索引文件，TS 媒体分片文件和 key 加密串文件

## 4. http-flv 协议

FLV（Flash Video）是 Adobe 公司设计开发的一种流行的流媒体格式，由于其视频文件体积轻巧、封装简单等特点，使其很适合在互联网上进行应用。此外，FLV 可以使用 Flash Player 进行播放，

## 5. webRTC 协议

## 6. websocket 协议
