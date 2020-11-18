## 1 冒泡排序

###### 原理:

第一外部次循环,内部循环遍历找到一个最大的数,并且其位置是在最末尾,第二次外部循环,内部循环找到一个第二大的数,每次内部循环的次数就可以比之前少一次,因为上次已经找到了大的数,并且排在了后面

```js
const arr = [1, 3, 2, 4, 6, 5]
for (var i = 0; i < arr.length; i++) {
  for (var j = 0; j < arr.length - i - 1; j++) {
    // 判断当前元素与下一个元素的关系,如果想实现从大往小排,则改为大于号即可
    if (arr[j] < arr[j + 1]) {
      // 将下一个元素保存起来
      const a = arr[j + 1]
      // 将当前元素的值赋值给下一个元素
      arr[j + 1] = arr[j]
      // 将后面元素的值赋值给当前元素的值
      arr[j] = a
    }
  }
}
console.log(arr) //[1,2,3,4,5,6]
```

## 2 数组快排

###### 原理:

- 判断当前数组的长度是否小于 1,如果小于 1,则 return(用来后续递归的判断条件)
- 1 获取数组的一个基准值(该基准值就是数组的中间位置的值),只是一个分割点,其实可以去数组中的任意值都可以
- 2 定义两个空数组,对数组进行遍历循环,如果小于基准值,则放在一边,大于或者等于的放在另外一边
- 3 分别再对这两个数组调用一个快排的方法,进行递归,重复执行之前执行完的流程,除非满足条件
- 4 最后将这两个数组进行合并,并且 return 出去

```js
// 定义一个函数,实现快排
function quickSort(arr) {
  // 判断当前的数组长度是否小于等于1,如果小于1,就不用执行,直接return
  if (arr.length <= 1) return arr
  // 获取当前元素的基准元素,并且将这个基准值元素取出来,如果不取出来,后面遇到和这个基准值一样的数值时,会一直往右边的数组中插入,一直会递归,因为数组的长度不可能小于2
  const value = arr.splice([Math.floor(arr.length / 2)], 1)[0]
  // 定义两个数组,第一个存放比基准值小的元素,其他元素放到第二个数组中
  const left = [],
    right = []
  // 对传递进行的数组进行遍历,改变遍历的判断条件,可以实现从达到小的顺序
  arr.forEach((item) => (item < value ? left.push(item) : right.push(item)))

  // 然后将左边和右边的数组分别再使用一次快排,直到满足条件
  // const newLeft = quickSort(left), newRight = quickSort(right)
  // 将最终排序后的数组进行合并,并且返回出去
  // return newLeft.concat(value, newRight)

  return quickSort(left).concat(value, quickSort(right))
}
var arr = [5, 6, 8, 1, 3, 5, 4, 7, 3, 9, 5, 2]
console.log(quickSort(arr)) //[1, 2, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9]
```

## 3 手写实现 new 操作符

###### 原理

- 1 生成一个对象
- 2 构造函数的 this 会指向对应的实例对象
- 3 初始化属性和方法
- 4 返回实例对象

```js
// 定义一个构造函数
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log(this.name)
}
// 定义一个函数,实现new操作符
function myNew(Person, ...args) {
  // 定义一个空对象
  const obj = {}
  // 给这个空对象绑定一个方法,该方法的
  obj.Person = Person
  // 改变对象的原型对象
  obj.__proto__ = Person.prototype
  obj.Person(...args)
  // 将绑定的方法删除
  delete obj.Person
  return obj
}
console.log(myNew(Person, '哈哈', 20)) //{name: "哈哈", age: 20}
console.log(new Person('哈哈', 20)) //{name: "哈哈", age: 20}
```

## 4 手写实现 instanceOf

###### 原理

沿着对象的\_\_proto\_\_属性.一直找,如果和对应函数的 prototype 是一个对象,则返回 true,否则返返回 false

