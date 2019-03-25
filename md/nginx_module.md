### nginx安装第三方模块

./configure --prefix=/usr/local/nginx --with-stream  --add-module=/usr/local/thirdPackage/nginx-upstream-fair-master

1.在未安装nginx的情况下安装nginx第三方模块  
```
# ./configure --prefix=/usr/local/nginx-1.9.9  --add-module=/temp/nginx-upstream-fair-master

# make

# make isntall

# /usr/local/nginx-1.9.9/sbin/nginx

```

2.在已安装nginx情况下安装nginx模块  
```
# ./configure --prefix=/usr/local/nginx-1.9.9  --add-module=/temp/nginx-upstream-fair-master

# make

# /usr/local/nginx-1.9.9/sbin/nginx -s stop

# cp objs/nginx /usr/local/nginx/sbin/nginx

# /usr/local/nginx-1.9.9/sbin/nginx
```