# PC 项目流程

## 1 在 src 中创建文件夹,对应的主要文件及文件夹

- 1 普通路由组件文件夹 components

- 2 路由组件文件夹 pages

- 3 工具包文件夹 utils

- 4 接口函数文件夹 api

- 5 路由器文件夹 router

- 6 mock 文件夹(模拟后台数据)

- 7 数据状态(vuex)文件夹 store

## 2 拆分组件

- 1 将静态页面进行拆分,分成多个组件

- 2 把公共的组件设置为全局组件,所有组件都能直接使用

- 3 在引入时注意组件的中图片的路径

## 3 设置路由组件的应用

- 1 实现搜索框的参数传递

  - params 传递参数
  - query 参数传递
  - meta 对象传递参数

- 2 解决编程式路由连续访问的 bug

  - 重写 push 和 replace 方法

- 3 实现路由组件的跳转

## 4 实现异步请求三级分类列表的 api 封装

- 1 二次封装 axios,封装对应的 api 函数

  - 1 引入对应 api 函数
  - 2 利用 async 和 await 发送异步请求

- 2 创建对应的 modules 模块,里面用来存放对应组件所需要的数据

- 3 创建 home,js 文件,里面保存 home 组件所需要的数据(vuex)

## 5 三级分类列表的动态数据渲染 传参 优化

- 1 三级分类列表的遍历

- 2 三级分类列表的高亮

- 3 三级分类列表的传参

- 4 三级分类列表的显示与隐藏

- 5 创建对应的 modules

- 6 函数的防抖和节流

## 6 mock 模拟后台数据

- 1 模拟后台数据的样式

- 2 利用 Mock.mock 方法创建对应的拦截

- 3 封装 ajax Mockapi 函数的封装

## 7 解决轮播图的 bug,home 组件结束

- 1 通过数据遍历,生成对应的轮播图结构及动态数据

  - 1 swiper 实例一次,几个组件的轮播图都会有作用

  - 每个组件都调用,修改标签选择器

- 2 楼层轮播图不能正常轮播

  - v-for 没有数据,组件内部代码不会执行,也就不会渲染

    - watch 监视属性
    - 只有监视属性变化是,对应的回调才会执行
    - 设置 immediate 属性值为 true,只要侦听数据就会调用对应的回调函数

## 8 创建 search 组件相关的 vuex 数据,并对数据进行遍历,最终展示在页面

- 1 封装对应的 api 接口函数,请求是 post 请求,需要传递参数

- 2 创建对应的文件保存 search 状态数据的 module 模块,调用对应的接口

- 3 分发对应的 action,利用辅助函数拿到对应的状态数据(getters)

## 9 实现三级分类列表和头部搜索框界面的路由跳转的一起传参

- 1 在三级分类列表中,实现头部搜索框和三级列表的一起传参

- 2 在搜索中,实现三级分类列表和头部搜索框的一起传参

## 11 实现搜索主页添加的信息的展示

- 1 配置初始化传入对象

- 2 监视路由信息对象(to,from)

- 3 添加搜索关键字的结构和删除搜索关键字

  - 1 根据 options 对象的值,在对应的结构中添加结构
  - 2 删除搜索关键字信息
  - 3 清空文本框内容
  - 4 路由地址中关键字传递参数消失

- 4 添加三级分类信息的名字结构和删除三级分类信息

  - 1 根据 options 的值,在对应的结构中添加结构
  - 2 根据路由信息对象的值,重新路由跳转

- 5 搜索分类列表的品牌信息的展示和删除

  - 1 定义一个方法,该方法接收两个参数,传递给搜索列表组件,搜索列表组件会传递两个参数,添加对应的结构
  - 2 定义一个方法,删除配置选项中的属性,实现数据更新

-6 搜索分类列表平台属性的展示和删除

