### 生命周期钩子

#### 题目

```vue
// Child.vue

<script setup lang="ts">
import { onMounted, inject } from "vue"

const timer = inject('timer')
const count = inject('count')


onMounted(() => {
  // 切换子组件时, 定时器将不正常工作, 让我们来修复它 . 
  timer.value = window.setInterval(() => {
    count.value++
  }, 1000)
})

</script>

<template>
  <div>
    <p>
      Child Component: {{ count }}
    </p>
  </div>
</template>
```

#### 答案

```vue
// Child.vue

<script setup lang="ts">
import { onMounted, inject, onBeforeUnmount } from 'vue'

const timer = inject('timer')
const count = inject('count')

onMounted(() => {
  // 切换子组件时, 定时器将不正常工作, 让我们来修复它 .
  timer.value = window.setInterval(() => {
    count.value++
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div>
    <p>Child Component: {{ count }}</p>
  </div>
</template>
```

### ref 全家桶

```vue
<script setup lang="ts">
import { ref, Ref, reactive } from "vue"

const initial = ref(10)
const count = ref(0)

// 挑战 1: 更新 ref
function update(value) {
  // 实现...
}

/**
 * 挑战 2: 检查`count`是否为一个 ref 对象
 * 确保以下输出为1
*/
console.log(
  // impl ? 1 : 0
)

/**
 * 挑战 3: 如果参数是一个 ref，则返回内部值，否则返回参数本身
 * 确保以下输出为true
*/
function initialCount(value: number | Ref<number>) {
  // 确保以下输出为true
  console.log(value === 10)
}

initialCount(initial)

/**
 * 挑战 4:
 * 为源响应式对象上的某个 `property` 新创建一个 `ref`。
 * 然后,`ref` 可以被传递，它会保持对其源`property`的响应式连接。
 * 确保以下输出为true
*/
const state = reactive({
  foo: 1,
  bar: 2,
})
const fooRef = ref() // 修改这里的实现...

// 修改引用将更新原引用
fooRef.value++
console.log(state.foo === 2)

// 修改原引用也会更新`ref`
state.foo++
console.log(fooRef.value === 3)

</script>

<template>
  <div>
    <h1>msg</h1>
    <p>
      <span @click="update(count-1)">-</span>
      {{ count }}
      <span @click="update(count+1)">+</span>
    </p>
  </div>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { ref, Ref, reactive, isRef, toRefs, toRef } from 'vue'

const initial = ref(10)
const count = ref(0)

// 挑战 1: 更新 ref
function update(value: number) {
  count.value = value
  // 实现...
}

/**
 * 挑战 2: 检查`count`是否为一个 ref 对象
 * 确保以下输出为1
 */
console.log(isRef(count) ? 1 : 0)
// impl ? 1 : 0

/**
 * 挑战 3: 如果参数是一个 ref，则返回内部值，否则返回参数本身
 * 确保以下输出为true
 */
function initialCount(value: number | Ref<number>) {
  // 确保以下输出为true
  console.log(isRef(value) ? value.value === 10 : value === 10)
}

initialCount(initial)

/**
 * 挑战 4:
 * 为源响应式对象上的某个 `property` 新创建一个 `ref`。
 * 然后,`ref` 可以被传递，它会保持对其源`property`的响应式连接。
 * 确保以下输出为true
 */
const state = reactive({
  foo: 1,
  bar: 2
})
const fooRef = toRef(state, 'foo') // 修改这里的实现...

// 修改引用将更新原引用
fooRef.value++
console.log(state.foo === 2)

// 修改原引用也会更新`ref`
state.foo++
console.log(fooRef.value === 3)
</script>

<template>
  <div>
    <h1>msg</h1>
    <p>
      <span @click="update(count - 1)">-</span>
      {{ count }}
      <span @click="update(count + 1)">+</span>
    </p>
  </div>
</template>
```

### 响应性丢失

#### 题目

