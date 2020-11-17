# vue基础第二天

## v-for

### 注意点

- 遍历接收多个参数时,用的是括号,而不是大括号
- 在遍历,需要给该标签添加一个:key='per.id',有利于提高页面的性能,都是使用id,也可以用index.但是可能会出问题,对页面的性能也有影响

### v-for比v-if优先级高,会在执行完对应的v-for命令后, 再执行对应的v-if

## vue的事件处理

### event事件对象

- 回调函数没有传递参数时,直接在回调函数体中传递一个形参,该形参就是事件对象
- 回调函数有参数传递时,在使用时,需要传递一个参数$event,这个参数就是event事件对象

### 事件修饰符

- 阻止事件冒泡

	- 直接在绑定事件的事件类型后面加.stop修饰符

- 阻止默认事件

	- 直接在绑定事件的类型后面加.prevnet修饰符

### 按键修饰符

- enter按键修饰符

	- @keyup.enter='fn'
	- @keyup.13='fn'

		- 常用

	- 在事件名后面加上对应的修饰符

## 表单数据绑定

### 文本输入框

- <input type="text" v-model="userifom.name"><br />
- v-model后面的跟的是表达式,数据时动态的,需要使用双引号

### 单选框

-    <input type="radio" name="gender" value="男" v-model="userifom.gender" />男
    <input type="radio" name="gender" value="女" v-model="userifom.gende" />女
- 单选框在使用时.需要使用一个相同的name属性值,单选框才会起作用
- 当v-model的表达式的值,与单选框的value属性值一样时,该单选框就会被选中

### 多选框

-    <input type="checkbox" value="eat" v-model="userifom.hobby" />
   <input type="checkbox" value="sleep" v-model="userifom.hobby" />
- 在使用多选框时,当userifom.hobby这个数组中值包含该多选框的value值,这个多选框就会被选中

### 下拉框

- 在下拉框select中,设置一个v-model双向数据绑定,当该值与下拉列表optiion的value值相同时,则该下拉列表option下拉框被选中
- 在对数据进行操作时,option标签中,需要添加value属性,这个属性是强制数据绑定,也就是属性值是动态的,

### 提交

- 在form表单中,给提交按钮的事件类型后面添加一个修饰符,阻止form表单默认提交

### 文本域框

- 可以使用v-model给其设置一个动态的value值

## vue的生命周期

### vue实例对象,在最开始new出来到最后销毁所经过的的这一系列流程,称为生命周期

### new操作符的流程

- 1 在内存中申请一块空闲的空间,用来存储当前的实例对象
- 2 将this指向当前的实例对象
- 3 初始化属性的方法和值
- 4 返回实例对象

### 对象销毁

- 问题:  当给对象赋值为null时,或者销毁vue实例时,可能出现销毁或者赋值为null后,依然能够使用里面的属性或者方法
- 原因 ; 在对这些对象赋值为null或者销毁时,浏览器是使用的是一种垃圾回收机制,可能对这个对象不一定回收,因为当内存中空闲空间多时,可能就会不回收,这是不确定的,只有浏览器将这个对象进行回收后,才能真正的不能对其使用操作,并不是赋值为null或者自身的一些方法销毁

### vue的生命周期函数(钩子)

- 1 数据初始化阶段

	- 初始化之前

		- beforeCreate( ){   }

	- 初始化之后

		- created( )

	- 该阶段处于数据data的初始化阶段,也就是data数据的从无到有

- 2 页面渲染阶段

	-  页面渲染之前

		- beforeMouent( ){ }

	- 页面渲染之后

		- mounted( ) {  }

	- 该阶段处于页面渲染的阶段,大多数异步请求会在mounted中执行

- 3 界面更新阶段

	- 页面更新之前

		- beforeUpdate( ) { }

	- 页面更新之后

		- updated( ) { }

	- 界面更新也就是当页面渲染完之后,页面的数据会发生变化,就是更新阶段
	- 只要进入这个阶段,数据就已经发生变化了

- 4 销毁阶段

	- 销毁之前

		- beforeDestroy( ){ } 

	- 销毁之后

		- destroyed( ){ }

