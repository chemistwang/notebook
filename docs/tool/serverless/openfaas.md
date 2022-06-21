# OpenFaaS

- [OpenFaaS Github官方地址](https://github.com/openfaas/faas)

## 部署 [MacOS]

- [参考资料](https://panzhongxian.cn/cn/2021/03/faas-note-and-openfaas-deployment/)

1. 安装 `docker`

2. 安装 `k8s` 相关组件

安装 `minikube`

``` bash
brew install minikube
```

启动 `minikube`

``` bash
➜  github minikube start
😄  minikube v1.22.0 on Darwin 11.6.4
✨  Automatically selected the hyperkit driver
💾  Downloading driver docker-machine-driver-hyperkit:
🎉  minikube 1.25.2 is available! Download it: https://github.com/kubernetes/minikube/releases/tag/v1.25.2
💡  To disable this notice, run: 'minikube config set WantUpdateNotification false'

    > docker-machine-driver-hyper...: 65 B / 65 B [----------] 100.00% ? p/s 0s
    > docker-machine-driver-hyper...: 10.52 MiB / 10.52 MiB  100.00% 6.58 MiB p
🔑  The 'hyperkit' driver requires elevated permissions. The following commands will be executed:

    $ sudo chown root:wheel /Users/wyl/.minikube/bin/docker-machine-driver-hyperkit
    $ sudo chmod u+s /Users/wyl/.minikube/bin/docker-machine-driver-hyperkit


💿  Downloading VM boot image ...
    > minikube-v1.22.0.iso.sha256: 65 B / 65 B [-------------] 100.00% ? p/s 0s
    > minikube-v1.22.0.iso: 242.95 MiB / 242.95 MiB [] 100.00% 9.64 MiB p/s 25s
👍  Starting control plane node minikube in cluster minikube
💾  Downloading Kubernetes v1.21.2 preload ...
    > preloaded-images-k8s-v11-v1...: 502.14 MiB / 502.14 MiB  100.00% 10.51 Mi
🔥  Creating hyperkit VM (CPUs=2, Memory=4000MB, Disk=20000MB) ...
🐳  Preparing Kubernetes v1.21.2 on Docker 20.10.6 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass

❗  /usr/local/bin/kubectl is version 1.15.5, which may have incompatibilites with Kubernetes 1.21.2.
    ▪ Want kubectl v1.21.2? Try 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

查看 `kubectl` 版本信息

``` bash
Client Version: version.Info{Major:"1", Minor:"15", GitVersion:"v1.15.5", GitCommit:"20c265fef0741dd71a66480e35bd69f18351daea", GitTreeState:"clean", BuildDate:"2019-10-15T19:16:51Z", GoVersion:"go1.12.10", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"21", GitVersion:"v1.21.2", GitCommit:"092fbfbf53427de67cac1e9fa54aaa09a28371d7", GitTreeState:"clean", BuildDate:"2021-06-16T12:53:14Z", GoVersion:"go1.16.5", Compiler:"gc", Platform:"linux/amd64"}
```

3. 通过 `faas-nets` 部署 `OpenFaaS`

``` bash
➜ git clone https://github.com/openfaas/faas-netes
➜ cd faas-netes
➜ kubectl apply -f namespaces.yml
namespace/openfaas created
namespace/openfaas-fn created
➜ kubectl apply -f ./yaml/
configmap/alertmanager-config created
deployment.apps/alertmanager created
service/alertmanager created
deployment.apps/basic-auth-plugin created
service/basic-auth-plugin created
serviceaccount/openfaas-controller created
role.rbac.authorization.k8s.io/openfaas-controller created
role.rbac.authorization.k8s.io/openfaas-profiles created
rolebinding.rbac.authorization.k8s.io/openfaas-controller created
rolebinding.rbac.authorization.k8s.io/openfaas-profiles created
deployment.apps/gateway created
service/gateway-external created
service/gateway created
deployment.apps/nats created
service/nats created
customresourcedefinition.apiextensions.k8s.io/profiles.openfaas.com created
configmap/prometheus-config created
deployment.apps/prometheus created
serviceaccount/openfaas-prometheus created
role.rbac.authorization.k8s.io/openfaas-prometheus created
role.rbac.authorization.k8s.io/openfaas-prometheus-fn created
rolebinding.rbac.authorization.k8s.io/openfaas-prometheus created
rolebinding.rbac.authorization.k8s.io/openfaas-prometheus-fn created
service/prometheus created
deployment.apps/queue-worker create
```

设置 `base-auth` 用户名 `（admin）` 和密码 `(也可简单输入)`，后面登陆 `OpenFaaS` 管理页面时需要用到。

``` bash
➜ export PASSWORD=$(head -c 12 /dev/urandom | shasum| cut -d' ' -f1)
➜ echo $PASSWORD
➜ kubectl -n openfaas create secret generic basic-auth --from-literal=basic-auth-user=admin --from-literal=basic-auth-password=$PASSWORD
secret/basic-auth created
```

4. 拉起并展示 `minikube` 控制面板

启动 `minikube` 控制面板，获得访问地址，（选择命名空间 `openfaas`）

``` bash
➜  minikube dashboard --url
🤔  Verifying dashboard health ...
🚀  Launching proxy ...
🤔  Verifying proxy health ...
http://127.0.0.1:53165/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```

如果发现有 `Pod` 出现错误，面板报红，通过下面命令检查 `Pod` 是否完全启动

```bash
➜  ~ kubectl get pods -n openfaas
NAME                                READY   STATUS    RESTARTS   AGE
alertmanager-764df7b6cf-rbggj       1/1     Running   0          8h
basic-auth-plugin-d4cbc7686-sxrm4   1/1     Running   0          8h
gateway-7c447458db-dpbp4            2/2     Running   2          8h
nats-697d4bd9fd-r5sbz               1/1     Running   0          8h
prometheus-765dd8fb7b-x6l7d         1/1     Running   0          8h
queue-worker-5758796689-67drr       1/1     Running   1          8h

➜  ~ kubectl get service -n openfaas
NAME                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
alertmanager        ClusterIP   10.102.220.245   <none>        9093/TCP         8h
basic-auth-plugin   ClusterIP   10.107.1.174     <none>        8080/TCP         8h
gateway             ClusterIP   10.106.155.71    <none>        8080/TCP         8h
gateway-external    NodePort    10.100.203.136   <none>        8080:31112/TCP   8h
nats                ClusterIP   10.96.39.17      <none>        4222/TCP         8h
prometheus          ClusterIP   10.108.174.162   <none>        9090/TCP         8h
```

5. 拉起并展示 `OpenFaaS` 控制面板

查询 `OpenFaaS` 控制面板地址，输入命令获取 `minikube` 服务访问地址，输入 `admin` 和 `$PASSWORD`

``` bash
➜  ~ minikube service gateway-external --url -n openfaas
http://192.168.64.2:31112
```
 
6. 通过 `faas-cli` 部署函数

查看 `OpenFaaS` 提供模板

``` bash
faas-cli template store list
```

创建函数

``` bash
➜ mkdir faas-fn && cd faas-fn
# 创建 node14 版本的 node-main 函数
➜ faas-cli new node-main --lang node14
➜ tree .
.
├── node-main
│   ├── handler.js
│   └── package.json
├── node-main.yml
```

简单构建函数镜像

``` bash
faas-cli build -f node-main.yml
```

登入

``` bash
➜ faas-cli login --password 9013a977f4ded57a72f395f03dff3218df254583 --gateway ${minikube service gateway-external --url -n openfaas}
WARNING! Using --password is insecure, consider using: cat ~/faas_pass.txt | faas-cli login -u user --password-stdin
Calling the OpenFaaS server to validate the credentials...
WARNING! You are not using an encrypted connection to the gateway, consider using HTTPS.
credentials saved for admin http://192.168.64.2:31112
```

推送镜像，直接推送 `docker image push node-main:latest` 会报错 `denied: requested access to the resource is denied`

``` bash
➜  docker image push node-main:latest
The push refers to repository [docker.io/library/node-main]
84ff4e404d99: Preparing 
943b78fb38da: Preparing 
614b4afde9b1: Preparing 
7d28bcab3a54: Preparing 
c2780ea8d2c9: Preparing 
e2f1d778e1a1: Waiting 
047f1b331737: Waiting 
fe42e9a8be80: Waiting 
f9f5ff903964: Waiting 
bfe02407d329: Waiting 
8736d66cd948: Waiting 
8ba20b456cdc: Waiting 
efb3047f497d: Waiting 
05c8f4861e93: Waiting 
8d3ac3489996: Waiting 
denied: requested access to the resource is denied
```

原因：`docker` 认为要将镜像推送到 `docker.io/library/node-main`，该仓库不是你的所以无法访问

解决方案：通过打 `tag` 指向自己仓库，再推送

``` bash
➜ docker login
Authenticating with existing credentials...
Login Succeeded

➜ docker tag node-main 000000618/node-main

➜ docker image push 000000618/node-main:latest
The push refers to repository [docker.io/000000618/node-main]
84ff4e404d99: Pushed 
943b78fb38da: Pushed 
614b4afde9b1: Pushed 
7d28bcab3a54: Pushed 
c2780ea8d2c9: Pushed 
e2f1d778e1a1: Pushed 
047f1b331737: Pushed 
fe42e9a8be80: Pushed 
f9f5ff903964: Pushed 
bfe02407d329: Pushed 
8736d66cd948: Pushed 
8ba20b456cdc: Pushed 
efb3047f497d: Pushed 
05c8f4861e93: Pushed 
8d3ac3489996: Pushed 
latest: digest: sha256:1f32b7cb41fcc6682eb1b78e71cf4b8c264800088bb0149f170c6b526263019a size: 3659
```

将 `node-main.yml` 修改下

``` yml
# 修改前
image: node-main:latest
# 修改后
image: 000000618/node-main:latest
```

--- 


部署需要指定网关，成功后有函数的访问地址

``` bash
➜ faas-cli deploy -f node-main.yml --gateway http://192.168.64.2:31112
Deploying: node-main.
WARNING! You are not using an encrypted connection to the gateway, consider using HTTPS.

Deployed. 202 Accepted.
URL: http://192.168.64.2:31112/function/node-main
```

查看是否成功部署

``` bash
➜ kubectl get pods -n openfaas-fn
NAME                         READY   STATUS    RESTARTS   AGE
node-main-69c8dfdf49-jt6vn   1/1     Running   0          5m27s
shasum-698c76788d-p6qw5      1/1     Running   5          5h20m
```

7. 清理 `OpenFaaS` 部署

清理账号密码

``` bash
➜ kubectl delete secret basic-auth -n openfaas
secret "basic-auth" deleted
```

进入目录 `faas-netes`，清理资源文件

``` bash
➜ kubectl delete -f ./yaml
configmap "alertmanager-config" deleted
deployment.apps "alertmanager" deleted
service "alertmanager" deleted
deployment.apps "basic-auth-plugin" deleted
service "basic-auth-plugin" deleted
serviceaccount "openfaas-controller" deleted
role.rbac.authorization.k8s.io "openfaas-controller" deleted
role.rbac.authorization.k8s.io "openfaas-profiles" deleted
rolebinding.rbac.authorization.k8s.io "openfaas-controller" deleted
rolebinding.rbac.authorization.k8s.io "openfaas-profiles" deleted
deployment.apps "gateway" deleted
service "gateway-external" deleted
service "gateway" deleted
deployment.apps "nats" deleted
service "nats" deleted
customresourcedefinition.apiextensions.k8s.io "profiles.openfaas.com" deleted
configmap "prometheus-config" deleted
deployment.apps "prometheus" deleted
serviceaccount "openfaas-prometheus" deleted
role.rbac.authorization.k8s.io "openfaas-prometheus" deleted
role.rbac.authorization.k8s.io "openfaas-prometheus-fn" deleted
rolebinding.rbac.authorization.k8s.io "openfaas-prometheus" deleted
rolebinding.rbac.authorization.k8s.io "openfaas-prometheus-fn" deleted
service "prometheus" deleted
deployment.apps "queue-worker" deleted
```

清理函数命名空间 `openfaas-fn`

``` bash
➜ kubectl delete namespace openfaas-fn
namespace "openfaas-fn" deleted
```

清理框架命名空间 `openfaas`

``` bash
➜ kubectl delete namespace openfaas
namespace "openfaas" deleted
```

