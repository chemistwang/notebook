# linux学习笔记 【centos】

## 一、命令

- 1. 文件处理命令

``` 
ls 
ls -a
ls -l # 长格式，详细信息
ls -ld # 查看目录本身信息
ls -lh # 人性化选项
ls -i # 查看i节点
# 隐藏文件的设计初衷是告诉用户这是系统文件，如不需要不要操作
-rw-r--r-- 
# d 目录 l 软链接
u => 所有者
g => 所属组
o => 其他人
r => read w => write x => execute

mkdir -p # 递归创建
cp -rp SRC DIST #-r 复制目录 -p 保留文件属性

mv # 剪切 改名

rm -rf # -r 删除目录 -f 强制执行

cat -n # -n 显示行号
tac # 反向查看
more /etc/services # enter换行 q退出 f翻页
less /etc/services # 比more相比，可以向上翻页，并支持搜索
head -n 20 /etc/services # 默认10行 看开头
tail -n 20 /etc/services # 默认10行 看结尾
tail -f /var/log/messages # 动态显示

ln -s /etc/issue /tmp/issue.soft # 创建软链接(类似快捷方式)
# 特点：
1. lrwxrwxrwx => 文件权限全开
2. 文件小
3. 有 -> 箭头指向
4. 原文件丢失，不能访问

ln /etc/issue /tmp/issue.hard # 创建硬链接
# 特点：
1. 同步更新，相当于 （cp -p + 同步更新）
2. 原文件丢失，也能访问
3. 不能跨分区
4. 不能针对目录使用

# 判断软硬链接 可以通过 i 节点
# 软链接 i 节点跟原文件不同
# 硬链接 i 节点与原文件相同

```

- 2. 权限管理命令

```
chmod u+x xxxx # 所有者增加x权限
chmod g+w,o-r xxxx # 所属组增加w权限，其他用户减少r权限
chmod g=rwx xxxx
chmod -R 777 xxxx # 递归修改


chown someuser xxx # 改变文件的所有者
chgrp someuser xxx # 改变文件所属组

umask -S 以rwx形式显示新建文件缺省权限
# 新建文件没有x
# 新建目录有x 可以进入目录
```

```
# 重点理解
r => 读权限 => 可以查看文件内容 => 可以列出目录中的内容
w => 写权限 => 可以修改文件内容 => 可以在目录中创建，删除文件（*）
x => 执行权限 => 可以执行文件 => 可以进入目录
```

- 3. 文件搜索命令(减少搜索，在服务器中会占用大量的系统资源)

```
# 在服务器高峰期间，不建议使用搜索命令
# 搜索条件越精准越好

find /etc -name init # 在目录中 /etc 查找文件 init, 精准搜索
find /etc -name *init* # 模糊搜索
find /etc -name init?? # 匹配2个字符
# -iname 不区分大小写
# *匹配任意字符，?匹配单个字符

find / -size +204800 # 在根目录查找大于100MB的文件
# 一个数据块 = 512 字节 = 0.5k
# +n >
# -n <
# n =

find /home -user xxx # 在根目录查找所有者为 xxx的文件
# -group 根据所属组查找


find /etc -cmin -5 # 在/etc下查找5min内被修改过属性的文件和目录
# -amin 访问时间 access
# -cmin 文件属性 change
# -mmin 文件内容 modify


which cp # 搜索命令所在目录及别名信息
whhereis cp # 搜索命令所在目录及帮助文档路径
grep mysql /root/install.log # 在文件中搜索字符串匹配并输出
grep -v ^# /etc/inittab # 过滤行首有#的行
# -i 不区分大小写
# -v 排除指定字符串
```


- 4. 帮助命令

```
# 在使用man进行手册浏览的时候，其实是调用了more方法
man ls # 查看ls命令的帮助信息
man services # 查看配置文件services的帮助信息,不需要加绝对路径
man passwd # 显示的是命令的帮助，passwd.1.gz 表示命令的帮助 passwd.5.gz 表示配置的帮助
whatis ls # 显示命令的简短信息
apropos # 显示配置文件的简短信息
info date # 另一种帮助命令

help umask # 获得shell内置命令的帮助信息
type umask # 查看命令是否为内置命令，umask 是 shell 内嵌
```

