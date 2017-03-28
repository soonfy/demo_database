# database  
> 主要是 Node.js 使用数据库的学习。  
> 数据库包含 mongodb, mysql, elasticsearch, redis...  
> 内容包含安装，配置，连接，基本 CRUD，索引...  
> 系统主要以 Mac OS X 10.X 为主

## mongodb  
homebrew安装

## mysql  
1. 下载安装 [MySQL](https://dev.mysql.com/downloads/mysql/)  
> 最后一步会提示 root 用户默认密码，需要记住，以备修改成自己密码  
> 2017-03-28T00:43:48.948795Z 1 [Note] A temporary password is generated for root@localhost: F;a+RSj9Dwpz  
> If you lose this password, please consult the section How to Reset the Root Password in the MySQL reference manual.  

2. [配置快捷启动命令](https://dev.mysql.com/doc/refman/5.7/en/osx-installation-notes.html)  
  ```
  alias mysql=/usr/local/mysql/bin/mysql
  alias mysqladmin=/usr/local/mysql/bin/mysqladmin
  ```

3. 终端添加 MySQL 路径  
  ```
  // bash
  sudo vim .bash_profile
  export PATH=${PATH}:/usr/local/mysql/bin
  source .bash_profile

  // zsh
  vi ~/.zshrc
  export PATH=${PATH}:/usr/local/mysql/bin
  source ~/.zshrc
  ```

4. 修改 root 用户默认密码  
  ```
  mysqladmin -u root -p password
  -> 安装的默认密码
  -> 新密码
  ```

4. 启动 MySQL  
  ```
  mysql -u root -p
  // 退出
  quit/exit
  ```

4. 问题  
  * ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)  
  > 原因：mysql服务没启动  
  > 解决：系统偏好启动mysql  

## elasticsearch  
> 安装 elasticsearch 需要JDK  
1. 下载安装 [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)  

2. 下载 [elasticsearch](https://www.elastic.co/downloads/elasticsearch)  

  ```
  wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.2.2.tar.gz
  wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.2.2.zip
  ```

3. 验证文件  
  ```
  sha1sum elasticsearch-5.2.2.tar.gz
  sha1sum elasticsearch-5.2.2.zip
  ```

4. 解压文件  
  ```
  tar -xzf elasticsearch-5.2.2.tar.gz
  unzip elasticsearch-5.2.2.zip
  ```

5. 运行 elasticsearch  
  ```
  cd elasticsearch-5.2.2/
  ./bin/elasticsearch
  ```

6. 测试是否运行成功  
  ```
  curl http://localhost:9200/
  ```

## redis  
