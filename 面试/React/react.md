## 1. 跟我说说你对 REACT 中事件机制的理解？

<font size=4>&emsp;&emsp; React 中的事件其实并没有绑定在对应的真实 dom 上，而是通过事件代理的方式,将所有的事件都统一绑定在了 document 上。这样的方式不仅减少了内存消耗，还能在组件挂载销毁的时候统一订阅和移除事件。另外冒泡到 document 上的事件也不是原生浏览器事件，而是 react 自己实现的合成事件。所以我们如果不想要事件冒泡的话，使用 event.stoppropagation 是无效的，而是应该调用 event.preventDefault
</font>

## 2. REACT 中通信方式？

<font size=4>
&emsp;&emsp;通信方式分为这么几种：

#### 1. 父子通信

<font size=4>
&emsp;&emsp;通过 props 传递数据给子组件，或者子组件通过调用父组件传过来的函数传递数据给父组件，这两种方式是最常用的父子通信实现方案

#### 2. 兄弟组件通信

<font size=4>
&emsp;&emsp;可以通过公共的父组件来管理状态和事件函数

#### 3. 跨多层次组件通信

<!-- <font size=4> -->

&emsp;&emsp;Context，可以通过 React.createContext 来创建实例对象，这个实例对象包含 2 个组件，Provider 和 Consumer,Provider 包裹需要数据的一方，通过 value 属性来指定需要传入的数据，Consumer 组件可通过 2 种方式来读取状态数据，1.可以通过 static contextTypes 来声明需要使用的数据，2.可以通过函数的方式来接收数据，2 种方式区别就是，static 只能对应一种数据状态，而函数可以对应多种，因为 static 相当于是赋值操作，在定义的话会覆盖之前的，其实 react-redux 内部也是通过 Context 来实现的。

#### 4. 任意组件通信

<!-- <font size=4> -->

Redux 或者 Pubsub 来实现一个任意组件通信的效果

&emsp;&emsp;1. 首先 redux 它是一种集中式管理状态数据的方案，它分为 3 大模块，分别是 store 模块，actions 模块，reducers 模块，store 模块主要是用来集中式管理状态数据的，actions 模块主要是用来创建 action 对象的工厂函数模块，一般分为同步 action/异步 action，reducers 模块主要是用来根据之前的状态数据和 type 类型来生成最新的状态数据自动交给 store 对象，store 一旦接收到最新的状态，会立即触发 store 中的 subscribe 方法，subscribe 方法中有个 listener 回调函数，这个回调函数是只要更新的状态数据，就会自动触发，从而重新渲染组件，页面中就能显示最新的状态页面，其实这种流程离不开单向数据流原则，redux 的三大原则分为 3 个，1.单向数据流，2.state 是只读的，3.使用纯函数来对 state 进行修改，所谓的单向数据流无非就是用户操作视图层进行交互效果，会触发 action 调用，action 一旦调用，会间接修改状态数据 state，state 一旦被修改，就会重新渲染组件，从而用户可以看到最新的状态页面，其次 state 是只读的：唯一改变 state 的方法就是触发 action，这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图，最后纯函数的意思就是不要有不确定的某种因素，比如：随机数、日期等

&emsp;&emsp;2. PubSub 也是一种组件间可以进行任意组件通信的方式，它是一个公共的库，本身并不是 react 中的一种方法，它分为发布方和订阅方，发布方可以传入相应的消息名字和消息内容，订阅方也传入相应的消息名和回调函数，一旦消息内容发生改变，会触发回调函数，回调函数的参数中可以拿到最新的消息内容从而达到组件间通信的效果

## 3. REACT 中性能优化方式？

#### 1. shouldComponentUpdate

&emsp;&emsp;可以通过返回一个布尔值来决定组件是否需要进行更新，这层代码逻辑可以说是简单的浅比较 state，一般来说不推荐完整的对比 state，因为组件更新触发可能会比较频繁，这样完整对比性能开销会比较大，可能会造成得不偿失的情况。

#### 2. PureComponent

&emsp;&emsp;如果只是简单的浅比较，可以使用 PureComponent，它内部也是实现了浅比较 state,简单点来说可以把 PureComponent 看成 shouldComponentUpdate 的简化版

#### 3. Lazy + Suspense 进行代码拆分和懒加载

#### 4. 使用 production 版本的 react.js

#### 5. 使用 key 来帮助 React 识别列表中所有子组件的最小变化

## 4. REACT 中 SETSTATE 是同步还是异步？

&emsp;&emsp;可能是同步，也可能是异步。只在 React 合成事件和钩子函数中是异步的，在原生 DOM 和定时器中都是同步的

## 5. REACT 中生命周期？

