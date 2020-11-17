# React 第5天(Router)

## React路由 理解

### 使用路由就可以实现单页面应用(spa),就是页面和url地址会发生变化,但是浏览器并不会刷新页面

### 使用路由可以可以很好地ajax结合,实现更好的用户体验

### history模式

- 兼容性稍微差一些,但是不影响我们正常的使用

### hash模式

- 兼容性较好,但是它第url地址中会多一个#号,这个#号对地址解析和操作会造成很多影响

	- 1 影响锚点链接,因为锚点链接也会使用#号,如果url地址中本身就有#号,那么就会出现错误,不知道以哪一个锚点为准
	- 2 有时候可能会让url地址出错,地址会错误,页面得不到正常的展示

### React 路由组件的特点.使用Route组件显示的组件有对应的几个对象,这些对象都是通过this.props进行访问

- history--该对象中有很多方法,这些方法可以用来实现编程式路由的跳转的方法,底层就是BOM的history对象中的一些方法的封装

	- replace

		- 实现路由跳转,但是会替换掉上一个历史记录

	- push

		- 实现路由跳转,和正常使用路由链接跳转一样

	- toBack

		- 实现历史记录的跳转,返回到上一个历史记录

	- toForward

		- 实现历史记录跳转,前进一个历史记录

- location

	- 获取query参数

		- this.props.location.search ,获取到的query参数格式是?a=b,的格式,需要自己进行截取,很少使用query进行传参

	- 获取state参数

		- 是路由传参比较常使用的一种传参方式,一般在编程式路由中使用对象进行传递的参数都会保存到这个state对象上
		- this.props.location.state

- match

	- 获取params参数,所有传递的params参数都会保存到this.props.match.params对象上

## React 路由的传参

### params 传参

- 在对应的地址上直接进行拼接

	- to='/home/message/1'

- 使用Route时这个参数需要一个占位符,以:开头,可以取任意名字,但我们一般用一些语义化的进行取名

	- path='/home/message/:id'

- 通过this.props.match.params可以拿到这个参数

### state传参

- 在使用编程式导航时,我们可以为方法的第二个参数传递一个对象,该对象就是最终的这个state参数
- 通过this.props.location.state可以取到这个参数

### query传参

- 直接在对应的路由地址上进行拼接,通过this.props.location.search进行获取,这种传参方式在react使用很少,几乎不用

## React 的编程式路由和声明式路由

### 声明式路由

- 使用路由链接进行跳转,
- 1 使用路由链接组件

	- <Nink to='/home' >

- 2 使用显示对应组件的<Route path='/home' component={Home} >

### 编程式路由

- 使用js的方法进行操作,调用对应的this.props.history上对应的方法,实现路由跳转

## 前端路由的原理

### SPA的原理

- 简单来说SPA就是一个WEB项目只有一个html页面,一旦加载完成,用户的操作并不会让页面进行加载和跳转,取而代之的是利用js来切换页面的内容,模拟多个视图之间的跳转

### 前端路由的由来

- 在ajax出现后,开始出现使用spa,使用spa大大提高了用户的交互体验,提高了网页加载的流畅度,虽然可以进行网页交互,但是url地址不发生变化,会导致两个问题,一个问题是,浏览器的历史记录不正确,不能进行正常的前进后退等操作,还有一个问题是.不利于SEO,所以前端路由应运而生

### 前端路由的概念

- 简单来说,就是在保证只有一个html页面的同时,使用spa时,每一个spa页面有一个单独的url地址,在浏览器历史记录中都是保存着这些url,根据这些url可以实现前进后退等操作,SEO也是通过这个来实现

## React 路由库

### react-router-dom

- PC端使用路由各种操作引入的对应的库,这个库会向外暴露多个组件
- 一般使用的库中的组件

	- BrowserRouter和HashRouter

		- 所有组件都必须是这个两个组件中其中一个组件的子组件,我们一般将App组件的最外层换成这个组件
		- BrowserRouter组件

			- history模式
			- 一般使用BrowserRouter组件

		- HashRouter组件

			- hash模式

	- NavLink 和 Link

		- 这个组件实际功能都是实现路由链接的跳转,有一个区别就是NavLink在点击的对应路由标签会多一个active的类的样式

			- 我们也可以在NavLink标签中,使用一个属性,修改默认的active类,添加一个activeClassName属性,属性值就是新添加的'active'类的样式属性

		- 一般在路由链接标签样式跳转后需要一定的样式效果就用NavLink,其他情况使用Link
		- 属性 to

			- 要跳转的对应的路由地址

	- Route

		- 这个组件是用来显示对应要跳转的路由组件的
		- 在React中,一个路由组件链接标签,对应一个Route组件,Vue则是当前级的下一级路由组件,使用一个router-view就行
		- Route组件的属性

			- path

				- 需要匹配到的路由地址,不加exact,也就是路由链接地址是以这个地址开头就能匹配到,然后就可以展示这个组件

			- component

				- 对应显示的组件名

			- exact

				- 是否严格匹配path
				- 属性值为true,则直接可以不写属性值true

					- 表示严格匹配,只有和path一样的路由链接地址才能匹配到这个组件显示

				- 属性值为false,可以不写

					- 没有限制,只要是以path路径开头的都可以匹配到

	- Redirect

		- 实现路由的重定向,
		- to 要重定向的地址
		- path 当前要被重定向的地址
		- 如果只写一个to,则表示都会重定向到这个to的地址,然后显示对应的组件,一般放在所有Route的最后,在所有路由都匹配不到的时候,重定向到这个地址

	- Switch

		- 相当于一个开关,在这个组件中,所有组件中(Route或者Redirect),只会有一个组件会被匹配到,只要匹配,就不会再继续向下匹配
		- 只要使用Route和Redirect个数为多个时,我们都可以包裹一个Switch组件

### react-router-native

- 移动端使用所引入的库

### react-router

- 是移动端和pc端的整合体

