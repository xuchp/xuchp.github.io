### 阻止冒泡事件

#### 题目

在这个挑战中，你需要阻止点击事件的冒泡，让我们开始吧。

```vue
<script setup lang="ts">

const click1 = () => {
  console.log('click1')
}

const click2 = () => {
  console.log('click2')
}

</script>

<template>
  <div @click="click1()">
   <div @click="click2()">
     click me
   </div>
  </div>
</template>
```

#### 答案

1. stop 修饰符

```vue
<script setup lang="ts">
const click1 = () => {
  console.log('click1')
}

const click2 = () => {
  console.log('click2')
}
</script>

<template>
  <div @click="click1">
    <div @click.stop="click2">click me</div>
  </div>
</template>
```

2. 原生阻止冒泡：e.stopPropagation()

```vue
<script setup lang="ts">
const click1 = () => {
  console.log('click1')
}

const click2 = (event: MouseEvent) => {
  console.log('click2')
  event.stopPropagation()
}
</script>

<template>
  <div @click="click1">
    <div @click="click2($event)">click me</div>
  </div>
</template>
```

### 按键修饰符

#### 题目

在监听键盘事件时，我们经常需要检查特定的按键。Vue 允许为 v-on 或者 @ 在监听键盘事件时添加按键修饰符：，例如：

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input @keyup.enter="submit" />
```

在这个挑战中，我们将尝试它，让我们开始吧：

```vue
<template>
  <!-- 添加按键修饰符让即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click="onClick1">A</button>

<!-- 添加按键修饰符让有且只有 Shift 被按下的时候才触发 -->
<button @click="onCtrlClick">A</button>

<!-- 添加按键修饰符让没有任何系统修饰符被按下的时候才触发 -->
<button @click="onClick2">A</button>
</template>
```

#### 答案

```vue
<template>
  <!-- 添加按键修饰符让即使 Alt 或 Shift 被一同按下时也会触发 -->
  <button @click.alt.shift="onClick1">A</button>

  <!-- 添加按键修饰符让有且只有 Shift 被按下的时候才触发 -->
  <button @click.shift="onCtrlClick">A</button>

  <!-- 添加按键修饰符让没有任何系统修饰符被按下的时候才触发 -->
  <button @click.exact="onClick2">A</button>
</template>
<script setup lang="ts">
const onClick1 = () => {
  console.log('onclick1')
}
const onCtrlClick = () => {
  console.log('onCtrlClick')
}
const onClick2 = () => {
  console.log('onClick2')
}
</script>
```
