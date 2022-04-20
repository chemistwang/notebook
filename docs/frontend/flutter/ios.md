# 发布IOS应用

1. 注册一个应用的 `APP ID`

`https://developer.apple.com/account/resources/identifiers/list`

2. 在 App Store Connect 创建一个应用记录

`https://appstoreconnect.apple.com/apps`

3. 在 `xcode` 上打开项目中的 `ios` 文件夹

配置


4. 打包

终端执行 `flutter build ios --release`

5. archiving

xcode 上选择 `Any IOS Device(arm64)`, 然后在 TAB 上选择 product -》 archive

6. 用xcode上传特别慢，推荐使用苹果自家的 `transporter`


## IOS真机调试

有条件最好进行真机的调试，有一些系统功能：`打电话，分享` 等 在模拟器上是体现不出来的

[参考资料](https://docs.flutter.dev/get-started/install/macos#deploy-to-ios-devices)


:::warning 报错1
`Xcode`弹窗提示：`This operation can fail if the version of the OS on the device is incompatible with the installed version of Xcode. You may also need to restart your mac and device in order to correctly detect compatibilit`
:::

[参考资料](https://stackoverflow.com/questions/71618452/failed-to-prepare-device-for-development-with-xcode-13-2-1-and-ios-15-4-devic)

**解决方案**：

不久前手机的系统更新到`IOS 15.4`, xcode里面并没有对应的版本导致

第一步：检查 `/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport/`是否有对应的版本

![xcode版本](http://cdn.chemputer.top/notebook/flutter/problem/xcode.jpg)

　
第二步：如果没有， 在 [https://github.com/filsv/iPhoneOSDeviceSupport](https://github.com/filsv/iPhoneOSDeviceSupport) 下载对应的版本 `（IOS15.4）`

第三步：重启 `Xcode`


:::warning 报错2
弹窗提示：“iproxy” cannot be opened because the developer cannot be verified.
:::

[参考资料](https://stackoverflow.com/questions/71359062/iproxy-cannot-be-opened-because-the-developer-cannot-be-verified)

**解决方案**：

``` bash
cd FLUTTER SDK DIRECTORY/flutter/bin/cache/artifacts/usbmuxd

sudo xattr -d com.apple.quarantine iproxy
```

