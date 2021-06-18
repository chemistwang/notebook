# 插件

prometheus使用插件可以使它的功能更为强大

## node_exporter

1. 安装

``` bash
wget https://github.com/prometheus/node_exporter/releases/download/v1.1.2/node_exporter-1.1.2.linux-amd64.tar.gz
```

2. 解压 

``` bash
tar -zxvf node_exporter-1.1.2.linux-amd64.tar.gz -C /opt/module/
```

3. 启动

``` bash
cd /opt/module/node_exporter-1.1.2.linux-amd64
nohup ./node_exporter &
```

4. 检查启动状态

```bash
lsof -i:9100
```

5. 访问页面

通过 `http://yourIP:9100`可以查看到 `node_exporter` 收集到到信息

6. 添加到prometheus配置项中

``` bash
vi /opt/module/prometheus-2.27.1.linux-amd64/prometheus.yml

# 添加配置项
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    static_configs:
    - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    static_configs:
    - targets: ['localhost:9100']
```

7. 重启 prometheus 服务

``` bash
pkill prometheus 
lsof -i:9090 # 确认端口没有进程占用
cd /opt/module/prometheus-2.27.1.linux-amd64
./prometheus --config.file=prometheus.yml & 
lsof -i:9090 # 确认端口占用，重启成功
```

8. 访问 prometheus 页面

Status => Targets

多了一项监控目标