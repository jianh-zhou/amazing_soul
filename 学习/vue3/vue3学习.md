## vue3 学习

### 1 基础学习

1. 如果需要返回非响应式对象时，直接返回即可
2. 定义响应式对象使用 reactive
3. 定义基本数据类型为响应式时使用 ref,在非 html 模板中使用时直接使用即可(自动解包),其他地方需要 .value,定义一个基本数据类型的响应式数据时,会返回一个可变的响应式对象,这个对象中只有一 value 的 property
4. 如果通过结构使用响应式对象中的属性,会导致响应式对象失效,需要通过 toRefs,相当于把每个响应式属性
5. 使用计算属性时,传入一个回调函数给 computed 方法,该方法返回值作为计算属性

---

### 2 组件生命周期

| **选项式 API**  | **Hook inside(setup)** |
| --------------- | :--------------------: |
| beforeCreate    |          ---           |
| created         |          ---           |
| beforeMount     |     onBeforeMount      |
| mounted         |       onMounted        |
| beforeUpdate    |     onBeforeUpdate     |
| updated         |       onUpdated        |
| beforeUnmount   |    onBeforeUnmount     |
| unmounted       |      onUnmounted       |
| errorCaptured   |    onErrorCaptured     |
| renderTracked   |    onRenderTracked     |
| renderTriggered |   onRenderTriggered    |
| activated       |      onActivated       |
| deactivated     |      onActivated       |

</br>

&emsp;&emsp;注意: vue2 在使用生命钩子的时候，不能使用箭头函数的形式定义，这样会导致 this 指向有问题，因为箭头函数的 this 指向是定义时的父级，而不会指向组件实例（例如：created:()=>{})
</br>
&emsp;&emsp;vue2 与 vue3 生命钩子的区别：vue3 取消掉了 beforeCreate 和 created 这两个生命钩子函数，算是用 setup 这个新的钩子函数代替了。其他钩子函数只是将名字改了，方便我们记忆。在 setup 这个钩子函数中是不能拿到 this 的，setup 钩子函数是在 beforeCreate 执行之前就会执行

---

### 3 setup

</br>
&emsp;&emsp;使用 setup 时，接收两个参数，一个是 props，一个是 context。这两个参是响应式的，在 props 或者 context 改变后，组件内的数据也会跟着更新。因为这两个数据式响应式的，所以不能使用结构，如果直接结构，对应的数据就会变成非响应式。

---

### 4 watch 和 watchEffect 的用法

&emsp;&emsp;watch 函数是用来侦听特定数据源的，并且在数据源发生变化时，执行相应的回调函数。

```js
/**
 * @param {array,function,string} source
 * @param {function} callback
 * @returns {object} options
 */
watch(source, callback, options)
const year = ref(0)
const state = reactive({ nickname: 'xiaofan', age: 20 })
/* 监听ref的响应式数据时直接监听即可,如果是reactive,则需要使用回调函数的形式。如果是一整个reactive对象，不加deep为true，是监听不到的。就算加了这个，监听会起作用，但是拿不到旧值。最好的解决方案是，将这个数据深拷贝一份，直接返回，而且不需要加deep：true，就能完成监听
 */
const stopWatch = watch(
  [() => state.age, year],
  ([curAge, newVal], [preAge, oldVal]) => {
    console.log('新值:', curAge, '老值:', preAge)
    console.log('新值:', newVal, '老值:', oldVal)
  }
)
// 监听方法的返回值是一个回调函数，调用这个回调函数，可以停止监听
```

&emsp;&emsp;watchEffect 这个监听函数使用起来更简单，它只需要传递一个回调函数。在组件初始化时，会执行一次这个回调函数，收集依赖，后续依赖的数据变化，这个回调函数会继续执行。

---

### 5 简单对比 vue2.x 与 vue3.x 的响应式

