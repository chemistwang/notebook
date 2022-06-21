# Serverless

## Serverless 领域开源项目现状

- 现有开源FaaS项目：绝大多数启动较早，大部分都在 Knative 出现前已经存在
- Knative：非常杰出的 Serverless平台， Knative Serving 仅仅能运行应用，不能运行函数，还不能称之为 FaaS 平台
- Knative Eventing：非常优秀的事件管理框架，但设计有些过于复杂，用户用起来有一定门槛
- OpenFaas：比较了流行的 FaaS 项目，但是技术栈有点老旧，依赖于 Prometheus 和 Alertmanager 进行 Autoscaling，也并非最专业和敏捷的做法
- 近年来云原生 Serverless 相关领域陆续涌现出了很多优秀的开源项目
    - KEDA、Dapr
    - Cloud Native Buildpacks（CNB）、Tekton、Shipwright

    