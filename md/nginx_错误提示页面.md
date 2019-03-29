一.Nginx错误页面优雅显示的原因？   当我们访问网站时，由于特殊的原因，经常会出现诸如403,404,503等错误，这极大的影响用户的访问体验，所以我们很有必要做一下错误页面的优雅显示，以提升用户的浏览体验。

二.Nginx下如何定义优雅显示的页面呢？   下面我们就以404错误为例，具体步骤如下：   1.创建自己的404.html页面，放在站点目录下面；    2.更改nginx.conf配置文件，在http模块中加入 fastcgi_intercept_errors on;    3.更改nginx.conf配置文件，在server模块中加入：error_page 404  /404.html;  或者 error_page 404 =http://www.hulala.com/404.html;   4.更改后检查语法/nginx/sbin/nginx -t ，并重启nginx;   现在，404错误的页面优雅显示已经配置OK了。

举一反三：502、403 等其他错误可以用同样的方法来配置。         error_page  500 502 503 504  /50x.html;        error_page  403  /403.html;   注意：   在nginx中错误重定向生效的两个前提条件是：设置了fastcgi_intercept_errors on,并且正确的设置了error_page这个选项。