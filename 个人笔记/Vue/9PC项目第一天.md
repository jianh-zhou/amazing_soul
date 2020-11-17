# 9 PC项目第一天

## 路由传参

### params 传参

- 直接传递

	- this.$router.push(`/search/${this.keyword}`)

- 对象形式传参

	- this.$router.push({name:'search',params:{keyword:this.keyword}}

- 注册路由配置

	- { name:'search',component:Search,path:'/search/:keyword'}

- 在使用对象进行参数传递时,只能使用name属性,不能使用path属性,而且使用对象传递参数时,不会进行拼接在地址后面,这种传递参数页面刷新参数就会消失

### query 传参

- 直接传参

	- this.$router.push(`/search?keyword=${this.keyword}`)

- 对象形式传参

	- path

		- this.$router.push({path:'/search',query:{keyword:this.keyword}}

	- name

		- this.$router.push({name:'search',query:{keyword:this.keyword}}

- 注册路由器配置

	- { path:'/search',path:'/search',name:'search'}

### meta 对象传参

- 每一个路由信息($route)对象都有一个meta对象,这个对象时供我们所使用的,最开始是一个空对象
- 在注册路由的时候,可以给该meta对象添加需要的参数
-  通过$route.meta对象访问最开始设置的属性值

## 全局组件的注册

### 当我们的组件需要同时在多个组件中使用时,我们可以使其成为全局组件,

### 使用流程

- 1 App.vue 中引入对应的组件
- 2 Vue.component('TypeNav',TypeNav)

## 编程式路由的连续点击

### 在使用编程式路由时,如果连续点击多次路由链接,会出现报错,原因是官方禁止这么做,因为在点击后,此时正在请求中,连续点击属于资源浪费

### 解决方法 1 

- 1 在方法后面传递第二个回调函数作为参数,  第二个回调函数作为成功的回调,连续点击也只会执行一次
- 2 第二个参数传递一个null或者undefined 第三参数传递一个回调函数, 第3个回调函数为失败的回调函数,在连续点击时会一直触发该回调函数
- 3 因为该方法返回一个promise对象,利用then和catch方法接收
- 4 直接使用catch方法接收

### 解决方法2 

- 重写对应的方法

	- 1 设置一个变量保存默认的push或者replace方法
	- 2 将该方法重新赋值一个函数
	- 3 该函数传入3个参数,在传入第二个或者第3个时,设置一个默认的回调函数
	- 4 调用之前保存的原生的方法,利用call改变this指向,并且传递对应的参数

## 路由组件的小知识

### 1 端口号的后面默认是有一个 / 的,如果要设置默认的路由组件跳转,可以给对应的路由组件的path属性值为 / .相当于默认的,使用时也不需要设置router-link,直接使用router-view即可

### 2 在拆分组件时.注意组件中的结构样式所使用的图片的路径问题

### 3 在不传递参数时,会跳转对应的路由页面,但地址栏确没有,需要在注册路由的path属性值后面加1个?.而且需要根据参数的情况,使用两种不同的方式.添加一个?号,表示参数可传不可传

## axios的二次封装

### 1 使用axios.create方法,返回一个axios实例对象

- 1 配置默认的url接口
- 2 设置超时时间

### 2 设置对应的请求拦截

- 1 开启进度条
- 2 将请求信息返回

### 3 设置对应的响应拦截

- 成功回调

	- 1 关闭进度条
	- 2 返回对应的数据

- 失败回调

	- 1 关闭进度条
	- 2 弹出警告
	- 3 返回一个失败的promise对象

### 4 将对应的axios实例暴露

### 5 封装为对应的函数使其成为API,并将其暴露,供别使用

## vue.config.js配置

### 禁止eslint语法

- lintOnSave:false

### 设置服务器代理

-  devServer: {
    proxy: {
      '/api': {
        target: 'http://182.92.128.115', // 服务器地址
        changeOrigin: true // 是否跨域
      }
    }

## 注意点以及错误

### 1 在对应的实例对象中使用注册或者其他操作时,对象的属性是固定的.名字不能随便使用

### 2 export 暴露的变量在接收时,是需要使用{ }的

### 3 路由使用meta传参时,使用时需要通过$route信息对象进行访问

### 4 对应的css文件需要引入跟路径相对的文件

