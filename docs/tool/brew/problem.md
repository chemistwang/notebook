## 问题

1.  MacOS 11.1 Version value must be a string; got a NilClass () (TypeError)

场景：

好久没用brew，今天发现直接报错

![报错](http://cdn.chemputer.top/notebook/brew/error1.jpg)

发现跟我更新系统有关

![系统图](http://cdn.chemputer.top/notebook/brew/system.jpg)

解决方案：

更新brew

``` bash
brew update-reset
```