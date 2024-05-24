### 原始值 API

#### 题目

在这个挑战中，你将使用 `响应式 API: [xx]Raw` 来完成它。 以下是你要实现的内容 👇:

```vue
<script setup lang="ts">
import { reactive, isReactive } from "vue"

const state = { count: 1 }
const reactiveState = reactive(state)

/**
 * 修改以下代码使输出为true
*/
console.log(reactiveState === state)

/**
 * 修改以下代码使输出为false
*/
const info = { count: 1 }
const reactiveInfo = reactive(info)

console.log(isReactive(reactiveInfo))

</script>

<template>
  <div>
    <p>
      {{ reactiveState.count }}
    </p>
  </div>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { reactive, isReactive, toRaw } from 'vue'

const state = { count: 1 }
const reactiveState = reactive(state)

/**
 * 修改以下代码使输出为true
 */
console.log(toRaw(reactiveState) === state)

/**
 * 修改以下代码使输出为false
 */
const info = { count: 1 }
const reactiveInfo = reactive(info)

console.log(isReactive(toRaw(reactiveInfo)))
</script>

<template>
  <div>
    <p>
      {{ reactiveState.count }}
    </p>
  </div>
</template>
```

#### 解释

`toRaw(reactiveObj)`:根据一个 Vue 创建的代理返回其原始对象
