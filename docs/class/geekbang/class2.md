# 安全攻防技能 30 讲

![安全攻防知识全景图](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class1/1-1.jpg)

## 安全原则

- 机密性 (Confidentiality)
- 完整性 (Integrity)
- 可用性 (Availability)

## 黄金法则

- 认证 (Authentication) `事前防御`
- 授权 (Authorization) `事中防御`
- 审计 (Audit) `事后防御`

## 密码学算法

1. 对称加密算法


![安全攻防知识全景图](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class1/1-2.jpg)


![安全攻防知识全景图](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class1/1-3.jpg)


2. 非对称加密算法

![安全攻防知识全景图](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class1/1-4.jpg)

![安全攻防知识全景图](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class1/1-5.jpg)

**非对称密钥主要解决密钥分发的难题**

3. 散列算法

**多数场景中，使用散列并不是为了满足加密需求，而是利用它可以对任意长度的输入，计算出一个定长的id，并且不可逆**

![安全攻防知识全景图](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class1/1-6.jpg)

**黑客往往会提前计算一个彩虹表来提升暴力破解散列值的效率，而我们能够通过加“盐”进行对抗。“盐”值越长，安全性就越高。**

## 身份认证

1. 认证场景

- 对外认证
- 对内认证

2. 账号统一管理 - 单点登陆

- CAS流程
- JWT（JSON Web Token）
- OAuth（Open Authorization）
- OpenID（Open Identity Document）

## 访问控制

常见 `4` 种访问控制机制

1. `DAC`（Discretionary Access Control，自主访问控制）

**客体的所有者定义访问控制规则**

2. `role-BAC`（role Based Access Control，基于角色的访问控制）
3. `rule-BAC`（rule Based Access Control，基于规则的访问控制）
4. `MAC`（Mandatory Access Control，强制访问控制）

![安全攻防知识全景图](http://cdn.chemputer.top/notebook/classnotebook/geekbang/class1/1-7.jpg)