```js
function myInstanceOF(obj, Fn) {
  // 定义一个方法判断传入的参数的类型
  function testType(obj) {
    return Object.prototype.toString.call(obj).slice(8).replace(']', '')
  }
  // 判断传入的第二个参数是否为函数,如果不是函数则抛出错误,然后也不会执行后面的代码
  if (testType(Fn) !== 'Function') {
    throw new Error(`${Fn} is not Function`)
  }
  //判断传入的第一个参数是不是引用类型,如果既不是数组也不是对象,也不是函数,而且该对象不是null,则直接return falsse
  if (
    testType(obj) !== 'Object' &&
    testType(obj) !== 'Array' &&
    testType(obj) !== 'Function' &&
    testType(obj) === 'Null'
  ) {
    return false
  }

  // 判断当前对象的原型对象是否是null
  if (obj.__proto__ === 'null') return false
  // 判断对象的隐式原型是否和函数的隐士原型是否相等
  if (obj.__proto__ === Fn.prototype) {
    return true
  } else {
    // 如果不相等,则递归调用myInstanceOF方法,知道返回一个结果
    return myInstanceOF(obj.__proto__, Fn)
  }
}
```

## 5 手写实现 call/apply/bind

###### 原理

- 改变调用者的 this 指向,通过将该调用者函数绑定到 this 要指向的对象的原型对象上,然后调用该对象的这个函数,从而改变 函数的 this 指向

###### 单一版

```js
const obj = {
  name: '小周',
}
function say(age, test) {
  console.log(this)
  console.log(this.name, age, test)
}
Function.prototype.my = function (obj, ...args) {
  //将调用方法的函数保存起来
  obj.__proto__.that = this
  obj.that(...args)
  delete obj.__proto__.that
}
say.my(obj, 1)
console.log(say.my(obj, 1))
```

###### 三合一版

```js
const obj = {
  name: '小周',
}
function say(age, test) {
  console.log(this)
  console.log(this.name, age, test)
}
Function.prototype.my = function (type, obj) {
  // 将this保存起来,也就是调用这个方法的函数保存起来
  obj.__proto__.that = this
  // 获取参数的第二个参数以后的所有参数,是一个数组
  let arg = Array.from(arguments).slice(2)
  // 定义一个方法用来真正调用对应的函数
  function fn() {
    // 调用对应的方法,并且将参数展开,
    obj.that(...arg)
    // 删除在对象中添加的方法
    delete obj.__proto__.that
  }
  if (type === 'call' && !Array.isArray(arg[0])) {
    fn()
  } else if (type === 'apply' && Array.isArray(arg[0])) {
    // 因为传递进来的是一个数组,我们需要拿到该数组
    arg = arg[0]
    fn()
  } else if (type === 'bind' && !Array.isArray(arg[0])) {
    return fn
  } else {
    throw new Error('传递的参数不符合规范')
  }
}
say.my('apply', obj, 20, 100)
```

## 6 原型链加构造函数的组合继承

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.setName = function (name) {
  this.name = name
}
function Student(name, age, price) {
  // 调用call方法,改变Person的指向,从而可以拿到父类的属性
  Person.call(this, name, age)
  this.price = price
}
// 改变student的prototype的指向,指向Person的实例,这样就可以Person构造函数的方法
Student.prototype = new Person()
// 然后改变Student的显示原型对象的constructor指向,让constructor指向
Student.prototype.constructor = Student
Student.prototype.setPrice = function (price) {
  this.price = price
}
const student = new Student('小周', 30, 1000)
console.log(student) //{name: "小周", age: 30, price: 1000}
student.setName('小红')
console.log(student) //{name: "小红", age: 30, price: 1000}
student.setPrice(2000)
console.log(student) //  {name: "小红", age: 30, price: 2000}
console.log(student.constructor)
```

## 7 手写实现 pubSub

###### 原理

一个订阅者可能有多个发布者,只要方法不一样.我们将同一个订阅者的多个方法以键值对的形式存储起来,后面方便取消一个发布

```js
// 定义一个大容器对象,用来存储对应发布者的方法
let subscribeContainer = {}
// 定义一个PubSub对象
const PubSub = {}
// 定义一个标识,用来作为后面取消对应发布的唯一标识
let flag = 0
// 定义对应的订阅消息的方法
PubSub.subscribe = function (msg, fn) {
  // 获取到大容器对象中的订阅者对象
  let subscribes = subscribeContainer[msg]
  // 判断是不是第一次订阅
  if (!subscribes) {
    // 第一次订阅,则让这个订阅者对象为一个空对象
    subscribes = subscribeContainer[msg] = {}
  }
  // 定义一个标识
  let id = '_id' + flag++
  // 给这个订阅者对象添加一个属性
  subscribes[id] = fn
  // 将当前次订阅的的唯一标识返回
  return id
}

//同步发布消息
PubSub.publishSync = function (msg, data) {
  // 判断大容器对象中是否有对应的订阅者
  let subscribes = subscribeContainer[msg]
  // 如果有,遍历对应的订阅者对象,调用其中的每一个方法
  if (subscribes) {
    Object.keys(subscribes).forEach((item) => subscribes[item](data))
  }
}