&emsp;&emsp;它是分为旧版和新版 2 种生命周期的，无论是哪一种，都要经过三大阶段，初始化阶段、更新阶段、卸载阶段、我先从旧版生命周期说起吧。

### 旧版生命周期

<img src="https://i.loli.net/2020/11/18/MhSVuJkdrsTzA4y.png" />

#### 在初始化阶段中，执行顺序：

- constructor,过去的时候，可以初始化 state、绑定函数 this、初始化 ref
- componentWillMount（新版被废弃）
- render,返回要渲染的虚拟 dom 对象
- componentDidMount,发送请求、开启定时器、绑定事件等等 - 更新阶段分为 3 种更新，执行顺序：

### 1、父组件更新导致子组件更新（走的是完整的）

- componentWillReceiveProps（新版被废弃）
- 如果子组件的 state 状态是由父组件传递的 props 来决定的，那么就用这个钩子函数
- shouldComponentUpdate
  用来做性能优化，因为它可以决定我这个组件是否需要进行更新，返回布尔值即可。
- componentWillUpdate（新版被废弃）
- render
  返回要渲染的虚拟 dom 对象
- componentDidUpdate
  每次更新的时候可以做的一些事情

### 2、setState 更新（少 componentWillReceiveProps）

### 3、forceUpdate 更新（少 componentWillReceiveProps,shouldComponentUpdate）

### 卸载阶段，执行顺序：

&emsp;&emsp; componentWillUnmount
可以解绑事件、清除定时器、取消未发送成功的 ajax 请求等等，解绑事件也是解绑的原生 dom 事件、合成事件不需要解绑，卸载的方法可以使用 ReactDOM.unmountComponentAtNode（）。

### 新版生命周期

<img src="https://i.loli.net/2020/11/18/w7LFKyfYSXQEZml.png" />

### 在初始化阶段中，执行顺序：

&emsp;&emsp;constructor
getDerivedStateFromProps
在渲染之前可以更新 state，同时也取代了旧版生命周期中被废弃的三个钩子函数
render
componentDidMount

### 更新阶段分为 3 种更新，跟旧版一样：

&emsp;&emsp;在 render 之后 componentDidUpdate 之前新增的钩子：
getSnapshotBeforeUpdate
可以提前操作 dom，操作完后在更新（实际用的很少）。

### 卸载阶段，跟旧版一样：

附图如下：

  <!-- <img src=""> -->

## 6. REACT 中 DIFF 算法？

- 1. tree diff,把树形结构按照层级分解，只比较同级元素，也就是所谓的分层求异

- 2. component diff,如果是同一类型的组件，就按照 tree diff 进行对比，如果不是同一类型的组件，就会把原来的组件标记为 dirty component（脏组件），从而替换整个组件下的所有子节点，也可以通过 shouldComponentUpdate 来决定组件是否需要更新，这都是一种优化手段

- 3.  element diif，添加唯一 key 进行区分，使用 key 来帮助 React 识别列表中所有子组件的最小变化

## 7. REACT 中发送请求在哪里发？为什么？

发送请求一般都是在 componentDidMount 中发送，原因有三条：

- 1. 在 render 之前发送请求的话可能会调用多次，没必要这么做。
- 2. 发送请求完可能会操作 dom，而在 render 之前可能会拿不到 dom
- 3. 渲染速度更快一点，因为它是在页面渲染完毕之后才执行的

## 8. 跟我说说 HOC？

&emsp;&emsp;hoc 也就是我们常说的、常用的高阶组件，高阶组件的定义我个人认为：本质就是一个函数，可以接受一个组件作为参数，返回值是一个新组件，新组件中包裹着旧组件，作用的话就是用来复用代码和逻辑。

## 9. 说说你用 REACT 有什么坑点？

- 1. JSX 做表达式判断时候，需要强转为 boolean 类型
- 2. 尽量不要在 componentWillReviceProps 里使用 setState，如果一定要使用，那么需要判断结束条件，不然会出现无限重渲染，导致页面崩溃
- 3. 给组件添加 ref 时候，尽量不要使用匿名函数，因为当组件更新的时候，匿名函数会被当做新的属性处理,所以可能用匿名函数做 ref 的时候，有的时候去 ref 赋值后的属性会取到 null
- 4. 遍历子节点的时候，不要用 index 作为组件的 key 进行传入，可以使用唯一标识 id 来作为 key

## 10. REDUX 有什么缺点？

&emsp;&emsp;当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新渲染，可能会有效率影响，或者需要写 shouldComponentUpdate 进行判断

## 11. 虚拟 DOM 的理解？为什么虚拟 DOM 会提高性能？

&emsp;&emsp;虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能，具体实现思路：使用 js 中对象结构来生成 dom 结构树，然后在更新时在生成一个 dom 结构树，新旧 dom 结构树进行差异对比，最后差异部分进行替换，应用到 dom 上