&emsp;&emsp;vue3 使用的 Proxy 进行代理，vue2 使用的是 Object.defineProperty 进行代理。Proxy 是在 ES2015 出现的新语法，相比 Object.defineProperty 兼容性更差，vue3 不在兼容 ie11 及以下版本。使用 Proxy 可以做到真正的代理，他会直接代理一个对象，而不是像 Object.defineProperty 代理的是对象的属性。在使用 vue2 时，如果直接给一个响应式对象添加属性，这个属性不能保证是响应式的，在开发时，就会出现，数据变了，但是页面视图不会更新。而且在 vue2 定义的响应式对象层级多，数据量大时，很影响性能（虽然我们尽量避免这种情况的发生，但是这个问题不能忽视）。

>

### 6 vue3 组件通信

#### **1 props**：

&emsp;&emsp;使用和 vue2 一样,使用 v-bind 指令将值传递给子组件,然后在子组件中接收即可。只是由于 setup 中不能拿到 this，会被当做 setup 的参数拿到 props。如果子组件要改变传递过去的 props，也是需要父组件传递一个自定义事件给子组件，子组件分发这个事件，就可以改变父组件传递过来的 props。emit 方法可以通过解构 setup 的第二个参数 context 获得。

#### **2 v-model**：

&emsp;&emsp;在 vue3 中，v-model 不在局限与在表单中使用了。而且可以在任何组件中使用，相当于 xxx.sync 的语法合并到 v-model 中，而 xxx.sync 语法已经废弃了。不管在 vue2 还是 vue3 中，实现 v-model 的原理都是一样，给子组件传递一个 props 数据，然后传递一个事件，子组件通过分发这个事件最后修改父组件传递的值。vue3 中的 v-model 可以同时在一个组件中使用多次，格式为 v-model:propValue="value"(value 是传递给子组件的数据，子组件通过 propValue 接收父组件传递过来的 value 数据)。子组件通过 emit 分发，格式为：emit('update:propValue',newValue)。最终改变传递过来的 prop

#### **3 refs**

&emsp;&emsp;在 vue3 中，我们不能是不使用 this 了，所以我们拿到组件实例对象的方式也变了。html 上的写法还是跟 vue2 一样,只是获取的方式变了，定义一个 ref，然后将这个 ref 返回，并且将这个 ref 作为组件的 ref 属性。因为时用 ref 定义的，所以使用时，需要加上.value 才能获取组件实例对象。通过这个组件实例对象可以获取对应组件上的所有方法和数据。在使用 refs 的时候，我们需要注意这个组件实例是否存在，不然会报错。refs 是一种父子之间可以互相通信的方式。

#### **4 provide/inject**

&emsp;&emsp;写法上 vue2 略有区别，provide 向当前组件的所有子组件提供数据，子组件通过 inject 接收父组件传递过来的数据。

#### **5 vuex**

&emsp;&emsp;可以实现任何组件之间的通信，vuex 是将所有数据放在一个地方集中统一管理，其实与组件时没有太大关系的，想要数据就将数据存放在 vuex 中，取数据直接取即可。和 vue2 相比，获取 store 方法改变了，使用 useStore()方法即可，其他使用方法一样。

#### **5 全局事件总线**

&emsp;&emsp;使用方法和 vue2 一样，原理就是将很多方法存到所有组件都能访问到跟实例上，通过分发这个方法，传递数据。但是也有问题,就是注意命名空间,不要起重复名字,也不能用错名字,在项目复杂的情况下,会难以维护。还有就是不利于组件发开发，当我们公共组件时，我们只要向其中一个传递对应的数据，但是组件内部都定义了接收数据的方法，只给一个组件传递数据是做不到的。

#### **定义局部事件中心实现 element-ui 表单**

&emsp;&emsp;实现思路：使用插槽和自定义的局部事件中心进行实现，插槽用于存放存放给子组件的 html 内容，自定义事件用于接收表单的校验。</br>
**父组件代码**

