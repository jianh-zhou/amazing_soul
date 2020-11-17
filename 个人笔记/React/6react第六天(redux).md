# 6 react第六天(redux)

## redux的概念

### 和vue的vuex一样,管理状态数据的,它是一个插件,使用需要引入,而且并不只有react能用,其他框架也可以使用,只是react使用的比较多

### redux的三大原则

- 单一数据源
- state只是可读的
- 使用纯函数来进行修改

## redux的执行流程

### 1 调用对应的acions creaters(actions工厂构造函数)得到对应的action,action是actions creaters的返回值,action对象有两个属性,

- action对象

	- type 属性

		- 属性值数据变化的类型,比如数据的加减乘除等

	- data属性

		- 数据变化的量,就是新数据与旧数据之间的'差'

### 2 调用store对象上的dispatch方法,该方法会触发reducers函数,

### 3 reducers函数内部,会得到一个旧的state的值(previousState),和action对象,函数内部执行完后,必然会得到一个state数据,函数内部会根据数据变化的类型进行筛选,然后执行对旧数据和数据变化的值进行操作,最后返回一个新的state的值(newState)

### 4 这个新的newState会重新放到store上,覆盖之前的那个state值

### 5 store对象有一个subScribe的函数,只要store数据仓库变化,subScribe的回调函数就会执行,这个回调函数中就可以调用this,setState方法,根据新数据来重新渲染页面

## redux 的三个模块

### 1 actions (action creaters) 

- 作用: 用来创建action对象的工厂构造函数
- 1 该模块中.是多个构造函数,并且将其进行暴露出去,每一个构造函数都是生成一个对应的action,数据变化的一种类型就是一个构造函数

### 2 store 

- 作用: 用来管理状态数据的仓库对象,该对象上有很多方法
- 1 引入redux库中的一个方法createStore,该方法接收一个参数reducers,最终会生成一个对象(store)

	- dispatch方法

		- 分发action

	- getState方法

		- 获取store上的所有数据

	- subScribe方法

		- 监听store对象上数据,,如果store发生变化,该方法的从参数(回调函数)会执行

### 3  reducers 函数

- 作用: 根据之前的state的值,和对应的action,最终计算出一个新的state的值
- 是一个函数,这个函数会作为生成store对象时的createStore方法的参数
- 形参

	- 1 previousState

		- 这是之前的那个state的值,一半设置一个默认值

	- 2 action

		- 需要改变state的状态的值的action

- 改函数内部是通过判断操作数据类型,结合旧值和action,最终生成一个新的state值.进行返回

## 使用redux

### 1 创建对应的三个模块,actions,store,reducers

### 2 在使用store中状态数据在组件中引入store,和actions

### 3 在组件挂载完毕之后的生命周期回调函数中,绑定一个函数store,subsribe()方法,该方法用来监听,store的变化,只要store变化,则会触发这个方法的参数回调函数,回调函数调用this.setState方法,实现组件的重现渲染

### 3 通过store.getState方法可以获取对应的状态数据,将其进行展示

### 4 如果要修改这个状态数据,则需要分发对应的通过action creaters工厂构造函数得到action,最终调用store.dispatch方法,将action作为参数,调用对应的dispatch后,就会对状态数据进行相应的操作,最终展示在页面

## 插件react-redux

### 属于react的一个插件.用来简化我们使用redux的繁琐操作的插件,主要用来减少每个组件都需要引入store对象和每次修改数据都需要调用对应的actions creaters函数,和dispath方法

### 1 在index.js文件中,引入react-redux插件的一个Provider组件

- 子主题 1

### 2 引入store对象,在index,js中,并且给将App组件包裹在Provider组件中,该Provider组件添加一个store属性,在最顶级的组件中添加了这个属性,所以每一个子组件要访问store对象,可以直接访问,不再需要通过引入

### 3 在对应的子组件中,引入react-redux库中的高阶组件(函数)connect,该函数通过两次调用最终会生成一个新的组件,并且将该该组件暴露出去,相当于App组件

- connect调用第一次传递的参数

	- 参数1 mapStateToProps

		- (state)=>({ count:state})

	- 参数2  mapDispatchToProps

		- const mapDispatchToProps = (dispatch) => {
  return {
    increment(num) {
      // 1. 调用action函数生成action对象
      const action = increment(num);
      // 2. 调用store.dispatch(action)
      dispatch(action);
    },
    decrement(num) {
      // 1. 调用action函数生成action对象
      const action = decrement(num);
      // 2. 调用store.dispatch(action)
      dispatch(action);
    },
  };
};

- connect调用第二次传递的参数App(就是App类)
- 使用简写

	- export default connect((state)=>({count:state}),{incerments,decerments})(App)
	- 第一次调用的第二个参数传递一个对象,对象的值是两个action函数,内部会进行调用这个两个函数,并且调用对应的dispatch方法

### 4 该子组件直接就可以在props属性中,获取到最终得到的值,和对应的action函数

### 子主题 7

###  给对应改变数据状态的类型单独定义为一个文件,将这些类型(字符串)用一个变量保存,使用就直接引入即可,这样可以减少,类型名为字符串写错不报错,最终不好找到错误,如果定义为变量,就不容易出错,提供代码的可维护性

