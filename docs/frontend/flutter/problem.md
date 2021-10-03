# 问题

## Unable to load asset

场景：引入静态资源

::: warning 报错
Unable to load asset: images/google.webp
:::

```bash
Performing hot reload...
Syncing files to device iPhone 13...
Reloaded 1 of 609 libraries in 222ms.

======== Exception caught by image resource service ================================================
The following assertion was thrown resolving an image codec:
Unable to load asset: images/google.webp

When the exception was thrown, this was the stack:
#0      PlatformAssetBundle.load (package:flutter/src/services/asset_bundle.dart:224:7)
<asynchronous suspension>
#1      AssetBundleImageProvider._loadAsync (package:flutter/src/painting/image_provider.dart:672:14)
<asynchronous suspension>
Image provider: AssetImage(bundle: null, name: "images/google.webp")
Image key: AssetBundleImageKey(bundle: PlatformAssetBundle#19dd4(), name: "images/google.webp", scale: 1.0)
====================================================================================================
```

:::tip 解决方案

- 方案 1：检查 `pubspec.yaml` 文件中 `assets` 缩进

- 方案 2：终端输入 `flutter clean`

:::

## TextField widgets require a Material widget ancestor

场景：return 了一个组件

```dart
...
@override
Widget build(BuildContext context) {
    return Form(
        ...
    )
}
...
```

:::warning 报错
TextField widgets require a Material widget ancestor
:::

```bash
======== Exception caught by widgets library =======================================================


No Material widget found.

TextField widgets require a Material widget ancestor.
```

:::tip 解决方案
需要 `return Scaffold`
:::

```dart {4}
...
@override
Widget build(BuildContext context) {
    return Scaffold(
        body: Form(
            ...
        )
...
```

## bottomNavigationBar 超过 3 个样式问题

场景：设置 `bottomNavigationBar` 出现白屏

```dart
bottomNavigationBar: BottomNavigationBar( // 底部导航
    items: <BottomNavigationBarItem>[
        BottomNavigationBarItem(icon: Icon(Icons.home), title: Text('首页')),
        BottomNavigationBarItem(icon: Icon(Icons.paid), title: Text('资金')),
        BottomNavigationBarItem(icon: Icon(Icons.store), title: Text('仓储/物流')),
        BottomNavigationBarItem(icon: Icon(Icons.person), title: Text('我的')),
    ],
)
```

:::warning 报错
出现白边
:::

<img src="http://cdn.chemputer.top/notebook/flutter/problem/1.jpg" width="30%">

:::tip 原因
数量小于等于 3 时会默认 `fixed` 模式下使用主题色，大于 `3` 时则会默认 `shifting` 模式下使用白色
:::

```dart {10}
  // Computes the default value for the [type] parameter.
  //
  // If type is provided, it is returned. Next, if the bottom navigation bar
  // theme provides a type, it is used. Finally, the default behavior will be
  // [BottomNavigationBarType.fixed] for 3 or fewer items, and
  // [BottomNavigationBarType.shifting] is used for 4+ items.
  BottomNavigationBarType get _effectiveType {
    return widget.type
      ?? BottomNavigationBarTheme.of(context).type
      ?? (widget.items.length <= 3 ? BottomNavigationBarType.fixed : BottomNavigationBarType.shifting);
  }
```

:::tip 解决方案
设置 `type` 为 `fixed`
:::

```dart {2}
bottomNavigationBar: BottomNavigationBar( // 底部导航
    type: BottomNavigationBarType.fixed,
    items: <BottomNavigationBarItem>[
        BottomNavigationBarItem(icon: Icon(Icons.home), title: Text('首页')),
        BottomNavigationBarItem(icon: Icon(Icons.paid), title: Text('资金')),
        BottomNavigationBarItem(icon: Icon(Icons.store), title: Text('仓储/物流')),
        BottomNavigationBarItem(icon: Icon(Icons.person), title: Text('我的')),
    ],
)
```

<img src="http://cdn.chemputer.top/notebook/flutter/problem/2.jpg" width="30%">
