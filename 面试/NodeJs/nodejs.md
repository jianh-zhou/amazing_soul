## 1 说说 PROMISE?

<font size=4>
<font size=4>
&emsp;&emsp;Promise 是异步编程的解决方案，用来解决我们日常开发中常见的回调地狱问题。

&emsp;&emsp;Promise 对象有三种状态，分别是 pending、resolved/fulfilled、rejected，pending 状态代表初始化或者进行中，resolved 代表成功，rejected 代表失败。Promise 对象 的状态只能被更改一次。Promise 对象的实例有很多方法，比如 then、catch、finally。 then 方法接受两个回调函数，成功调用第一个，失败调用第二个。then 方法返回的也 是一个 Promise 实例，返回的状态有几种可能:

- 1. 如果没有返回值或者返回的不是一个 promise，就是成功
- 2. 如果返回的是一个失败的 promise 或者抛错，就是失败
- 3. 其他情况是成功

&emsp;&emsp;catch 接受一个失败的回调函数，当上一个 promise 状态是失败的时候，会触发这个回 调函数，并传入相应的参数，catch 的返回值和 then 是一样的
finally 是无论成功还是失败都会调用这个函数

#### 说完 promise，肯定要提一下 async/await

&emsp;&emsp;sync/await 是我们异步编程的最终解决方案。await 表达式必须写在 async 函数里面， 但是 async 函数可以没有 await；await 关键字后面一般都是跟一个 Promise 对象实例， await 后面如果是一个 pending 状态的 promise，会暂停等待，不会继续往下执行代码， 如果是一个成功状态的 promise，会往下执行代码，如果是一个失败的 promise 会抛 错，await 的返回值就是 promise 实例返回的内部 value 值，我们一般建议将 await 包 在 try/catch 语法中

## 2 GET 请求和 POST 请求区别？

1.  get 请求重点在从服务器上获取资源，而 post 请求重点在向服务器发送数据
2.  get 在浏览器回退时是无害的，而 post 会再次提交请求
3.  get 请求会被浏览器主动 cache，而 post 不会，除非手动设置
4.  get 请求只能进行 url 编码，而 post 支持多种编码方式。
5.  get 请求在 url 中传送的参数是有长度限制的，而 post 没有限制
6.  对参数的数据类型，get 只接受 ASCII 字符，而 post 没有限制
7.  get 请求不安全，post 请求相对于 get 请求来说更安全一点，因为参数地址栏不可见

## 3 什么是 XSS 攻击和 CSRF 攻击？区别？如何防范？

### XSS：

&emsp;&emsp;分为持久型和非持久型

###### 持久型：

&emsp;&emsp;攻击的代码被服务端写入进数据库中，这种攻击危害性很大，因为如果网站访问量很大的话，就会导致大量正常访问页面的用户都受到攻击

###### 非持久型：

&emsp;&emsp;一般通过修改 URL 参数的方式加入攻击代码，诱导用户访问链接从而进行攻击

###### 防范措施：

- 1. 可以通过转义字符的方式进行防范
- 2. CSP 方式，开启 CSP 方式：
  - 设置 HTTP Header 中的 Content-Security-Policy
  - 设置 meta 标签的方式 <meta --http-equiv="Content-Security-Policy">

### CSRF：

&emsp;&emsp;攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行响应的逻辑

###### 防范措施：

- 1. Get 请求不对数据进行修改
- 2. 不让第三方网站访问到用户 Cookie
- 3. 阻止第三方网站请求接口
- 4. 请求时附带验证信息，比如验证码或者 Token

## 4 事件轮询机制？

#### 浏览器事件轮询：

有 4 个概念：

- 1. 执行栈
  - 要执行的代码进入执行栈
- 2. 管理模块
  - DOM 事件管理、定时器管理、ajax 请求管理
- 3. 回调队列
  - 事件队列、任务队列、消息队列
- 4. 事件轮询

  - 内部不停询问元素有没有被触发事件

    <img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gh5zsm0f2cj310p0u076v.jpg" width="800" height="500" max-width="100%"/>

#### Node 事件轮询：

- 1. timers
  - 会执行 setTimeout 和 setInterval
- 2. I/O callbacks
  - 会执行 close 的 事件, setImmediate
- 3. Idle,prepare
- 4. poll
  - 执行到点的定时器
  - 执行 poll 队列中的事件
- 5. check
  - 会执行 setImmediate
- 6. close callbacks
  - 会执行 close 的 事件
  ###### 当然,这些只是宏任务中的 6 个阶段 优先级低
  #### 微任务(优先级由高到低)：
  - process.nexTtick(如果在异步任务中执行,就不再是优先级最高的,会放在下一轮微任务队列中,会比同级别的其他微任务级别执行顺序后)
  - promise.then / catch / finally

## 5 跨域解决方案？

##### 1. JSONP

利用 script 标签没有跨域限制的漏洞。通过 script 标签指向一个需要访问的地址并提供一个回调函数来接收数据

##### 2.CORS

服务端设置 Access-Control-Allow-Origin 就可以开启 CORS

##### 3. 服务器代理

原理：发送请求经过自己的服务器，自己的服务器负责把请求发送到真实的服务器上，响应也是一样，因为服务器和服务器之间不存在跨域。

## 6 进程和线程

进程：CPU 的调度单位，执行程序开启进程来执行
线程：一个进程包含多个线程，如果进程可以只包含一个线程(主线程），进程和进
程之间的数据无法共享，在同一个进程内的多个线程可以共享数据

## 7 JS 是单线程还是多线程？如何证明？说明原因？怎么开启多线程？（WEB WORKER）

#### js 是单线程

设置了定时器，定时器的回调函数会等到主线程空闲且时间到执行
如果主线程没有空闲下来，即使定时器的时间到了，回调函数也不会执行（等到主
线程空闲）

多线程会有线程调度以及线程开启关闭的开销

JavaScript 主要在浏览器端操作 DOM 完成特效，如果不是单线程，不好解决页面渲染的同步问题

利用 Worker 可以实现多线程运算符
通过实例化一个 Worker，创建一个子线程
子线程里面不允许操作 DOM，也没有 window

###### Worker 适合场景：

- 把耗时的计算放在分线程，不会影响主线程的其他工作
- 如果耗时的计算在主线程，导致页面卡顿（甚至崩溃）

###### worker 的缺点：

① 无法操作 DOM
② 无法跨域
③ 兼容性（不是所有的浏览器都可以使用）
Worker.prototype.postMessage() 向分线程发送数据
Worker.prototype.onmessage 监听分线程的消息
