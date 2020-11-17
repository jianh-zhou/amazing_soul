# MVVM 源码 2

## 资产

## 负债

## 数据劫持

### 1 除开事件指令,普通指令都会执行一个 bind 方法,该方法执行时都会执行 updater 中的一些方法,最终将文档碎片对象(虚拟 DOM)的节点内容进行改变,

### 2 updater 里面的方法执行完后,都会实例一个 Watcher 实例对象 ,传入 3 个参数,进入 Watcher 构造函数中,给当前的实例对象添加了 depIds(空对象)和一个 getter 方法等一些属性,在添加一个 value 属性时.最终会调用 getter 方法,

### 3 调用 getter 方法后,会执行该函数里面的代码,会获取 VMMV 实例对象上的一些属性,在获取这些属性时,就会执行在给 vm 实例对象时 Object.defineProperty( )方法中的 get 方法,该方法一调用,又会触发 Observer 为 vm 的\_data 添加属性时也有 Object.defineProperty( )方法中的 get 方法,在执行第二个 get 方法的代码时判断 Dep 构造函数上是否有一个 target 属性(在执行 get 方法中就已经为其添加一个 watcher 对象),调用 dep.depend 方法,执行 watcher 实例对象中的 addDep 方法,该方法中,将 wather 对象添加到 dep 实例对象的 subs 数组中,watcher 实例对象中 depIds 对象中,然后将 Dep 构造函数中的 target 属性赋值为 null

### 4 在 bind 方法执行完毕后,利用 addEventListener 方法为对应的节点绑定一个 input 事件,

- 1 如果触发该 input 事件则执行事件的回调函数,该回调函数中,会调用 compile 中的\_setVMVal 方法,该方法,在执行过程中,会设置实例对象上的属性值,进入其中的 Object.defineProperty( )的 set 方法,该方法进入后同时会进入 Observer 中 Object.defineProperty()中的 set 方法中,会在执行一系代码后,执行其中的 dep 实例对象上的一个 notify 方法
- 2 notify 方法会遍历当前当前 dep 对象中的 subs 属性,该属性保存了 watcher 对象的数组,将其中的 wather 对象调用 update 方法,该方法中调用 run 方法,该 run 方法会调用 get 方法,执行一系列的操作,在判断新旧值的不一样的情况下,执行最开始 watcher 实例对象传递进来的回调函数
- 最后执行 modelUpdater 该方法,改变元素节点的值

### 4 实例 watcher 对象执行完毕,最终将对应的指令属性清空.最终将对应的文档碎片对象插入到对应的元素中,渲染展示

### 子主题 8

## 数据双向绑定
