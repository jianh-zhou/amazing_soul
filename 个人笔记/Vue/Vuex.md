# Vuex

## Vuex的概念

### Vuex是专门为Vue.js专门开发的状态管理模式

### 特点

- 采用集中式储存管理应用的所有组件的状态,并以相应的规则保证状态以一种可预测的方式发生变化

### 状态自管理应用

- state

	- 驱动应用的数据源

- view

	- 一声明方式将state映射到视图

- actions

	- 响应在view上的用户输入导致的状态变化

- 这三个部分是循环状态的,都是影响下一个,一直影响

## Vuex的使用

### 1 npm安装

- npm install vuex

### 2 在对应的文件中引入该插件,并且使用Vue的use方法使用该插件,最终将Vuex.Store实例化一个对象暴露出去

- 1 引入该插件

	- 1 import Vuex from 'vuex'

- 2 使用该插件

	- Vue.use(Vuex)

- 3 暴露Vuex.Store实例化一个对象暴露出去

	- export default new Vuex.Store({ })

### 4 在main.js中引入该暴露的Vuex.store实例对象.并且进行注册

### 5 根据this.$store可以分发对应的action

## state

### 它是一个对象,包含所有组件的状态数据

### 我们在使用时,都是把该对象单独放在一个文件中,最终将该对象暴露出去,实例Vuex.store函数的对象文件中引入即可

### 就是所有组件中的data数据的集合

### 辅助函数 mapState

- 在其他组件使用对应的状态数据时,可以通过该函数,最终返回一个结果

	- ...mapState(['count'])
	- 使用该方法最终返回一个动态数据,一般放在计算属性中

### 在组件中通过计算属性,可以通过this.$store.state来访问其中的所有状态数据

## getters

### 包含多个状态数据计算属性的get方法的对象

### 我们在使用时,都是把该对象单独放在一个文件中,最终将该对象暴露出去,实例Vuex.store函数的对象文件中引入即可

### 它是相当于直接计算属性,在多个组件共享这一状态时,可以不用使用state计算多次,而是直接放在getters中计算,直接获取就行

### 辅助函数mapGetters

-   ...mapGetters(['evenOrOdd']),
- 最终直接返回该计算属性的最终结果,一般放在computed

### 在组件中通过计算属性,可以通过this.$store.getters来访问其中的所有状态数据

## mutations

### 包含多个直接修改状态数据的方法的对象

### 该对象里面是直接改变数据状态的方法,也就是说,该对象的中的方法只是真实改变状态数据的地方,但他自己不会调用,一般都是通过action方法来执行这些方法 ,最终改变对象

### 一般是状态改变几次,就有几个mutation方法,状态改变并不是一个数据改变一次,就一定算一次状态改变,还有可能就是多个数据状态同时改变,也可以算是改变一次

### 每一个mutation方法的名字,我们就称之为该类,我们一般使用都是会将该类的值定义为一个常量,目的是为了在actions对象中使用时,直接就可以使用该变量,而不是传入的是字符串

### 辅助函数mapMutations

- ...mapMutations({ increment: 'INCREMENT', decrement: 'DECREMENT' }),
- 使用该辅助函数然后在利用三元运算符,最终就相当于给该方法,最终调用了对应的mutation方法
- 该参数可以是对象,也可以是数组,如果方法名,和mutation类型相同的时候,我们一般使用数组,否则使用对象,让方法和类型一一对应
- 我们很少直接使用mutation类型

## actions

### 包含多个间接修改状态数据的方法的对象

### 在该对象中的所有方法我们都可以称之为action对象,这些对象方法都是间接修改状态数据的,因为他们都是调用mutation方法

### 辅助函数mapAcations

- ...mapActions(['incrementOrOdd', 'incrementAsync']),
- 该参数可以是对象,也可以是数组,如果方法名,和mutation类型相同的时候,我们一般使用数组,否则使用对象,让方法和类型一一对应
- 我们在使用时一般都时使用action方法

### action方法

-  increment (context) {
    context.commit(INCREMENT)
  },

	- 通过context.commit方法传入mutation类型,相当于得到该类型方法,最终通过其他方法使用

-   decrement ({ commit }) {
    commit(DECREMENT)
  },

	- 通过解构赋值context,直接得到commit方法

- 在执行action对象时,接收一个context参数,该参数和Store实例有相同的方法

### 分发action(提交action)

-   this.$store.dispatch('search',searchTxt)
- 可以通过该实例对象上的$store属性上的dispatch方法,第一个参数是action方法的名字,第二个是该action方法所需要传递的参数

## moudles

### 子主题 1

## 伪数组转换为真数组

### 1 Array.from( )

### 2 利用解构赋值

- const list2 = [...divObjs]

### 3 利用call,apply,bind

- const list3 = Array.prototype.slice.call(divObjs)
- 原理就是改变this,然后调用该方法,返回对应的结果

### 4  都是利用call方法,改变this指向,

- const list4 = [].slice.call(divObjs)

## nodeType节点

### 页面中所有的元素都是节点,有元素节点,文本节点,属性节点

### 节点的类型

- 元素(标签)节点

	- 1

- 属性节点

	- 2

- 文本节点

	- 3

## hasOwnProperty( )

### 判断当前对象是否有该属性,只能是该对象自有的

## 文档对象碎片模型

### 1 创建文档对象碎片模型

- const fargment=document.createDocumentFargment( )

### 2 将当前的节点元素插入到文档碎片对象中,之前元素的节点都会消失,相当于剪切

## 数据代理

### 在Vue实例对象中配置对象中的data属性,正常是通过data访问,但是是使用了数据代理,通过data属性就拿不到其中的属性,只能通过Vue实例对象进行直接访问,也就是this,这种就是一种数据代理

### Vue实例对象就是代理者,data就是被代理者

## 易错点

### 1 单词自己打时容易打错,把字母顺序打反

### 2 引入的模块一般都是首字母大写,插件模块的名字一般全部都是小写

### 3 在使用数据时,注意this的指向,

