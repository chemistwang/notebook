jenkins...


## webhook

1. 在coding中配置webhook
2. 







### ## jenkins



### 在docker中安装jenkins

1. docker pull jenkins/jenkins
2. docker run -d --name myjenkins -p 8080:8080 -v ~/Desktop/myjenkins:/var/jenkins_home jenkins/jenkins
3. 输入管理员密码
4. 更换jenkins源 https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/current/update-center.json
5. 或者不用下载，直接挂载nas中的数据卷
6. 全局工具配置中配置git地址 /usr/bin/git