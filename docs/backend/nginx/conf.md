# 配置文件案例

## nginx做重定向

``` YAML
server{
    listen 80;
    server_name test-dev.chemputer.com;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl;
    server_name test-dev.chemputer.com;
    root /root/dev-web/dist/;
    index index.html index.htm;
    location / {
             try_files $uri $uri/ =404;
            # root /root/dev-web/dist;
            # index index.html index.htm;
    }
    ssl_certificate /etc/nginx/cert/chemputer.com.pem;
    ssl_certificate_key /etc/nginx/cert/chemputer.com.key;
}

```

301 永久重定向

302 临时重定向

## 指定ip访问


Nginx 指定ip访问

``` YAML
allow 192.168.0.104;
deny all;
```


## upstream 配置项



## 重定向服务器

场景案例：
公司的s3服务器受备案影响不能访问，需要绕过备案，而服务的整体迁移非常繁琐又容易出错

方案1:
使用proxy重定向
失败

方案2:
使用rewrite
失败

方案3:
使用ngx_headers_more

之前的配置

```
server{
        listen 80;
        server_name yourDomain.com;
        location /xx/ {
            proxy_pass http://127.0.0.1:3000/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        listen 443 ssl; # managed by Certbot

        ssl_certificate /etc/nginx/cert/chemputer.top.pem;
        ssl_certificate_key /etc/nginx/cert/chemputer.top.key;
}
```

现在的配置

```
server{
        listen 80;
        server_name yourDomain.com;
        location /xx/ {
            proxy_pass http://yourAnotherIp:3500/;
            # 指向另外一个服务器的ip
            more_set_headers "Host: yourAnotherIp";
            #proxy_set_header Host $http_host;
            #proxy_set_header X-Real-IP $remote_addr;
            #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            #proxy_set_header X-Forwarded-Proto $scheme;
            #proxy_set_header Upgrade $http_upgrade;
            #proxy_set_header Connection "upgrade";
        }

        listen 443 ssl; # managed by Certbot

        ssl_certificate /etc/nginx/cert/chemputer.top.pem;
        ssl_certificate_key /etc/nginx/cert/chemputer.top.key;
}
```












