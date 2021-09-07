# 搭建单master集群【centos离线部署】


::: tip 参考资料
[Kubernetes(k8s)个人学习笔记](http://www.codedog.fun/2020/04/12/Kubernetes(k8s)%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0(%E6%9B%B4%E6%96%B0%E4%B8%AD)/)
:::

## 一. 部署方式

### 单master集群

![单master集群](http://cdn.chemputer.top/notebook/k8s/singletonArch.png)


### 多master集群

![单master集群](http://cdn.chemputer.top/notebook/k8s/clusterArch.png)

## 二. 生产环境k8s平台规划

OS: `centOS 7.7`

Kubernetes: `v1.16`

Docker: `v18.09`

## 三. 服务器硬件配置推荐

根据实际情况自行调配，一般来说，`node` 节点配置要优于 `master` 节点

## 四. 官方提供三种部署方式
 
### 1. minikube 

本地快速运行单点k8s，仅用于尝试和学习

### 2. kubeadm工具 

`kubeadm init` + `kubeadm join` 用于快速部署k8s集群（缺点：不清楚配置 熟练之后推荐）

### 3. 二进制 👍

手动部署每个组件，组成k8s集群

::: tip 优点
新手必经之路，对于了解 `k8s` 架构有极大帮助
:::


## 五. 服务器准备工作

### 1. 修改配置文件（虚拟机）

``` bash
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

```
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=dhcp
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=099b8485-5c12-4ac0-8463-8e213efc4347
DEVICE=ens33
ONBOOT=yes    #将no改为yes
```

### 2. 初始化服务器

| hostname | ip | 安装组件 |
| --- | --- | --- |
| k8s-master01 | 172.16.199.136 | `kube-apiserver`, `kube-controller-manager`, `kube-scheduler`, `etcd` |
| k8s-node01  | 172.16.199.137 | `kubelet`, `kube-proxy`, `docker`, `flannel`, `etcd` |
| k8s-node02  | 172.16.199.138 | `kubelet`, `kube-proxy`, `docker`, `flannel`, `etcd` |

### 3. 关闭防火墙

``` bash
systemctl stop firewalld
systemctl disable firewalld
```

### 4. 关闭交换分区（若不关闭，则有可能导致k8s服务起不来）

``` bash
swapoff -a # 临时关闭
vi /etc/fstab # 永久关闭（注释掉 #/dev/mapper/centos-swap swap 这一行）
free -m # 查看swap分区状态
```

```
#
# /etc/fstab
# Created by anaconda on Fri Jun  5 10:52:04 2020
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
/dev/mapper/centos-root /                       xfs     defaults        0 0
UUID=0fc5f6fe-5e33-4f7a-af20-802dc698f8cc /boot                   xfs     defaults        0 0
#/dev/mapper/centos-swap swap                    swap    defaults        0 0     
```

### 5. 配置主机名

```
hostnamectl set-hostname k8s-master01
hostnamectl set-hostname k8s-node01
hostnamectl set-hostname k8s-node02
```

### 6. 配置名称解析

``` bash
vi /etc/hosts
```

```
# 三个节点添加 如下内容
172.16.199.136 k8s-master01
172.16.199.137 k8s-node01
172.16.199.138 k8s-node02
```

### 7. 关闭selinux

``` bash
setenforce 0 # 临时关闭
vi /etc/selinux/config # 将SELINUX=enforcing 修改为 SELINUX=disabled
```

```
# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=disabled
# SELINUXTYPE= can take one of three two values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected.
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted
```


### 8. 配置时间同步 

:::tip 说明
1. 选择一个节点作为服务器，剩下的作为客户端（此处选择master01为时间服务器的服务端
其他的为时间服务器的客户端）
2. 必须保证所有服务器时间同步，若不同步，可到导致例如证书的不同步
:::


1. 配置 `k8s-master01`

``` bash
yum install chrony -y
vi /etc/chrony.conf
```

```
# 修改/etc/chrony.conf

# Please consider joining the pool (http://www.pool.ntp.org/join.html).
server 127.127.1.0 iburst #指定上游服务器地址，此处由于是master节点，指定自己即可
# Allow NTP client access from local network.
allow 172.16.199.0/24     #修改为自己的网段
# Serve time even if not synchronized to a time source.
local stratum 10          #去掉注释
```
    
``` bash
systemctl start chronyd
systemctl enable chronyd
ss -unl | grep 123 # 查看
```

2. 配置 `k8s-node01`/ `node02`

``` bash
yum install chrony -y
vi /etc/chrony.conf
```

```
# 修改/etc/chrony.conf

# Please consider joining the pool (http://www.pool.ntp.org/join.html).
     server 172.16.199.136 iburst #指定上游服务器，修改为k8s-master01节点ip  
```
     
``` bash
systemctl start chronyd
systemctl enable chronyd
```

3. 验证是否成功

``` bash
chronyc sources # 查看
# 若是^? 表明没有设置成功
# 若是^* 表明同步成功
```

## 六. 为etcd和apiserver自签ssl证书

```
加密
* 对称加密：加密解密用相同的秘钥
* 非对称加密：公钥 + 私钥
* 单向加密：只能加密，不能解密（md5）

ssl证书来源
* 网络第三方机构购买，通常这种证书用于让外部用户访问使用
* 自签证书（自己给自己发证书），通常用于内部环境

ssl一些概念
* 端实体（申请者）
* 注册机构（RC）
* 签证机构（CA）
* 证书撤销列表（CRL）
* 证书存取库

自建CA
* openssl
* cfssl (本次搭建使用方法)
```

1. 下载cfssl工具

``` bash
wget https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
wget https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
wget https://pkg.cfssl.org/R1.2/cfssl-certinfo_linux-amd64
chmod +x cfssl_linux-amd64 cfssljson_linux-amd64 cfssl-certinfo_linux-amd64
mv cfssl_linux-amd64 /usr/local/bin/cfssl
mv cfssljson_linux-amd64 /usr/local/bin/cfssljson
mv cfssl-certinfo_linux-amd64 /usr/bin/cfssl-certinfo
```

2. 编写三个json文件

``` bash
# vi /root/TLS/etcd/ca-config.json
{
  "signing": {
    "default": {
      "expiry": "87600h"
    },
    "profiles": {
      "www": {
         "expiry": "87600h",
         "usages": [
            "signing",
            "key encipherment",
            "server auth",
            "client auth"
        ]
      }
    }
  }
}

# vi /root/TLS/etcd/ca-csr.json
{
    "CN": "etcd CA",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "CN",
            "L": "Beijing",
            "ST": "Beijing"
        }
    ]
}

# vi root/TLS/etcd/server-csr.json
# 填写表单–写明etcd所在节点的ip
# hosts表明当前证书颁发给哪几个主机

{
    "CN": "etcd",
    "hosts": [ 
        "172.16.199.136",
        "172.16.199.137",
        "172.16.199.138"
    ],
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "CN",
            "L": "BeiJing",
            "ST": "BeiJing"
        }
    ]
}
```

3. 创建证书颁发机构

``` bash
cfssl gencert -initca ca-csr.json | cfssljson -bare ca -
```

![创建证书颁发机构](http://cdn.chemputer.top/notebook/k8s/cfssl.jpg)

``` bash
# 会生成一对ca的秘钥
ls *pem
ca-key.pem ca.pem  
```

4. 向证书颁发机构申请证书

``` bash
cfssl gencert \
-ca=ca.pem \
-ca-key=ca-key.pem \
-config=ca-config.json \
-profile=www \
server-csr.json | cfssljson -bare server
```

``` bash
# 会有4个pem文件
[root@k8s-master01 etcd]# ll *pem  
ca-key.pem #ca证书
ca.pem #ca证书
server-key.pem #etcd证书
server.pem #etcd证书
```

## 七. etcd数据库集群部署

1. `github` 下载 `3.2.28` 版本的 `etcd`

::: tip 说明
有etcd的node上都要部署，注意文件夹的名字和位置，不是随便命名和放置的
:::

``` bash
wget https://github.com/etcd-io/etcd/releases/download/v3.2.28/etcd-v3.2.28-linux-amd64.tar.gz
tar -zxvf etcd-v3.2.28-linux-amd64.tar.gz

