#### nginx开机自启动

nginx相关配置  
```
  nginx path prefix: "/usr/local/nginx"
  nginx binary file: "/usr/local/nginx/sbin/nginx"
  nginx configuration prefix: "/usr/local/nginx/conf"
  nginx configuration file: "/usr/local/nginx/conf/nginx.conf"
  nginx pid file: "/usr/local/nginx/logs/nginx.pid"
  nginx error log file: "/usr/local/nginx/logs/error.log"
  nginx http access log file: "/usr/local/nginx/logs/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"
```

1、切换为root账户，在/etc/init.d/目录下创建 nginx 文件,命令：touch nginx，
   然后编辑nginx文件，vi nginx,内容如下  
   ```
   #!/bin/sh

#

# nginx - this script starts and stops the nginx daemin

#

# chkconfig: - 85 15

# description: Nginx is an HTTP(S) server, HTTP(S) reverse

# proxy and IMAP/POP3 proxy server

# processname: nginx

# config: /usr/local/nginx/conf/nginx.conf

# pidfile: /usr/local/nginx/logs/nginx.pid

# Source function library.

. /etc/rc.d/init.d/functions

# Source networking configuration.

. /etc/sysconfig/network

# Check that networking is up.

[ "$NETWORKING" = "no" ] && exit 0

nginx="/usr/local/nginx/sbin/nginx"

prog=$(basename $nginx)

NGINX_CONF_FILE="/usr/local/nginx/conf/nginx.conf"

lockfile=/var/lock/subsys/nginx

start() {

[ -x $nginx ] || exit 5

[ -f $NGINX_CONF_FILE ] || exit 6

echo -n $"Starting $prog: "

daemon $nginx -c $NGINX_CONF_FILE

retval=$?

echo

[ $retval -eq 0 ] && touch $lockfile

return $retval

}

stop() {

echo -n $"Stopping $prog: "

killproc $prog -QUIT

retval=$?

echo

[ $retval -eq 0 ] && rm -f $lockfile

return $retval

}

restart() {

configtest || return $?

stop

start

}

reload() {

configtest || return $?

echo -n $"Reloading $prog: "

killproc $nginx -HUP

RETVAL=$?

echo

}

force_reload() {

restart

}

configtest() {

$nginx -t -c $NGINX_CONF_FILE

}

rh_status() {

status $prog

}

rh_status_q() {

rh_status >/dev/null 2>&1

}

case "$1" in

start)

rh_status_q && exit 0

$1

;;

stop)

rh_status_q || exit 0

$1

;;

restart|configtest)

$1

;;

reload)

rh_status_q || exit 7

$1

;;

force-reload)

force_reload

;;

status)

rh_status

;;

condrestart|try-restart)

rh_status_q || exit 0

;;

*)

echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"

exit 2

esac
   ```

2、设置/etc/init.d/nginx 执行权限
```
chmod 777 /etc/init.d/nginx
```

3、设置开机默认启动
```
chkconfig --add nginx //添加系统服务
chkconfig --level 345 nginx on //设置开机启动,启动级别
chkconfig --list nginx //查看开机启动配置信息
```

4、nginx控制命令  
```
service nginx stop    #停止
service nginx restart #重启
service nginx reload  #重新加载
```