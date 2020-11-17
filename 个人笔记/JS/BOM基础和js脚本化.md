# BOM基础和js脚本化

## window对象

### newWin=window.open( './ demo.html ')

- 打开一个新的网页,3个参数,用逗号分开,每一个都用引号包着
- 3个参数

	- 打开网页的地址
	- 跳转方式._self和_blank
	- css属性

- 只有一个参数

	- 默认拥有_blank属性

- 3个参数

	- 会打开一个新的窗口,不再是打开新的标签页

- 会有一个返回值,就是当前窗口对象

### newWin.close(  )

- 关闭当前窗口
- 必须是window.open打开的窗口

## navigator 对象

### 存储了浏览器当前的相关信息,如版本,系统,内核等信息

###  常见属性

- onLine

	- 检查浏览器是否连接互联网
	- 如果有返回false,否则返回true

- platform

	- 浏览器所在的系统平台

- userAgent

	- 浏览器的用户代理字符串

### 可以通过属性userAgent获得的属性,判断当前浏览器,也可以判断操作系统

var ua = navigator.userAgent.toLowerCase();
var info = {
    ie:/msie/.test(ua) && !/opera/.test(ua),
    op:/opera/.test(ua),
    sa:/version.*safari/.test(ua),
    ch:/chrome/.test(ua),
    ff:/gecko/.test(ua) && !/webkit/.test(ua)
}
info.ie && console.log("ie");
info.op && console.log("op");
info.sa&& console.log("sa");
info.ch && console.log("ch");
info.ff && console.log("ff");

## location对象

### 方法

- location.assign( 'demo.html' )

	- 跳转到一个新的网页

- location.replace(' demo.html')

	- 替换当前的网页,并且清除掉之前的历史记录,

- location.reload( )

	- 硬刷新

### 重要属性

- location.href='demo.html'

	- 跳转到指定网页

## history 对象

### history.back( )

- 后退一个网页

### history.forward( )

- 前进一个网页

### history.go( -2)

- 参数为正就往前跳转
- 参数为负就往后跳转

## setTimeout(function(){   },1000)

### 延时调用,在1000ms后,调用该函数,并执行

### 取消延时调用

- clearTimeout( timer)

### 他有一个返回值,就是该延时调用器的一个id编号

## setInvertal(function( ){  },1000)

### 间歇调用,没g隔1000ms,调用一次该函数

### 取消间歇调用

- clearInvertal( timer)

### 它有一个返回值,就是该间歇调用的一个id编号

## 计时器的一些注意点

### 里面的参数可以传函数.但必须放在该计时器的时间后面

### this指向

- 一般都是指向window

### 是一个异步事件,如果要向里面传递参数,则需要在时间后面加参数

## 获取宽度和高度

### offsetWidth和offsetHeight

- border-box 的宽高

### clientWidth和clientHeight

- padding-box 的宽高

### scrollWidth和scrollHeight

- 获取元素可以滚动的宽度和高度

## offsetTop和offsetLeft

### 获取元素的距离包含块的偏移值

## clientTop和clientLeft

### 获取元素的边框

### 如果每个方向的边框大小不同,则以left和top为准

## clientParent

### 获取元素的包容块

## scrollTop和scrollLeft

### 获取元素滚动条滚动的距离

### 这个属性可以设置,也可以读取

## 获取当前窗口大小的兼容写法

  var oHtml = document.getElementsByTagName("html")[0];
    var oBody = document.getElementsByTagName("body")[0];
    console.log(document.documentElement === oHtml);//true
    console.log(document.body === oBody);//true

    // 打印浏览器窗口的宽高
    console.log(document.documentElement.clientHeight);
    console.log(document.documentElement.clientWidth);

    //获取窗口高度的兼容性写法
    console.log(document.documentElement.clientWidth || document.body.clientWidth);

### 因为获取当前页面的方法不一样所以需要兼容写法

### ie 678

-  document.body

### 正常浏览器

- document.documentElement

