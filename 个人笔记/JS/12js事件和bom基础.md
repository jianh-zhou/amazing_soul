# 12 js事件和bom基础

## 鼠标事件

### mousedown

- 鼠标按下事件

### mouseup

- 鼠标按下后的弹起事件

### mousemove

- 鼠标移动事件

### mouseout

- 鼠标移出事件

	- 事件会发生冒泡

### mouseover

- 鼠标移入事件

	- 事件会发生冒泡

### mouseenter

- 鼠标进入事件

	- 事件不会发生冒泡

### mouseleave

- 鼠标移出事件

	- 事件不会发生冒泡

## 元素滚动条事件

### obj.onscroll

- 只要鼠标滚动,会一直触发

## onload事件

### window.onload

- 在页面内容全部加载完毕后,才会触发该事件

### window.onscroll

- 浏览器滚动条事件

### img.onload

- 图片加载事件
- 在图片加载完成后会触发的事件

### window.onresize

- 浏览器被重置时才会发生事件

## BOM 

### Browser Object Model

- 浏览器对象模型
- 一直没有被标准化,但各个浏览器厂商支持BOM,他们都有着自己的方法去扩展它
- 使用js能够与浏览器进行对话

## window  对象

### 是js访问浏览器窗口的一个接口

### 也是ECMAScript规定的Global对象

- 全局作用域声明的变量函数都是他的属性方法

## 系统对话框

### alert(  )

- 警告框,只能点击确定

### confirm(  )

- 弹出后会有确定和取消两个选择,选择确定返回true,选择取消返回false

### promit(  )

- 弹出文本输入框,点击确定返回输入的值,点击取消返回null

