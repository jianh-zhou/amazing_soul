# axios进阶及手写实现

## 请求默认配置

### axios.defaults.xxx

- axios.defaluts.baseURL=' http://127.0.0.1:80'

	- 设置默认的请求地址

- axios.defaults.headers={ ' authorization ' : '这是设置的一个请求头' }

	- 设置默认的请求头

- axios.defaults.timeout=3000

	- 设置响应时间,超过3秒则取消请求

## axios.create( )

### create方法可以创建一个axios的实例

### 里面传递一个参数,参数为对象

- 对象里面是请求的一些默认配置

### 在使用时,直接就是该方法的返回值,该返回值是一个promise对象.,后面跟对应的get或者post方法

### 作用

- 可以在有多个默认配置时,使用该方法,比如说服务器为多台时

### 例子

- const server1=axios.create( {                              
           baseURL: ' http://127.0.0.1/80' ,     } ;             
 const server2=axios.create( {                              
           baseURL: ' http://127.0.0.1/8090' ,     } ;                                                                                server.get('/one).then(v=>{console.log(v)}                     server1.get('/one').then(v=>{console.log(v)}    

## 取消请求

### 1 设置一个全局变量cacelFn,赋值为null

### 2 在传入config配置信息时,需要传递一个参数cancelToken: new axios.CancelToken( v=>{cacelFn=c})

- 当使用axios时,就将cacelFn函数赋值

### 3 调用该cacelFn函数,就会取消请求,该函数传递的参数是axios请求后catch接收的值.该值返回一个对象,对象的message属性值就是cacelFn函数传递的参数

## 拦截器

### 请求拦截

- axios.interceptors.request.use(config=>{ return config})

	- config是请求的配置信息
	- 该use方法传递的参数两个回调函数,但一般只写一个
	- 第一个回调函数如果不把对应的配置信息返回,则会出现错误
	- 可以通过该方法,对请求的配置信息进行操作

### 响应拦截 

- axios.interceptors.response.use(res=>{ return res})

	- res是返回的响应信息对象.里面包含各种数据
	- 需要将其得到的响应信息对象返回,最后才能接收到响应

### 底层原理

- 每个use方法返回的都是一个promise对象,然后进行链式调用
- use方法都是有两个回调函数作为参数,状态成功就执行第一个回调函数
- 请求拦截与代码的顺序相反,也就是说,先添加的请求拦截后面才会拦截,而且响应拦截顺序就是正常,按照代码的从上到下的顺序,而执行请求仿真请求拦截和响应拦截的中间的

## axios的简易封装

### 1 创建一个axios函数,传递一个配置信息config参数对象,该方法在传递参数时.如果不传递请求方式的参数,需要自己默认设为get请求方式,并将请求方式利用upperLower方法将其转换为大写

### 2 axios函数返回一个promise对象,该对象里面发送ajax请求,

### 3 在响应成功后,设置该promise对象为成功状态,并模拟正常的参数情况

- resolve( 参数 )

	- config

		- 请求的配置信息对象

	- data

		- 返回响应数据

	- headers

		- 所有的请求头信息

	- status

		- 响应状态码

	- statusText

		- 响应状态码文本

	- request

		- XMLHttpRequest的实例对象

### 4 判断传递的参数config是否有params对象参数,然后开始请求

- 如果有该参数对象,将该params对象转换为字符串,拼接到传递的url地址上面

### 5 判断请求的方式是否为post,push,patch请求方式,并且判断传递的config配置的data参数是对象还是字符串,最终根据对应的判断发送数据

- 如果请求方式为post,push,patch时,

	- 如果data为对象时

		- 设置xhr.setRequestHeader('conten-type', 'application/json')

	- 如果data为字符串时

		- 设置xhr.setRequestHeader('conten-type', 'application/x-www-form-urlencoded')

	- 发送打他数据,将data数据添加到xhr.send(data)

- 如果请求方式为非post,pust,patch时

	- xhr.send( )

## request,get,post的封装

### 定义一个空的Axios函数

### 这些方法都是Axios原型对象上的方法

### Axios.prototype.request( ) 

- 就是和axios的简易封装一样

### Axios.prototype.post( )

-     Axios.prototype.post = function (url,data) {
        return this.request({
            url,
            method:"post",
            data
        })
    }
- 该方法需要将request方法的返回值return,因为该方法也是返回一个promise对象

### Axios.prototype.get( )

-   Axios.prototype.get = function (url,config) {
        return this.request({
            method:"get",
            url,
            ...config
        });
    }

## instansce

### 原理

- 1 axios并不能说是new Axios( )出来的,它是一个函数对象,可以直接调用axios( ),也可以调用get,post,request等方法
- 2 通过将Axios函数的实例对象上的方法复制给axios,并将Axios构造函数的实例对象也复制给axios
- 3 最终的axios就是一个函数对象

### 流程

- 1 声明一个Axios构造函数,并且传递一个默认的空对象配置参数

	- 为其实例对象添加两个属性,一个默认配置属性,一个拦截器属性
	-     function Axios(instanceConfig){
        this.defaults = instanceConfig;
        this.interceptors ={};
    }

- 2 声明一个返回最终的axios函数的函数,并且接收一个默认配置对象参数

	- 1 生成一个Axios构造函数的实例,并将默然的对象配置参数传递给构造函数

		-  const context = new Axios(defaultConfig);

	- 2 将request方法复制一份给instance函数

		- var instance = Axios.prototype.request.bind(context)
		- 直接等号赋值只是一个地址,需要利用bind方法,获得一个属于自己的函数,自身函数体一样,但并不是同一个函数

	- 3 遍历Axios原型对象上的方法,将其添加到,instance函数上

		-   Object.keys(Axios.prototype).forEach(method=>{
            instance[method] = Axios.prototype[method].bind(context)
        })

	- 4 遍历Axios实例对象上的属性,将其添加到instance函数上

		-    Object.keys(context).forEach(attr=>{
            instance[attr] = context[attr];
        })

	- 5 返回instance函数

		- return instance

- 3 调用createIntrance函数,传递一个空对象参数,作为默认配置对象,返回aixos函数

## 拦截系统封装

### 1 声明一个InterceptorManager构造函数,并给该构造函数的实例添加一个hander(句柄)属性,该属性的值为一个空数组

-     function InterceptorManager(){
        // 句柄：要干什么事
        this.handlers = [];
    } 

### 2 InterceptorManager构造函数的原型对象上添加一个use方法,use方法需要传递两个回调函数作为参数,当调用use方法时,为其实例对象的hander属性添加一个对象,这个对象的的两个值分别是使用use方法传递的两个参数

-   InterceptorManager.prototype.use = function (fulfilled,rejected) {
        this.handlers.push({
            fulfilled,
            rejected
        })
    }

### 3 声明一个Axios构造函数,给该构造函数添加一个默认配置属性和拦截属性intercepctors,interceptors的属性值为一个对象,该对象有两个属性,request和response,它们的值都是interceptosrManager的实例对象

-   function Axios(instanceConfig){
        this.defaults = instanceConfig;// 配置信息放置到defaults;
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager(),
        }
    }

### 4 设置Axios.prototype.request方法,里面将请求设置为一个单独的函数dispatchRequest,并设置一个变量chain保存一个一个数组,将dispatchRequest和undefined(占位符)添加到该数组中,将Axios的实例对象的的interceptors.request.hander属性进行遍历,最终将里面的回掉函数添加到chain数组的最前面(unshift),将interceptors.response.hander的属性进行遍历,将其中的函数添加到chain数组的后面(push),声明一个promise变量.该变量为一个成功的promise对象,利用while循环,将chain的数组一次次放到then方法里面,直到最后数组chain的长度为0,最终将该promise返回

-   var chain = [dispatchRequest, undefined];
        // 将request拦截的方法通过unshift放置到chain数组内
        this.interceptors.request.handlers.forEach(interceptor => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected)
        })
        this.interceptors.response.handlers.forEach(interceptor => {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        })

        let promise = Promise.resolve(config);

        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift())
        }
        return promise;