```vue
<script setup lang="ts">
import { reactive } from "vue"

function useCount() {
  const state = reactive({
    count: 0,
  })

  function update(value: number) {
    state.count = value
  }

  return {
    state,
    update,
  }
}

// 确保解构不丢失响应性
const { state: { count }, update } = useCount()

</script>

<template>
  <div>
    <p>
      <span @click="update(count-1)">-</span>
      {{ count }}
      <span @click="update(count+1)">+</span>
    </p>
  </div>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { reactive,toRefs } from 'vue'

function useCount() {
  const state = reactive({
    count: 0
  })

  function update(value: number) {
    state.count = value
  }

  return {
    ...toRefs(state),
    update
  }
}

// 确保解构不丢失响应性
const { count, update } = useCount()
</script>

<template>
  <div>
    <p>
      <span @click="update(count - 1)">-</span>
      {{ count }}
      <span @click="update(count + 1)">+</span>
    </p>
  </div>
</template>
```

### 可写的计算属性

#### 题目

```vue
<script setup lang="ts">
import { ref, computed } from "vue"

const count = ref(1)
const plusOne = computed(() => count.value + 1)

/**
 * 确保 `plusOne` 可以被写入。
 * 最终我们得到的结果应该是 `plusOne` 等于 3 和 `count` 等于 2。
*/

plusOne.value++

</script>

<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ plusOne }}</p>
  </div>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

/**
 * 确保 `plusOne` 可以被写入。
 * 最终我们得到的结果应该是 `plusOne` 等于 3 和 `count` 等于 2。
 */

plusOne.value++
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ plusOne }}</p>
  </div>
</template>
```

### watch 全家桶

#### 题目

```vue
<script setup lang="ts">
import { ref, watch } from "vue"

const count = ref(0)

/**
 * 挑战 1: Watch 一次
 * 确保副作用函数只执行一次
*/
watch(count, () => {
  console.log("Only triggered once")
})

count.value = 1
setTimeout(() => count.value = 2)

/**
 * 挑战 2: Watch 对象
 * 确保副作用函数被正确触发
*/
const state = ref({
  count: 0,
})

watch(state, () => {
  console.log("The state.count updated")
})

state.value.count = 2

/**
 * 挑战 3: 副作用函数刷新时机
 * 确保正确访问到更新后的`eleRef`值
*/

const eleRef = ref()
const age = ref(2)
watch(age, () => {
  console.log(eleRef.value)
})
age.value = 18

</script>

<template>
  <div>
    <p>
      {{ count }}
    </p>
    <p ref="eleRef">
      {{ age }}
    </p>
  </div>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

/**
 * 挑战 1: Watch 一次
 * 确保副作用函数只执行一次
 */
watch(
  count,
  () => {
    console.log('Only triggered once')
  },
  {
    once: true
  }
)

count.value = 1
setTimeout(() => (count.value = 2))

/**
 * 挑战 2: Watch 对象
 * 确保副作用函数被正确触发
 */
const state = ref({
  count: 0
})

watch(
  state,
  () => {
    console.log('The state.count updated')
  },
  {
    deep: true
  }
)

state.value.count = 2

/**
 * 挑战 3: 副作用函数刷新时机
 * 确保正确访问到更新后的`eleRef`值
 */

const eleRef = ref()
const age = ref(2)
watch(
  age,
  () => {
    console.log(eleRef.value)
  },
  { flush: 'post' }
)
age.value = 18
</script>

<template>
  <div>
    <p>
      {{ count }}
    </p>
    <p ref="eleRef">
      {{ age }}
    </p>
  </div>
</template>
```

#### 解释

- **`immediate`**：在侦听器创建时立即触发回调。第一次调用时旧值是 `undefined`。

- **`deep`**：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考[深层侦听器](https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers)。

- **`flush`**：调整回调函数的刷新时机。参考[回调的刷新时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)及 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)。

  - 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

    如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项：