mkdir /opt/etcd/{cfg,bin,ssl} -p. #创建配置文件，命令文件，证书
mv etcd-v3.2.28-linux-amd64/{etcd,etcdctl} /opt/etcd/bin #将文件移动至指定目录
```

::: tip 知识点
`centos6`: `systemV` 风格服务管理脚本目录 `/etc/rc.d/rcN.d`  

`N` 表示 `0 1 2 3 4 5 6` 服务运行级别

`centos7`: `systemd` 服务管理脚本目录 `/usr/lib/systemd/system`
:::

2. 创建 `etcd.conf` 文件 

``` bash
# vi /opt/etcd/cfg/etcd.conf 

#k8s-master01
#[Member]
ETCD_NAME="etcd-1"
ETCD_DATA_DIR="/var/lib/etcd/default.etcd"
ETCD_LISTEN_PEER_URLS="https://172.16.199.136:2380"
ETCD_LISTEN_CLIENT_URLS="https://172.16.199.136:2379"

#[Clustering]
ETCD_INITIAL_ADVERTISE_PEER_URLS="https://172.16.199.136:2380"
ETCD_ADVERTISE_CLIENT_URLS="https://172.16.199.136:2379"
ETCD_INITIAL_CLUSTER="etcd-1=https://172.16.199.136:2380,etcd-2=https://172.16.199.137:2380,etcd-3=https://172.16.199.138:2380"
ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster" 
ETCD_INITIAL_CLUSTER_STATE="new"
```

``` bash
#ETCD_NAME 节点名称,node01改为etcd-2，node02改为etcd-3
#ETCD_DATA_DIR 数据目录
#ETCD_LISTEN_PEER_URLS 集群通信监听地址,接受其他etcd数据
#ETCD_LISTEN_CLIENT_URLS 客户端访问监听地址,接受除etcd之外，和外部节点通讯
#ETCD_INITIAL_ADVERTISE_PEER_URLS 集群通告地址
#ETCD_ADVERTISE_CLIENT_URLS 客户端通告地址
#ETCD_INITIAL_CLUSTER 集群节点地址
#ETCD_INITIAL_CLUSTER_TOKEN 集群Token,节点通讯时的认证token，节点保持一致
#ETCD_INITIAL_CLUSTER_STATE 加入集群的当前状态，new是新集群，existing表示加入已有集群
```


3. 创建 `etcd.service` 文件

``` bash
vi /usr/lib/systemd/system/etcd.service
```

```
[Unit]
Description=Etcd Server
After=network.target
After=network-online.target
Wants=network-online.target