// 异步发布消息
PubSub.publish = function (msg, data) {
  // 判断大容器对象中是否有对应的订阅者
  let subscribes = subscribeContainer[msg]
  // 如果有,遍历对应的订阅者对象,调用其中的每一个方法
  setTimeout(() => {
    if (subscribes) {
      Object.keys(subscribes).forEach((item) => subscribes[item](data))
    }
  }, 1000)
}

// 取消订阅,  使用唯一标识取消唯一的一个订阅,不传递参数取消所有,传递对应的消息名取消对应的消息名对应的所有订阅
PubSub.unsubcribe = function (msg) {
  // 判断是否有传递参数
  if (msg) {
    // 判断传递的参数是标识还是消息名
    if (msg.indexOf('_id') === 0) {
      Object.keys(subscribeContainer).forEach((subscribes) => {
        // 删除对应消息中的对应标识,有的话就会删除,没有的话没有影响
        delete subscribeContainer[subscribes][msg]
      })
    } else if (subscribeContainer[msg]) {
      // 直接删除这个消息对象
      delete subscribeContainer[msg]
    }
  } else {
    // 如果没有传递参数,则取消所有消息名的所有订阅
    subscribeContainer = {}
  }
}

const token = PubSub.subscribe('test1', function (data) {
  console.log('test1', data)
})
PubSub.subscribe('test1', function (data) {
  console.log('test1-', data)
})
PubSub.subscribe('test2', function (data) {
  console.log('test2', data)
})
PubSub.publish('test1', 3) //
PubSub.unsubcribe('test1')
PubSub.unsubcribe(token)
PubSub.unsubcribe()
PubSub.publishSync('test1', 1)
PubSub.publishSync('test1', 2)
PubSub.unsubcribe('test1')
```

## 8 简单实现函数的防抖节流

```js
// 防抖节流测试的按钮(小知识:谷歌浏览器中可以直接使用id,获取对应的元素)
<button id="test1">防抖</button>
<button id="test2">节流</button>
```

#### 防抖

##### 原理

阻止用户多次连续点击,不管怎么点击,最终只会执行一次.一般应用在获取验证码的界面

```js
// 实现防抖,使用闭包的形式,返回一个函数
function debounce(callback, time, ...args) {
  // 需要定义正常函数,如果使用箭头函数,this会执行window,不会执行对应触发回调的对象
  return function () {
    // 触发该函数,就清除对应的定时器,就取消上一次的对应的函数触发,直到不再点击,最终只会执行一次
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      // 清除上一个定时器的句柄,因为进入到这里就说明是最后触发的那一次
      this.timer = ''
      // 调用传递进来的回调,并且改变this,且传递参数
      callback.call(this, ...args)
    }, time)
  }
}
// 传递参数
let fn = function (a, b, c) {
  console.log('我是防抖测试', a, b, c)
  console.log(this)
}
test1.onclick = debounce(fn, 1000, 1, 23, 2)
```

#### 节流

###### 原理

在单位时间内触发一次,不会频繁触发,用在频繁的触发事件中,提高性能

```js
//函数节流
function throttle(...args) {
  return function () {
    // 通过解构获取到传递的所有参数
    const [callback, time, ...datas] = args
    // 获取上一次点击的时间戳与当前时间戳的差值是否大于传入的节流时间,并且第一次会直接执行一次
    if (Date.now() - this.time > time || !this.time) {
      // 保存当前的时间戳,下一次调用时进行判断
      this.time = Date.now()
      // 传递参数,并且调用
      callback.call(this, ...datas)
    }
  }
}
let fn1 = function (a, b, c) {
  console.log('我是节流测试', a, b, c)
  console.log(this)
}
test2.onclick = throttle(fn1, 1000, 3, 4, 5, 6)
```

## 9 实现深度克隆

- 1 克隆分为深度克隆和浅克隆,
  - 深度克隆是将对应数据的所有数据复制一份,内容相同,但是地址值不相同
  - 浅克隆就是最外一层的数据,如果该数据中还有引用类型的数据,则只会赋值地址

##### 实现原理

封装一个函数,函数年内部遍历数据,判断其中的每一个数据是否是引用类型数据,如果是则递归调用封装的函数,直到没有引用类型数据




## 手写实现自定义事件

## 手写 pormise

```

```
