# json.server以及axios基础

## jsonserver

### 概念

- 用来快速搭建REST API的工具包

### 使用流程

- 1 安装

	- npm install json-server -g
	- json-server -v

		- 查看版本号,是否安装成功

- 2 启动服务

	- 直接启动命令

		- json-server --watch score.json --port 8090  --host 127.0.0.1

	- 创建pack.json文件启动项目

		- {
  "scripts": {
    "score": "json-server --watch score.json --port 80  --host api.xiaozhou.com"
  }
}
		- npm run score

- 3 自定义配置文件

	- {
  "port": 80,  // 自定义服务监听端口
  "watch": true, // 服务监听
  "host": "api.zhangpeiyue.com",// 指定域
  "static": "./public", // 静态文件目录，可以将项目的HTML,JS,IMG等资源放在这里
  "read-only": false,  // 是否只允许get请求
  "no-cors":false, // 是否允许跨域访问
  "no-gzip": false, // 是否可压缩
  "routes": "route.json" // 自定义路由，这个配置可以暂时省略，后续会有所涉及
}

## fetch

### get 请求

- fetch('http://api.xiaozhou.com:80/scoreList').
- fetch方法返回的是一个promise对象,
- 可以通过两次then方法返回最终的数据

	- 第一次then接收的参数是response对象,里面有很响应信息,将这个对象使用json()方法,最终得到一个成功的是一个成功的promise对象,参数就为接收的参数
	- 第二次通过then接收,直接返回响应的数据

### post请求

- fetch(url,{ })

	- 参数1

		- 请求的url地址

	- 参数2

		- 配置对象

			- 参数1

				- 请求方式method

			- 参数2

				- 请求头headers对象

					-  'content-type': 'application/json'

						- 传递的数据为对象

					-  'content-type': 'application/x-www-form-urlencoded'

						- 传递的参数为字符串

			- 参数3 

				- 传递的数据body

					- 对象

						-  JSON.stringify({
                userName: '石敢当',
                'kong hu': '太白经'
            })

					- 字符串

						- 'userName=猪八戒&age=1000'
       

### delete请求

-  fetch('http://api.xiaozhou.com:80/scoreList/1', {
            method: 'delete',
        })
- 参数

	- 请求地址url
	- 配置对象

		- 请求方式

- 通过太狠两次接收,最后返回一个空对象

### patch请求

- 和post请求的请求方式不一样,而且PATCH请求必须是大写

### put 请求

- 和post就是请求方式不一样,其他一样

## xhr的各种属性

### const xhr = new XMLHttpRequest();

- 得到一个ajax对象

### xhr.responseType = 'json' 

- 设置responseTypes属性为json,可以直接通过xhr.response获得json对象,也可以设置文text.但没有必要,

###  xhr.onreadystatechange =function() { }

- 状态改变触发的事件

### console.log(xhr.responseText) 

- 获取的是json字符串的结果

### console.log(xhr.response)

- 获取的是json对象的结果

### console.log(xhr.getAllResponseHeaders())

- 获取所有响应头组成的字符串

### console.log(xhr.getResponseHeader('content-type'))

- 获取设置的请求头的数据类型

###  xhr.timeout = 4000;

- 设置规定时间内接受到响应,如果接受不到,则取消请求

###    xhr.ontimeout = function () {
                console.log('请求超时了')
            }

- 当规定时间内没有接收到请求则触发该事件

###   xhr.onerror = function (err) {
                console.log('请求异常,请重试', err)
            }

- 如果请求出现错误,会触发此事件

### xhr.open('get', 'http://api.xiaozho.com:80/scoreList')

- 开始请求

### xhr.setRequestHeader("content-type", "application/json")

- 设置请求头的数据类型

###  xhr.send();

- 发送请求

### xhr.abort();

- 取消请求

## axios的5大请求方式的基础使用

### 它返回的都是一个promise对象

### get

- 作用

	- 用来获取数据

- axios.get( )

	- 获取对应接口的所有数据

		- ' /scoreList'

	- 获取指定id为8的数据

		- ' /scoreList/8'

	- 获取指定的数据

		- 参数1

			- 数据的接口

		- 参数2

			- 是一个对象,里面有一个params对象
			- params:{ id:2}

				- 该对象里面是所有筛选的参数,最终将数据返回给promise对象的resolve的参数,可以用then接收

	- 举例

		-   const result = await axios.get('http://api.xiaozhou.com/scoreList', {
                params: {
                    // userName: '这是一个get的axios',
                    // age: 20,
                    id: 8
                }
            })

- axios( )

	- 参数是一个对象

		- 请求方式(method)
		- 请求地址(url)
		- params:{ id:2}

			- 该对象里面是所有筛选的参数,最终将数据返回给promise对象的resolve的参数,可以用then接收

### post

- 作用

	- 用来添加数据

- axios.post( )

	- 参数1---请求地址和接口
	- 参数2--发送的数据

		- 可以是一个对象
		- 也可以是一个字符串

	- 参数3--设置的请求头信息
	- 注意点

		- 在不设置发送数据类型时,会自动根据第二个参数的类型设置相应的发送的数据类型

- aixos( )

	- 参数为一个对象

		- 对象的属性

			- 请求方式(method)
			- 请求地址(url)
			- 发送的数据(data)
			- 请求头信息(headers)

	- 举例

		-    const data = await axios.post('http://api.xiaozhou.com/scoreList', {
                play: 'bactkball',
                name: '小周',
            }, {
                data: {
                    id: 9111
                },
                headers: {
                    //设置响应头,如果设置的响应头和设置的数据格式有冲突,则不会将数据进行增加
                    // 'content-type': 'appliaction/x-www-form-urlencoded',
                    'content-type': 'application/json'
                }
            })

- axios.request( )

	- 和axios使用一样

### delete

- 用来删除数据,和get方法类似
- axios.delete( )

	- 举例

		- const data = await axios.delete('http://api.xiaozhou.com/scoreList',{
                params:{
                    id:7
                }
            })

- axios( )

	-   const data = await axios({
                method: 'delete',
                url: 'http://api.xiaozhou.com/scoreList/3',

            })

### put

- 用来修改数据,它修改会修改当前数据的所有部分,也就是把之前的这个数据替换掉
- axios.put( )

	-  const data = await axios.put('/scoreList/7', {
                "userName": "钱九",
                "age": 13,
                "sex": "男",
            })

- axios( )

	-     参数是一个对象,参数method为请求方式,ulr为请求地址,data为数据
            const data = await axios({
                method: 'put',
                url: '/scoreList/7',
                data: {
                    jj: 'jjjjjj'
                }
                //用params时,会将当前数据为空,并不能替换要替换的数据
                // params:{
                //     jj: 'jjjjjj1111111111'
                // }

### patch

- 用来修改数据,它只会修改传递过去的这些数据对应的数据
- axios.patch()

	-        const data = await axios.patch('http://api.xiaozhou.com/scoreList/7', {
                'jj': '哈哈哈'
            })

- axios( )

	-  const data = await axios({
                method: 'patch',
                url: 'http://api.xiaozhou.com/scorelist/8',
                data: {
                    "userName": "2413",
                    "age": 222222,
                }
            })
            //返回修改后的数据
            console.log(data)