- 5. 用户管理命令

```
useradd # 添加新用户
passwd # 设置用户密码
who # 查看登录用户信息
# tty 本地终端
# pts 远程终端
uptime # 查看本机持续运行多长时间
w # 查看详细信息
# IDLE 空闲时间
```

- 6. 压缩解压命令

```
gzip # 压缩命令 （只能压缩文件，并且压缩之后不保留原文件）
gunzip # 压缩解压命令

tar # 打包目录
# -c 打包 建立
# -x 解包
# -v 显示详细信息
# -f 指定文件名
# -z 打包同时压缩/解压缩
tar -cvf test.tar test # 指定压缩后的文件名test.tar  指定目录test
tar -zcvf test.tar.gz test
tar -zxvf test.tar.gz


zip -r # 压缩目录
unzip

bzip2
bunzip2
```

- 7. 网络命令

```
write <user> # 给在线用户发信息
wall <message> # 发广播信息 (write all)
ping -c 24 IP # ping 24次
ifconfig
last # 列出目前与过去登入系统的用户信息
lastlog 
traceroute www.baidu.com # 显示数据包到主机间的路径

netstat # 显示网络相关信息
# -t TCP协议
# -u UDP协议
# -l 监听
# -r 路由
# -n 显示IP地址和端口号
netstat -tlun # 查看本机监听的端口
netstat -an # 查看本机所有的网络连接
netstat -rn # 查看本机路由表

setup # 配置网络
mount # 挂载命令
```

- 8. 关机重启命令

```
shutdown
shutdown -c # 取消前一个关机命令
shutdown -h # 关机
shutdown -r now # 重启 reboot

reboot

# 系统运行级别
# 0 关机
# 1 单用户 => 启动最小的核心程序
# 2 不完全多用户，不含NFS服务
# 3 完全多用户
# 4 未分配
# 5 图形界面
# 6 重启
```

## 二、软件包

- 1. 软件包管理简介

```
# 软件包分类
# 源码包（看到源代码） =》 脚本安装包 
# 优点：
# - 开源
# - 可以自由选择所需功能
# - 软件是编译安装，更加适合自己的系统，更加稳定，效率更高
# - 卸载方便
# 缺点：
# - 安装过程较多，尤其是环境搭建
# - 编译过程时间较长，安装比二进制安装时间长
#
# 二进制包 =》（RPM包，系统默认包）（编译过的包，安装时间短）
# 优点：
# - 包管理系统简单，通过简单命令实现包的安装，升级，查询和卸载
# - 安装速度比源码包安装快
# 缺点：
# - 经过编译，不能看到源代码
# - 功能选择不如源码包灵活
# - 依赖性
```

- 2. RPM包管理-rpm命令管理

```
httpd-2.2.15-15.el6.centos.1.i686.rpm
# httpd 软件包名
# 2.2.15 软件版本
# 15 软件发布次数
# el6.centos 适合的linux平台
# i686 适合的硬件平台
# rpm rpm包扩展名


# RPM包依赖性
# 树形依赖： a => b => c
# 环形依赖： a => b => c => a
# 模块依赖： www.rpmfind.net (模块依赖查询网站)

```

- 3. RPM包管理-yum在线管理 （解决一部分的依赖性）

```
vi /etc/yum.repos.d/CentOS-Base.repo # yum源
yum list # 查询所有可用软件包列表
yum search xxx # 搜索服务器上所有和关键字相关的包
yum -y install <packageName> # 安装
yum -y remove <packageName> # 卸载


yum grouplist # 列出所有可用的软件组列表
yum groupinstall <groupname> # 安装指定软件组，组名可以由grouplist查询
yum groupremove <groupname> # 卸载指定软件组
```

- 4. 源码包管理

