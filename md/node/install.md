### centos7.2 安装node环境

CentOS安装NodeJS
在CentOS下安装NodeJS有以下几种方法。使用的CentOS版本为7.2。CentOS其他版本的NodeJS安装大同小异，也可以参看本文的方法。

安装方法1——直接部署
1.首先安装wget

yum install -y wget
如果已经安装了可以跳过该步

2.下载nodejs最新的bin包

可以在下载页面https://nodejs.org/en/download/中找到下载地址。然后执行指令

wget https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz
然后就是等着下载完毕。

另外你也可以在你喜欢的任意系统上下载最新的bin包，然后通过FTP上传到CentOS上。

3.解压包

依次执行

xz -d node-v9.3.0-linux-x64.tar.xz
tar -xf node-v9.3.0-linux-x64.tar

如果xz不是command就按照下面的方法执行

[root@biluos1 software]# tar -zxvf xz-5.2.3.tar.gz
[root@biluos1 software]# cd xz-5.2.3
[root@biluos1 xz-5.2.3]# mkdir /opt/software/zx
[root@localhost xz-5.2.3]# ./configure --prefix=/opt/software/zx     #指定安装目录
[root@localhost xz-5.2.3]# make && make install    #编译并安装
[root@localhost xz-5.2.3]# ln -s /opt/software/zx /usr/local/bin/xz     #建立软链接
[root@biluos1 R-3.4.0]# vi /etc/profile
//设置环境变量，在 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL 一行的上面添加如下内容:
export XZ_HOME=/opt/software/zx
export PATH=$XZ_HOME/bin:$PATH

[root@biluos1 R-3.4.0]# source /etc/profile //使修改生效

4. 部署bin文件

先确认你nodejs的路径，我这里的路径为~/node-v9.3.0-linux-x64/bin。确认后依次执行

ln -sf /usr/local/node-v9.3.0-linux-x64/bin/node /usr/bin/node
ln -sf /usr/local/node-v9.3.0-linux-x64/bin/npm /usr/bin/npm


注意ln(LN)指令用于创建关联（类似与Windows的快捷方式）必须给全路径，否则可能关联错误。

5.测试
node -v
npm
如果正确输出版本号，则部署OK
这种安装的方法好处是比较干净，安装也比较快速   
个人认为比较适合新手。但是如果遇到nodejs插件全局安装时，需要自行去创建关联，参考第4步。
