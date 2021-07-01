# Docker镜像版本

::: tip 背景
在选择 `node` 镜像的时候，在 `Docker Hub` 里面发现了多个 `node tag`
:::


## 分类

官方对此分了三大类

- `node:<version>`

`Dockerfile` 中 `FROM buildpack-deps:buster` 或 `FROM buildpack-deps:stretch`

基于`Debian`，官方默认镜像。不确定用什么就选这个。

- `node:<version>-slim`

`Dockerfile` 中 `FROM debian:buster-slim` 或 `FROM debian:stretch-slim`

基于`Debian`，删除很多默认软件包，只有node运行最小环境。除非有空间限制，否则推荐使用默认镜像。

- `node:<version>-alpine`

`Dockerfile` 中 `FROM alpine`

基于`alpine`，比`Debian`小的多。若想要最小的镜像，可以选择这个作为base。需要注意的是，`alpine`使用`musl`代替`glibc`。

::: tip
- Debian 10（buster） — 当前的稳定（stable）版
- Debian 9（stretch） — 旧的稳定（oldstable）版，现有长期支持
- Debian 8（jessie） — 更旧的稳定（oldoldstable）版，现有扩展长期支持
- Debian 7（wheezy） — 被淘汰的稳定版
- Debian 6.0（squeeze） — 被淘汰的稳定版
:::

## 对比

- 镜像体积

```bash
➜  ~ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node                12-slim             af884f8cad1e        7 days ago          142MB
node                12                  42bff2591ccb        7 days ago          918MB
node                12-alpine           deeae3752431        2 months ago        88.9MB
```

- 镜像资源占用状态

``` bash
# 分别启动三个不同镜像
docker run -it -d --name node-slim af884f8cad1e /bin/bash
docker run -it -d --name node 42bff2591ccb /bin/bash
docker run -it -d --name node-alpine deeae3752431 sh # 你会发现alpine是没有/bin/bash的
```

``` bash
➜  ~ docker stats
CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT   MEM %               NET I/O             BLOCK I/O           PIDS
8c7d07855c14        node-alpine         0.00%               408KiB / 1.943GiB   0.02%               866B / 0B           0B / 0B             1
27363e3c52a2        node                0.00%               928KiB / 1.943GiB   0.05%               936B / 0B           0B / 0B             1
7e627583addd        node-slim           0.00%               884KiB / 1.943GiB   0.04%               1.12kB / 0B         0B / 0B             1
```
