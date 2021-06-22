# Grafana

[官方网站](https://grafana.com/)

## 安装

### CentOS

``` bash
wget https://dl.grafana.com/oss/release/grafana-8.0.3-1.x86_64.rpm
sudo yum install grafana-8.0.3-1.x86_64.rpm
```


### Ubuntu

``` bash
sudo apt-get install -y adduser libfontconfig1
wget https://dl.grafana.com/oss/release/grafana_8.0.3_amd64.deb
sudo dpkg -i grafana_8.0.3_amd64.deb
```

## 启动服务

``` bash
sudo systemctl daemon-reload
sudo systemctl start grafana-server
sudo systemctl status grafana-server
sudo systemctl enable grafana-server.service # 配置开机自启动
```

## 配置文件

``` bash
vi  /etc/grafana/grafana.ini
```


## 访问页面并登陆

通过 `http://yourIP:3000`可以查看默认页面，默认的用户名密码是 `admin`

## 添加prometheus数据源

把`prometheus`服务器收集的数据作为一个数据源添加到`grafana`，让`grafana`可以得到`prometheus`的数据