# 完整搭建Kubernetes集群【ubuntu】

OS: ubuntu 16.04.4
Kubernetes: 1.16
Docker: 18.09

### 1. 安装环境准备

##### 1. 配置并安装k8s国内源

1. 创建配置文件 `sudo touch /etc/apt/source.list.d/kubernetes.list`
2. 添加写权限 `sudo chmod 666 /etc/apt/sources.list.d/kubernetes.list`
3. 添加 `deb http://mirrors.ustc.edu.cn/kubernetes/apt kubernetes-xenial main`
4. 执行 `sudo apt update`

> 若报错

```
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 6A030B21BA07F4FB
```

5. 添加认证key

运行如下命令, 添加错误中对应的key（错误中NO_PUBKEY后面key的后8位）

```
gpg --keyserver keyserver.ubuntu.com --recv-keys BA07F4FB
```
接着运行如下命令，确认看到OK，说明成功，之后进行安装:

```
gpg --export --armor BA07F4FB | sudo apt-key add -
```

6. 再次重新 `sudo apt update` 更新系统下载源数据列表

##### 2. 禁止基础设施

1. 禁止防火墙

```
$ sudo ufw disable
Firewall stopped and disabled on system startup
```

2. 关闭swap

```
$ sudo swapoff -a #成功
$ vi /etc/fstab   #注释掉swap那一行 永久关闭
```

3. 禁止selinux

```
$ sudo apt install -y selinux-utils # 安装操控selinux的命令
$ setenforce 0 # 禁止selinux
$ shutdown -r now # 重启
$ sudo getenforce # 查看selinux是否关闭
```

### 2. k8s系统网格配置

###### 1. 配置内核参数，将桥接的IPv4流量传递到iptables的链

创建`/etc/sysctl.d/k8s.conf`文件

添加如下内容

```
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
vm.swappiness = 0
```

###### 2. 执行命令使修改生效

```
$ sudo modprobe br_netfilter
$ sudo sysctl -p /etc/sysctl.d/k8s.conf
```

### 3. 安装k8s

###### 1. 安装kubernetes目前版本 `v1.13.1`

```
$ apt update && apt-get install -y \
kubelet=1.13.1-00 \
kubernetes-cni=0.6.0-00 \
kubeadm=1.13.1-00 \
kubectl=1.13.1-00
```

> kubeadm （权限 管理员）
> kubectl （客户端，用户，开发者）
> kubelet (永久的后端服务)


###### 2. 设置为开启重启

```
$ sudo systemctl enable kubelet && systemctl start kubelet
$ sudo shutdown -r now
```

### 4. 验证k8s

###### 1. 使用root用户登录master主机
###### 2. 执行 `kubectl get nodes` 

```
# 输出如下
The connection to the server localhost:8080 was refused - did you specify the right host or port ?
```

###### 3. 查看当前k8s版本 `kubectl version`

### 5. master和node基础配置

###### 1. 给node配置hostname

1. node1主机
/etc/hostname
node1

node2主机
/etc/hostname
node2

2. 确认配置的三台机器的主机名称

```
$ cat /etc/hosts
$ shutdown -r now
```

###### 2. 配置ip地址

- master
 
 `/etc/netplan/50-cloud-init.yaml`
 
 ```
 network:
    ethernets:
        ens33:
            addresses: [192.168.236.177/24]
            dhcp4: false
            getway4: 192.168.236.2
            nameservers:
                addresses: [192.168.236.2]
            optional: true
    version: 2
 ```
重启ip配置 `netplan apply`


###### 3. 修改hosts文件

注意：(master,node1,node2 都需要配置)

使用root用户登录

1. 打开hosts文件 vim /etc/hosts
2. 输入如下

```
192.168.236.177 master
192.168.236.178 node1
192.168.236.179 node2
```

3. 重启 `shutdown -r now`



-------------------以下碎片整理

### 前言

促使我重新拿起k8s的初衷是公司的测试环境有3台服务器，我的docker业务全部放在同一个服务器上，导致内存不足，后面连SSH都登不上。

### 一、搭建环境

规划服务器

| hostname | ip | 安装组件 |
| --- | --- | --- |
| t1.chemputer.ai(master) | 62.234.154.80 | kube-apiserver,kube-controller-manager,kube-scheduler,etcd |
| t2.chemputer.ai(node)  | 49.232.150.22 | kubelet,kube-proxy,docker,flannel,etcd |
| t3.chemputer.ai(node)  | 49.232.138.134 | kubelet,kube-proxy,docker,flannel,etcd |




kubeadm init \
--apiserver-advertise-address=62.234.154.80 \
--image-repository registry.aliyuncs.com/google_containers \
--pod-network-cidr=10.244.0.0/16


启动失败，我使用的是云服务器，可能需要开放安全组的相关端口