[Service]
Type=notify
EnvironmentFile=/opt/etcd/cfg/etcd.conf
ExecStart=/opt/etcd/bin/etcd \
--name=${ETCD_NAME} \
--data-dir=${ETCD_DATA_DIR} \
--listen-peer-urls=${ETCD_LISTEN_PEER_URLS} \
--listen-client-urls=${ETCD_LISTEN_CLIENT_URLS},http://127.0.0.1:2379 \
--advertise-client-urls=${ETCD_ADVERTISE_CLIENT_URLS} \
--initial-advertise-peer-urls=${ETCD_INITIAL_ADVERTISE_PEER_URLS} \
--initial-cluster=${ETCD_INITIAL_CLUSTER} \
--initial-cluster-token=${ETCD_INITIAL_CLUSTER_TOKEN} \
--initial-cluster-state=new \
--cert-file=/opt/etcd/ssl/server.pem \
--key-file=/opt/etcd/ssl/server-key.pem \
--peer-cert-file=/opt/etcd/ssl/server.pem \
--peer-key-file=/opt/etcd/ssl/server-key.pem \
--trusted-ca-file=/opt/etcd/ssl/ca.pem \
--peer-trusted-ca-file=/opt/etcd/ssl/ca.pem
Restart=on-failure
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

4. 将之前生成的证书拷贝到固定的目录

``` bash
cp /root/TLS/etcd/{ca,server,server-key}.pem /opt/etcd/ssl #拷贝生成的证书
```

5. 启动并设置开机启动

``` bash
systemctl start etcd
systemctl enable etcd
```

> 启动的时候先启动子节点的etcd

``` bash
#不使用别名
cp #相当于 cp -i 
alias #查看系统中的别名
unalias cp  #不使用别名
\cp         #不使用别名
```


6. 检查集群中的 `etcd` 是否正常工作（在主从节点上都测试一下）

``` bash
/opt/etcd/bin/etcdctl \
--ca-file=/opt/etcd/ssl/ca.pem \
--cert-file=/opt/etcd/ssl/server.pem \
--key-file=/opt/etcd/ssl/server-key.pem \
--endpoints="https://172.16.199.136:2379,https://172.16.199.137:2379,https://172.16.199.138:2379" \
cluster-health
```

``` bash
# 三个节点均正常
member 6dae76cecb4bcc84 is healthy: got healthy result from https://172.16.199.138:2379
member 9c12fda2a7536f4e is healthy: got healthy result from https://172.16.199.136:2379
member df2477b7bface443 is healthy: got healthy result from https://172.16.199.137:2379
```


## 八. 部署master组件

1. 生成证书,编写 `4` 个 `json` 文件 

``` bash
# vi /root/TLS/k8s/ca-config.json
{
  "signing": {
    "default": {
      "expiry": "87600h"
    },
    "profiles": {
      "kubernetes": {
         "expiry": "87600h",
         "usages": [
            "signing",
            "key encipherment",
            "server auth",
            "client auth"
        ]
      }
    }
  }
}

# vi /root/TLS/k8s/ca-csr.json
{
    "CN": "kubernetes",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "CN",
            "L": "Beijing",
            "ST": "Beijing",
            "O": "k8s",
            "OU": "System"
        }
    ]
}

# vi root/TLS/k8s/server-csr.json
{
    "CN": "kubernetes",
    "hosts": [ 
        "10.0.0.1",
        "127.0.0.1",
        "172.16.199.136",
        "kubernetes",
        "kubernetes.default",
        "kubernetes.default.svc",
        "kubernetes.default.svc.cluster",
        "kubernetes.default.svc.cluster.local"
    ],
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "CN",
            "L": "BeiJing",
            "ST": "BeiJing",
            "O": "k8s",
            "OU": "System"
        }
    ]
}


# vi root/TLS/k8s/kube-proxy-csr.json

{
  "CN": "system:kube-proxy",
  "hosts": [],
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "L": "BeiJing",
      "ST": "BeiJing",
      "O": "k8s",
      "OU": "System"
    }
  ]
}

```

``` bash
cfssl gencert -initca ca-csr.json | cfssljson -bare ca -

# 生成apiserver证书
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=kubernetes server-csr.json | cfssljson -bare server

#  生成kube-proxy证书
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=kubernetes kube-proxy-csr.json | cfssljson -bare kube-proxy

cp /root/TLS/k8s/{ca*pem,server.pem,server-key.pem} /opt/kubernetes/ssl/
```

2. 安装 `kubernetes` 包

``` bash
mkdir /opt/kubernetes/{bin,cfg,ssl,logs} -p
tar -zxvf kubernetes-server-linux-amd64.tar.gz ./
cd kubernetes/server/bin
cp kube-apiserver kube-scheduler kube-controller-manager kubectl /opt/kubernetes/bin
```

3. 创建 `token.csv` 文件

``` bash
vi /opt/kubernetes/cfg/token.csv

674c457d4dcf2eefe4920d7dbb6b0ddc,kubelet-bootstrap,10001,"system:node-bootstrapper"

# 第一列: 随机字符串，自己可生成
# 第二列: 用户名
# 第三列: UID
# 第四列: 用户组
```