```
# RPM包安装位置
# /etc/             配置文件安装目录
# /usr/bin/         可执行命令安装目录
# /usr/lib/         程序所使用的函数库保存位置
# /usr/share/doc/   基本的软件使用手册保存位置
# /usr/share/man/   帮助文件保存位置


# 源码包安装位置
# /usr/local/<softwarename>/ # 一般安装指定位置

----------------------

# RPM包安装的服务可以使用系统服务管理命令（service）
# eg: (rpm包安装的apache启动方法)
# /etc/rc.d/init.d/httpd start 
# service httpd start

# 源码包安装的服务不能被服务管理命令管理，因为没有安装到默认路径中，所以只能用绝对路径进行服务管理

---------------------


# 源码包安装apache案例
# 源代码保存为止 /usr/local/src
# 软件安装位置 /usr/local/
# - 1. yum install -y gcc # 安装c语言编译器
# - 2. tar -zvxf httpd-2.4.43.tar.gz #解压
# - 3. cd httpd-2.4.43
# - 4. vi INSTALL # 查看安装说明
# > ./configure作用 | 
#   a.定义所需要的功能选项
#   b.检测系统环境是否符合安装要求
#   c.把定义好的功能选项和检测系统环境的信息都写入Makefile文件，用于后续的编辑
# - 5. make # 编译 （make clean可以清空失败编译产生的临时文件）
# - 6. make install # 编译安装 （这一步是真正安装写入数据）


---------------------
# 源码包不需要卸载命令，直接删除安装目录即可，不会遗留任何垃圾文件
```

## 三、用户和用户组管理

- 1. 用户配置文件

```
# 越对服务器安全性要求高的服务器，越需要建立合理的用户权限等级制度和服务器操作规范
# linux中主要通过用户配置文件来查看和修改用户信息

---------------------
# 用户信息文件 /etc/passwd
# 1：用户名称
# 2：密码标志 | x 表示该用户有密码，存储在/etc/shadow（若删除，则默认直接登录，但是只能本地，不支持ssh）
# 3：UID | 0：超级用户 | 1-999：系统用户（伪用户）| 1000-65535：普通用户
# 4: GID 用户初始组ID
# 5: 用户说明，备注
# 6: 家目录 | 超级用户 /root/ | 普通用户 /home/<username>/
# 7: 登录之后的shell (标准shell /bin/bash)

# 初始组：指用户一登录就立刻拥有这个用户组的相关权限
# 附加组：用户可以加入多个其他用户组并拥有权限

---------------------
# 影子文件 /etc/shadow
# 1: 用户名
# 2：加密密码 | 若为'!!' '*',表示没有密码不能登录
# 3：密码最后一次修改日期 （1970/1/1为标准时间，每过一天时间 +1）
# 4：2次密码修改间隔时间（和第3字段相比，eg：若为10则表示10天间隔之后才允许该密码）
# 5. 密码有效期 （和第3字段相比）
# 6. 密码修改到期前的警告天数（和第5字段相比， eg：密码有效期设为90，警告天数设为7，表示第83天开始，每次登陆都会提示修改密码）
# 7. 密码过期后的宽限天数（和第5字段相比）| 0：表示密码过期立即失效，等同于不写 | -1：密码永远不会失效
# 8. 账号失效时间 | 用时间戳表示
# > 时间戳换算
# date -d "1970-01-01 16066 days" # 时间戳换算日期
# echo $(($(date --date="2014/01/06" +%s)/86400+1)) # 日期换算时间戳
# 9. 保留字段

---------------------
# 组信息文件 /etc/group 

# 1. 组名
# 2. 组密码标志
# 3. GID
# 4. 组中附加用户
---------------------
# 组密码文件 /etc/gshadow

# 1. 组名
# 2. 组密码
# 3. 组管理员用户名
# 4. 组中附加用户
```

- 2. 用户管理相关文件

```
# 普通用户  # /home/<username> 权限700
# 超级用户  # /root/ 权限550
# 用户邮箱  # /var/spool/mail/<username>
# 用户模板  # /etc/skel/       # ls -a /etc/skel/ 查看
```

- 3. 用户管理命令

```
useradd

---------------------
# /etc/default/useradd
# GROUP=100             # 用户默认组
# HOME=/home            # 用户家目录
# INACTIVE=-1           # 密码过期宽限天数
# EXPIRE=               # 密码失效时间
# SHELL=/bin/bash       # 默认shell
# SKEL=/etc/skel        # 模板目录
# CREATE_MAIL_SPOOL=yes # 是否建立邮箱


---------------------
# /etc/login.defs

---------------------

```

- 4. 用户组管理命令



## 四、Shell基础

- 1. shell概述

