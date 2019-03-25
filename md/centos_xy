### CentOS6.8下安装xz命令

我们有时候会下载到.xz结尾的压缩文件，这时候需要用到xz命令来解压这类文件，而当我们想要用yum -y install xz时，
又没有关于xz的安装包，因此就找到一个xz的编译安装包进行编译安装

1. 下载 下载地址：https://sourceforge.net/projects/lzmautils/files/latest/download?source=typ_redirect

2. 上传至服务器，解压，安装

3. 按照如下命令输入
```
[root@localhost opt]# tar -zxvf xz-5.2.3.tar.gz
[root@localhost opt]# cd xz-5.2.3
[root@localhost xz-5.2.3]# ./configure --prefix=/opt/gun/xz      #指定安装目录
[root@localhost xz-5.2.3]# make && make install    #编译并安装
[root@localhost xz-5.2.3]# ln -s /opt/gun/xz/bin/xz /usr/local/bin/xz     #建立软链接
```
4. 这是就可以用xz命令解压.xz结尾的安装包了

5. 如果ls建立提示已存在不能修改错误 可以使用-sf强制修改