- 1 定义一个方法,该方法接收 3 个参数,传递给搜索列表组件,搜索列表组件会传递 3 个参数,添加对应的结构
- 2 定义一个方法,删除配置选项中的属性,实现属性更新

## 12 实现页面的排序和添加和删除展示的优化

- 1 添加一个方法,传递一个标识参数,实现当前排序的高亮显示

- 2 添加一个方法,设置排序的顺序和类别

- 3 添加一个方法,实现箭头的方向与显示

- 将 options 对象中没有属性的数据删除,在添加时使用响应形式添加属性

- 1 在请求之前对 options 对象进行操作,删除没有属性的数据
- 2 使用\$set 方法,为 options 对象添加属性
- 3 使用\$delete 方法,删除 options 对象中的属性

## 13 实现搜索页面的分页

- 1 自定义分页组件

  - proops 传递参数时,接收时,可以给当前参数配置一个默认的参数,用 default 属性

- 2 根据组件传递参数的要求,在组件中传入对应的参数,

- 3 绑定一个自定义事件,在分页组件中触发,最终触发数据更新,最终页面展示信息改变

## 14 实现搜索页商品到详情页的跳转

- 1 添加一个 Detail 组件,注册为路由组件

- 2 封装对应的 api 函数

- 3 将请求回来的数据添加到 vuex 中进行管理

- 4 在 search 页面,利用声明式路由的方式,并且传递对应的参数,

#### 15 商品详情页的的数据展示

- 1 商品主要信息的展示

- 2 商品销售属性的展示

  - 1 遍历数据
  - 2 添加点击事件,判断是否被选中,利用强制数据绑定设置选中样式

### 16 详情页的轮播图及放大镜

- 1 设置当前商品的购物车数量

  - 1 绑定事件,直接设置当前数量的基础上加加
  - 2 绑定事件,直接在当前的基础上进行减减
  - 3 为文本框绑定 change 事件,并且判断输入框的内容规范性

- 2 小轮播图组件

  - 1 通过辅助函数获取对应的数据,然后遍历,将所有的小图展示出来
  - 2 添加对应的 swiper,在 watch(监视属性中),因为是小图,需要添加两个属性,

    - 属性 1 : 一屏展示的图片数量
    - 属性 2: 一次切换的图片数量

  - 3 定义一个方法,点击对应的图片改变当前轮播图的边框样式,并且分发父级组件的自定义事件,传递当前小图的下标,和当前小图的数据数组

- 3 详情主页组件

  - 1 定义一个自定义事件,让小轮播图组件分发.该事件得到一个小轮播图组件的图片的下标
  - 2 在放大镜组件标签中添加对应的动态属性,

    - 1 大图的 src 地址
    - 2 小图的 src 地址
    - 3 设置 v-if,因为数据请求是异步操作,如果不使用则会报错

- 4 放大镜组件

  - 1 接收传递过来的父级组件数据,并且插入到对应的 html 结构中
  - 2 给左侧小图设置对应的鼠标移动事件,实现放大镜效果

    - 1 获取蒙版盒子的宽度
    - 2 获取鼠标的位置
    - 3 根据计算算出蒙版盒子的偏移值
    - 4 根据对应蒙版盒子的偏移值,计算出大图的偏移值

### 17 添加购物车

- 1 添加对应的购物车 vuex 模块数据

- 2 引入对应的添加购物车成功组件,并且注册为路由组件

- 3 在商品详情页组件中,定义对应的方法,实现路由式跳转到添加购物车成功的组件

  - 1 设置对应的参数
  - 2 设置对应的 vuex 的 action
  - 3 判断对应的 action 的返回值
  - 4 根据返回值,是否更新页面数据

    - 如果添加成功,则设置对应的 localStorage 缓存,方便添加购物车成功页面接收使用
    - 如果失败,则弹出对应的警告框

