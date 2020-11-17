# 7 react第七天(redux的完善及redux部分高级)

## 1 redux的异步解决方案

### 1 在创建store的文件中,引入一个redux插件的一个applyMiddleware方法,

- import {applyMiddleware,createStore} from 'redux'

### 2 引入redux-thunk 中间件插件

- import thunk from 'redux-thunk'

### 3 给createStore方法生成store对象时多添加一个参数

- createStore(reducers, applyMiddleWare(thunk))

### 4 在对应的actions 文件中,添加对应的异步action

- 1 一般一个异步的数据action需要定义两个action,一个是根据数据生成action的,另一个是内部返回一个函数,函数中实现异步,并且,分发之前的action
- 2 定义同步的action.这个action会在异步那一个action中diapatch分发
- 3 定义异步的action creaters,返回一个函数,函数的接收一个参数是dispatch,函数内部执行异步代码,并且分发同步action

	- return (dispatch)=>{dispatch(action);}

### 5 在调用对应的异步action时,和同步action操作一样

## 2 redux的开发工具 composeWithDevTools

### 1 下载redux工具(只在开发时用)

- npm i redux-devtools-extension  -D

### 2  在对应是store文件夹中.引入该工具(函数)

-  import {componseWithDevTools} from 'redux-devtools-extension'

### 3 使用判断让该工具只在开发时有效

- 1 判断当前的环境

	- if(process.env,NODE_ENV==='development')

- 2 如果是开发环境,将之前异步时传入的createStore的第二个参数,作为这个方法的参数,作为createStore的第二个参数

	- createStore(reduces, componseWithDevTools( applyMiddleWare(thunk)))

## 3 redux的使用流程

### 1 下载所需要的包

- npm i redux

	- createStore()

		- 参数1 reducers
		- 参数2  componseWithDevTools( applyMiddleWare(thunk)))

	- applyMiddleWare(chunk)

- npm i react-redux

	- 作用 : 减少一直引入store和分发action的操作
	- Provider 组件
	- connect 高阶组件

- npm i thunk

	- 实现异步

- npm i redux-deveTools-extension

	- componseWithDevTools

### 2 定义redux的4个模块

- 1 store 模块 ---生成store对象仓库
- 2  reducers 模块 ---生成reducers函数
- 3 actions 模块 ---action creaters,生成action的模块
- 4 constants 模块 ---action类型的常量模块

### 3 使用react-redux模块在index.js进行配置

- <Provider store={store} > <App /> </ Provider>

### 4  分析需求

- 1 根据实际需求看有哪些数据需要使用redux (看数据是否被多个组件同时使用)
- 2 看有多少个action,也就是对数据有多少种操作行为

### 5 定义actions 

- 根据对数据的操作行为来定义action
- 同步action

	- 直接进行定义,返回一个action对象

- 异步action

	- 一般是发送请求都会定义为一个异步action,一般一个异步action需要配合一个同步action

### 6 定义reducers

- 1 根据不同的数据,定义不同的reducer 
- 2 每一个reducer感觉action的类型,定义 switch case 语句,对数据进行操作,生成一个新的state(newState)
- 3 在定义reducer时,都会给这个函数preState参数设置一个默认值
- 4 如果只有一个数据,则直接将这个reducer暴露即可,如果是多个,则需要引入redux的一个方法

	- 1 引入 combinReducers

		- import {combineReducers} from 'redux'

	- 2 最后暴露这个方法,这个方法接收一个对象作为参数,对象的属性和值就是多个reducer

### 7 组件使用

- 1 在组件中引入对应的connect (高阶组件--函数)

	- import {connect} from 'react-redux'

- 2 如果需要操作数据就引入对应的action,否则不需要
- 3 将当前组件作为connect第二次调用的参数,最终返回一个新的组件,将该组件暴露出去

	- 第一次调用

		- 参数1 

			-  (state) =>({count:state.count})

				- 获取对应的数据,如果只有一个reducer,则直接写state即可,多个的话,则需要使用其中的一个对应的属性

			- 如果只需要修改数据,而不操作,第一个参数可以设置为null

		- 参数2 

			- 一个对象,需要修改数据的对应action
			- 如果只是获取数据,第二个参数可以不传或者为null

	- 参数2 

		- 传入对应的当前使用这个connect的组件

