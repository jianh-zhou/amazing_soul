# React 第一天

## 1 React 简单介绍

### React是一个js框架,拥有虚拟DOM.组件化等特点,数据能够响应式的展示在页面,使用的是jsx语法,babel最终将其编译为浏览器能够认识的js原生代码. 单向数据流

### 和vue相比,相对来说更为繁杂,但更灵活多用,没有vue的指令

## 2 React创建虚拟DOM的方式

### 1 直接创建

- 1 引入对应的react文件,和react-dom文件,react-dom文件是依赖于第一个文件的,所以要先引入
- 2 调用React的createelement方法,

	- 参数

		- 参数1 标签的名字
		- 参数2 标签的属性,以对象的形式书写
		- 参数3 标签的内容
		- 参数4--

			- 放入其他虚拟DOM元素,嵌套

	- const result=React.createElement('h1' , {className:ss}, '我的笔记')

- 3 使用对应的方法,将虚拟DOM插入到对应的文档节点中,

	- ReactDOM.render(result,document.getElementById('demo1')

- 4 该方法如果标签嵌套太多,会很麻烦,

### 2 使用jsx语法

- 1 引入对应的react文件,和react-dom文件,react-dom文件是依赖于第一个文件的,所以要先引入,引入对应的babel文件,并且改变script标签的类型为text/babel
- 2 直接按照html书写的形式书写虚拟DOM.并且用一个变量接收该虚拟DOM

	- 1 在书写class属性时,不能直接写class,因为class是作为定义类的关键字,我们使用className代替
	- 2 可以使用{}包裹一个变量,最终会解析这个变量,有点类似vue的插值语法
	- const text ='这是一个表达式'const reslult=<h1> 哈哈{text}</h1>

- 3 使用对应的方法,将虚拟DOM插入到对应的文档节点中

	- ReactDOM.render(result,document.getElementById('demo2')

## 3 创建react组件

### 1 工厂函数创建

- 一般用来定义简单组件
- 1 定义一个构造函数,返回一个根标签包裹的虚拟DOM

	- function MyComponent(){ return  \<h1>这是工厂函数定义的简单组件 \</h1>

- 2 使用ReactDOM.render方法,将其渲染到对应的文档中

	- ReactDOM.render(<MyComponent />,document.getElementById('demo1')

- 判断该组件标签是否符合组件标签的规范,如果符合,则根据标签名找到对应的工厂函数,然后调用该工厂函数,将该虚拟DOM插入到对应的节点中,进行渲染

### 2 ES6类创建

- 一般用来定义复杂组件
- 1 定义一个类并且该类继承React.Component方法,其中定义一个render方法,该方法是作为实例使用的

	- class MyComponent1 extends React.Component{  render( ){ return \<h1>这是ES6类创建的组件/</h1>}}

- 2 使用ReactDOM.render方法,将其渲染到对应的文档中

	- ReactDOM.render(<MyComponent />,document.getElementById('demo1')

- 判断该组件标签是否符合组件标签的规范,如果符合,则根据标签名找到对应的类中的render,生成实例,调用对应的render方法,将该方法的返回值作为虚拟DOM,将该虚拟DOM插入到对应的节点中,进行渲染

### 创建组件标签的注意点

- 1 首字母大写,因为jsx语法,在解析时,小写的会当做html元素解析
- 2 虚拟DOM中必须要有一个根标签
- 3 必须是闭合标签,有结束标签的标志,单标签时,标签名后要有/ 

## 4 组件的state

### 在ES6类创建的组件中

- 1 它是react管理数据的对象,所有数据都会绑定在这个对象上面,通过特定的方法改变这个对象上的属性,可以实时改变数据
- 定义

	- 2 直接在类中定义(简写)

		- state={isShow:true}

	- 1 在constructor中定义,通过this.state绑定一个对象

		- this.state={isShow:true)

- 修改state对象上的属性时,必须得通过this.setState方法修改,否则就算修改,也不能触发页面的更新

## ES6类组件定义中函数this的指向

### 普通函数正常指向的是undefined,

### 箭头函数的this指向的是实例对象

### 声明周期回调函数中的this指向的是实例对象

### 定义类是里面都是遵守的严格模式

## jsx语法

### 1 注释需要使用大括号包裹

### 2 是javascript语言的一门扩展,类似于html,但不是html

### 3 在react中,可以用其来描述页面的结构

### 4 jsx在编译时,会变成相应的javascript对象描述