- 4 添加购物车成功的组件界面

  - 1 根据设置的 localStorage,设置在对应的结构中,展示在页面
  - 2 使用声明式路由,跳转到对应的商品详情页面
  - 2 使用声明式路由,跳转到对应的购物车界面

    - 1 添加对应的购物车组件
    - 2 注册成路由组件

- 5 产生临时用户 id 凭证

  - 1 在 utils 文件夹中创建一个文件,暴露一个创建临时用户 id 凭证的函数
  - 3 设置为对应的 vuex 数据,(user.js),将该 id 放在 vuex 中管理
  - 4 在 ajax 方法封装的请求拦截器中设置为对应的请求头信息,每次发送请求携带该 id

### 18 购物车

- 1 购物车商品信息数组

  - 1 封装请求购物车数据的 api 函数
  - 2 在 vux 中添加一个状态数据 shopList,当前购物车列表的商品信息,定义对应的 muation.actiion
  - 3 在对应的组件中定义一个方法,用来分发对应的 action,用来修改商品信息数组
  - 4 在计算属性中使用 vuex 的辅助函数,获取对应的商品信息数组,
  - 5 结构中使用 v-for 和插值语法,将数据在页面展示

- 2 利用最开始商品信息数组,在 getters 中添加三个 get 方法的数据

  - 1 选择商品的总数量 totalNum
  - 2 商品是否全选 isCheckedAll
  - 3 选中商品的总价钱

- 3 删除商品

  - 1 商品当前商品

    - 1 封装对应的删除购物车的 api 函数
    - 2 在 vuex 中引入 api 函数
    - 3 直接在 actions 中定义删除商品的方法
    - 4 在 getters 中,使用 get 方法,得到被选中购物项的数组
    - 5 我对应的标签添加点击事件,事件回调函数,用来删除当前商品

  - 2 删除所有选中商品

  - 1 在对应的标签中添加点击事件
  - 2 在事件的回调函数中,通过将所有分发 action 的返回值(promise 对象)放入到一个数组中,最终使用 Promise.all 方法,判断删除商品是否成功

- 4 选中商品

  - 1 当前商品选中

    - 1 封装对应的选中商品的 api 函数
    - 2 在 vuex 中引入 api 函数,定义 action 方法,
    - 3 为当前单选框绑定点击事件,
    - 4 点击事件,分发对应的 action.最终调用更新数据的方法

  - 2 全选或全不选

    - 1 就是多次请求商品选中的接口,遍历购物车所有商品信息数组
    - 2 使用 Promise.all,判断是否删除成功

  - 3 单选框不再使用 v-model.因为它只能读取,不能进行设置,使用:checked 动态属性

- 5 修改购物车商品数量

  - 1 封装对应的请求修改购物车商品数量的 api 函数
  - 2 在 vuex 中引入 api 函数,定义 action 方法
  - 3 给修改购物车数量的标签中添加事件,定义一个相同的方法,传入当前商品数据对象,和修改的变化量的值

  - -

    * 1

  - 表单输入

    - \$event.target.value\*1-shop.skuNum

  - -

    - -1

### 19 定义对应的登录注册退出登录的 api 函数

- 1 封装请求登录的 api 函数

- 2 封装对应的注册的 api 函数

- 3 封装对应的退出登录的 api 函数

### 20 注册账号的操作

- 1 封装对应的 action

  - 1 引入对应的 api 函数
  - 2 调用对应的 api 监视,返回结果

- 2 添加表单的 v-model 指令,并且定义初始响应数据

- 3 进行表单验证

  - 1 进行基础的表单验证

    - 1 两次密码的确认
    - 2 协议的是否同意的验证

  - 2 使用对应的插件进行验证

    - 1 使用的是 vue-
    - 2 创建对应的一个工具文件,验证表单数据,并且在 main,js 文件中引入该文件
    - 3 在对应的结构中添加一些表达式级标签实现展示效果
    - 4 使用插件的对应方法,手动添加表单验证,因为最开始的提示只是提示,对提交没有什么作用

