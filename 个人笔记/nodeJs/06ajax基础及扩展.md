# 06ajax基础及扩展

## ajax基础使用

### 创建ajax

- 创建一个ajax对象

	- const xhr=new XMLHttpRequest( )

- 打开

	- xhr.open( method , url ,boolean)
	- 参数情况

		- 1 method(请求方式)

			- get
			- post 

		- 2 url(请求地址)

			- 如果是get请求方式的话,需要在后面拼接发送的数据

		- 3 同步还是异步

			- true

				- 异步

			- false

				- 同步

- 发送请求

	- xhr.send( )
	- get请求

		- 因为数据是随着url地址发送的
		- 不写
		- null

	- post请求

		- 键值对的形式
		- 可以发送json对象
		- 设置发送的响应头格式

			- xhr.setRequestHeader( )
			- 即设置发送的数据格式

- 绑定事件

	- onreadystatechange

		- readyState发送状态码

			- 0

				- 设置了请求对象

			- 1

				- 设置完成请求的信息

			- 2

				- 发送请求并得到一部分内容(请求首行和请求报文)

			- 3

				- 得到响应报文体的部分内容(每次传输的都是64kb,如果数据小,可能当前数据就已经接受完成)

			- 4

				- 数据接受完成,或者ajax请求失败

		- 响应成功的条件

			- 1 响应状态码在200-300之间
			- ajax请求状态码为4

		- 返回的响应数据

			- xhr.reponseText

				- 接受的json格式数据内容

			- xhr.resposeXml

				- 接受的xml数据格式内容

	- onload

		- 不要判断状态码.会在加载完毕后,才执行

### get请求

- 发送数据会拼接在url地址后面,

### post请求

- 需要设置发送的数据格式

	- xhr.setRequestHeader('content-type',x-www-from-urlencoded')

		- 默认格式
		- 键值对的形式

	- xhr.setRequestHeader('content-type','application/json')

		- json数据格式

## JSON数据的方法

### JSON.stringify(data)

- 将数据转换为json对象(字符串类型)

### JSON.parse(data)

- 将json对象转换为正常对象

## jquery的ajax

### $.ajax()

- 直接在里面书写对象,将各种参数写入到对象中

	- 1 请求的url地址  url
	- 2 请求的方式 method
	- 3 设置发送的内容格式 headers

		- ('content-type',x-www-from-urlencoded')
		- ('content-type','application/json')

	- 4 请求的数据

		- 发送的数据必须要是对应格式

	- 5 成功回调

		- success(data){console.log(data)}

			- 返回服务器的响应数据

	- 6 失败回调

		- error(err){console.log(err)}

### $.get()

- 1 请求的地址
- 2 请求的数据

	- "user=hhh&age=12"

- 3 成功回调

### $.post()

- 1 请求的地址
- 2 请求的数据

	- JSON.stringify(userMes)

- 3 成功回调

## axios

### 该方法返回一个promise对象,

### get请求

- axios({  })

	- 参数是一个对象

		- 1 url地址
		- 2 请求方式 method
		- 3 数据

			-  params: {
                        "user": "lily",
                        "age": 18
                    }

- .then((data)=>{console.log(data)})

	- 成功回调

- .catch((err)=>{console.log(err)})

	- 失败回调

### post请求

- axios({  })

	- 参数是一个对象

		- 1 url地址
		- 2 请求方式 method
		- 3 数据

			-     data: {
                        "user": "lily",
                        "age": 18
                    }

- .then((data)=>{console.log(data)})

	- 成功回调

- .catch((err)=>{console.log(err)})

	- 失败回调

### axios.get()

- 参数1 请求的地址
- 参数2 

	-  params: {
                        "user": "lily",
                        "age": 18
                    }

- 后面跟then或者catch 方法

### axios.post( )

- 参数1 请求的地址
- 参数2 

	- {"user": "laowang","age": 18}

- 后面跟then或者catch 方法

## jsonp

### 作用

- 巧妙的方法解决跨域问题,与ajax没有关系

### script标签的请求时get请求

### 使用方法

- 1 创建一个script标签
- 2 给script标签的src属性添加一个请求的地址

	- 该地址需要把请求的数据和回调函数拼接上
	- 通过服务器的返回的响应,会将响应的数据传给函数调用的实参,最终返回到页面上,就会调用对应的函数
	- 在返回响应时,需要格式设置为js格式
	- res.end(`${cb}('${data}')`)

- 3 把script标签添加到页面中

## cors

### 可以解决跨域问题,是在服务器解决跨域问题,通过设置白名单

### 跨域的关键设置

- res.setHeader("Access-Control-Allow-origin","http://192.168.16.87")

	- 指定当前参数为白名单

- res.setHeader("Access-Control-Allow-origin", "*")

	- 设置所有访问的地址都为白名单

- res.setHeader("Access-Control-Allow-origin",id)

	- 可以通过该将设置一个数据保存所有白名单网址
	- req.headers.origin

		- 获取当前访的请求地址

	- 通过操作判断访问的地址是否在白名单中,利用id变量设置在响应头中

### 设置跨域的请求方式

- res.setHeader("Access-Control-Allow-method", 'GET,POST,DELETE,PUT,OPTIONS")

### OPTIONS请求会出现在第一次跨域中( 预检请求)

- 会携带少量的数据去请求,看能不能跨域,如果能跨域,则再次进行我们的请求

