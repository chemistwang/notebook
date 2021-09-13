# 源码

::: tip  参考资料
[Vue.js技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)

[Vue Template Explorer](https://template-explorer.vuejs.org/#%3Cdiv%20id%3D%22app%22%3E%7B%7B%20msg%20%7D%7D%3C%2Fdiv%3E)

[Vue Github](https://github.com/vuejs/vue)

[Bilibili 尤雨溪教你写vue](https://www.bilibili.com/video/BV1d4411v7UX?p=1)

[Bilibili 尤雨溪教你写vue 视频配套讲义](https://vue-course-doc.vercel.app/#_0-%E5%BE%AE%E4%BF%A1%E7%BE%A4)
:::


## 昂贵

`DOM is Expensive`

## 函数

`UI = f(state)`

## 工具

- 类型检查: [Flow](https://flow.org/)
- 打包: [Rollup](https://rollupjs.org/guide/en/)
- 代码覆盖率: [Istanbul](https://istanbul.js.org/) 

## 结构

``` bash
├── compiler
│   ├── codeframe.js
│   ├── codegen
│   │   ├── events.js
│   │   └── index.js
│   ├── create-compiler.js
│   ├── directives
│   │   ├── bind.js
│   │   ├── index.js
│   │   ├── model.js
│   │   └── on.js
│   ├── error-detector.js
│   ├── helpers.js
│   ├── index.js
│   ├── optimizer.js
│   ├── parser
│   │   ├── entity-decoder.js
│   │   ├── filter-parser.js
│   │   ├── html-parser.js
│   │   ├── index.js
│   │   └── text-parser.js
│   └── to-function.js
├── core
│   ├── components
│   │   ├── index.js
│   │   └── keep-alive.js
│   ├── config.js
│   ├── global-api
│   │   ├── assets.js
│   │   ├── extend.js
│   │   ├── index.js
│   │   ├── mixin.js
│   │   └── use.js
│   ├── index.js
│   ├── instance
│   │   ├── events.js
│   │   ├── index.js
│   │   ├── init.js
│   │   ├── inject.js
│   │   ├── lifecycle.js
│   │   ├── proxy.js
│   │   ├── render-helpers
│   │   │   ├── bind-dynamic-keys.js
│   │   │   ├── bind-object-listeners.js
│   │   │   ├── bind-object-props.js
│   │   │   ├── check-keycodes.js
│   │   │   ├── index.js
│   │   │   ├── render-list.js
│   │   │   ├── render-slot.js
│   │   │   ├── render-static.js
│   │   │   ├── resolve-filter.js
│   │   │   ├── resolve-scoped-slots.js
│   │   │   └── resolve-slots.js
│   │   ├── render.js
│   │   └── state.js
│   ├── observer
│   │   ├── array.js
│   │   ├── dep.js
│   │   ├── index.js
│   │   ├── scheduler.js
│   │   ├── traverse.js
│   │   └── watcher.js
│   ├── util
│   │   ├── debug.js
│   │   ├── env.js
│   │   ├── error.js
│   │   ├── index.js
│   │   ├── lang.js
│   │   ├── next-tick.js
│   │   ├── options.js
│   │   ├── perf.js
│   │   └── props.js
│   └── vdom
│       ├── create-component.js
│       ├── create-element.js
│       ├── create-functional-component.js
│       ├── helpers
│       │   ├── extract-props.js
│       │   ├── get-first-component-child.js
│       │   ├── index.js
│       │   ├── is-async-placeholder.js
│       │   ├── merge-hook.js
│       │   ├── normalize-children.js
│       │   ├── normalize-scoped-slots.js
│       │   ├── resolve-async-component.js
│       │   └── update-listeners.js
│       ├── modules
│       │   ├── directives.js
│       │   ├── index.js
│       │   └── ref.js
│       ├── patch.js
│       └── vnode.js
├── platforms
│   ├── web
│   │   ├── compiler
│   │   │   ├── directives
│   │   │   │   ├── html.js
│   │   │   │   ├── index.js
│   │   │   │   ├── model.js
│   │   │   │   └── text.js
│   │   │   ├── index.js
│   │   │   ├── modules
│   │   │   │   ├── class.js
│   │   │   │   ├── index.js
│   │   │   │   ├── model.js
│   │   │   │   └── style.js
│   │   │   ├── options.js
│   │   │   └── util.js
│   │   ├── entry-compiler.js
│   │   ├── entry-runtime-with-compiler.js
│   │   ├── entry-runtime.js
│   │   ├── entry-server-basic-renderer.js
│   │   ├── entry-server-renderer.js
│   │   ├── runtime
│   │   │   ├── class-util.js
│   │   │   ├── components
│   │   │   │   ├── index.js
│   │   │   │   ├── transition-group.js
│   │   │   │   └── transition.js
│   │   │   ├── directives
│   │   │   │   ├── index.js
│   │   │   │   ├── model.js
│   │   │   │   └── show.js
│   │   │   ├── index.js
│   │   │   ├── modules
│   │   │   │   ├── attrs.js
│   │   │   │   ├── class.js
│   │   │   │   ├── dom-props.js
│   │   │   │   ├── events.js
│   │   │   │   ├── index.js
│   │   │   │   ├── style.js
│   │   │   │   └── transition.js
│   │   │   ├── node-ops.js
│   │   │   ├── patch.js
│   │   │   └── transition-util.js
│   │   ├── server
│   │   │   ├── compiler.js
│   │   │   ├── directives
│   │   │   │   ├── index.js
│   │   │   │   ├── model.js
│   │   │   │   └── show.js
│   │   │   ├── modules
│   │   │   │   ├── attrs.js
│   │   │   │   ├── class.js
│   │   │   │   ├── dom-props.js
│   │   │   │   ├── index.js
│   │   │   │   └── style.js
│   │   │   └── util.js
│   │   └── util
│   │       ├── attrs.js
│   │       ├── class.js
│   │       ├── compat.js
│   │       ├── element.js
│   │       ├── index.js
│   │       └── style.js
│   └── weex
│       ├── compiler
│       │   ├── directives
│       │   │   ├── index.js
│       │   │   └── model.js
│       │   ├── index.js
│       │   └── modules
│       │       ├── append.js
│       │       ├── class.js
│       │       ├── index.js
│       │       ├── props.js
│       │       ├── recycle-list
│       │       │   ├── component-root.js
│       │       │   ├── component.js
│       │       │   ├── index.js
│       │       │   ├── recycle-list.js
│       │       │   ├── text.js
│       │       │   ├── v-bind.js
│       │       │   ├── v-for.js
│       │       │   ├── v-if.js
│       │       │   ├── v-on.js
│       │       │   └── v-once.js
│       │       └── style.js
│       ├── entry-compiler.js
│       ├── entry-framework.js
│       ├── entry-runtime-factory.js
│       ├── runtime
│       │   ├── components
│       │   │   ├── index.js
│       │   │   ├── richtext.js
│       │   │   ├── transition-group.js
│       │   │   └── transition.js
│       │   ├── directives
│       │   │   └── index.js
│       │   ├── index.js
│       │   ├── modules
│       │   │   ├── attrs.js
│       │   │   ├── class.js
│       │   │   ├── events.js
│       │   │   ├── index.js
│       │   │   ├── style.js
│       │   │   └── transition.js
│       │   ├── node-ops.js
│       │   ├── patch.js
│       │   ├── recycle-list
│       │   │   ├── render-component-template.js
│       │   │   └── virtual-component.js
│       │   └── text-node.js
│       └── util
│           ├── element.js
│           ├── index.js
│           └── parser.js
├── server
│   ├── bundle-renderer
│   │   ├── create-bundle-renderer.js
│   │   ├── create-bundle-runner.js
│   │   └── source-map-support.js
│   ├── create-basic-renderer.js
│   ├── create-renderer.js
│   ├── optimizing-compiler
│   │   ├── codegen.js
│   │   ├── index.js
│   │   ├── modules.js
│   │   ├── optimizer.js
│   │   └── runtime-helpers.js
│   ├── render-context.js
│   ├── render-stream.js
│   ├── render.js
│   ├── template-renderer
│   │   ├── create-async-file-mapper.js
│   │   ├── index.js
│   │   ├── parse-template.js
│   │   └── template-stream.js
│   ├── util.js
│   ├── webpack-plugin
│   │   ├── client.js
│   │   ├── server.js
│   │   └── util.js
│   └── write.js
├── sfc
│   └── parser.js
└── shared
    ├── constants.js
    └── util.js
```

## 渲染


## 更新


## 编译