- 4 将对应的方法,绑定在注册按钮上,在进行表单验证,最后分发对应的 action

### 21 登录账号的操作

- 1 添加对应的 state 和 muation 和 action

- state

  - 设置初始值,为读取缓存的用户信息或空对象

- mutation

  - 该变对应的用户信息,然后将用户信息设置为对应的缓存

- action

  - 1 调用对应的 api 函数.根据状态分发对应的 action,

  - 2 为对应的表单添加对应的 v-model,实现动态数据

  - 3 为登录按钮绑定一个事件,

  - 4 定义事件的回调函数

    - 1 解构对应的 this,作为对应的参数
    - 2 分发对应的 action,返回结果
    - 3 根据结果判断是否登录成功,如果登录成功,则使用编程式路由跳转到 home 界面

- token

  - 1 本质上就是一个字符串,进行过加密的
  - 2 每一个用户的账号对应一个固定的 token
  - 3 可以放在用户信息对象上,也可以单独设置
  - 4 可以做为某一些接口访问的条件,作为登录的凭证

### 22 退出登录的操作

- 1 获取 state 中的 userInfo 用户信息对象

- 2 因为在登录成功后,头部会发生变化,所以设置对应的 v-if 和 v-else,控制对应界面的展示

- 3 定义对应的退出登录的 mutation 和 action

  - mutation 清空用户信息,也就是清除浏览器的对应缓存
  - action 调用对应的 api 函数, 分发对应的 action

- 4 为退出登录绑定对应的事件,失去退出登录

  - 分发对应的 ation,根据返回值

### 23 我的订单中心

- 1 将订单中心进行拆分模块,

- MyOrder 模块

  - 我的订单

- GroupBuy 模块

  - 团购订单

- 2 注册为为路由组件

  - center

    - MyOrder

    - 设置为默认的路由组件

  - GroupBuy

- 3 在头部信息对应的位置,使用路由跳转,让其跳转到当前订单中心组件

- 4 在订单中心分别设置路由跳转,跳转到 MyOrder 和 GroupBuy 组件 ,使用路由视图,然后使用 router-link-active 设置对应的样式

- 5 在我的订单组件中进行操作

  - 1 不使用 vuex 的方式,管理数据,将所有的 api 接口函数,在 main.js 中引入,然后将其绑定到 Vue 构造函数的原型对象上,
  - 2 定义对应的响应式数据

    - pageNo:1

      - 默认开始的页数

    - limit:10

      - 一页显示的条数

    - total:0

      - 总共的条数

    - orders:[ ]

      - 存储当前订单页的数组

- 2 在我的订单组件中,定义一个方法,调用对应的请求订单详情的 api 函数,

  - 1 调用对应的 api 函数
  - 2 判断返回值的状态
  - 3 根据返回的结果对齐进行解构,为 total 和 orders 重新赋值
  - 4 使用 orders 对齐解构进行遍历操作,最终展示在页面

    - template 标签只是一个包裹作用,可以对齐进行操作

- 3 在 mouted 中调用方法,

### 24 当前商品的订单

- 1 将组件引入,然后进行注册为路由组件

- 2 在对应的购物车组件中,使用路由链接跳转到当前商品订单

- 3 创建对应的 order 文件,管理当前商品订单和支付信息的状态数据

  - 1 引入对应的请求当前订单信息的 api 函数和支付信息的 api 函数
  - 2 在 state 中和 mutation 中对其进行设置
  - 3 添加对应的 action,调用对应的 api,然后传递结果,分发 mutation

- 4 在组件中使用该数据,将其放入到计算属性中

- 5 将数据进行遍历,在界面展示渲染

- 6 设置两个响应式数据,

  - selectedAddress

    - 用来存储选中的收件人的用户信息地址对象

  - orderComment

    - 订单的备注

