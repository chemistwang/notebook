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