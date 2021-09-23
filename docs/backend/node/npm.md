# NPM

## 是什么

nodejs 包管理工具

npm 著名大神：

- TJ Holowaychunk
- Mafintosh
- Dominic Tarr

https://www.zhihu.com/question/303815270


``` js
Q: 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块。npm 模块安装机制
```

## 如何发布 npm 包

[官方链接](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

```bash
➜  npm tree
.
├── README.md
├── index.js
└── package.json

0 directories, 3 files
```

执行`npm publish`

```bash
➜  npm npm publish
npm notice
npm notice 📦  chemputer-test-package@1.0.0
npm notice === Tarball Contents ===
npm notice 175B index.js
npm notice 242B package.json
npm notice 77B  README.md
npm notice === Tarball Details ===
npm notice name:          chemputer-test-package
npm notice version:       1.0.0
npm notice package size:  443 B
npm notice unpacked size: 494 B
npm notice shasum:        4728ea3dee1d35cec82c4374139df5f441dfc598
npm notice integrity:     sha512-vO87R/CmCDRzL[...]me9m13LBs4mhA==
npm notice total files:   3
npm notice
npm ERR! code E404
npm ERR! 404 Not Found - PUT https://registry.npmjs.org/chemputer-test-package - Not found
npm ERR! 404
npm ERR! 404  'chemputer-test-package@1.0.0' is not in the npm registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/wyl/.npm/_logs/2021-06-09T10_12_41_375Z-debug.log
```

解决方案：

1. 确保 npm 地址是 `https://registry.npmjs.org/`

```
➜  npm npm config list
; cli configs
metrics-registry = "https://registry.npmjs.org/"
scope = ""
user-agent = "npm/6.13.4 node/v12.14.1 darwin x64"

; node bin location = /usr/local/bin/node
; cwd = /Users/wyl/Desktop/npm
; HOME = /Users/wyl
; "npm config ls -l" to show all defaults.
```

2. 执行 `npm login`

```bash
➜  npm npm login
Username: chemputer
Password:
Email: (this IS public) chemputer_dev@163.com
Logged in as chemputer on https://registry.npmjs.org/.
```

3. 最后执行 `npm publish`

```bash
➜  npm npm publish
npm notice
npm notice 📦  chemputer-test-package@1.0.0
npm notice === Tarball Contents ===
npm notice 175B index.js
npm notice 242B package.json
npm notice 77B  README.md
npm notice === Tarball Details ===
npm notice name:          chemputer-test-package
npm notice version:       1.0.0
npm notice package size:  443 B
npm notice unpacked size: 494 B
npm notice shasum:        4728ea3dee1d35cec82c4374139df5f441dfc598
npm notice integrity:     sha512-vO87R/CmCDRzL[...]me9m13LBs4mhA==
npm notice total files:   3
npm notice
+ chemputer-test-package@1.0.0
```

然后会收到一份发布成功的邮件 📧





## 工具包

- [supervisor](https://www.npmjs.com/package/supervisor) 代码热更新工具

- [superagent](https://www.npmjs.com/package/superagent) 代理

- [boxen](https://www.npmjs.com/package/boxen)

- [chalk](https://www.npmjs.com/package/chalk)

- [ora](https://www.npmjs.com/package/ora)

![ora](https://raw.githubusercontent.com/sindresorhus/ora/HEAD/screenshot-2.gif)