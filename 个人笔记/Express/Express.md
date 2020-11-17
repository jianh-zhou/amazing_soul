# Express 

## 1 express 简介

### 1 express 是一个node框架,使用它可以更好的让我们使用node创建服务等操作

### 2   使用时需要下载  npm i  express

### 2 使用简介

- 1 引入express 
- 2 调用引入的express,返回一个express服务器应用实例,该实例是存在于内存中
- 3  将该服务器实例挂载到对应端口上,能够访问
- 4 注册路由

	- app.get(路径,回调函数)

		- 注意

			- 1每一个接口可以被不同的请求注册
			- 2  浏览器的地址栏里只能发送get请求
			- 3 路由地址是精准匹配,需要地址和方式都匹配才能调用对应的函数
			- 4 路由地址必须是绝对路径地址
			- 5  可以通过response.set 设置响应头的格式,告诉浏览器用哪一种编码格式

## 2 路由分类

### 1 前端路由

- 概念:  路由组件和路由地址的一种映射关系
- 1 不会请求新的页面,不会走网络传输层(通过一定的方法,监视路由的变化,从而显示不同的组件)
- 2  由js库进行解析(vue-router , react-router-dom)
- 3 根据路由地址进行匹配,返回的是组件

### 2 后端路由

- 概念 :路由地址与请求方式和函数的一种映射关系
- 1   由服务器解析
- 2 由前端发送请求触发
- 3  返回的大多数都是数据

## 3 后端路由的传参

### 1 params

-    在对应的路由中使用占位符,在请求时直接进行请求传递参数
- 前端设置

	- http://localhost:1000/api/1000

- 后端设置

	- api/:id

- 获取

	- req.params

### 2 query

- 在传递时以键值对的形式进行传递,以问号开始,键值对以等号的形式,多个params参数用=号分割
- 前端设置

	- http://localhost:1000/api?user=小明

- 后端直接进行获取, req.query

### 3  body请求体

- 一般使用post等请求,会携带在对应的请求体中,
- 接收方式

	- 原生

		- req.on('data' ,(result)=>{ console.log(result.toString( ))})
		- 返回的是一个Buffer数据流

	- 

### 三种传递参数的优缺点

- 1 params和query是拼接在地址栏中,会将信息展示,安全性较低,body是放在请求头中,安全性较高
- 2 url地址长度有限,传递参数的多少就有限,而body请求体的参数多少则是没有限制的
- body请求体也可以实现query和params传参

## 4 中间件

### 1 中间件的数据类型是函数

- 参数1  resquest
- 参数2 response
- 参数3 next

### 2 使用语法

- 1 全局使用

	- app.use(中间件函数)

- 2 局部使用

	- app.post('/test',multipart(),路由中间件函数)

### 3 作用

- 1 执行下一个中间件
- 2 设置请求头和响应头
- 3 扩展一些其他功能

### 4 特点

- 1 无论以什么形式进行请求,都会执行对应中间件
- 2  路由组件其实也是中间件
- 3 每一个中间件都可以返回数据,但是前面的会先返回,一般不在前面的中间件返回,很有可能会报错,因为设置头部信息这些只能设置一次
- 4 无论是路由中间件还是其他中间件,谁在前面谁就先执行,而且只有上一个中间件调用next方法,后面的中间件才会执行
- 5 可以进行链式调用

### 5 分类

- 1 内置中间件

	- 1 express.static(使用resolve传入绝对路径)

		- 静态资源映射
		- 使用之后,可以让对应文件夹里的所有文件可以直接通过URL地址进行访问

	- 2 express.json( )

		- application/json  
		- 可以拿到raw方式传递的数据(req.body)

	- express.urlencoded ( )

		- 可以通过它拿到x-www-form-urlencoded 传递的参数(req.body)

- 2 第三方中间件

	-  connect-multiparty  ->  form-data  使用req.body拿到对应使用form-data传递的数据

- 3 自定义中间件
- 4 路由中间件

## 5 解决跨域

### 1 jsonp

- 利用script标签的src属性,访问对应的服务器,传递一个函数过去,服务器返回一个带有参数的的函数字符串,最终会解析,然后调用对应函数,从而拿到数据

### 2 cros

- 跨域是在服务器返回到浏览器时出现的,我们可以在服务器设置白名单,就是相当于给浏览器说,服务器允许跨域,最终也能解决跨域

### 3 代理

- 服务器请求服务器是不会存在跨域的,我们可以使用自己写的服务器请求其他服务器,在得到数据后,让本地服务器返回给浏览器

## 6 demo

### 1  提交图片到服务器

- 1 为对应的input标签(type=file)绑定onChange事件
- 2 得到一个Form-data实例对象,

	- let formdata= new FormData();

- 3 在对应的事件回调函数中,可以通过this.files[0] 获取到对应的的传入的文件
- 4 给对应的FormData插入对应的图片文件对象,而且设置一个名字

	- formdata.append('file',image);

- 4 发送ajax请求,第一个参数是地址,第二个是对应的FormData对象

### 2 在服务器设置对应的中间件,使用白名单设置允许跨域

- app.use(function(req,res,next){
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if(req.method==="OPTIONS"){
        res.end();
    }else{
        next();
    }
})


### 3 在服务器 设置静态资源映射

- app.use(express.static(resolve(__dirname,"./public")))
- 设置对应public文件夹,可以通过url地址进行访问对应的public中的文件

### 4 设置对应的路由中间件

- 1 在定义路由中间件时,加一个其他中间件,方便读取form-data传递的数据

	- const formidable=require('express-formidable')

- 2  获取对应传递过来的图片数据对象,该数据对象包括图片的路径和图片的名字
- 3 设置可读流和可写流,可读流里面传入对应的文件,可写流中传入要写入的文件路径及名字,最终利用管道将其得到的一个文件保存到服务器的资源中
- app.post('/upload',formidable(),function(req,res,next){
    // console.log(req.files)
    const image = req.files.file;
    const readStream = fs.createReadStream(image.path);
    const writeStream = fs.createWriteStream('./public/'+image.name);
    readStream.pipe(writeStream);
    res.end("/"+image.name)
})

### 5  将对应的用户数据添加到数据库

- 1 收集对应的表单数据,发送ajax请求,使用post请求,
- 2  设置对应的中间件,接收传递过来的表单数据,传递过来的格式是x-www-from-urlencoded,所以我们使用中间件express.json( )
- 3 搭建数据库

	- 1 引入数据库插件mongoose
	- 2 和数据库进行连接,mongoose.connect(参数1,参数2,参数3)

		- 1 参数1 

			- 对应的数据库的接口地址

		- 2 参数2

			- 数据库的一些配置

		- 3 参数3

			- 数据库连接的回调函数

	- 3 创建约束对象

		- 使用mongoose.Schma()方法,传入一个对象,对象的每一个属性,是对要添加数据属性的一个描述限制

	- 4 创建模型对象

		- 使用mongoose.model()方法,第一个参数是对应表格的名字,第二个是约束对象

- 4  注册组件,
- 5 通过req.body获取到对传递过来的数据,判断数据库是否存在数据
- 6 如果不存在,则将这些数据添加到数据库,调用对应模型对象的create方法,将数据添加到数据库
- 7 如果数据库存在数据,则不进行添加数据,返回对应的响应

