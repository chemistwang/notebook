# Linux初始化部署

## 规则

- 禁止使用 `root` 用户登陆

## 新建用户

``` bash
# 新增用户
useradd YOUR_USER

# 设置用户密码
passwd YOUR_USER

# 查看用户
cat /etc/passwd

# 配置用户免密码使用sudo权限
chmod 660 /etc/sudoers
vi /etc/sudoers 

# 给予用户权限
## Allow root to run any commands anywhere
root  ALL=(ALL)   ALL
YOUR_USER   ALL=(ALL)       NOPASSWD:ALL (其实不建议)

# 禁止 bash_history


# 配置rsa密钥登录
ssh-keygen -t rsa -b 4096

# 创建.ssh 文件夹 和 authorized_keys
mkdir .ssh
cd .ssh
touch authorized_keys

# 设置.ssh authorized_keys 文件权限
chmod 700 .ssh
chmod 600 authorized_keys

# 否则常见的登录失败原因：
# vi /var/log/secure
# Dec  8 18:07:56 host-192-168-12-174 sshd[9733]: Authentication refused: bad ownership or modes for directory /home/xxx/.ssh

# sshd为了安全，对属主的目录和文件权限有要求。若权限不对，则ssh的免密码登录不生效，还需要输入密码才行。
```

## 安装数据库

``` bash
# 安装postgresql数据库

[参考链接](https://www.postgresql.org/download/linux/redhat/)

sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
sudo yum install -y postgresql12-server
sudo /usr/pgsql-12/bin/postgresql-12-setup initdb
sudo systemctl enable postgresql-12
sudo systemctl start postgresql-12

# 切换用户
sudo su postgres

# 进入数据库命令终端
psql

# 创建用户及数据库
postgres=# CREATE USER YOUR_USER WITH PASSWORD 'X2ed6zvSW9l';
CREATE ROLE
postgres=# CREATE DATABASE hwkx OWNER YOUR_USER;
CREATE DATABASE

# 修改 pg_hba.conf 方式，否则连接数据库会报错 
 (node:30999) UnhandledPromiseRejectionWarning: SequelizeConnectionError: 用户 "YOUR_USER" Ident 认证失败

sudo su postgres
vi /var/lib/pgsql/12/data/pg_hba.conf 

# 修改 ident => md5
# IPv4 local connections:
#host    all             all             127.0.0.1/32            ident
host    all             all             127.0.0.1/32           md5

# 重启postgresql
sudo systemctl restart postgresql-12
```

## 安装node环境

``` bash
# 下载node
wget https://nodejs.org/download/release/v12.12.0/node-v12.12.0-linux-x64.tar.gz

# 解压
sudo tar -zxvf node-v12.12.0-linux-x64.tar.gz -C /opt/

# 重命名
sudo mv /opt/node-v12.12.0-linux-x64/ /opt/node

# 当前用户配置环境变量
vi ~/.bash_profile

## 新增node环境变量
PATH=$PATH:$HOME/.local/bin:$HOME/bin:/opt/node/bin

# 生效
source ~/.bash_profile

# 安装pm2
sudo npm install pm2 -g 

# 会报错 sudo: npm：找不到命令
# 原因：出于安全考虑，使用sudo执行命令将在一个最小化的环境中执行，环境变量都重置为默认状态。所以这个PATH这个变量不包括用户自定义设置的内容。
# 在sudo用户的主目录里.bashrc中添加如下内容即可解决

vi ~/.bashrc

## 新增
alias sudo="sudo env PATH=$PATH"

# 生效之后再执行安装即可
source .bashrc
```

## 配置nginx

``` bash
# 配置nginx

#手动创建nginx属主和nginx属组
groupadd nginx
useradd nginx -g nginx -s /sbin/nologin -M

# 安装nginx
sudo yum install epel-release
sudo yum update
sudo yum install -y nginx
```
