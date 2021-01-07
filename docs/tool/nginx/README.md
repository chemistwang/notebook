nginx....

nginx 做重定向



``` YAML
server{
    listen 80;
    server_name test-dev.herinapp.com;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl;
    server_name test-dev.herinapp.com;
    root /root/dev-web/dist/;
    index index.html index.htm;
    location / {
             try_files $uri $uri/ =404;
            # root /root/dev-web/dist;
            # index index.html index.htm;
    }
    ssl_certificate /etc/nginx/cert/herinapp.com.pem;
    ssl_certificate_key /etc/nginx/cert/herinapp.com.key;
}

```

301 永久重定向

302 临时重定向





Nginx 指定ip访问

``` YAML
allow 192.168.0.104;
deny all;
```



upstream 配置项















