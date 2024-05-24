### 自定义元素

#### 题目

```vue
<script setup lang='ts'>

import { onMounted } from "vue"

/**
 * 实现以下代码创建一个自定义元素.
 * 确保页面输出 "Hello Vue.js".
*/
const VueJs = "???"

onMounted(() => {
  document.getElementById("app")!.innerHTML = "<vue-js message=\"Hello Vue.js\"></vue-js>"
})

</script>

<template>
  <div id="app"></div>
</template>
```

