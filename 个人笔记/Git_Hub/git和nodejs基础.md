# git 和nodejs基础

## 在线仓库操作

### 本地仓库提交到在线仓库

- 1  本地仓库与在线仓库相关联

	- gti remote add 在线仓库地址 

- 2 将本地仓库某个内容推动到远程仓库

	- 2 git push -u origin master 

### 本地没有仓库

- 克隆远程仓库文件

	- git clone 远程仓库地址 

- 拉取本地没有的分支

	- git frech origin drv:drv 

- git push
- 克隆代码之后， 本地仓库会默认有一个远程地址的配置， 名字为 origin

## 免密登录

### 1 ssh-keygen //在任意位置输入命令即可  按3次空格,会有一个文件地址

### 2 文件默认存储在家目录（c:/用户/用户名/.ssh）的 .ssh 文件夹中。

id_rsa 私钥
id_rsa.pub 公钥 

### 3 将公钥（.pub）文件内容配置到账号的秘钥中

首页 -> 右上角头像-> settings -> SSH and GPG keys -> new SSH Key

### 4 克隆代码时，选择 ssh 模式进行克隆 （地址 在仓库首页 绿色 克隆的位置 选择 use ssh）

## GitFlow

### Master 主分支。上面只保存正式发布的版本

### Hotfix 线上代码 Bug 修复分支。开发完后需要合并回Master和Develop分支，同时在Master上打一个tag

### Feather 功能分支。当开发某个功能时，创建一个单独的分支，开发完毕后再合并到 dev 分支

### Release 分支。待发布分支，Release分支基于Develop分支创建，在这个Release分支上测试，修改Bug

### Develop 开发分支。开发者都在这个分支上提交代码

## nodejs

### 同步和异步

- 判断标准

	- 调用者是否主动获取被调用者的状态

- 同步

	- 调用者在调用后,需要自己查询被调用者的状态,被调用者就算完成也不会主动反馈

- 异步

	- 调用者在调用后,被调用者会在任务完成后,主动给调用者反馈,不需要调用者监督

### 阻塞和非阻塞

- 判断标准

	- 在进行一个任务时,是否需要等待任务完成再做其他任务

- 阻塞

	- 任务A对任务B发起调用后,任务A需要一直等待任务B完成,才能再去做其他事

- 非阻塞

	- 任务A对任务B发起调用后,任务A不需要等待任务B完成,就可以做其他事

### nodejs 定义

- 基于chrome v8引擎的一个运行环境,就是让js在服务器运行的一个平台,不是一种独立语言,
- 优点

	- 单线程
	- 异步非阻塞的I/O
	- 跨平台
	- 事件驱动

- 缺点

	- 单线程

		- 处理不好CPU密集型任务,最好处理数据密集型任务

	- 回调函数嵌套太多(回调地狱)

		- Promise对象可以解决

### js组成

- 没有DOM 
- 小部分BOM

	- console.log
	- setTimeout
	- setInterval

- ES 语法

	- 所有新语法都支持

### 顶层对象是Gobal,不是window

### 异步任务执行顺序

- setImmediate( )

	- 正常执行在计时器后面, 
	- clearImmediate( )

		- 取消任务

- process.nextTick( )

	- 最先执行的计时器任务

- setTimeout和setInterval在时间相同的情况下,安装代码先后顺序执行