### 原生版

- axios.interceptors.request.use( )
- axios.interceptors.respomse.use( )

## 取消请求

### 为axios添加一个CancelToken方法,接收一个executor回调函数作为参数,声明一个变量resolvepromise为空,用来保存热水love函数该方法的实例对象有一个promise属性,该属性为一个promise对象,在该promise的回调函数中将resolve函数赋值给resolvepromise,调用executor函数,并将resolvepromise作为其的参数,进行调用

-     axios.CancelToken = function (executor) {
        let resolvePromise;
        this.promise = new Promise(resolve => {
            resolvePromise = resolve;
        })
        executor(resolvePromise);
    }

### 在使用时,需要将其作为参数传递给config配置对象

- cancelToken: new axios.CancelToken(c => {
                cancelFn = c; // cancelFn
            }

### 在使用时,需要将cancelFn 作为全局变量,当调用该cancelFn函数时,就是调用resolve函数,也就是相当于将 axios.CancelToken的promise属性改为成功状态,最终可以执行then方法,执行   xhr.abort();达到取消请求的目的

### 在axios函数中,进行判断

-     if (config.cancelToken) {
                config.cancelToken.promise.then(v => {
                    xhr.abort();
                })
            }

### 每次在发送请求时,就需要判断该函数是否为空,如果为空则发送请求,如果不为空则取消上次的请求

-    if (cancelFn) cancelFn();

### axios方法时的传参

-  axios({
            method: "get",
            url: "http://127.0.0.1/one",
            cancelToken: new axios.CancelToken(c => {
                cancelFn = c; // cancelFn
            })
        });

## 并发请求

### axios.all([one,two])

- 该方法接收一个数组,其中的元素是axios的一次请求,all方法调用then方法时,返回的也是一个数组,该数组的值是axios的reslove所传递的参数,只有当所有axios请求后,最终才执行then方法,并返回该数组

	-  const one = axios.get("http://127.0.0.1/one");
    const two = axios.get("http://127.0.0.1/two");
        axios.all([one,two])
        .then(value=>{
            console.log(value)
        })

### axios.spread

-   axios.all([one,two])
    .then(axios.spread(function (a,b) {
        console.log(a,b)
    }))
- 该方法可以分别获得两个axios的返回的resolve参数

