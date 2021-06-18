# Linux

## Ubuntu

``` bash
# 查看指定端口的进程
lsof -i:port
#COMMAND - 进程名
#PID - 进程标识符
#USER - 进程所有者
#FD - 文件描述符
#TYPE - 文件类型
#DEVICE - 指定磁盘名称
#SIZE/OFF - 文件大小
#NODE - 索引节点
#NAME - 打开文件的确切名称


# 根据PID杀进程
kill -9 PID

# 新增用户
adduser chemputer

# 删除用户
userdel -r chemputer

# 踢出已经登陆的用户
pkill -kill -t pts/0



```















## CentOS