```js
  <template>
  <ValidateForm ref="validateFormRef" :model="formData" :rules="rules">
    <ValidateFormItem label="用户名" prop="keyword">
      <!-- field组件 -->
    </ValidateFormItem>
    <ValidateFormItem label="密码" prop="password">
      <!-- field组件 -->
    </ValidateFormItem>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'demo',
  setup() {
    // 省略部分代码

    const validateFormRef = ref()

    // 通过validate拿到ValidateForm组件内部的一个验证状态
    if (this.validateFormRef.validate()) {
      // 表单验证成功后，做后续的操作
    }

    return {
      validateFormRef
    }
  }
})
</script>
```

**Emitter 事件中心的类**

```js
  export class {
    // 定义一个私有的对象存放事件
    private events={}
    //  添加事件
    on(eventName,callback){
      if(this.events.eventName){
        throw new Error('请不要使用相同的事件名')
      }
      this.events.[eventName]=callback
    }
    // 分发事件
    emit(eventName,...rest){
      if(this.events.eventName){
      this.events[eventName](...rest)
      }
    }
    // 解绑事件
    off(eventName,callback){
      if(this.events.eventName){
         delete this.events.eventName
      }
    }
  }

```

**Form 组件代码**

```js
<template>
  <form>
    <slot></slot>
  </form>
</template>
<script lang="ts">
import { defineComponent, nextTick, provide } from 'vue'
import { Emitter } from '@/utils/emitter'
// 定义类型为一个监听函数，且返回值为一个布尔值
type ValidateFunc = () => boolean
// 暴露几个变量，保证唯一性
export const emitterKey = Symbol()
export const modelKey = Symbol()
export const rulesKey = Symbol()

export default defineComponent({
  name: 'ValidateForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  setup(props) {
    // 将表单数据和验证规则传递给后代
    provide(modelKey, props.model)
    provide(rulesKey, props.rules)

    // 创建事件中心的实例
    const emitter = new Emitter()
    // 将事件中心传递给后代
    provide(emitterKey, emitter)

    // 接受formItem组件返回的验证函数
    // 并且将其存起来
    emitter.on('acceptValidate', (validateFunc: ValidateFunc) => {
      validateList.push(validateFunc)
    })

    // 用于接受保存后代返回的验证方法
    const validateList: ValidateFunc[] = []

    // 验证所有数据的状态
    const validate = () => {
      // 执行每一个子表单发送过来的验证方法
     return validateList.map(fn => fn()).every(valid => valid)
    }

    return {
      validate
    }
  }
})
</script>
```

**formItem 代码**

```js
<template>
  <div class="form-group">
    <label v-if="label" class=" col-form-label">{{ label }}</label>
    <slot></slot>
    <small v-if="error.isError" class="invalid-feedback">
      {{ error.errorMessage }}
    </small>
  </div>
</template>

<script lang="ts">
import { Emitter } from '@/utils/emitter'
import { defineComponent, reactive, inject, onMounted, provide } from 'vue'
import { emitterKey, modelKey, rulesKey } from './ValidateForm.vue'

export default defineComponent({
  name: 'ValidateFormItem',
  props: {
    label: String,
    required: {
      type: Boolean,
      default: false
    },
    prop: String
  },
  setup(props) {
    // 接受Emitter事件中心
    const emitter = inject<Emitter>(emitterKey)
    // 接受数据和校验规则
    const model = inject<any>(modelKey)
    const rules = inject<any>(rulesKey)

    const error = reactive({
      isError: false,
      errorMessage: ''
    })

    // 校验对应的字段数据
    const validateField = () => {
      const prop = props.prop
      if (prop && model && rules && rules[prop]) {
        const result = rules[prop].some((item: any) => {
          if (!item.validator(model[prop])) {
            console.warn(`${prop}:${item.message}`)
            error.isError = true
            error.errorMessage = item.message
            return true
          }
        })
        return !result
      }
      return true
    }


    // 当组件挂载的时候，将自身的校验函数发送给ValidateForm组件
    onMounted(() => {
      emitter && emitter.emit('acceptValidate', validateField)
    })

    return {
      error
    }
  }
})
</script>
```
