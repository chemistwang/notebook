# Gitflow

[A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

不要直接在`master`分支提交代码，只能在该分支进行合并操作

日常开发：从`master`拉一条`develop`分支，该分支所有人都可访问（一般情况，不在该分支提交代码，而是从其他分支合并）

开发新特性：从`develop`拉取`feature-1`，`feature-2`等分支

发布版本：特性开发完毕，决定发布版本，从 `develop` 拉取 `release` 分支，并将所需特性 `feature`分支合并到 `release`，随后针对 `release` 进行部署，测试，修改bug。无bug后，将 `release` 分支部署到生产环境，待上线之后，将 `release` 合并到 `develop` 和 `master` 分支上，并在 `master`分支上打一个 tag

线上bug: 生产出现bug后，从对应tag上拉一条 `hotfix` 分支，进行修复， 修复后， 将 `hotfix` 合并到 `develop` 和 `master` 上


版本号要求:
格式为x.y.z
x: 重大重构时才会升级
y: 用于新特性发布升级
z: 用于修改某个bug升级


开发流程：
1. 项目组长建立仓库 `git flow init`
2. 成员进行clone `git clone`
3. 项目组长分配里程碑与议题（任务）
4. 项目成员根据自己任务建立对应分支 `git flow feature start xxx`
5. 完成任务进行提交 `git push origin`
6. pull request 删除分支, 关闭对应议题任务 `git flow feature finish xxx`


