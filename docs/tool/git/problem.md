# 问题

## Gitee 多账号添加公钥

有多个 `Gitee` 账号时，本地的公钥只能配置给一个 Gitee 账号，又不能影响已配置的公钥文件

1.  新增 `config` 文件，`Host` 分别配置不同的名字 `gitee.com` 和 `gitee_dev.com` 指向不同文件

```bash {4,9}
vi ~/.ssh/config

# gitee myself
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
# gitee dev
Host gitee_dev.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_dev
```

2. 将 `clone` 地址改为 `config` 文件配置好的 `Host`

```bash
# before
git clone git@gitee.com:xxx/xxx.git
# after
git clone git@gitee_dev.com:xxx/xxx.git
```
