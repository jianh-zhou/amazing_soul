# 3.React第三天

## 受控组件

### 概念

- 通过state和onChange事件收集文本框数据的组件就是受控组件,和vue的v-model类似,

### 1 定义一个state状态数据,

- state={user:' ',password:' '}

### 2 为文本框设置一个value属性,该属性值为state状态数据中的属性,

### 3 为文本框;绑定一个onChange事件,将当前的文本框内容的属性名作为参数传递过去

### 4 定义onChange事件,该事件是一个高阶函数,因为事件在调用时需要传递参数,该事件内部会进行调用对应的this.setState方法,修改状态数据的值,根据传入的参数

## React生命周期回调函数( 旧 )

### 1 初始化阶段

- 1 constructor(){}

	- 构建函数,第一次进入组件会触发

- 2 componentWillMount(){}

	- 组件将要挂载

- 3 render( ){}

	- 渲染阶段,但不是真正的渲染,只是返回了一个DOM

- 4 componentDidMount( ){ }

	- 组件挂载之后,和vue的mounted类似
	- 可以进行异步的ajax等请求,设置定时器,只进行一次的函数

### 2 更新阶段

- 1 componentWillReceiveProps( ){ }

	- 父组件render调用,会触发这些生命周期回调函数

- 2 shouldWillUpdate(nextState,nextProps ){ }

	- 该钩子,必须需要返回一个布尔值,

		- 1 true

			- 如果不写这个钩子,则是相当于允许父级组件数据更新,当前组件不管数据有没有影响,都会进行更新

		- 2 false

			- 不管父级组件数据变不变,都不会进行更新

	- 可以用来进行优化,减少一些没有必要的组件更新
	- 当前组件调用this.setState()会调用后面的生命周期回调函数

- 3 componentWillUpdate( ){ }

	- 当组件调用this.forceUpdate( )这个方法,会执行后面的所有生命周期回调函数

- 4 render( ){ }
- 5 componentDIdUpdate( ){ }

	- 数据更新之后

### 3 卸载阶段

- componentWillUnmount( ){ }

	- 这是组件卸载之前的回调函数,其中可以清理定时器,如果定时器不进行清理,就算组件卸载,定时器仍然会有效

- Recact没有自己卸载组件的方法,需要使用ReactDOM上的一个方法,进行卸载组件

	- ReactDOM.unmountComponentAtNode(document.getElementById('root')

### 在不更新数据时,加载组件会执行初始化阶段,根据修改状态数据的方法,会执行更新阶段,

## React生命周期回调函数( 新 )

### 1 初始化阶段

- 1 constructor(){}

	- 构建函数,第一次进入组件会触发

- 2 getDeviedStateFromProps( ){ }

	- 组件将要挂载

- 3 render( ){}

	- 渲染阶段,但不是真正的渲染,只是返回了一个DOM

- 4 componentDidMount( ){ }

	- 组件挂载之后,和vue的mounted类似
	- 可以进行异步的ajax等请求,设置定时器,只进行一次的函数

### 2 更新阶段

- 1 getDerivedStateFromProps( ){ }

	- 数据更新会触发的后续的所有钩子回调函数

- 2 shouldWillUpdate(nextState,nextProps ){ }

	- 该钩子,必须需要返回一个布尔值,

		- 1 true

			- 如果不写这个钩子,则是相当于允许父级组件数据更新,当前组件不管数据有没有影响,都会进行更新

		- 2 false

			- 不管父级组件数据变不变,都不会进行更新

	- 可以用来进行优化,减少一些没有必要的组件更新
	- 当前组件调用this.setState()会调用后面的生命周期回调函数

- 3  render( ){ }
- 4 getSnashotBeforeUpdate( ){ }
- 5 componentDIdUpdate( ){ }

	- 数据更新之后

### 3 卸载阶段

- componentWillUnmount( ){ }

	- 这是组件卸载之前的回调函数,其中可以清理定时器,如果定时器不进行清理,就算组件卸载,定时器仍然会有效

- Recact没有自己卸载组件的方法,需要使用ReactDOM上的一个方法,进行卸载组件

	- ReactDOM.unmountComponentAtNode(document.getElementById('root')

## React 虚拟DOM的diff算法

### react中,,只会对不同的节点进行渲染,如果相同则不再进行渲染..传统的diff比较,会让每一个节点都会和其他另外一个树进行比较,很浪费时间,性能不好,所以React开发团队,针对开发者的一些习惯,制定了一些用来优化diff算法

### diff 策略

- 1 Web中的中DOM程序节点跨层级移动操作特别少,可以忽略不计
- 2 拥有相同类的两个组件将会生成类似的树形结构,不是相同类的两个组件生成的树形结构不同
- 3 对应同一层级的相同的子节点,可以通过id进行区分

### tree diff

- 在进行比较时,只对同一层次的进行比较,如果节点已经不存在,则会直接删除当前节点,不在进行比较,如果两节点相同,则会继续向后比较,如果不相同则会不会再继续进行比较,插入新的节点
- React官方不建议节点跨层级移动或者改变DOM树的结构,可以通过css样式进行显示隐藏来达到对应删除的效果
- 采用分层求异的策略,对tree diff进行算法优化

### component diff 

- 在对组件标签进行对比时,先判断是不是同一类的组件,如果是,则进行向后比较,使用tree diff,依此类推,如果类就不同,直接不再进行比较,对新的直接进行渲染

### element diff

- 利用key值进和type属性判断两个节点是否是一个节点,如果是一样的节点,就不需要删除后再添加,只需要移动位置即可
- React diff 提供了三种节点操作

	- 插入

		- 如果新的节点不再旧的集合中,则直接进行插入的操作

	- 移动

		- 如果新旧集合都存在,则进行移动操作

	- 删除

		- 如果节点在新集合中不存在,旧集合存在,则进行删除操作

- 移动位置的关键

	- 新旧集合的节点都会对应一个类似与下标的东西,第一次会比较下标,如果新的比旧的下标大,则进行移动,如果相等或者新的下标比旧的下标小都不会进行移动操作