4. 创建 `kube-apiserver.conf` 文件

``` bash
vi /opt/kubernetes/cfg/kube-apiserver.conf


KUBE_APISERVER_OPTS="--logtostderr=false \
--v=2 \
--log-dir=/opt/kubernetes/logs \
--etcd-servers=https://172.16.199.136:2379,https://172.16.199.137:2379,https://172.16.199.138:2379 \
--bind-address=172.16.199.136 \
--secure-port=6443 \
--advertise-address=172.16.199.136 \
--allow-privileged=true \
--service-cluster-ip-range=10.0.0.0/24 \
--enable-admission-plugins=NamespaceLifecycle,LimitRanger,SecurityContextDeny,ServiceAccount,ResourceQuota,NodeRestriction \
--authorization-mode=RBAC,Node \
--enable-bootstrap-token-auth=true \
--token-auth-file=/opt/kubernetes/cfg/token.csv \
--service-node-port-range=30000-32767 \
--tls-cert-file=/opt/kubernetes/ssl/server.pem  \
--tls-private-key-file=/opt/kubernetes/ssl/server-key.pem \
--client-ca-file=/opt/kubernetes/ssl/ca.pem \
--service-account-key-file=/opt/kubernetes/ssl/ca-key.pem \
--etcd-cafile=/opt/etcd/ssl/ca.pem \
--etcd-certfile=/opt/etcd/ssl/server.pem \
--etcd-keyfile=/opt/etcd/ssl/server-key.pem \
--audit-log-maxage=30 \
--audit-log-maxbackup=3 \
--audit-log-maxsize=100 \
--audit-log-path=/opt/kubernetes/logs/k8s-audit.log"



# 参数说明：
# –logtostderr 启用日志
# —v 日志等级
# –etcd-servers etcd集群地址
# –bind-address 监听地址
# –secure-port https安全端口
# –advertise-address 集群通告地址
# –allow-privileged 启用授权
# –service-cluster-ip-range Service虚拟IP地址段
# –enable-admission-plugins 准入控制模块
# –authorization-mode 认证授权，启用RBAC授权和节点自管理
# –enable-bootstrap-token-auth 启用TLS bootstrap功能，后面会讲到
# –token-auth-file token文件
# –service-node-port-range Service Node类型默认分配端口范围
```

5. 创建 `kube-controller-manager.conf` 文件

``` bash
vi /opt/kubernetes/cfg/kube-controller-manager.conf

KUBE_CONTROLLER_MANAGER_OPTS="--logtostderr=false \
--v=2 \
--log-dir=/opt/kubernetes/logs \
--leader-elect=true \
--master=127.0.0.1:8080 \
--address=127.0.0.1 \
--allocate-node-cidrs=true \
--cluster-cidr=10.244.0.0/16 \
--service-cluster-ip-range=10.0.0.0/24 \
--cluster-signing-cert-file=/opt/kubernetes/ssl/ca.pem \
--cluster-signing-key-file=/opt/kubernetes/ssl/ca-key.pem  \
--root-ca-file=/opt/kubernetes/ssl/ca.pem \
--service-account-private-key-file=/opt/kubernetes/ssl/ca-key.pem \
--experimental-cluster-signing-duration=87600h0m0s"
```

6. 创建 `kube-scheduler.conf` 文件

``` bash
vi /opt/kubernetes/cfg/kube-scheduler.conf

KUBE_SCHEDULER_OPTS="--logtostderr=false \
--v=2 \
--log-dir=/opt/kubernetes/logs \
--leader-elect \
--master=127.0.0.1:8080 \
--address=127.0.0.1"


# 参数说明：
# –master 连接本地apiserver
# –leader-elect 当该组件启动多个时，自动选举（HA）
```


7. 创建 `kube-apiserver.service` 启动文件

``` bash
# vi /usr/lib/systemd/system/kube-apiserver.service 

[Unit]
Description=Kubernetes API Server
Documentation=https://github.com/kubernetes/kubernetes

[Service]
EnvironmentFile=-/opt/kubernetes/cfg/kube-apiserver.conf
ExecStart=/opt/kubernetes/bin/kube-apiserver $KUBE_APISERVER_OPTS
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

8. 创建 `kube-scheduler.service` 启动文件

``` bash
# vi /usr/lib/systemd/system/kube-scheduler.service 

[Unit]
Description=Kubernetes Scheduler
Documentation=https://github.com/kubernetes/kubernetes

[Service]
EnvironmentFile=-/opt/kubernetes/cfg/kube-scheduler.conf
ExecStart=/opt/kubernetes/bin/kube-scheduler $KUBE_SCHEDULER_OPTS
Restart=on-failure

[Install]
WantedBy=multi-user.target
```


9. 创建 `kube-controller-manager.service` 启动文件

``` bash
# vi /usr/lib/systemd/system/kube-controller-manager.service 

[Unit]
Description=Kubernetes Controller Manager
Documentation=https://github.com/kubernetes/kubernetes

[Service]
EnvironmentFile=-/opt/kubernetes/cfg/kube-controller-manager.conf
ExecStart=/opt/kubernetes/bin/kube-controller-manager $KUBE_CONTROLLER_MANAGER_OPTS
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