- 4 组件中可以直接通过this.props访问对应的数据和对应的action

## 4 Hook 

### 1 介绍及意义

- 是React16.8新增的一种特殊,可以让我们不使用class的情况下,使用satate和其他的React的特性
- Hook就是一个钩子,就是普通的函数,能让我们使用React组件的状态和生命周期函数

### 2 作用

- 1 可以不再使用this
- 2 不使用class,使用function
- 3 让代码更加复用,不用定义复杂的HOC(高阶组件)

### 3 注意 

- 1 不能在一些循环(递归),控制流.嵌套中使用hook,只能在顶层调用钩子
- 2 只能在React的函数组件中调用钩子,不能在javascript函数中进行调用

### 常规的使用

- useState

	- 1 引入这个useState

		- import {useState} from 'react'

	- 2 useState方法传入一个初始的state值,返回一个数组,进行解构获得返回值的参数

		- const [state , setState] = useState(defaultState)

	- 3 state就是对应的状态数据,定义一次状态数据,调用一次这个方法
	- 4 setState就是和就是对应修改state状态数据的方法

		- setState(count+1)
		- 这个方法直接传入参数,这个参数的值就是最后修改后的对应的state的值

- useEffect

	- 作用 :可以作为一部分生命周期回调函数
	- 1 引入useEffect

		- import {useEffect} from 'react'

	- 2 在对应的函数中直接调用这个方法
	- 3 参数

		- 参数1 回调函数

			- 1 该回调函数没有返回一个回调函数

				- 相当于componentDidMount和componentDideUpdate这两个生命周期回调函数

			- 2 该函数返回一个回调函数

				- 返回的这个一个回调函数内部相当于componentDidMount,和componentWillUnmount,这个componentDidMount比上面那个先执行

		- 参数2 数组

			- 数组中放入当前函数的依赖值,如果依赖值变化,就会触发对应的函数,如果没有变化,就不会触发多次

	- useEffect(() => {}, []) 我们最多的就是这个,相当于组件挂载完成的生命钩子componetnDidMount

## 5 context

### 作用 :是一种通信方式,可以实现父子(祖孙)之间的通信

### react 中的context使用

- 1 配置对应生成context对象的文件,并且将其暴露

	- 1 引入生成context的方法createContext

		- import {createContext} from 'react'

	- 2 调用方法,并将其暴露出去

		- export default createContext( )

	- context对象的两个属性

		- Provider 

			- 提供数据

		- Consumer

			- 消费,使用数据

- 2 在父组件提供数据

	- 1 引入对应的context对象
	- 2 使用Provider 

		-         <context.Provider value={person}>
          app...
          <Father />
        </context.Provider>

- 3 在子组件件中使用数据

	- 1 引入对应的context对象
	- 消费数据方法1 ,用于多个

		-        <context.Consumer>
          {(person) => {
            return <p>{person.name}</p>;
          }}
        </context.Consumer
		- 包裹一个回调函数

	- 消费数据方法2 ,一般用于只有一个

		- 1 static contenType=context
		- 2 直接通过this就可以访问到这个属性

### vue 中的context使用

- 1 父组件中的配置对象添加一个provider属性,属性值是一个对象,作为提供数据
- 2 子组件直接在其配置对象中使用inject进行接收,属性值为一个数组,数组的元素就是对应要接收的属性,然后直接通过this进行访问

## 6 SSR服务端渲染

### 1 在我们使用框架时,都是单页面应用,通过js的形式加载页面,最终我们的html页面很少,不利于SEO的搜索,所以我们需要服务端渲染,解决SEO优化的不友好,和加快首屏加载速度

### 2 在react使用一个方法,将html页面在服务端进行返回,最终返回给客服端,进行展示

- ReactDOMServer.renderToString(element)

## 7 webPack 的简易知识

### entry 打包入口文件配置

### output 打包完之后的文件配置

- 1 出口文件夹的名字及位置 pathname
- 2 出口文件的名字 filename

### module 打包的相关配置

- rules 配置的相关规则

### plugin 打包所需要使用的相关插件

### mode 打包的环境,生产或者开发环境

### target 打包的运行环境

- 如果是node 代表,是node.js环境下

### resolve 文件夹的一些简写配置

- 'alias'  路径别名
- extensions 文件的扩展名

