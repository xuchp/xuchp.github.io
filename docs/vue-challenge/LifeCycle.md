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
  timer.value && clearInterval(timer.value)
})
</script>

<template>
  <div>
    <p>Child Component: {{ count }}</p>
  </div>
</template>
```

