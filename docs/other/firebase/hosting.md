# 主机托管 Hosting

1. 初始化托管工程

``` bash
firebase init # 初始化
 
⭕️ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ...
⭕️ Emulators: Set up local emulators for Firebase products

=== Project Setup

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: YOUR PROJECT

=== Hosting Setup

? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
✔  Wrote public/404.html
✔  Wrote public/index.html

=== Emulators Setup
? Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices. Hosting E
mulator
? Which port do you want to use for the hosting emulator? 5000
? Would you like to enable the Emulator UI? Yes
? Which port do you want to use for the Emulator UI (leave empty to use any available port)? Y
? Would you like to download the emulators now? No
```

2. 编写代码执行本地调试

``` bash
firebase serve --only hosting --project=default

i  hosting: Serving hosting files from: public
✔  hosting: Local server: http://localhost:5000
```

3. 部署网站

``` bash
firebase deploy --project=default

=== Deploying to 'second-raceway-313413'...

i  deploying hosting
i  hosting[second-raceway-313413]: beginning deploy...
i  hosting[second-raceway-313413]: found 3 files in public
✔  hosting[second-raceway-313413]: file upload complete
i  hosting[second-raceway-313413]: finalizing version...
✔  hosting[second-raceway-313413]: version finalized
i  hosting[second-raceway-313413]: releasing new version...
✔  hosting[second-raceway-313413]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/second-raceway-313413/overview
Hosting URL: https://second-raceway-313413.web.app
```
