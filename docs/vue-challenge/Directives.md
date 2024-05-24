### 大写

#### 题目

```vue
<script setup>
</script>

<template>
  <input type="text" v-model.capitalize="" />
</template>
```

#### 答案

```vue
<script setup>
import { ref, vModelText } from 'vue'

const iptText = ref('')
vModelText.beforeUpdate = (el: HTMLInputElement, { value, modifiers }) => {
  console.log(el.value, value, modifiers)
  if (value && modifiers.capitalize) {
    if (typeof value === 'string') {
      el.value = value.slice(0, 1).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<template>
  <input type="text" v-model.capitalize="iptText" />
</template>
```

### 优化性能的指令

#### 题目

`Vue.js` 提供了一个指令，以便只渲染一次元素和组件，并且跳过以后的更新。

```vue
<script setup>
import { ref } from "vue"

const count = ref(0)

setInterval(() => {
  count.value++
}, 1000)
</script>

<template>
  <span>使它从不更新: {{ count }}</span>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

setInterval(() => {
  count.value++
}, 1000)
</script>

<template>
  <span v-once>使它从不更新: {{ count }}</span>
</template>
```

#### 解答

v-once: 仅渲染元素和组件一次，并跳过之后的更新。在随后的重新渲染，元素/组件及其所有子项将被当作静态内容并跳过渲染。这可以用来优化更新时的性能。

v-text: 更新元素的文本内容。

v-html: 更新元素的 [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

v-pre: 跳过该元素及其所有子元素的编译。元素内具有 `v-pre`，所有 Vue 模板语法都会被保留并按原样渲染。最常见的用例就是显示原始双大括号标签及内容。

### 切换焦点的指令

#### 题目

```vue
<script setup lang='ts'>
import { ref } from "vue"

const state = ref(false)

/**
 * 实现一个自定义指令,让元素获取焦点
 * 确保当切换`state`时,元素随着状态值获取/失去焦点
 *
*/
const VFocus = {

}

setInterval(() => {
  state.value = !state.value
}, 2000)

</script>

<template>
  <input v-focus="state" type="text">
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { ref } from 'vue'

const state = ref(false)

/**
 * 实现一个自定义指令,让元素获取焦点
 * 确保当切换`state`时,元素随着状态值获取/失去焦点
 *
 */
const VFocus = {
  mounted: (el: HTMLInputElement, binding: any) => {
    binding.value ? el.focus() : el.blur()
  },
  updated: (el: HTMLInputElement, binding: any) => {
    binding.value ? el.focus() : el.blur()
  }
}

setInterval(() => {
  state.value = !state.value
}, 2000)
</script>

<template>
  <input v-focus="state" type="text" />
</template>
```

### 防抖点击指令

#### 题目

```vue
<script setup lang='ts'>

/**
 * 实现以下自定义指令
 * 确保在一定时间内当快速点击按钮多次时只触发一次点击事件
 * 你需要支持防抖延迟时间选项, 用法如 `v-debounce-click:ms`
 *
*/

const VDebounceClick = {

}

function onClick() {
  console.log("Only triggered once when clicked many times quicky")
}

</script>

<template>
  <button v-debounce-click:200="onClick">
    Click on it many times quickly
  </button>
</template>
```

#### 答案

```vue
<script setup lang="ts">
/**
 * 实现以下自定义指令
 * 确保在一定时间内当快速点击按钮多次时只触发一次点击事件
 * 你需要支持防抖延迟时间选项, 用法如 `v-debounce-click:ms`
 *
 */

const VDebounceClick = {
  mounted: (el: HTMLButtonElement, binding: any) => {
    console.log(el, binding)
    let timeout: number = -1
    el.onclick = () => {
      clearTimeout(timeout)
      timeout = setTimeout(binding.value, binding.arg)
    }
  }
}

function onClick() {
  console.log('Only triggered once when clicked many times quicky')
}
</script>

<template>
  <button v-debounce-click:200="onClick">Click on it many times quickly</button>
</template>

```

### 激活的样式-指令

#### 题目

```vue
<script setup lang="ts">
import { ref } from 'vue'

/**
 * 实现该指令 :
 * 当切换该选项卡时，列表项文本颜色变为红色
 *
 */
const VActiveStyle = {}

const list = [1, 2, 3, 4, 5, 6, 7, 8]
const activeTab = ref(0)
function toggleTab(index: number) {
  activeTab.value = index
}
</script>

<template>
  <ul>
    <li
      v-for="(item, index) in list"
      :key="index"
      v-active-style="[{ color: 'red' }, () => activeTab === index]"
      @click="toggleTab(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { DirectiveBinding, ref, watchEffect } from 'vue'

/**
 * 实现该指令 :
 * 当切换该选项卡时，列表项文本颜色变为红色
 *
 */
const VActiveStyle = {
  mounted: (el: HTMLLIElement, binding: DirectiveBinding) => {
    const [style, fn] = binding.value
    watchEffect(() => {
      Object.keys(style).forEach((styleKey: any) => {
        el.style[styleKey] = fn() ? style[styleKey] : ''
      })
    })
  }
}

const list = [1, 2, 3, 4, 5, 6, 7, 8]
const activeTab = ref(0)
function toggleTab(index: number) {
  activeTab.value = index
}
</script>

<template>
  <ul>
    <li
      v-for="(item, index) in list"
      :key="index"
      v-active-style="[{ color: 'red' }, () => activeTab === index]"
      @click="toggleTab(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>
```

### 实现简易的`v-model`指令

#### 题目

```vue
<script setup lang='ts'>

import { ref } from "vue"

/**
 * 实现以下自定义指令
 * 在表单输入元素和数据间创建双向绑定
 *
*/
const VOhModel = {

}

const value = ref("Hello Vue.js")

</script>

<template>
  <input v-oh-model="value" type="text" />
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { DirectiveBinding, ref, watchEffect } from 'vue'

/**
 * 实现以下自定义指令
 * 在表单输入元素和数据间创建双向绑定
 *
 */
const VOhModel = {
  mounted: (el: HTMLInputElement, binding: DirectiveBinding) => {
    console.log(el, binding)
    el.oninput = () => {
      vatltexue.value = el.value
    }
    watchEffect(() => {
      el.value = vatltexue.value
    })
  }
}

const vatltexue = ref('Hello Vue.js')
</script>

<template>
  <input v-oh-model="vatltexue" type="text" />
</template>
```

