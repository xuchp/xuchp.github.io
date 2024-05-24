### 动态 CSS

#### 题目

`Vue`单文件组件 `<style>` 模块支持给CSS绑定动态值。

```vue
<script setup>
import { ref } from "vue"
const theme = ref("red")

const colors = ["blue", "yellow", "red", "green"]

setInterval(() => {
  theme.value = colors[Math.floor(Math.random() * 4)]
}, 1000)

</script>

<template>
  <p>hello</p>
</template>

<style scoped>
/* 修改以下代码绑定动态颜色 */
p {
  color: red
}
</style>
```

#### 答案

```vue
<script setup lang="ts">
import { ref } from 'vue'
const theme = ref('red')

const colors = ['blue', 'yellow', 'red', 'green']

setInterval(() => {
  theme.value = colors[Math.floor(Math.random() * 4)]
}, 1000)
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
/* 修改以下代码绑定动态颜色 */
p {
  color: v-bind(theme);
}
</style>
```

#### 解答

在 css 中使用`v-bind`可以将 CSS 的值链接到动态的组件状态

### 全局 CSS

#### 题目

有些时候，我们想在具有CSS作用域的`Vue`单文件组件设置全局CSS样式， 该怎么设置呢 ? 让我们开始吧 👇:

```vue
<template>
  <p>Hello Vue.js</p>
</template>

<style scoped>

p {
  font-size:20px;
  color:red;
  text-align: center;
  line-height: 50px;
}

/* 使其工作 */
body {
  width: 100vw;
  height: 100vh;
  background-color: burlywood;
}
</style>
```

#### 答案

```vue
<template>
  <p>Hello Vue.js</p>
</template>

<style scoped>
p {
  font-size: 20px;
  color: red;
  text-align: center;
  line-height: 50px;
}
</style>
<style>
body {
  width: 100vw;
  height: 100vh;
  background-color: burlywood;
}
</style>
```

```vue
<template>
  <p>Hello Vue.js</p>
</template>

<style scoped>
p {
  font-size: 20px;
  color: red;
  text-align: center;
  line-height: 50px;
}
:global(body) {
  width: 100vw;
  height: 100vh;
  background-color: burlywood;
}
</style>
```

#### 解答

:global 可以把对应的 css 转化为全局作用域，:local 可以将对应的 css 转换为局部作用域。

去掉 style 标签中的 scoped 也可以将其内的 css 转化成全局作用域