```
shell一个命令行解释器，为用户提供一个向linux内核发送请求一别运行程序的界面系统级程序；
shell还是一个强大的编程语言，解释执行的脚本语言，在shell中可以直接调用linux系统命令

---------------------
shell两种主要语法类型Bourne和C,两种语法彼此不兼容
Bourne:sh,ksh,Bash,psh,zsh
C:csh,tcsh
Bash与sh兼容，现在使用的linux就是使用Bash作为用户的基本Shell

---------------------
linux支持的shell /etc/shells
```

- 2. shell脚本的执行方式

```
#!/bin/bash
echo "hello world"

---------------------
# 脚本执行
# 1. 赋予执行权限，直接运行
# chmod 755 hello.sh
# ./hello.sh  # 通过绝对路径或者相对路径的方法执行
# 2. 通过bash调用执行脚本
# bash hello.sh 

---------------------
cat -A hello.sh # 查看隐藏字符
```

- 3. bash的基本功能

```
---------------------
# 历史命令与命令补全

history
-c 清空历史命令
-w 把缓存中的历史命令写入历史命令保存文件 ~/.bash_history
历史命令默认保存1000条，可以再环境变量配置文件/etc/profile中进行修改
HISTSIZE=1000


# 历史命令调用
# ↑ + ↓ 调用历史命令
# !n 重复执行第n条历史命令
# !! 重复执行上一条命令
# !字串 重复执行最后一条以该字串开头的命令


# Tab补全
---------------------
# 命令别名与常用快捷键

alias <alias> = <bash> # 设定命令别名
alias # 查询命令别名
unalias <alias> # 删除别名

# 命令执行时的顺序
# 1. 第一顺位执行用绝对路径或相对路径执行的命令
# 2. 第二顺位执行别名
# 3. 第三顺位执行bash内部命令
# 4. 第四顺位执行按照$PATH环境变量定义的目录查找顺序找到的第一个命令

# 别名永久生效
vi /root/.bashrc

# bash常用快捷键
# ctrl+a | 光标移动命令行开头 
# ctrl+e | ------------结尾
# ctrl+c | 强制终止当前命令
# ctrl+l | 清屏，相当于clear
# ctrl+u | 删除或剪切光标之前的命令
# ctrl+k | -------------后-----
# ctrl+y | 粘贴
# ctrl+r | 历史搜索
# ctrl+d | 退出当前终端
# ctrl+z | 暂停并放入后台
# ctrl+s | 暂停屏幕输出
# ctrl+q | 恢复屏幕输出

---------------------
# 输入输出重定向 （不再输出到屏幕，而是文件）

# 标准输入输出
# 设备    设备文件名    文件描述符   类型
# 键盘    /dev/stdin   0           标准输入
# 显示器   /dev/sdtout 1           标准输出
# 显示器   /dev/sdterr 2           标准错误输出

# 标准输出重定向
# ls >> test.txt # 追加
# ls > test.txt # 覆盖

# 标准错误输出重定向（在>/>>前补上数字2）
# haha 2> test.txt
# haha 2>> test.txt


# 正确输出和错误输出同时保存
# yourbash  > test.txt 2>&1
# yourbash >> test.txt 2>&1
# yourbash &>  test.txt
# yourbash &>> test.txt
# yourbash >> test1.txt 2>>test2.txt #把正确输出追加到test1.txt，把错误输出追加到test2.txt

# /dev/null 垃圾箱

# 输入重定向 wc

---------------------
# 多命令顺序执行

# ;  => <command1>;<command2>  => 多个命令顺序执行。命令之间没有任何逻辑关系
# && => <command1>&&<command2> => <command1>正确，则<command2>执行；若<command1>不正          确，则<command2>不执行
# || => <command1>||<command2> => <command1>不正确，则<command2>执行；若<command1>正确，则<command2>执行

---------------------
# 管道符 

# <command1>|<command2> => <command1>的正确输出作为<command2>的操作对象
# eg: ll -a /etc/ | more
#     netstat -an | grep "ESTABLISHED"


# grep [option] content filename #搜索出的关键字用颜色显示
[option] -i 忽略大小写
         -n 输出行号
         -v 反向查找
         --color=auto 
---------------------
# 通配符与其他特殊符号

# ?   => 匹配一个任意字符
# *   => 匹配任意字符（包括0个）
# []  => 匹配[]中任意一个字符 [abc]
# [-] => - 表示范围 [a-z]
# [^] => ^ 逻辑非，匹配不是中括号内的一个字符 [^0-9]
# '' => 解析为字符串
# "" => "$" 调用变量值 "`" 引用命令 "\" 转义符
# `` => 等同于 $()
# #  => shell脚本中，#开头表示注释
# $  => 用于调用变量的值
# \  => 转义符,在该符号之后的特殊符号会失去特殊含义

