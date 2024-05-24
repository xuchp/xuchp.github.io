### 下一次 DOM 更新

#### 题目

```vue
<script setup>
import { ref } from "vue"

const count = ref(0)

function increment() {
  count.value++

  /**
   * DOM还未更新,如何确保DOM已经更新 ?
   * 请保证以下输出为true
  */

  console.log(+document.getElementById("counter").textContent === 1)
}
</script>

<template>
  <button id="counter" @click="increment">
    {{ count }}
  </button>
</template>
```

#### 答案

```vue
<script setup>
import { nextTick, ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++

  /**
   * DOM还未更新,如何确保DOM已经更新 ?
   * 请保证以下输出为true
   */
  nextTick(() => {
    console.log(+document.getElementById('counter').textContent === 1)
  })
}
</script>

<template>
  <button id="counter" @click="increment">
    {{ count }}
  </button>
</template>
```

