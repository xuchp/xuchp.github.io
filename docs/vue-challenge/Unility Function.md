### Until

#### 题目

有些时候，我们需要依赖于异步的返回结果做一些后续处理，`until`函数在这种场景下非常有用，你能实现它吗 ? 让我们来试试吧 👇:

```vue
<script setup lang='ts'>
import { ref } from "vue"

const count = ref(0)

/**
 * 实现`until`函数
*/

function until(initial) {
  function toBe(value) {

  }

  return {
    toBe,
  }
}

async function increase() {
  count.value = 0
  setInterval(() => {
    count.value++
  }, 1000)
  await until(count).toBe(3)
  console.log(count.value === 3) // 确保输出为true
}

</script>
```

#### 答案

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

/**
 * 实现 until 函数
 */

function until(initial) {
  function toBe(value) {
    return new Promise((resolve) => {
      const unwatch = watch(initial, (newValue) => {
        if (newValue === value) {
          resolve()
          unwatch()
        }
      })
    })
  }

  return {
    toBe
  }
}

async function increase() {
  count.value = 0
  setInterval(() => {
    count.value++
  }, 1000)
  await until(count).toBe(3)
  console.log(count.value === 3) // Make sure the output is true
}
</script>

<template>
  <p @click="increase">Increase</p>
</template>
```

## 