```


- 4. bash的变量

```
# 变量不能以数字开头
# 变量默认类型为字符串,若进行数值运算，则需要修改为数值型
# 用=连接值，左右两侧不能有空格
# 若变量值有空格，则需要使用''或""
# 变量值中，可以使用"\"转义符
# 用${x}来引用变量
# 用$()包含命令将命令结果作为变量值赋予变量
# 环境变量名建议大写，便于区分

---------------------
# 用户自定义变量

# set # 查看
# unset # 删除
# 该变量只在当前shell中生效，而环境变量会在当前shell和这个shell的所有子shell中生效
---------------------
# 环境变量：保存和系统操作环境相关的数据

# export a=b # 申明变量
# env # 查看
# unset # 删除


# PATH # 系统查找命令的路径
# PATH="$PATH":/root/sh # PATH变量叠加

# PS1 # 定义系统提示符的变量
---------------------
# 位置参数变量：向脚本当中传递参数或数据，变量名不能自定义，变量作用固定

# $n $0为命令本身，$1-$9表示1-9个参数，大于10的参数用${10},${11}...表示

./x.sh 1 2
#! /bin/bash

num1=$1
num2=$2
sum=$(($num1+$num2))
echo $sum

# $* 所有参数，将所有参数看成一个整体
# $@ 所有参数，每个参数区别对待
# $# 参数个数

#! /bin/bash
for i in "$*"
        do
                echo $i
        done
for y in "$@"
        do
                echo $y
        done
---------------------
# 预定义变量：Bash中已经定义好的变量，变量名不能自定义，变量作用也是固定

# $? 最后一次执行命令的返回状态，若为0表示正确执行，非0则不正确
# $$ 当前进程进程号 PID
# $! 后台运行的最后一个进程的进程号 PID

---------------------
# 接受键盘输入

read [-选项] [变量名]
-p "提示信息" 在等待read输入时，输出提示信息
-t "秒数" read会一直等待用户输入，使用此选项可以指定等待时间
-n "字符数" read命令接受指定的字符数，就会执行
-s 隐藏输入的数据，适用于机密信息的输入


#! /bin/bash

read -t 5 -p "please input your name: " name
echo "your name is $name"

read -s -t 5 -p "please input your age: " age
echo -e "\n"
echo "your age is $age"

read -n 1 -t 5 -p "please select your gender[M/F]: " gender
echo -e "\n"
echo "your sex is $gender"
```

- 5. bash运算符

```
# declare [+/-][选项] 变量名
- 给变量设定类型属性
+ 取消变量类型属性
-i 将变量声明为整数型（integer）
-x 将变量声明为环境变量
-p 显示指定变量的被声明的类型

declare -i c=$a+$b
```


- 6. 环境变量配置文件

```
---------------------
1) source 配置文件
2) . 配置文件
都可以使配置文件即时生效

---------------------
# 环境变量配置文件简介

