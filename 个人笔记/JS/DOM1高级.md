# DOM 高级

## 事件模型

### 基本事件模型

- 广泛应用
- 严重依赖HTML,不利于javascript开发,

### DOM事件模型

- 标准的事件模型

## 事件流

### 冒泡流

- 事件由内向外触发

### 捕获流

- 事件由外向内触发

### 标准流

- 它的特点是,冒泡流和捕获流的整合体
- 1 捕获阶段

	- 事件从最外面document传到目标对象

- 2 目标阶段

	- 执行目标阶段的事件

- 3 冒泡阶段

	- 从目标阶段再到document

## DOM2注册事件

### 正常浏览器

- obj.addEventListener('click' , fn ,false)
- 第一个参数是事件类型,不加on,是字符串的形式
- 第二个参数是函数
- 第三参数是布尔值,false就是,冒泡阶段执行,true就是捕获阶段执行

### 低版本浏览器

- obj.attachEvent('onclick',fn)
- 第一个参数,是事件类型,需要加on
- 第二个参数是函数,

## 销毁事件

### 正常浏览器

- obj.removeEventListener('click ',fn)  
- 第一个参数是事件的类型,字符串形式,不需要加on
- 第二个参数是事件调用的函数
- 只能销毁DOM2注册的事件

### 低版本浏览器

- obj.datchEvent('onclick' ,fn)
- 第一个参数是事件的类型,需要加on,字符串形式
- 第二个参数是事件的函数

### DOM0 销毁事件

- obj.onclick=null;

## DOMContentLoaded

### window.addEventListener('DOMContentLoaded',fn,false)

### 在文档节点加载完就会进行加载

### window.onload

- 是在文档节点及所有资源加载完后才会加载

## 阻止事件传播

### 正常浏览器

- event.stopPropagation(  )

### 低版本浏览器

- event.cancelBubble=true;
- 值为true,表示阻止事件传播

## 阻止默认事件

### 正常浏览器

- event.preventDefault(  )

### 低版本浏览器

- window.event.returnValue=false;

## event

### 事件执行函数只要执行,就会生成一个对象,用来保存当前的一些参数

### 常用参数

- clientX, clientY

	- 当前鼠标点击位置距离窗口的坐边和上边距离

- offsetX, offsetY

	- 当前鼠标点击位置距离被点击块的左边缘和上边缘距离

- pageX  pageY

	- 当前鼠标点击的位置距离文档最左边和上边的距离

- screenX,  screenY

	- 当前鼠标点击位置距离屏幕左边和上边的距离