- 7 通过判断数据中的一个属性值 isDefault 是否为 1,设置对应的样式,绑定时间,更新 selectedAddress 的值

- 8 为点击结算绑定一个事件,定义对应的方法

  - 1 根据对应的数据为提交订单准备参数
  - 2 使用 this.\$API 调用提交订单的 api 函数,接收其返回值
  - 3 使用编程式路由的方式,跳转到支付界面,作为参数携带提交订单返回中的数据

### 25 支付界面

- 1 在 order 中,添加对应的 state 和 mutation

- 2 添加对应的 action,请求 api 接口函数,分发对应的的 mutation,最终返回更新 payInfo 数据

- 3 将 pay 支付组件进行路由注册,添加一个 props 属性,可以用来获取路由中传递过来的参数

  )

- 4 接收注册组件时的 props 参数

  - props:['orderld']

- 5 在 mounted 中分发支付信息的 action,传递 orderId 参数

- 6 引入辅助函数,将其在添加到计算属性中

- 7 更新页面的数据

- 子主题 8

### 26 路由守卫

- 路由守卫的概念及分类

  - 概念

  - 分类

    - 全局守卫

      - router.beforeEach((to,form,next)=>{ })

    - 组件内守卫

      - beforeRouteEnter(to,from,next){ (v=>{ next( )}

    - 路由独享守卫

      - beforeEnter:(to,from,next)=>{ next( ) }

    - 1 在为进行登录的时候,使用全局前置守卫进行限制 center,pay,trade 对应组件及相关组件的跳转

    - 2 实现在登录的情况下不能进行登录,使用组件内守卫

    - 3 只有 skuId 和 skuNum 和 skuInfo 数据都存在的情况下,才能进入到/addsuccess 界面

    - 4. 只有从/shopcart 才能进入到/trade

    - 5. 只有从/trade 才能进入到/pay

    - 6. 只有从/pay 才能进入到/paysuccess

    - 7 如果我访问的是/center,但是没有登录,先跳转到登录界面,登录成功后自动的进入到/center 中

    - 8 在路由守卫时,进行传参,如果有对应的参数,则最后能实现对应的效果

    - 9 如果退出,则直接进入到首页

### 27 支付界面的支付

- 使用对应的 elemelt 插件和 procode 插件,一个进行进行对应弹出消息的美化,一个进行生成付款二维码,并且进行相应的配置和引入

- 1 为点击立即支付绑定一个事件

- 2 定义事件的对应方法,

- 3 调用对应的 QRCode.toDataURL(this.payInfo.codeUrl).返回一个 promise 对象,调用对应的 then 方法(1) 和 catch 方法,then 方法是二维码生成成功的回调,catch 是二维码生成失败的回调

- 4 在第一个 then 方法,使用 this.\$alert 方法,弹出一个微信二维码的弹出提示框.该方法返回一个 promise 对象,使用对应的 then(2)和 catch 方法

- 5 在第二个 then 方法中,进行相关的操作,进行路由跳转,在第二个 catch 方法中,弹出对应的警告框

- 6 在第一个 then 方法里面定义一个计时器,用来请求支付的状态,因为只有一直请求,才能获取到支付的状态,

- 7 在计时器的回调函数中,调用对应的支付状态的 api 接口函数,返回一个 promise,调用对应的 then 方法,和 catch 方法,then 方法是支付成功执行的,catch 是支付失败的回调

### 28 项目的优化

- 1 三级分类列表的显示优化

  - 1 给对应的列表添加一个 transition 标签,添加 name 属性
  - 2 在对应的样式中,给其设置对应的动画效果

- 2 路由组件的懒加载

  - 作用,解决打包后文件过多,加载过慢
  - const GroupBuy=()=>('@/pages/Center/GroupBuy')

- 3 图片的懒加载

  - 1 安装对应的插件
  - 2 引入对应的文件及配置
  - 3 在对应的图片标签上进行使用