# 所有用户都会读取文件
/etc/profile
    USER
    LOGNAME
    MAIL
    PATH
    HOSTNAME
    HISTSIZE
    umask
    调用/etc/profile.d/*.sh文件

/etc/profile.d/*.sh
/etc/bashrc
# 对当前用户有效
~/.bash_profile
    调用~/.bashrc
    添加 $HOME/bin 到 $PATH 变量
~/.bashrc
---------------------
# 环境变量配置文件作用




---------------------
# 其他配置文件和登录信息

~/.bash_logout 注销生效时的环境变量配置文件
~/.bash_history 历史命令
/etc/issue `本地`终端信息
    \d  显示当前系统日期
    \s  显示操作系统名称
    \l  显示登录终端号
    \m  显示硬件体系结构
    \n  显示主机名
    \o  显示域名
    \r  显示内核版本
    \t  显示当前系统时间
    \u  显示当前登录用户序列号
/etc/issue.net `远程`终端信息
    转义符在 /etc/issue.net 文件中不能使用
    是否显示由ssh配置文件/etc/ssh/sshd_config决定，加入 `Banner /etc/issue.net`才生效。记得重启ssh服务
/etc/motd
    登录后的信息，对于本地和远程，均生效
```

## 五、Shell编程

- 1. 基础正则表达式

```
# 正则表达式与通配符
# 正则表达式用来在文件中匹配符合条件的字符串，包含匹配，grep awk sed等命令支持正则
# 通配符用来匹配符合条件的文件名，完全匹配，ls find cp 不支持正则，只能用shell通配符匹配

*
.
^
&
[]
[^]
\
\{n\}
\{n,\}
\{n,m\}
```

- 2. 字符截取命令

```
cut [选项] 文件名
    -f 列号 提取第几列
    -d 分隔符 按照指定分隔符分割列
    cut -f 2,3 test.txt
    cut -d ":" -f 1,3 /etc/passwd
    
printf
awk
sed 轻量级流编辑器
```

- 3. 字符处理命令

```
sort [选项] 文件名
-f 
-n
-r
-t
-k n[,m]
```

- 4. 条件判断
- 5. 流程控制


## 五、服务分类

- 1. 服务简介与分类

```
linux服务 =》RPM包默认安装的服务 =》独立的服务
                             =》基于xinetd服务
        =》源码包安装的服务
        
        
# 启动与自启动
# 启动：当前系统中让服务运行，并提供功能
# 自启动：让服务在系统开机或重启之后，随着系统的启动而自动启动服务
```

- 2. RPM包安装服务的管理

```
/etc/init.d/ 启动脚本位置
/etc/sysconfig/ 初始化环境配置文件位置
/etc/ 配置文件位置
/etc/xinetd.conf xinetd配置文件
/etc/xinetd.d/ 基于xinetd服务的启动脚本
/var/lib/ 服务产生的数据
/var/log/ 日志
```

- 3. 源码包安装服务的管理
- 4. 服务管理总结


## 六、linux系统管理

- 1. 进程管理

```
# 概念：进程是正在执行的一个程序或命令，每一个进程都是一个运行的实体，都有自己的地址空间，并占用一定的系统资源

# 进程管理作用
# 判断服务器健康状态
# 查看系统中所有进程
# 杀死进程

ps aux #查看系统中所有进程，使用BSD操作系统格式
    USER 进程由哪个用户产生
    PID  进程ID号
    %CPU 占用CPU百分比，越高，越耗费资源
    %MEM 占用物理内存百分比，越高，越耗费资源
    VSZ  占用虚拟内存大小，单位KB
    RSS  占用实际物理内存大小，单位KB
    TTY  哪个终端运行 tty1-tty6 本地字符界面终端 tty7图形终端 pts/0-255虚拟终端
    STAT 进程状态，R 运行 S 睡眠 T 停止状态 s 包含子进程 + 位于后台
    START 该进程启动时间
    TIME 该进程占用CPU运算时间
    COMMAND 产生此进程的命令名
ps -le #--------------------linux标准命令格式

kill -l # 查看可用的进程信号
    1  SIGHUP   该信号让进程立即关闭，重新读取配置文件之后重启
    9  SIGKILL  用来立即结束程序的运行，本信号不能被阻塞，处理和忽略，一般用于强制终止进程
    15 SIGTERM  正常结束进程信号，默认信号
kill -1 11242 # 重启进程
kill -9 12323 # 强制杀死进程
pstree -p | grep httpd

killall [选项][信号]进程名 # 按照进程名杀死进程
killall -9 httpd

pkill [选项][信号]进程名 # 按照进程名终止进程
    -t 终端号，按照终端号踢出用户
w # 查询本机已经登录的用户
pkill -t -9 pts/1 # 强制杀死从pts/1虚拟终端登录的进程
    
    
```


- 2. 工作管理

```
# 把进程放入后台
&       tar -zcf etc.tar.gz /etc & 执行的命令之后加&，还在后台运行
ctrl+z  执行 挂起不运行

# 查看后台工作
jobs -l 显示工作pid # + 最近一个放入后台的工作，也是工作恢复时，默认恢复的工作
                   # - 表示倒数第二个放入后台的工作
                   
# 将后台暂停的工作恢复到前台执行
fg %工作号

# 把后台暂停的工作恢复到后台执行
bg %工作号         后台恢复执行的命令，不能喝前台有交互，否则不能恢复到后台执行
```

- 3. 系统资源查看

```
vmstat
dmesg
free
cat /proc/cpuinfo # 查看cpu信息
uptime # 显示系统的启动时间和平均负载，top命令第一行，w也能看到
uname [选项]
    -a 查看系统所有相关信息
    -r 查看内核版本
    -s 查看内核名称
file /bin/ls # 当前系统位数 (曲线查看)
lsb_release -a # 当前linux系统发行版本
lsof [选项] # 列出进程调用或打开的文件信息
    -c 字符串：只列出以字符串开头的进程打开的文件
    -u 用户名：只列出某个用户的进程打开的文件
    -p pid: 列出某个PID进程打开的文件



# 缓存缓冲
# 缓存 cache 加速数据读取
# 缓冲 buffer 加速数据写入
```

- 4. 系统定时任务

```
crond服务
crond [选项]
    -e 编辑crontab定时任务
    -l 查询crontab任务
    -r 删除当前用户所有的crontab任务

eg: */5 * * * * /bin/echo "11" >> /tmp/test
    5 5 * * 2 /sbin/shutdown -r now
    0 5 1,10,15 * * /root/sh/autobak.sh
