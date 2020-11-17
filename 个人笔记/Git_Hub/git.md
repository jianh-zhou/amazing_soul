# git 

## linux基本命令

### ls

- 查看当前文件夹中所有文件

### cd

- cd  文件名

	- 进入某一个文件夹

- cd ..

	- 返回上一级文件夹

### mkdir 文件夹名

- 创建一个文件夹

### touch 文件名

- 创建一个文件

### vim 文件名

- 编辑某个文件
- 流程

	- 1 i键进入插入模式
	- 2 编辑完成后按ESC键退出编辑模式
	- 3 输入:号,进入编辑模式
	- 4 输入英文状态下的wq,保存并退出

### rm  文件名

- 删除文件

### rm  -r 文件夹名

- 删除文件夹

### clear

- 清除当前所有命令

### mv 原文件夹/原文件夹  目标文件/目标文件夹

- 移动文件

## git 初始配置

### 配置用户名

- git config --global user.name  "user.name"

### 配置用户邮箱

- git config --gobl user.email "user.email"

### 查看用户名

- git config user.name 

### 查看用户邮箱

- git config user.email

### 查看所有配置

- git config -l

## git 基本操作命令

### git init

- 仓库初始化
- 一个文件夹只要初始化一次就行

### git add  

- 文件名

	- 提交当前文件到暂存区

- *  . 

	- 提交当前文件夹中所有修改过的文件到暂存区

### git commit -m "注释"

- 将暂存区的所有文件提交到本地仓库区

## 版本库的3个区域

### 工作区

- 用户操作文件代码的区域

### 暂存区

- 本地仓库暂管代码的地址

### 本地仓库区 

- 代表代码进入本地仓库版本控制

## git 常用命令

### git status

- 版本状态查看

	- 红色

		- 位于工作区

	- 绿色

		- 位于暂存区

	- 没有体现就是位于版本区

### git restore

- 丢弃工作区的改动

### git restore --staged  文件

- 丢弃暂存区的改动

### git diff

- 获得工作区和暂存区的区别

### git diff --cached

- 获得暂存区与本地仓库区的改动区别

## 历史版本回滚

### git log 

- 默认不用任何参数的话，git log 会按提交时间列出所有的更新，最近的更新排在最上面。每次更新都有一个 SHA-1 校验和、作者的名字 和 电子邮件地址、提交时间，最后缩进一个段落显示提交说明。

### git reflog

- git reflog 可以查看所有分支的所有操作记录（包括commit和reset的操作），包括已经被删除的commit记录
- git log则不能察看已经删除了的commit记录

### git log --one-line

- 显示信息

	- 每行显示一个 comm
	- 
显示 commit 的 SHA 的前 7 个字符
	- 显示 commit 的消息

### git reset --hard

- 后跟一个7位的哈希字符就可以切换到哈希字符对应的版本

### 其他回滚

- git reset --hard HEAD^

	- 回滚一个版本

- git reset --hard HEAD^^

	- 回滚两个版本

- git reset --hard HEAD~100

	- 回滚到100个版本之前,可以通过改变数值,会滚任意版本

## 分支

### git branch 

- 获取所有分支

### git branch name

- 创建分支

### git checkout name

- 切换到某个分支
- 每次在切换分支时,需要将当前分支进行去全部提交到本地仓库
- 如果不提交,当前分支的改变,会在其他分支上造成一样的改变

### git branch -d name

- 删除某个分支

### git checkout -b name

- 创建一个分支并且打开该分支

### git marge name

- 将分支合并到当前分支
- 当多个分支都对一个文件进行修改后,会发生冲突,我们需要将其修改为最终的结果,最终提交到仓库

### git fetch origin dev:dev

- 拉取本地没有的分支,第一个代表远程仓库的分支,第二个代表自己的分支,第二个分支名字可以自己取,如果没有分支会自动创建分支

