# 网络排查案例课

## 大纲

- IP
    - NAT
    - ICMP
    - 防火墙
    - 路经排查

- TLS
    - SNI
    - 还原加密报文
    - session和ticket

- 应用
    - connection reset by peer
    - 应用偶尔慢
    - Nginx 499
    - HTTP 400
    - HTTP 503
    - 应用卡顿
    - 压测

- TCP控制面
    - 握手
    - 挥手
    - 分段
    - 重置
    - 保活/心跳
    - TIME_WAIT

- TCP数据面
    - 容错 乱序 ｜ 丢包 ｜ 重传 （快速重传 ｜ 超时重传 ｜ 错位重传）
    - 传输效率 速度和吞吐量 ｜ 窗口 ｜ 拥塞
    - 其他 DDOS

## 前置知识

1. TCP 流（TCP Stream）

- `Stream` 有前后、有顺序的。对应 `TCP` 特性。

- `Datagram` 没有前后关系的数据单元。对应 `UDP` 和 `IP` 特性。 

在 Linux 网络编程里面，`TCP` 对应的 socket 类型是 `SOCK_STREAM`，`UDP` 对应 `SOCK_DGRAM`

```bash
在具体的网络报文层面，一个 TCP 流，对应的就是一个 `5元组`

# 传输协议类型、源 IP、源端口、目的 IP、目的端口。
(TCP, your_ip, your_port, geekbang_ip, 443)
```

2. 报文、帧、分组、段、数据包

- 报文（packet）`每层都可以有这个概念`
- 段（segment） `TCP segment` 应用层传下来的 `message` 过大，超出传输层数据单元限制，会被分段
- 分组（packet） `IP层报文`
- 帧（frame）`数据链路层` 帧头 + 载荷 + 帧尾


## 排查工具

- 应用层HTTP `浏览器开发者工具`
- 表示层/会话层 `浏览器开发者工具` `tcpdump + Wireshark`
- 传输层 `nc` `iftop` `telnet` `netstat` `ss`
- 网络层 `traceroute` `route` `mtr` `ip`
- 数据链路层/物理层 `ethtool`

## TCPDUMP

## Wireshark