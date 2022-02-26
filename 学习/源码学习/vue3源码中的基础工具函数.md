## vue3 源码中的基础工具函数学习

#### 1、冻结一个空对象，该对象不能被修改。但是也有特殊情况，如果存在对象嵌套的情况下，该方法不能使嵌套的对象被冻结。也就是说，只会冻结最外层的属性

##### const EMPTY_OBJ = Object.freeze({})

- 例子 1（第一层添加属性）

```js
const EMPTY_OBJ1 = Object.freeze({})
console.log(JSON.stringify(EMPTY_OBJ1)) // {}
EMPTY_OBJ1.test = '添加一个测试属性'
console.log(JSON.stringify(EMPTY_OBJ1)) // {}
```

- 例子 2（第一层修改属性）

```js
const EMPTY_OBJ2 = Object.freeze({ test: '这是第一层属性' })
console.log(EMPTY_OBJ2) // {}
EMPTY_OBJ2.test = '修改第一层属性'
console.log(EMPTY_OBJ2) // {}
```

- 例子 3 （第二层修改属性）

```js
const EMPTY_OBJ3 = Object.freeze({ props: { test: '这是第二层的属性' } })
console.log(EMPTY_OBJ3) // {props:{test:'这是第二层的属性'}}
EMPTY_OBJ3.props.test = '第二层属性能够修改'
console.log(EMPTY_OBJ3) // { props: { test: '第二层属性能够修改' } }
```

#### 2、空数组

- 在冻结的情况下，如果添加就会直接报错。修改的话会没有效果
- 同样是一个空数组，在非生产环境和生产环境定义不一样，无非就是能否有报错信息，但是生产- 环境如果没有报错信息的话，如果生产环境出现问题，可能第一时间不好定位。

```js
const EMPTY_ARR = process.env.NODE_ENV !== 'production' ? Object.freeze([]) : []
// 例子
// EMPTY_ARR.push(1) // 直接报错，不允许添加
console.log(EMPTY_ARR.length) // 0
EMPTY_ARR.length = 3
console.log(EMPTY_ARR.length) // 0
```

#### 3、isModelListener 监听器判断字符串是否以 onUpdate:开头

- 使用的是 es6 提供的方法

```js
const isModelListener = key => key.startsWith('onUpdate:')
console.log(isModelListener('dsdfdds')) // false
console.log(isModelListener('onUpdate:')) // true
```

#### 4、remove 移除数组的一项

- 第一个参数是待移出的数据，第二个是要移出的元素
- splice 方法使用其实性能不是最好的。删除数组的其中一项，其他项的位置都需要移动，这样性能不是很好

```js
const remove = (arr, el) => {
  // 使用indexOf找到要移出元素的下标
  const i = arr.indexOf(el)
  if (i > -1) {
    // 直接使用splice方法移出其中的一项
    arr.splice(i, 1)
  }
}
```

- axios InterceptorManager 拦截器源码中，拦截器用数组存储的。但实际移除拦截器时，只是把拦截器置为 null 。而不是用 splice 移除。最后执行时为 null 的不执行，同样效果。axios 拦截器这个场景下，不得不说为性能做到了很好的考虑。

```js
// 代码有删减
// 声明
this.handlers = []
// 移除
if (this.handlers[id]) {
  this.handlers[id] = null
}
// 执行
if (h !== null) {
  fn(h)
}
```

- 其实个人感觉这种方法也有自己的缺点，就是数组的长度只会增加，不会减少，在考虑特殊情况下，这种也不是最好的，比如这个数组数据量大，如果要进行遍历，性能可能就会差了
- 其实不管用什么项目，不一定有最好的方法，得找一个最合适自己的方法就行了

```js
const remove = (arr, el) => {
  arr = arr.filter(item => item !== el)
  console.log(arr, 3234)
}
const arr = [1, 2, 3, 4]
remove(arr, 3)
console.log(arr) // [1,2,4]
```

- 这个方法是我自己理解写的，乍一看感觉可以，但是最后结果发现是错的
- 函数的实参传递给函数的形参，这个形参的值和外层定义的变量的指针指向是一个，在函数里面改变形参的值，相当于重新改变指针的指向，但是最开始的数据是没有变的，所以会出现没有生效的问题

#### 5、hasOwn 是不是自己本身所拥有的属性

```js
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (val, key) => val.hasOwnProperty(key)
const hasOwn = (val, key) => hasOwnProperty.call(val, key); // 源码

console.log(hasOwn({ a: 1 }, 'a'))// true
console.log(hasOwn({ **proto**: { a: 2 } }, 'a'))// false
const a = { **proto**: { a: 2 } }
console.log(a.a) // 2 可以直接访问，但是不是自己的属性
console.log(hasOwn({}, 'toString'))// false
console.log(hasOwn({}, 'hasOwnProperty'))// false
```

#### 6、isMap 判断是不是 Map 对象

- 添加属性用 set 方法，也可以和普通对象一样添加属性，但是它就合 set 方法添加的不在一起，
- 使用 get 方法访问 set 方法添加的属性，
- 该数据结构是 ES6 提供的，普通对象的形式使字符串-->值，该数据结构真正的满足了值-->值的形式

```js
const isMap = val => Object.prototype.toString(val) === '[object Map]'
const map = new Map()
const obj = { a: 1 }
console.log(isMap(obj)) // false
map.set(obj, 'test') // 设置属性
map.test = '测试一下'
console.log(map.get(obj)) // 'test'
console.log(map.get('test')) // undefined
console.log(map.test) // '测试一下’
```

#### 7、isSymbol 判断是不是 Symbol

- Symbol 表示独一无二的值

```js
const isSymbol = val => typeof val === 'symbol'
const s = Symbol()
console.log(isSymbol(s)) // true
const a = Symbol()
console.log(a === s) // false
```

#### 8、isIntegerKey 判断是不是数字型的字符串 key 值

```js
const isString = val => typeof val === 'string'
const isIntegerKey = key =>
  isString(key) &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key
console.log(isIntegerKey('a')) // false
console.log(isIntegerKey('12')) // true
console.log(isIntegerKey('-1')) // false
console.log(isIntegerKey('1.2')) //false
console.log(isIntegerKey('011')) //false
console.log(isIntegerKey('0')) //true
```

#### 9、hasChanged 判断是不是有变化

- 最开始源码

```js
const hasChanged = (value, oldValue) =>
  value !== oldValue && (value === value || oldValue === oldValue)
console.log(hasChanged(NaN, NaN)) // false
console.log(hasChanged(1, 2)) // true
console.log(hasChanged(1, 1)) // false
console.log(hasChanged(0, -0)) // false
console.log(hasChanged(0, +0)) // false
```

- 10、比较两个值是否严格相等，和===的行为基本一致，不同之处时候+0 不等于-0，NaN 等于自身

```js
const hasChanged = (value, oldValue) => !Object.is(value, oldValue)
```
