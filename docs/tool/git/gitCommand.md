# 基础

::: tip 学习资料
[git](https://git-scm.com/)

[learngitbranching](https://learngitbranching.js.org/?locale=zh_CN)
:::

## 常用

``` bash
# 通用
git status # 查看仓库当前状态
git reflog # 查看命令历史（即使关机）
git branch # 查看当前分支
git branch yourBranch # 创建分支
git checkout yourBranch # 切换分支
git checkout -b yourBranch # 创建并切换分支

# 日志
git log # 查看从最近到最远的提交日志
git log --pretty=oneline # 简洁日志


# working directory <-> staging area
git add yourFileName # working directory -> staging area


# staging area <-> local repository
git commit -m 'your commit log' # staging area -> local repository

# remote repository <-> local repository
```


## 仓库相关

``` bash


git diff yourFilename # 比对不同

git diff HEAD -- yourFilename # 查看工作区和版本库最新版本区别

git restore yourFileName # 新版本中丢弃工作区修改

git reset HEAD yourFileName # 把暂存区的修改撤销掉，重新放回工作区

git reset --hard HEAD^ # git回退到上一个版本
 
git reset --hard yourVersionNumber # git回退到指定版本
 


git rm yourFileName # 从版本库中删除文件
```

## 分支相关

``` bash
git merge yourBranch # 合并指定分支到当前分支

git clone -b yourBranchName yourBranch yourDirName # 指定文件夹克隆指定分支
```


