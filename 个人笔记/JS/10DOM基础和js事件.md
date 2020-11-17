# 10 DOM基础和js事件

## 事件版本

### DOM0 

- 在w3c标准还没出来之前,浏览器厂商自己规范绑定事件,现在一直还可以用

### DOM2

- 第二个版本,也是用的比较多的绑定事件

## document

### window的一个属性

### 保存很多方法

## 节点

### 元素节点

### 文本节点

### 属性节点

### 注释节点

### document节点

## 节点的一些方法

### 获取元素中的所有子节点

- obj . childNodes (   )
- 返回的结果是一个类数组,里面是装有所有子节点的集合

### 返回的是一个数字,代表元素节点的类型,

- obj[ 0 ].

### 获取当前节点的类型

- obj1[1] . typeNodes(  )

### 获取当前节点的value值

- obj1[ 2 ].valueNodes(  )
- 元素节点是没有默认值,注释节点和文办节点的默认值是当前文本和注释内容

### 获取当前节点的名称

- obj1[ 3 ] . nameNodes(  ) 

## 传统获取元素

### document.getElementsByTageName( '标签名 ' )

- 通过标签名获取元素
- 获取结果是一个类数组,在使用时需要加下标
- 完美兼容

### document.getElementById( 'id名' )

- 通过id名获取元素
- 获取的结果就是当前拥有此id的唯一对象
- 完美兼容

### document.getElementsByClassName( ' 类名' );

- 通过类名获取元素
- 获取结果是一个类数组.在使用时需要加下标
- IE678不兼容

### document.getElementsByName( 'name' )

- 通过name属性获取元素
- 获取的结果是一个类数组,在使用时需要加一个下标
- IE中只能获取表单中有name属性的元素

## selectors API

### document . querySelector( ' 选择器 ' ) ;

- 返回的只是一个对象,就是当前选择器中的第一个,也是唯一的一个

### document.querySelectorAll( ' 选择器 ' ) ;

- 返回的是一个类数组,
- 在使用时要加下标才能操作
- 有forEach( ) 方法

### 与传统元素的不同

- 传统方法获取的元素是动态的,而它获取的是静态的
- 在对元素进行修改的情况下,该方法获取的仍是最开始的那个
- 传统元素获取的元素是动态的,随着元素的修改会跟着修改

## 节点关系中访问节点方法

### 获取元素的父亲节点

- obj . parentNode 
- document对象的父节点是null  ,在向上找就会报错

### 获取元素的子元素节点

- obj . childrens(  )
- 结果是一个类数组
- 在IE中使用该方法,他会获取注释节点,所以使用该放方法,就不要写注释

### 获取当前元素的上一个兄弟元素

- obj . previousSibling(  )

	- 在IE678中获取元素节点

- obj . previousElementSibling(  )

	- 在非IE678中获取元素节点

### 获取当前元素的下一个兄弟元素

- obj . nextSibling(  )

	- 在IE678中获取元素节点

- obj . nextElementSibling(  )

	- 在非IE678中获取元素节点

### 获取当前元素节点中的第一个子元素

- obj . firstChild(  )

	- 在IE678中获取第一个元素节点

- obj . firstElementChild( )

	- 在非IE678中获取第一个元素节点

### 获取当前元素节点中的最后一个子元素

- obj . lastChild(  )

	- 在IE678中获取最后一个元素节点

- obj . lastElementChild(  )

	- 在非IE678中获取最后一个元素节点

### 兼容写法

- function fn( obj ) { if( obj . lastElementChild(  )  ) { return  obj . lastElementChild(  ) }  else { return obj . lastChild(  ) };     fn( obj1 );

## 其他获取元素的方法

### document . body===document . getElementsByTageName( 'body ' )[ 0 ]

### docunment . head ===docmment.getElementsByTageName( 'head ' )[ 0 ];

### document.documentElement=== document.getElementByTageName(' html ')[ 0 ];

## 获取焦点事件

### obj . focus(  )

- 获取焦点

### obj . blur(  ) 

- 失去焦点

## 点击事件

### obj . onclick ( )

- 单击事件( 鼠标左键)

### obj . ondblclick(  )

- 双击事件( 鼠标左键)

### obj . oncontextmenu(  )

- 鼠标右键单击事件

## 键盘事件

### obj . onkeydown(  )

- 键盘按下事件

### obj . onkeyup(  )

- 键盘按键弹起事件
- 常用

## 表单事件

### obj . change(  )

- 文本框内容发生变化就会触发事件

### obj . input(  )

- 文本框内容触发且失去焦点才会触发事件

