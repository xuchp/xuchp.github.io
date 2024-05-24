### 切换器

#### 题目

```vue
<script setup lang='ts'>

/**
 * 实现一个切换状态的可组合函数
 * 确保该功能正常工作
*/
function useToggle() {

}

const [state, toggle] = useToggle(false)

</script>

<template>
  <p>State: {{ state ? 'ON' : 'OFF' }}</p>
  <p @click="toggle">
    Toggle state
  </p>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { ref } from 'vue'

/**
 * 实现一个切换状态的可组合函数
 * 确保该功能正常工作
 */
function useToggle(preState: boolean) {
  const state = ref(preState)
  const toggle = () => {
    state.value = !state.value
  }
  return [state, toggle]
}

const [state, toggle] = useToggle(false)
</script>

<template>
  <p>State: {{ state ? 'ON' : 'OFF' }}</p>
  <p @click="toggle">Toggle state</p>
</template>
```

### 计数器

#### 题目

```vue
<script setup lang='ts'>

interface UseCounterOptions {
  min?: number
  max?: number
}

/**
 * 实现计数器函数,确保功能正常工作
 * 1. 加 (+)
 * 2. 减 (-)
 * 3. 重置 
 * 4. 最小值 & 最大值 选项支持
*/
function useCounter(initialValue = 0, options: UseCounterOptions = {}) {

}

const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 })
</script>

```

#### 答案

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface UseCounterOptions {
  min?: number
  max?: number
}

/**
 * 实现计数器函数,确保功能正常工作
 * 1. 加 (+)
 * 2. 减 (-)
 * 3. 重置
 * 4. 最小值 & 最大值 选项支持
 */
function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const count = ref(initialValue)
  const inc = () => {
    count.value == options.max ? options.max : count.value++
  }
  const dec = () => {
    count.value == options.min ? options.min : count.value--
  }
  const reset = () => {
    count.value = initialValue
  }
  return { count, inc, dec, reset }
}

const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 })
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="inc">加</button>
    <button @click="dec">减</button>
    <button @click="reset">清空</button>
  </div>
</template>
```

### 实现本地存储函数

#### 题目

```vue
<script setup lang='ts'>

import { ref } from "vue"

/**
 * 实现`useLocalStorage`函数
*/
function useLocalStorage(key: string, initialValue: any) {
  const value = ref(initialValue)

  return value
}

const counter = useLocalStorage("counter", 0)

// 我们可以通过触发`counter`的`getter`来获取本地存储的值
console.log(counter.value)

// 同样地,我们也可以通过触发`counter`的`setter`来设置本地存储的值

counter.value = 1

</script>
```

#### 答案

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

/**
 * 实现`useLocalStorage`函数
 */
function useLocalStorage(key: string, initialValue: any) {
  const value = ref(localStorage.getItem(key) || initialValue)
  watchEffect(() => {
    localStorage.setItem(key, value.value)
  }, value.value)
  return value
}

const counter = useLocalStorage('counter', 0)

// 我们可以通过触发`counter`的`getter`来获取本地存储的值
console.log(counter.value)

// 同样地,我们也可以通过触发`counter`的`setter`来设置本地存储的值

counter.value = 3
console.log(counter.value)
</script>
<script setup lang='ts'>

import { ref } from "vue"

/**
 * 实现`useLocalStorage`函数
*/
function useLocalStorage(key: string, initialValue: any) {
  const value = ref(initialValue)

  return value
}

const counter = useLocalStorage("counter", 0)

// 我们可以通过触发`counter`的`getter`来获取本地存储的值
console.log(counter.value)

// 同样地,我们也可以通过触发`counter`的`setter`来设置本地存储的值

counter.value = 1

</script>

```

```vue
<script setup lang="ts">
import { customRef, ref } from 'vue'

/**
 * 实现`useLocalStorage`函数
 */
function useLocalStorage(key: string, initialValue: any) {
  const value = customRef((track, trigger) => {
    return {
      get() {
        track()
        return localStorage.getItem(key) || initialValue
      },
      set(newValue: any) {
        localStorage.setItem(key, newValue)
        trigger()
      }
    }
  })
  return value
}

const counter = useLocalStorage('counter', 0)

// 我们可以通过触发`counter`的`getter`来获取本地存储的值
console.log(counter.value)

// 同样地,我们也可以通过触发`counter`的`setter`来设置本地存储的值

counter.value = 5
console.log(counter.value)
</script>
```

### 鼠标坐标

```vue
<script setup lang="ts">

// Implement ...
function useEventListener(target, event, callback) {

}

// Implement ...
function useMouse() {
  useEventListener(window, "mousemove", () => {})
}
const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

#### 答案

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// Implement ...
function useEventListener(target: any, event: string, callback: Function) {
  onMounted(() => {
    target.addEventListener(event, callback)
  })
  onUnmounted(() => {
    target.removeEventListener(event)
  })
}

// Implement ...
function useMouse() {
  const x = ref(0)
  const y = ref(0)
  useEventListener(window, 'mousemove', (e: MouseEvent) => {
    x.value = e.clientX
    y.value = e.clientY
  })
  return { x, y }
}
const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

## 