10. 分别启动 `kube-apiserver`, `kube-scheduler`, `kube-controller-manager`

``` bash
systemctl start kube-apiserver
systemctl enable kube-apiserver

systemctl start kube-scheduler
systemctl enable kube-scheduler

systemctl start kube-controller-manager
systemctl enable kube-controller-manager
```

11. 验证是否成功

``` bash
/opt/kubernetes/bin/kubectl get cs
ps aux | grep kube | wc -l #结果为4 

cp /opt/kubernetes/bin/kubectl /bin/    #方便

tail -f /opt/kubernetes/logs/kube-apiserver.INFO # 查看日志，没有明显的错误提示
tail -f /opt/kubernetes/logs/kube-controller-manager.INFO
tail -f /opt/kubernetes/logs/kube-scheduler.INFO
```

12. 配置TLS，基于bootstrap自动颁发证书

:::tip 说明
`Master apiserver` 启用 `TLS` 认证后，`Node` 节点 `kubelet` 组件想要加入集群，必须使用 `CA` 签发的有效证书才能与 `apiserver` 通信
 
当Node节点很多时，签署证书是一件很繁琐的事情，因此有了 `TLS Bootstrapping` 机制，`kubelet` 会以一个低权限用户自动向 `apiserver` 申请证书，`kubelet` 的证书由 `apiserver` 动态签署。
:::

:::tip 两个要求

`kube-apiserver.conf` 配置文件中
1. `--enable-bootstrap-token-auth=true` 配置项要为 `true`
2. `--token-auth-file=/opt/kubernetes/cfg/token.csv` 记录授权
:::


``` bash
# 启用授权
kubectl create clusterrolebinding kubelet-bootstrap \
  --clusterrole=system:node-bootstrapper \
  --user=kubelet-bootstrap
```


## 九. 部署node组件

1. 安装docker： 启动容器 (根据k8s版本选择适合的docker版本,此处选择docker18.09)

2. 在master上执行 `kubernetes.sh` 文件

``` bash
# vi /root/TLS/k8s/kubernetes.sh

# 创建kubelet bootstrapping kubeconfig 
BOOTSTRAP_TOKEN=674c457d4dcf2eefe4920d7dbb6b0ddc
KUBE_APISERVER="https://172.16.199.136:6443"

# 设置集群参数
kubectl config set-cluster kubernetes \
  --certificate-authority=./ca.pem \
  --embed-certs=true \
  --server=${KUBE_APISERVER} \
  --kubeconfig=bootstrap.kubeconfig

# 设置客户端认证参数
kubectl config set-credentials kubelet-bootstrap \
  --token=${BOOTSTRAP_TOKEN} \
  --kubeconfig=bootstrap.kubeconfig

# 设置上下文参数
kubectl config set-context default \
  --cluster=kubernetes \
  --user=kubelet-bootstrap \
  --kubeconfig=bootstrap.kubeconfig

# 设置默认上下文
kubectl config use-context default --kubeconfig=bootstrap.kubeconfig

#-------------------------------------------------------------------
#-------------------------------------------------------------------

# 创建kube-proxy kubeconfig文件

kubectl config set-cluster kubernetes \
  --certificate-authority=./ca.pem \
  --embed-certs=true \
  --server=${KUBE_APISERVER} \
  --kubeconfig=kube-proxy.kubeconfig

kubectl config set-credentials kube-proxy \
  --client-certificate=./kube-proxy.pem \
  --client-key=./kube-proxy-key.pem \
  --embed-certs=true \
  --kubeconfig=kube-proxy.kubeconfig

kubectl config set-context default \
  --cluster=kubernetes \
  --user=kube-proxy \
  --kubeconfig=kube-proxy.kubeconfig

kubectl config use-context default --kubeconfig=kube-proxy.kubeconfig
```
 
``` bash
chmod 777 kubernetes.sh # 修改执行权限
./kubernetes.sh # 执行脚本
```

:::tip 说明
这时可以发现生成了 `bootstrap.kubeconfig` 和 `kube-proxy.kubeconfig` 两个文件（妥善保存，一旦泄露，集群炸了）⚠️

将这两个文件通过scp发送到所有Node节点的 `/opt/kubernetes/cfg` 目录下。
:::

3. master发送 `kubelet` 和 `kube-proxy` 至node节点

``` bash
mkdir /opt/kubernetes/{bin,cfg,ssl,logs} -p # node节点执行
```

:::tip 说明
解压 `kubernetes-server-linux-amd64.tar.gz` 后，在 `/kubernetes/server/bin` 下找到 `kubelet` 和 `kube-proxy` 两个文件，将这两个文件拷贝到Node节点的 `/opt/kubernetes/bin` 目录下。
:::

4. master发送证书至node节点

``` bash
cd /root/TLS/k8s
scp /root/TLS/k8s/{ca.pem, kube-proxy.pem, kube-proxy-key.pem} root@node:/opt/kubernetes/ssl
```

5. 安装kubelet： 接受apiserver的指令，然后控制docker容器


> 1) 配置 `kubelet-config.yml` 文件

