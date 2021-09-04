# 标准化助力 DevOps 转型

## DevOps 转型难点与目标

- DevOps 涉及范围很广

![范围广](http://cdn.chemputer.top/notebook/classnotebook/tencentcloud/class2/2-1.jpg)

- DevOps 转型目标

  1. 缩短前置事件
  2. 加快部署频率
  3. 提高系统可用性
  4. 减少服务恢复时间
  5. 降低变更失败率

## 标准化的关注点

- 标准化的关注点

![标准化的关注点](http://cdn.chemputer.top/notebook/classnotebook/tencentcloud/class2/2-2.jpg)

- 标准化的目的

实现自动化（集成自动化 + 部署自动化 + 测试自动化 + 运维自动化）

## 需求标准化

![需求标准化](http://cdn.chemputer.top/notebook/classnotebook/tencentcloud/class2/2-3.jpg)

业务敏捷前提（`INVEST` 原则）

- `I`ndependent
- `N`egotiable
- `V`aluable
- `E`stimable
- `S`mall
- `T`estable

## 编码过程标准化

测试驱动开发

- 面向接口

  1. 接口名称
  2. 接口协议
  3. 接口参数名称/类型
  4. 接受条件

- 关注数据

  1. 输入数据
  2. 输出结果

- 针对引用的相对复杂业务逻辑的其他服务，需使用 mock 工具，减少依赖

  > Jmockit

- 每个测试用例的测试场景需完整注释

## 环境配置文件标准化

## CICD 流程标准化

![CICD流程标准化](http://cdn.chemputer.top/notebook/classnotebook/tencentcloud/class2/2-4.jpg)

- Jenkins 服务标准化

## 环境标准化

## 标准化总结

1. 需求敏捷化是起点
2. `TDD` 开发模式是快速迭代开发时代保障软件质量基线的有效手段
3. 注重环境配置文件的标准化，保证程序的可测试性
4. 研发流程的标准化是建立自动化 `CICD` 流程的前提，而 `CICD` 流程的自动化是实现 `DevOps` 的关键点
5. `Jenkins` 是实现 `CICD` 流程的有效工具，但是在处理复杂业务场景时还需要有其他合适工具的帮衬
6. 服务器运行环境的标准化，可以促进流程脚本的标准化