- **`onTrack / onTrigger`**：调试侦听器的依赖。参考[调试侦听器](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#watcher-debugging)。

### 浅层 ref

#### 题目

```vue
<script setup lang="ts">
import { shallowRef, watch } from "vue"

const state = shallowRef({ count: 1 })

// 回调没被触发
watch(state, () => {
  console.log("State.count Updated")
}, { deep: true })

/**
 * 修改以下代码使watch回调被触发
 *
*/
state.value.count = 2

</script>

<template>
  <div>
    <p>
      {{ state.count }}
    </p>
  </div>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { shallowRef, triggerRef, watch } from 'vue'

const state = shallowRef({ count: 1 })

// 回调没被触发
watch(
  state,
  () => {
    console.log('State.count Updated')
  },
  { deep: true }
)

/**
 * 修改以下代码使watch回调被触发
 *
 */
state.value.count = 2
// state.value = { count: 2 }

triggerRef(state)
</script>

<template>
  <div>
    <p>
      {{ state.count }}
    </p>
  </div>
</template>
```

#### 解释

triggerRef：强制触发依赖于一个[浅层 ref](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 的副作用，这通常在对浅引用的内部值进行深度变更后使用

### 依赖注入

#### 题目

在这个挑战中，你将使用 `组合式 API: 依赖注入` 来完成它。 以下是你要实现的内容 👇:

```vue
// Child.vue 

<script setup lang="ts">
// 添加代码,使`count`值注入子组件
</script>

<template>
  {{ count }}
</template>

```

#### 答案

```vue
// App.vue
<script setup lang="ts">
import { ref, provide } from "vue"
import Child from "./Child.vue"
const count = ref(1)
provide("count", count)
setInterval(() => {
  count.value++
}, 1000)
</script>

<template>
  <Child />
</template>

//Child.vue
<script setup lang="ts">
// Add a piece of code to make the `count` value get injected into the child component.
import { inject } from 'vue'
const count = inject('count')
</script>

<template>
 输出: {{ count }}
</template>
```

### Effect 作用域 API

#### 题目

```vue
<script setup lang="ts">
import { ref, computed, watch, watchEffect } from "vue"

const counter = ref(1)
const doubled = computed(() => counter.value * 2)

// 使用 `effectScope` API 使这些Effect效果在触发一次后停止

watch(doubled, () => console.log(doubled.value))
watchEffect(() => console.log("Count: ", doubled.value))

counter.value = 2

setTimeout(() => {
  counter.value = 4
})

</script>

<template>
  <div>
    <p>
      {{ doubled }}
    </p>
  </div>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { ref, computed, watch, watchEffect, effectScope } from 'vue'

const counter = ref(1)
const doubled = computed(() => counter.value * 2)

// 使用 `effectScope` API 使这些Effect效果在触发一次后停止
const scope = effectScope()
scope.run(() => {
  watch(doubled, () => console.log(doubled.value))
  watchEffect(() => console.log('Count: ', doubled.value))
})
scope.stop()
counter.value = 2

setTimeout(() => {
  counter.value = 4
})
</script>

<template>
  <div>
    <p>
      {{ doubled }}
    </p>
  </div>
</template>
```

#### 解释

effectScope.run(fn:Function),调用 stop 可以停止监听

### 自定义 Ref

#### 题目

```vue
<script setup>
import { watch } from "vue"

/**
 * 补全以下函数来实现防抖ref :
*/
function useDebouncedRef(value, delay = 200) {

}
const text = useDebouncedRef("hello")

/**
 * 确保在输入框快速输入时, 只触发一次回调。
*/
watch(text, (value) => {
  console.log(value)
})
</script>

<template>
  <input v-model="text" />
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { watch, customRef } from 'vue'

/**
 * 补全以下函数来实现防抖ref :
 */

function useDebouncedRef(value: string, delay = 2000) {
  return customRef((track, trigger) => {
    let timeout: number
    return {
      get() {
        track()
        return value
      },
      set(val: string) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = val
          trigger()
        }, delay)
      }
    }
  })
}
const text = useDebouncedRef('hello')

/**
 * 确保在输入框快速输入时, 只触发一次回调。
 */
watch(text, (value) => {
  console.log(value)
})
</script>

<template>
  <input v-model="text" />
</template>
```

#### 解释

customRef语法

```vue
return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(val: string) {
			 // set operations	
       trigger()
      }
    }
  })
```