```
# vi /opt/kubernetes/cfg/kubelet-config.yml

kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
address: 0.0.0.0
port: 10250
readOnlyPort: 10255
cgroupDriver: cgroupfs
clusterDNS:
- 10.0.0.2
clusterDomain: cluster.local
failSwapOn: false
authentication:
  anonymous:
    enabled: false
  webhook:
    cacheTTL: 2m0s
    enabled: true
  x509:
    clientCAFile: /opt/kubernetes/ssl/ca.pem
authentication:
  mode: Webhook
  webhook:
    cacheAuthorizedTTL: 5m0s
    cacheUnauthorizedTTL: 30s
evictionHard:
  imagefs.available: 15%
  memory.available: 100Mi
  nodefs.available: 10%
  nodefs.inodesFree: 5%
maxOpenFiles: 1000000
maxPods: 110
```

> 2) 配置 `kubelet.conf` 文件 （指定当前主机名）

```
# vi /opt/kubernetes/cfg/kubelet.conf

KUBELET_OPTS="--logtostderr=false \
--v=2 \
--log-dir=/opt/kubernetes/logs \
--hostname-override=k8s-node01 \
--network-plugin=cni \
--kubeconfig=/opt/kubernetes/cfg/kubelet.kubeconfig \
--bootstrap-kubeconfig=/opt/kubernetes/cfg/bootstrap.kubeconfig \
--config=/opt/kubernetes/cfg/kubelet-config.yml \
--cert-dir=/opt/kubernetes/ssl \
--pod-infra-container-image=registry.cn-hangzhou.aliyuncs.com/google-containers/pause-amd64:3.0"
```

> 3) 配置 `kubelet.service` 文件

```
# vi /usr/lib/systemd/system/kubelet.service

[Unit]
Description=Kubernetes Kubelet
After=docker.service
Requires=docker.service

[Service]
EnvironmentFile=/opt/kubernetes/cfg/kubelet.conf
ExecStart=/opt/kubernetes/bin/kubelet $KUBELET_OPTS
Restart=on-failure
KillMode=process

[Install]
WantedBy=multi-user.target
```

> 4) 启动 `kubelet`

```
systemctl start kubelet
systemctl enable kubelet
```

- 3. 安装kube-proxy：为node上的容器配置网络功能


> 1) 配置 `kube-proxy-config.yml` (指定当前主机名)

```
vi /opt/kubernetes/cfg/kube-proxy-config.yml

kind: KubeProxyConfiguration
apiVersion: kubeproxy.config.k8s.io/v1alpha1
address: 0.0.0.0
metricsBindAddress: 0.0.0.0:10249
clientConnection:
  kubeconfig: /opt/kubernetes/cfg/kube-proxy.kubeconfig
hostnameoverride: k8s-node01
clusterCIDR: 10.0.0.0/24
mode: ipvs
ipvs:
  scheduler: "rr"
iptables:
  masqueradeAll: true
```


> 2) 配置 `kube-proxy.conf`

```
vi /opt/kubernetes/cfg/kube-proxy.conf

KUBE_PROXY_OPTS="--logtostderr=false \
--v=2 \
--log-dir=/opt/kubernetes/logs \
--config=/opt/kubernetes/cfg/kube-proxy-config.yml"
```

> 3) 配置 `kube-proxy.service` 配置文件

```
# vi /usr/lib/systemd/system/kube-proxy.service

[Unit]
Description=Kubernetes Proxy
After=network.target

[Service]
EnvironmentFile=-/opt/kubernetes/cfg/kube-proxy.conf
ExecStart=/opt/kubernetes/bin/kube-proxy $KUBE_PROXY_OPTS
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

> 4) 启动 `kube-proxy` 服务

```
systemctl start kube-proxy
systemctl enable kube-proxy
```

- 4. 在master节点给node节点颁发证书

> 在node节点启动kubectl时，会向master节点请求申请证书

```
kubectl get csr #在master节点查看
kubectl certificate approve node-csr-b5WX_MrzTr3HOcf5ecjKmJNoFkbpKTTgWZLwOA1YQ48 #颁发证书
kubectl get nodes # 在master节点上可以查看，node节点已经加入集群 （可能需要点时间，1min）
```

## 十. 部署k8s集群网络

1. 确认启用CNI插件

``` bash
grep "cni" /opt/kubernetes/cfg/kubelet.conf
```

2. 创建目录

``` bash
mkdir -pv /opt/cni/bin /etc/cni/net.d
```

3. 离线安装

``` bash
tar xf cni-plugins-linux-amd64-v0.8.5.tgz -C /opt/cni/bin/
```

4. 下载

``` bash
wget https://github.com/coreos/flannel/releases/download/v0.10.0/flannel-v0.10.0-linux-amd64.tar.gz
```

 
5. 在 `master` 节点创建 `kube-flannel.yaml` 文件

``` bash
vi kube-flannel.yaml

---
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: psp.flannel.unprivileged
  annotations:
    seccomp.security.alpha.kubernetes.io/allowedProfileNames: docker/default
    seccomp.security.alpha.kubernetes.io/defaultProfileName: docker/default
    apparmor.security.beta.kubernetes.io/allowedProfileNames: runtime/default
    apparmor.security.beta.kubernetes.io/defaultProfileName: runtime/default
