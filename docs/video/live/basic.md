# 视频基本知识

## 一、视频器的播放原理

![原理](http://cdn.chemputer.top/notebook/live/process.jpg)

- 第一步：解协议

  > 将流媒体协议的数据，解析为标准的相应的封装格式数据，这些协议在传输视音频数据的同时，会传输一些信令数据，这些信令数据包括对播放的控制（播放、暂停、停止），或者对网络状态的描述，解协议的过程中会去掉信令数据而只保留视音频数据

- 第二步：解封装

  > 将输入的封装格式的数据，分离成为音频流压缩编码数据和视频流压缩编码数据。封装格式种类很多，例如 MP4，MKV，RMVB，TS，FLV，AVI 等等，它的作用就是将已经压缩编码的视频数据和音频数据按照一定的格式放到一起。例如，FLV 格式的数据，经过解封装操作后，输出 H.264 编码的视频码流和 AAC 编码的音频码流。

- 第三步：解码

  > 将视频/音频压缩编码数据，解码成为非压缩的视频/音频原始数据。音频的压缩编码标准包含 AAC，MP3，AC-3 等等，视频的压缩编码标准则包含 H.264，MPEG2，VC-1 等等。解码是整个系统中最重要也是最复杂的一个环节。通过解码，压缩编码的视频数据输出成为非压缩的颜色数据，例如 YUV420P，RGB 等等；压缩编码的音频数据输出成为非压缩的音频抽样数据，例如 PCM 数据。

- 第四步：视音频同步
  > 根据解封装模块处理过程中获取到的参数信息，同步解码出来的视频和音频数据，并将视频音频数据送至系统的显卡和声卡播放出来。

## 二、封装格式

作用：视频码流和音频码流按照一定的格式存储在一个文件中（MP4、RMVB、TS、FLV、AVI）

![示意图](http://cdn.chemputer.top/notebook/live/formatdiagram.jpg)

![格式](http://cdn.chemputer.top/notebook/live/format.jpg)

![比较](http://cdn.chemputer.top/notebook/live/formatdiff.jpg)

## 三、视频编码数据

作用：将视频像素数据（RGB，YUV 等）压缩成为视频码流，从而降低视频等数据量 (H.264 MPEG2 VC-1)

![视频编码](http://cdn.chemputer.top/notebook/live/vencode.jpg)

![H.264](http://cdn.chemputer.top/notebook/live/H264.jpg)

- H264 简介

  > 数据由大小不固定的 NALU 构成
  > 最常见的情况下，一个 NALU 存储了 1 帧画面的压缩编码后的数据

- H264 压缩方法
  > 比较复杂，包含帧内预测、帧间预测、熵编码、环路滤波等环节构成
  > 可以将图像数据压缩 100 倍以上 eg: 100M 视频压缩之后不到 1M

## 四、音频编码数据

作用：将音频采样数据（PCM 等）压缩成为音频码流，从而降低音频等数据量 ( AAC MP3 AC-3)

![音频编码](http://cdn.chemputer.top/notebook/live/aencode.jpg)

![AAC](http://cdn.chemputer.top/notebook/live/AAC.jpg)

- AAC 格式简介

  > 数据由大小不固定的 ADTS 构成

- AAC 压缩方法
  > 将音频数据压缩 10 倍以上

## 五、视频像素数据

作用：保存屏幕上每个像素点的像素值 ( YUV420p RGB)

- eg：保存屏幕每个像素点的像素值
  > 3600 x 25 x 1920 x 1080 x 3（rgb） = 559.9G

![IPB](http://cdn.chemputer.top/notebook/live/IPB.jpg)

## 六、音频采样数据

密集的采样点 (PCM)

- eg.保存音频中每个采样点的值
  > 4min x 60 x 44100（采样率 44100Hz）x 2（左右声道）x 2（个字节）= 42.3M
  > 44100Hz:采样率
  > 2:左右声道
  > 16bit：采样精度

说明：波形，不直接存，采取每个点，1s 中去 44100 个点，采样精度 16bit

资料：https://blog.csdn.net/leixiaohua1020/article/list/1?t=1

## 七、视频参数（流媒体系统，封装格式，视频编码，音频编码，播放器）对比

> [雷霄骅: 视频参数（流媒体系统，封装格式，视频编码，音频编码，播放器）对比](https://blog.csdn.net/leixiaohua1020/article/details/11842919)