## 12. VUE 和 REACT 的区别？

#### &emsp;&emsp; 1. 组件卸载不同

- 1. Vue 中组件卸载干掉的是组件实例, 页面还存在

- 2. React 中卸载的是整个页面

#### 2. 子级组件修改父级组件数据不同

<p>
   Vue中子级组件可以修改父级组件传递过来的引用类型数据
    React中子级组件不可以	修改父级组件传递过来的数据
</p>

#### 3. 路由设置#的方式不同

<p>
     Vue中是通过mode属性来设置
     React中使用BrowserRouter来设置
</p>

#### 4. 语法不同

<p>
    React中是jsx语法
</p>
<p>
Vue 中是 template 模版语法
<p>

#### 5. 路由传参不同

<p>
   Vue 中可以params和query和props和meta
    	React中params, 不推荐使用query, props可以
</p>

#### 6. 指令不同

<p>
Vue 中有指令概念
React 中不存在指令
</p>

#### 7. diff 算法不一样

## 13. REACT 组件的划分业务组件技术组件？

根据组件的职责通常把组件分为 UI 组件和容器组件
UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑
两者通过 React-Redux 提供的 connect 高阶组件联系起来

## 14. CREATEELEMENT 与 CLONEELEMENT 的区别？

createElement 函数是 JSX 编译之后使用的创建 React Element 的函数，而 cloneElement 则是用于复制某个元素并传入新的 Props

## 15. 传入 SETSTATE 函数的第二个参数的作用是什么？

该函数会在 setState 函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成，类似于 vue 中的\$nextTick

## 16. RENDERPROPS 和高阶组件的区别？

&emsp;&emsp; renderProps 是指在 React 组件之间使用一个值为函数的 props 共享代码的简单 技术,hoc 本质上是一个函数，接受一个组件作为参数，返回一个新组件，新组件 内部套着旧组件，实现代码和逻辑的复用，我个人觉得 renderProps 对于只读的 操作非常适用,而高阶组件更倾向于更复杂的一些操作

## 17. 介绍一下 HOOK?

&emsp;&emsp;Hook 是 React16.8 推出的一门技术，hook 本质就是让我们使用无状态函数组件 的情况下可以使用 state 以及其他 react 的特性，常见的 hook 有 useState、 useEffect、自定义 hook，useState 是用来定义状态的，它提供一个状态和更新 状态的数据方法，状态的初始值就是 useState 传的参数，useEffect 是用来模拟 类组件中的生命周期的。如果不传递第二个参数，相当于 componentDidMount 和 componentDidUpdate，如果第二个参数传递的是一个空数组，相当于 componentDidMount，如果传递的是一个指定的状态值，那么就是在这个状态值 发生改变的时候才会执行函数，如果内部在 return 一个函数，那在这个 return 函 数内部就相当于 componentDidUnmount

## 18. REACT 中有哪些构建组件方法？

&emsp;&emsp;React 中分为函数组件和类组件，函数组件其实是借用无状态组件的思想，也就是 无法使用 state 和生命周期钩子，也不存在 this 的问题，优点在于函数组件更容易 理解，不会执行一些与 UI 无关的逻辑处理，类组件中的 this，可以通过 constructor 中使用 bind 改变 this 指向，也可以使用箭头函数的方式解决 this 的问题，箭头函 数解决 this 问题是官方推出的实验性语法

## 19. 为什么列表渲染的 KEY 最好不要用 INDEX?（参考 DIFF 算法）

## 20. 什么是受控组件和非受控组件?

&emsp;&emsp;受控组件是通过 state+onChange 事件来收集数据的，相当于手动去实现 vue 中的 v-model，非受控组件是通过 ref 技术来获取 dom，操作原生的 api 获取数据，收集 表单数据时一般都推荐使用受控组件的方式

## 21. REACT 中的 PORTAL 是什么？

&emsp;&emsp;Portal 是一门让子节点渲染到父节点以外的 dom 节点的技术。antd 中的 modal 组件 就借用 portal 技术来实现，好处在于父组件进行更新的时候不会重新的去创建 modal 对应的 dom 节点

## 22. 错误边界（ERROR BOUNDARIES）

&emsp;&emsp;错误边界是一个 React 组件，可以捕获并打印发生在其子组件树任意位置的 javascript 错误，会渲染出备用的 UI，而不是渲染哪些崩溃了的子组件树，不过， 错误边界捕获不了事件处理、异步代码、服务端渲染以及它自身抛出的错误，错误 边界内部是通过两个钩子函数（getDerivedStateFromError 和 componentDidCatch）来 判断是否有错误以及上传错误日志的
1111111111111