spec:
  privileged: false
  volumes:
    - configMap
    - secret
    - emptyDir
    - hostPath
  allowedHostPaths:
    - pathPrefix: "/etc/cni/net.d"
    - pathPrefix: "/etc/kube-flannel"
    - pathPrefix: "/run/flannel"
  readOnlyRootFilesystem: false
  # Users and groups
  runAsUser:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
  # Privilege Escalation
  allowPrivilegeEscalation: false
  defaultAllowPrivilegeEscalation: false
  # Capabilities
  allowedCapabilities: ['NET_ADMIN']
  defaultAddCapabilities: []
  requiredDropCapabilities: []
  # Host namespaces
  hostPID: false
  hostIPC: false
  hostNetwork: true
  hostPorts:
  - min: 0
    max: 65535
  # SELinux
  seLinux:
    # SELinux is unsed in CaaSP
    rule: 'RunAsAny'
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: flannel
rules:
  - apiGroups: ['extensions']
    resources: ['podsecuritypolicies']
    verbs: ['use']
    resourceNames: ['psp.flannel.unprivileged']
  - apiGroups:
      - ""
    resources:
      - pods
    verbs:
      - get
  - apiGroups:
      - ""
    resources:
      - nodes
    verbs:
      - list
      - watch
  - apiGroups:
      - ""
    resources:
      - nodes/status
    verbs:
      - patch
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: flannel
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: flannel
subjects:
- kind: ServiceAccount
  name: flannel
  namespace: kube-system
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: flannel
  namespace: kube-system
---
kind: ConfigMap
apiVersion: v1
metadata:
  name: kube-flannel-cfg
  namespace: kube-system
  labels:
    tier: node
    app: flannel
data:
  cni-conf.json: |
    {
      "cniVersion": "0.2.0",
      "name": "cbr0",
      "plugins": [
        {
          "type": "flannel",
          "delegate": {
            "hairpinMode": true,
            "isDefaultGateway": true
          }
        },
        {
          "type": "portmap",
          "capabilities": {
            "portMappings": true
          }
        }
      ]
    }
  net-conf.json: |
    {
      "Network": "10.244.0.0/16",
      "Backend": {
        "Type": "vxlan"
      }
    }
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: kube-flannel-ds-amd64
  namespace: kube-system
  labels:
    tier: node
    app: flannel
spec:
  selector:
    matchLabels:
      app: flannel
  template:
    metadata:
      labels:
        tier: node
        app: flannel
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: beta.kubernetes.io/os
                    operator: In
                    values:
                      - linux
                  - key: beta.kubernetes.io/arch
                    operator: In
                    values:
                      - amd64
      hostNetwork: true
      tolerations:
      - operator: Exists
        effect: NoSchedule
      serviceAccountName: flannel
      initContainers:
      - name: install-cni
        image: lizhenliang/flannel:v0.11.0-amd64 
        command:
        - cp
        args:
        - -f
        - /etc/kube-flannel/cni-conf.json
        - /etc/cni/net.d/10-flannel.conflist
        volumeMounts:
        - name: cni
          mountPath: /etc/cni/net.d
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
      containers:
      - name: kube-flannel
        image: lizhenliang/flannel:v0.11.0-amd64 
        command:
        - /opt/bin/flanneld
        args:
        - --ip-masq
        - --kube-subnet-mgr
        resources:
          requests:
            cpu: "100m"
            memory: "50Mi"
          limits:
            cpu: "100m"
            memory: "50Mi"
        securityContext:
          privileged: false
          capabilities:
             add: ["NET_ADMIN"]
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        volumeMounts:
        - name: run
          mountPath: /run/flannel
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
      volumes:
        - name: run
          hostPath:
            path: /run/flannel
        - name: cni
          hostPath:
            path: /etc/cni/net.d
        - name: flannel-cfg
          configMap:
            name: kube-flannel-cfg
```


- 4. 在master上执行yaml脚本，实现在node节点安装启动网络插件功能

```
kubectl apply -f kube-flannel.yaml #执行
kubectl delete -f kube-flannel.yaml #删除

kubectl get pods -n kube-system #查看是否已经执行成功  STATUS为Running
kubectl get nodes #若已经成功，查看node节点的状态，则该命令STATUS也会变为Ready
```

- 5. 在master授权apiserver可以访问kubelet

```
kubectl apply -f apiserver-to-kubelet-rbac.yaml #执行
kubectl describe node k8s-node02 #检查k8s-node02节点
```


## 十一. 启动一个nginx容器


```
# 生产开发中建议把镜像包下载好，通过save和load进行镜像操作

1) 修改/etc/docker/daemon.json
2) 重启

systemctl daemon-reload
systemctl restart docker

3) 在master启动nginx
kubectl create deployment myweb --image=nginx:1.8   #创建deployment，通过deployment来创建和管理nginx容器
kubectl get deployment  #查看deployment状态
kubectl get pods        #查看pods状态


### test 
kubectl create deployment myweb1 --image=nginx:1.6
kubectl get pods 
kubectl describe pod myweb1-6ff756695f-l9qwc.  #（排查故障经常用）#查看Node，显示nginx在哪个服务器启动

```

4) master将容器的端口暴露给宿主机

```
kubectl expose deployment myweb --port=80 --type=NodePort
kubectl get service   #查看映射
kubectl get svc     #svc service的简写

# 访问任意node节点都可以访问
# http://172.16.199.131:31155
# http://172.16.199.132:31155
```


## 十二. 部署web管理界面 （dashboard）

- kubernetes dashboard （官方）

```
kubectl apply -f dashboard.yaml  #安装
kubectl get pods -n kubernetes-dashboard #查看kubernetes-dashboard命名空间的pod

