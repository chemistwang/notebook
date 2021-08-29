# ffmpeg

### 视频

- 分辨率 resolution
- 帧率 frame rate
- 比特率

### 音频

- 采样率 sample rate
- 通道数 channels
- 位宽 sample format

mux 复用
demux 解复用

## 简介

- ffmpeg 转换多媒体
- ffplay 简单的播放器
- ffprobe 媒体参数分析工具

## 命令

![常用命令](http://cdn.chemputer.top/notebook/live/ffmpeg/command.jpg)

## 转换格式

`ffmpeg -i input.xxx output.xxx`
`ffmpeg -i input.flac -acodec libmp3lame -ar 44100 -ab 320k -ac2 output.mp3`

`ffmpeg -i input.webm -s 1920x1080 -pix_fmt yuv420p (pixel format)(ffmpeg -pix_fmts) -vcodec libx264 -preset medium (编码器预设) -profile:v high -level:v 4.1 (1080p) -crf 23 (constant rate factor)(恒定速率因子模式) -acodec aac -ar 44100 -ac 2 -b:a 128k (=-ab) output.mp4`

## 查看支持的编码格式

`ffmpeg -codecs`

- mp4 h.264 + aac
- webm vp8 + vorbis google youtube
- ogg theora + vorbis 开源的 h5 支持

以上<=1080 的视频方案，若大于则换其他

## 码率控制模式

> 画质越好，码率越高，文件体积越大

ffmpeg 支持三种

- qp (constant quantizer) 恒定量化器模式
  qp=0 无损压缩
  eg:
  a. 快速编码 `ffmpeg -i input.xxx -vcodec libx264 -preset ultrafast -qp 0 output.mkv`
  b.高压缩比 `ffmpeg -i input.xxx -vcodec libx264 -preset veryslow -qp 0 output.mlkv`
- crf (constant rate factor)(恒定速率因子模式)
- b (bitrate) 固定目标码率格式

## 提取音视频

- 提取视频
  `ffmpeg -i input.mp4 -vcodec copy -an v.mp4`

  > copy 表示 保持原编码格式
  > -an 静音，实际上剔除音频 ，获得纯视频

- 提取音频
  `ffmpeg -i input.mp4 -acodec copy -vn a.m4a`

## 合并音视频

`ffmpeg -i v.mp4 -i a.m4a -c copy output.mp4`

## 截取音视频

`ffmpeg -i input.mp3 -ss 00:01:00 -to 00:01:10 -acodec copy output.mp3`
`ffmpeg -i input.mp3 -ss 00:01:00 -t 10 -acodec copy output.mp3`
`................... -sseof ...................................`

`ffmpeg -i input.mp4 -ss 00:01:00 -to 00:01:10 -c copy output.mp4`
`ffmpeg -ss 00:01:00 -i input.mp4 -to 00:01:10 -c copy output.mp4`
`ffmpeg -ss 00:01:00 -i input.mp4 -to 00:01:10 -c copy -copyts output.mp4`

> 第二种语句 ffmpeg 会启用关键帧技术，能加速操作，但截取的视频放在播放器中，起始时间和结束时间不一定准确
> 第三种-copyts 是保留时间戳，则会避免上述情况

## 截图

`ffmpeg -i input.mp4 -ss 5 -vframes 1 img.jpg`

## 加水印

`ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=20:20" output.mp4`

## 动图

`ffmpeg -i input.mp4 -ss 6 -to 8 -s 640x320 -r 5 output.gif`

## 直播
