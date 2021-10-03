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