### vue实例的销毁

- this.$destroy( )

## vue的过渡和动画

### vue的过渡

- 隐藏到显示

	- 1 开始阶段

		- fade-enter

	- 2 过渡阶段

		- fade-enter-active

	- 3 结束阶段

		- fade-enter-on

- 显示到隐藏

	- 1 开始阶段

		- fade-leave

	- 2 过渡阶段

		- fade-leave-active

	- 3 结束阶段

		- fade-leave-to

- fade代码transition标签的name属性值

### 例子

- 		<button @click="isOk=!isOk">切换效果展示</button>
		<transition name="fade">
			<p v-show="isOk">哈哈,我又变帅了</p>
		</transition>


### 在使用时,需要配合使用transition标签,该标签有一个name属性

## 定义过滤器和使用

### 过滤器的介绍

- 在vue1.0中有自己的过滤器,filter
- 在vue2.0中想要使用过滤器,则需要自己定义

### 过滤器的作用

- 对要显示的数据进行特定的格式化,然后在进行显示

### 自定义过滤器

- 1 引入

	- <script src="https://cdn.bootcdn.net/ajax/libs/moment.js/2.24.0/moment.js"></script>
	- 相关网址

		- 在这些网址中找moment,js
		- https://www.bootcdn.cn/
		- https://www.bootcdn.cn/moment.js/
		- http://momentjs.cn/ 官网

- 2 定义过滤器

	- Vue.Filter(filterName,function(value,[arg1,arg2,...]){
		  return newValue
		 })

- 3 使用过滤器

	- <div>{{myData|filterName}}</div>

## vue中的指令

### 内置指令

- 内置指令就是系统自带的指令
- 种类

	- v-bind

		- 强制数据绑定
		- 简写   :

	- v-on

		- 事件绑定
		- 简写@

	- v-model

		- 双向数据绑定

	- v-if v-else v-else-if

		- 当该指令的值为true时,最终使用该指令的元素就会显示,否则消失.都需要配合v-if使用

	- v-show

		- 显示或者隐藏元素

	- v-for 

		- 遍历元素(对象,数组,数字)

	- v-text  v-html

		- v-text相当于innerText(contentText)
		- v-html相当于innerHtml

### 自定义指令

- 全局指令

	- 定义

		- Vue.directive('指令名字', function(el,binding){   }

	- 使用

		- v-'指令名字'

	- 例子

		- 		Vue.directive('upper-text', function (el, binding) {
			el.innerHTML = binding.value.toUpperCase()
		})
		- 使用该指令可以将el中内容转换为小写

- 局部指令

	- 在Vue的配置文件中配置

		- directive:('lowerText'(el,binding ){   }

	- 使用
	v-'指令名字'
	- 例子

		- 		directives: {
				'lower-text'(el, binding){
					el.innerHTML = binding.value.toLowerCase()
				}
		- 使用该指令可以将el中内容转换为小写

- 注意点

	- 自定义指令,在定义时,是不需要加v-,在使用该指令时,需要加v-
	- el--element

		- 指令属性所在的标签对象

	- binding

		- 包含指令相关数据的对象容器,里面的value值就是该标签里面的值

	- 全局指令和局部指令的区别

		- 全局指令可以在全局指令中使用
		- 局部指令只能在局部指令所在的容器内使用

## vue的key值问题

### 1 虚拟DOM中key的作用

- key是虚拟DOM对象的标识,在更新时起着重要的作用
- 当列表中的数据发生变化或者生成新的虚拟DOM后,React进行新旧虚拟DOM的diff比较

	- Key没有变

		- item数据没变,直接使用原来的真实DOM
		- item数据变了,对原来的真实DOM进行更新

	- key值变化

		- 销毁原来的真实DOM,根据Item数据创建新的真实DOM(即使item数据没有变化)

### 2 key为index的问题

- 添加删除或者排序,会产生没有必要的真实DOM的更新,影响性能,界面效果是没有问题的
- 如果在执行这些操作时,有文本输入框,最终还会出现页面显示错误的问题

