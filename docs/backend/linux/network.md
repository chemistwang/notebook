# linux 网络基础

## 1. 互联网典型应用

> WWW 万维网
> FTP 文件传输协议
> E-MAIL 电子邮件

## 2. 互联网接入方法

> ADSL（非对称数字用户环路）下行速率 > 上行速率 （铜线 + 二氧化硅）动态IP
> FTTH （光纤入户）（二氧化硅）动态IP
> 小区宽带 （大局域网）同一个网段 （不安全）
> 固定IP光纤 固定IP，可以搭建服务器

## 3. 网络通信协议

OSI/ISO七层模型（定标准，模拟模型）和TCP/IP四层模型（主要应用）

应用层 (APDU) =》 用户接口
表示层 (PPDU) =》数据的表现形式，特定功能的实现 eg: 加密
会话层 (SPDU) =》对应用会话的管理，同步
传输层 (TPDU) =》可靠（TCP）与不可靠（UDP）的传输，传输前的错误检测，流控
网络层 (报文) =》 提供逻辑地址，选路
数据链路层 (帧) =》成帧，用MAC地址访问媒介，错误检测与修正 （局域网中主要通过mac地址通讯）
物理层 (比特)  =》 设备之间的比特流的传输，物理接口，电气特征

应用层
传输层
网际互联层
网络接口层

> 端口：2^16 = 65536 传输层和应用层之间的接口
> - 端口可以变
> - 一个服务可以有多个端口

> TCP/IP模型与OSI模型比较
> - 共同点：1. 都采用层次结构概念
>          2. 都能够提供面向连接和无连接两种通信服务机制
> - 不同点：1. 前者4层，后者7层
>          2. 对可靠性要求不同 （前者更高）
>          3. OSI是在协议开发前设计的，具有通用性；TCP/IP是现有协议集然后建立模型，不适用与非TCP/IP网络、
>          4. 实际市场应用不同（OSI只是理论模型，并没有成熟的产品；而TCP/IP已经成为“实际上的国际标准”）


## linux网络设置与远程管理

1)常用网络命令

> ifconfig命令
> ifconfig #查看与配置网络状态命令
> ifconfig eth0 192.168.0.200 netmask 255.255.255.0 #临时设置eth0网卡的IP与子网掩码
> ifconfig eth0:0 down
> ifconfig eth0:0 up
> 网卡信息文件路径: /etc/sysconfig/network-scripts/ifcfg-eth0

```
DEVICE=eth0 #网卡设备名
BOOTPROTO=none #是否自动获取IP(none,static,dhcp)
HWADDR=00:0c:29:17:c4:09 #MAC地址
NM_CONTROLLED=yes #是否可以由Network Manager图形管理工具托管
ONBOOT=yes #是否随网络服务启动，eth0生效
TYPE=Ethernet #类型为以太网
UUID="XXXXXXX" #唯一识别码
IPADDR=192.XXXXXX #IP地址
NETMASK=255.255.255.0 #子网掩码
GATEWAY=192.168.0.1 #网关
DNS1=XXXXXX DNS
IPV6NIT=no #IPV6没有启用
USERCTL=no #不允许非root用于控制此网卡
```

> 主机名文件路径: /etc/sysconfig/network
> DNS配置文件: /etc/resolv.conf

> 查询网络状态
> netstat -t 列出TCP协议端口
> netstat -u 列出UDP协议端口
> netstat -n 不使用域名与服务名，而使用IP地址和端口号
> netstat -l 仅列出在监听状态网络服务
> netstat -a 列出所有的网络连接
> netstat -tuln

> ping www.baidu.com -c 5 #ping5次

> traceroute www.baidu.com
> wget URL #下载命令

2) SSH远程连接管理

```
# ssh (secure shell): 建立在应用层和传输层基础上的安全协议
# ssh 端口 22
# linux守护进程 sshd
# 安装服务 openSSH
# 服务端主程序 /usr/sbin/sshd
# 客户端主程序 /usr/bin/ssh
# 服务端配置文件 /etc/ssh/sshd_config
# 客户端配置文件 /etc/ssh/ssh_config

ps aux | grep sshd
netstat -tlun | grep 22
```

```
# /etc/ssh/sshd_config
Port 22 #端口
ListenAddress 0.0.0.0 #监听的IP
Protocol 2 #SSH版本选择
HostKey /etc/ssh/ssh_host_rsa_key #私钥保存位置
ServerKeyBits 1024 #私钥的位数
SyslogFacility AUTH #日志记录ssh登录情况
LogLevel INFO #日志等级
GSSAPIAuthentication yes #GSSAPI认证开启 (一般改客户端的ssh_config配置文件关闭，因为大多数情况服务端不在你的控制中)

#安全设定部分
RSAAythentication yes # 开启RSA验证
PermitRootLogin yes #允许root的ssh登录
PubkeyAuthentication yes #是否使用公钥验证
AuthorizedKeysFile .ssh/authorized_keys #公钥的保存位置
PasswordAuthentication yes #允许使用密码验证登录
PermitEmptyPasswords no #不允许空密码登录

#重启服务
service sshd restart
```

```
ssh root@192.160.0.150 #登录 
# scp ssh cp
scp root@1xxxxxxxxxxxx:/root/test.txt . #下载（. 代表本机） 
scp -r /root/123 root@1xxxxxxxxx/root #上传
```

```
ssh-keygen -t rsa # client
cat id_rsa.pub >> /root/.ssh/authorized_keys # >>追加
chmod 600 /root/.ssh/authorized_keys # 将权限修改，非root不可读
```

## linux文件服务器

> FTP服务，Samba服务，NFS服务

## 常见linux服务

> DHCP(动态主机配置协议)服务，DNS(域名系统)服务，可以让linux进行IP地址自动分配和域名解析

## web开发环境搭建与维护

> LAMP LNMP Apache Nginx