```

## 七、日志管理

- 1. 日志管理简介
- 2. rsyslogd日志服务

```
# 确定服务启动
ps aux | grep rsyslogd # 查看服务是否启动

/var/log/cron       # 记录系统定时任务相关日志
/var/log/cups       # 记录打印信息日志
/var/log/dmesg      # 记录系统开机内核自检信息
/var/log/btmp       # 记录错误登录日志，该文件是二进制，不能直接vi查看，要使用lastb查看
/var/log/lastlog    # 记录系统中所有用户最后一次的登录时间日志，该文件同上，要用lastlog查看
/var/log/maillog    # 记录邮件信息
/var/log/message    # 记录系统重要信息日志，这个日志文件中会记录linux系统绝大多数重要文件，若系统出现问题，首要检查这个日志文件
/var/log/secure     # 记录验证和授权方面信息，只要涉及账户密码的程序都会记录
/var/log/wtmp       # 永久记录所有用户登录，注销信息，同时记录系统的启动，重启，关机，是二级制，需要用last查看
/var/log/utmp       # 记录当前已经登录的用户信息，该文件会随着用户登录注销不断变化，只记录当前登录用户信息，需要用w,who,users等命令查询


# 日志文件格式
# 1- 时间产生时间
# 2- 发生事件的服务器主机名
# 3- 产生事件的服务名或程序名
# 4- 事件的具体信息

# /etc/rsyslog.conf配置文件
# eg: authpriv.*                                              /var/log/secure
      cron.*                                                  /var/log/cron

# 服务名称
auth        安全和认证相关消息（不推荐使用authpriv替代）
authpriv    安全和认证相关消息（私有的）
cron        系统定时任务cront和at产生的日志
daemon      和各个守护进程相关的日志
ftp         ftp守护进程相关的日志
kern        内核产生的日志（不是用户进程产生的）
local0-local7   为本地使用预留的服务
lpr         打印产生的日志
mail        邮件收发信息
news        与新闻服务器相关的日志
syslog      
user        用户等级类别的日志信息
uucp
```

- 3. 日志轮替

```
# 日志切割
# 日志轮换（旧的删除）

# 若配置文件中有"dateext"参数，则日志会用日期来作为日志文件的后缀。这样日志文件名不会重叠，只需要保存指定的日志个数，删除多余的日志文件即可
# 若--------没有------------,secure=》secure.1

# 配置文件 /etc/logrotate.conf
```

## 八、启动管理

## 九、备份与恢复

```
# liunx需要备份的数据
/root/
/home/
/var/spool/mail/
/etc/
...

# 备份策略
# 完全备份 => 备份数据多，恢复方便
# 增量备份 => 备份的数据少，但是恢复慢
# 差异备份（折中）=> 跟第一次备份相比


# dump restore
```


