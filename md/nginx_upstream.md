### centos安装nginx 带upstream

用途:利用upstream进行socket数据中转  
各版本nginx下载地址：http://nginx.org/download/  
系统：CentOS 6.5 x64  
nginx版本：1.12.1  
安装方式：源码编译安装  

1.  安装必须环境,nginx的编译需要c++，同时prce（重定向支持）和openssl（https支持）也需要安装。
```
yum install gcc-c++
yum -y install pcre*
yum -y install openssl*
```

2.  下载nginx-1.12.1.tar.gz，放在 /usr/local/ 目录下

```
cd /usr/local/
wget http://nginx.org/download/nginx-1.12.1.tar.gz
tar zxf nginx-1.12.1.tar.gz
cd nginx-1.12.1
./configure --prefix=/usr/local/nginx --with-stream
make && make install
```
参考:https://www.cnblogs.com/chenjianxiang/p/8489055.html

3.  打开防火墙需要允许访问的端口，如端口80，或者直接关闭防火墙

```
[root@localhost ~]#servcie iptables stop     //临时关闭防火墙
[root@localhost ~]#chkconfig iptables off    //永久关闭防火墙
```
注:如果提示service not found,下面三种方式解决

```
1:yum install initscripts -y
2:直接使用su - root来切换到root用户，然后使用 service 
3:使用su root切换到root用户，并同时使用/sbin/service来操作，
/sbin/service iptables stop

```

4.  nginx.conf配置文件如下

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notic/sbine;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

stream {
    upstream upstream_8002 {
        server us-free.hyss.xyz:48528;     # ip:port
    }

    server {
        listen 8002;
        listen 8002 udp;
        proxy_pass upstream_8002;
        proxy_timeout 10s;
        proxy_connect_timeout 10s;   
    }

}
```

5. 进入/usr/local/nginx 启动nginx:./nginx