kubectl get service -n kubernetes-dashboard #查看kubernetes-dashboard命名空间的service

```

> 在chrome该页面上，直接键盘敲入这11个字符：thisisunsafe
（鼠标点击当前页面任意位置，让页面处于最上层即可输入）


- kuboard (第三方)(推荐)

```
docker pull eipwork/kuboard. #在node节点上下载镜像

kubectl apply -f https://kuboard.cn/install-script/kuboard.yaml #在master节点执行
# 可添加nodeName: k8s-node01 指定运行在哪个节点

kubectl get pods -n kube-system #查看命名空间
kubectl get service -n kube-system #查看服务端口


echo $(kubectl -n kube-system get secret $(kubectl -n kube-system get secret | grep kuboard-user | awk '{print $1}') -o go-template='{{.data.token}}' | base64 -d)  #生成token 根据token登录访问
```



## 十三. 部署集群内部DNS解析服务 （coreDNS）

- 创建 `coredns.yaml` 文件

```
# Warning: This is a file generated from the base underscore template file: coredns.yaml.base

apiVersion: v1
kind: ServiceAccount
metadata:
  name: coredns
  namespace: kube-system
  labels:
      kubernetes.io/cluster-service: "true"
      addonmanager.kubernetes.io/mode: Reconcile
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
    addonmanager.kubernetes.io/mode: Reconcile
  name: system:coredns
rules:
- apiGroups:
  - ""
  resources:
  - endpoints
  - services
  - pods
  - namespaces
  verbs:
  - list
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
    addonmanager.kubernetes.io/mode: EnsureExists
  name: system:coredns
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:coredns
subjects:
- kind: ServiceAccount
  name: coredns
  namespace: kube-system
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
  labels:
      addonmanager.kubernetes.io/mode: EnsureExists
data:
  Corefile: |
    .:53 {
        errors
        health
        kubernetes cluster.local in-addr.arpa ip6.arpa {
            pods insecure
            upstream
            fallthrough in-addr.arpa ip6.arpa
        }
        prometheus :9153
        proxy . /etc/resolv.conf
        cache 30
        loop
        reload
        loadbalance
    }
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: coredns
  namespace: kube-system
  labels:
    k8s-app: kube-dns
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
    kubernetes.io/name: "CoreDNS"
spec:
  # replicas: not specified here:
  # 1. In order to make Addon Manager do not reconcile this replicas parameter.
  # 2. Default is 1.
  # 3. Will be tuned in real time if DNS horizontal auto-scaling is turned on.
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  selector:
    matchLabels:
      k8s-app: kube-dns
  template:
    metadata:
      labels:
        k8s-app: kube-dns
      annotations:
        seccomp.security.alpha.kubernetes.io/pod: 'docker/default'
    spec:
      serviceAccountName: coredns
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
        - key: "CriticalAddonsOnly"
          operator: "Exists"
      containers:
      - name: coredns
        image: lizhenliang/coredns:1.2.2
        imagePullPolicy: IfNotPresent
        resources:
          limits:
            memory: 170Mi
          requests:
            cpu: 100m
            memory: 70Mi
        args: [ "-conf", "/etc/coredns/Corefile" ]
        volumeMounts:
        - name: config-volume
          mountPath: /etc/coredns
          readOnly: true
        ports:
        - containerPort: 53
          name: dns
          protocol: UDP
        - containerPort: 53
          name: dns-tcp
          protocol: TCP
        - containerPort: 9153
          name: metrics
          protocol: TCP
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
            scheme: HTTP
          initialDelaySeconds: 60
          timeoutSeconds: 5
          successThreshold: 1
          failureThreshold: 5
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            add:
            - NET_BIND_SERVICE
            drop:
            - all
          readOnlyRootFilesystem: true
      dnsPolicy: Default
      volumes:
        - name: config-volume
          configMap:
            name: coredns
            items:
            - key: Corefile
              path: Corefile
---
apiVersion: v1
kind: Service
metadata:
  name: kube-dns
  namespace: kube-system
  annotations:
    prometheus.io/port: "9153"
    prometheus.io/scrape: "true"
  labels:
    k8s-app: kube-dns
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
    kubernetes.io/name: "CoreDNS"
spec:
  selector:
    k8s-app: kube-dns
  clusterIP: 10.0.0.2 
  ports:
  - name: dns
    port: 53
    protocol: UDP
  - name: dns-tcp
    port: 53
    protocol: TCP

```

- 执行

``` bash
kubectl apply -f coredns.yaml  #安装
kubectl get pods -n kube-system | grep coredns #查看
```

## 十四. 远程管理k8s

默认情况下，k8s仅仅可以在master节点进行管理

``` bash
# 在node节点运行 
kubectl  #kubectl: 未找到命令
# 即使有命令
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

1. 生成管理员证书

``` bash
# 在master执行
vi admin-csr.json
```


2. 颁发admin证书

``` bash bash
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=kubernetes admin-csr.json | cfssljson -bare admin
```

3. 创建 `kubeconfig` 文件


``` bash
vi /opt/kubernetes/cfg/kube-proxy.kubeconfig  #指定为masterip
vi /opt/kubernetes/cfg/bootstrap.kubeconfig #指定masterip
```








