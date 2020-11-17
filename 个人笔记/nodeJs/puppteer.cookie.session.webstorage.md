# puppteer.cookie.session.webstorage

## puppteer

### puppteer是一个node库,提供了一组操作chrome的API,通俗来说,就是一个headless chrome

### 作用

- 生成网页截图或者PDF
- 高级爬虫,可以爬取大量异步渲染内容的网页
- 模拟键盘输入,表单自动提交,登录网页,实现UI自动测试
- 抓获站点的时间线,以便追踪你的网站,以便分析网站性能问题

### 获取网站数据流程

- 1 引入puppteer模块
- 2 创建一个浏览器实例Browser对象

	- const browser = await puppeteer.launch();

- 3 通过Browser对象创建一个页面page对象

	-   const page = await browser.newPage();

- 4 跳转到指定的页面

	- await page.goto('https://example.com');

- 5 抓取页面数据

	-  const books = await page.evaluate(() => {  }

- 6 关闭浏览器

	-   await browser.close();

## cookie

###     由于http是无状态的,而服务端的业务有是需要有状态的,因为服务端是需要知道客户端是第几次访问的,而http是无状态的,所以就不能达到要求.而cookie恰恰能够储存web的状态信息,解决服务端达到业务有状态的

### 特点

- 1 在本地中存储
- 2 第一次http请求后都是需要带着cookie数据一起请求的,每次服务端也会带着cookie发送给浏览器
- 3 大小不能太大不能超过4kb,数量20-50不等
- 5 用户自己可以设置不使用cookie
- 6 有一定的安全风险,可能会被篡改,如果cookie被拦截,就会获取一些session重要信息

### 流程

- 1 服务器向浏览器发送cookie
- 2 浏览器会将cookie保存
- 3 之后每次浏览器都会带着cookie向服务器发送

### 创建

- res.setHeader('Set-Cookie','username=xiaowang;max-age=3600;httpOnly=true')
- 第二个参数可以是数组,就是设置多个缓存,不能一个一个设置,会覆盖之前的操作
- httpOnly

	- true

		- 只能在服务器端操作或者读取cookie

	- false

		- 默认值,可以在浏览器和服务端都可以操作

### 获取

- req.header.cookie

	- 获取缓存

### 删除

- res.setHeader('Set-Cookie',username=;max-age=0)
- 设置时间为0

### 客户端处理

- 读取

	- document.cookie

- 设置

	- document.cookie = 'name=rose;max-age=3600'

## session

### session是另外一种记录客户状态的机制,它是保存在服务器端的

### 特点

- 安全性相对较高
- 传输的数据量小,只有一个cookie
- 本质是存储在服务器对象
- 大小和数量理论上没有限制

### 流程

- 1 .发送请求，请求登录，可能会在请求报文体中，或者url中携带登录信息
- 2 接收请求,生成一个session对象,将用户信息保存在对象中,并生成一个session_id(唯一的),返回响应,携带cookie,cookie的内容是session_id
- 3 返回响应,cookie中携带了session_id
- 4 客户端接收到了session_id,将其保存在本地中
- 5 第二次发送请求,会自动携带cookie,会携带session_id,
- 6 服务器会解析cookie,得到session_id,再去查找session对象中是否有这个session_id,判断是不是第一次访问
- 7 如果有该session_id,则直接返回响应,不再需要再去数据库中查询数据

### 注意

- 1 服务器中会创建一个session对象,会将所有的信息和一个个session_id保存在该对象中
- 2 在使用时,设置缓存,需要将当前的seeion_id一起设置

## webstorage

### 在H5中,新增了一个webstorage属性,这个主要用来作为本地存储使用的,解决了cookie本地存储空间的不足的问题

### webstorage一般支持的是5M大小,浏览器不同,会有所差异

### 两种存储

- 永久性存储

	- localStroage

		- 只支持string的存储

- 临时性存储

	- sessionStroage

### 方法

- xxxStroage.setItem(key,value)

	- 存储数据

- xxxStroage.getItem(key)

	- 获取数据

- xxxStroage.reomoveItem(key)

	- 删除某一个数据

- xxxStroage.claer( )

	- 清空所有数据

### storage事件

- 可以用来跨页面通信

	- 当别的页面储存的发送变化时触发的事件
	- 只能由localStorage触发

