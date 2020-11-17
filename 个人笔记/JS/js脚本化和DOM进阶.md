# js脚本化和DOM进阶

## 获取当前滚动条的位置

### scrollTop和scrollLeft

### 因为需要兼容,我们可以为其封装一个函数

function getSystemScroll() {
            //因为浏览器的不同,我们需要兼容
            //ie678支持的是document.body,其他正常浏览器支持的是document.documentElement,所以我们需要进行判断
            if (document.documentElement) {
                return {
                    x: document.documentElement.scrollLeft,
                    y: document.documentElement.scrollTop
                };
            } else {
                return {
                    x: document.body.scrollLeft,
                    y: document.body.scrollTop
                };
            };
        };

### 得到的是一个对象,可以通过利用对象的属性获取对应的值

## 设置滚动条的位置

### scrollTop和scrollLeft  该值可以不仅可以读取,也可以设置

### 设置滚动条的封装函数

function setSystemScroll(x, y) {
            // 判断当前浏览器而且判断传入的实参是否是数字
            if (x != 'undefined' && ((typeof x) == 'number')) {
                document.documentElement.scrollLeft = x;
            };
            if (y != 'undefined' && ((typeof scrollY) == 'number')) {
                document.documentElement.scrollTop = y;
            };
        };

## 创建节点

### 创建一个元素节点

- document.cerateElement( '标签名' )

### 创建文本节点

- document.createTextNode( '文本' )

## 插入节点

### parent.appenChild(要插入的节点)

- 会插入到父元素的最后一个子节点

### parent.insetBefore(要插入的节点 , 被插入的节点之前)

## 删除节点

### parent.removeChild(要删除的节点)

## 替换节点

### parent.replaceChild( 要替换的节点,被替换的节点)

## 复制节点

### object(要复制的节点) .cloneNode(参数)

### 参数

- true

	- 深复制

		- 复制该标签里,包括他的子节点

- false

	- 浅复制

		- 复制该标签,包括标签的属性

