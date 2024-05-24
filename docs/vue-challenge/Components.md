### DOM 传送门

#### 题目

`Vue.js`提供了一个内置组件，将其插槽内容渲染到另一个DOM，成为该DOM的一部分

```vue
<script setup>

const msg = "Hello World"

</script>

<template>
  <!-- 将以下元素渲染成`body`的子元素 -->
  <span>{{ msg }}</span>
</template>
```

#### 答案

```vue
<script setup lang="ts">
const msg = 'Hello World'
</script>

<template>
  <!-- 将以下元素渲染成`body`的子元素 -->
  <teleport to="body">
    <span>{{ msg }}</span>
  </teleport>
</template>
```

#### 解答

使用 teleport 将内容渲染到 body 的子元素中 

### Props 验证

#### 题目

请验证`Button`组件的`Prop`类型 ，使它只接收: `primary | ghost | dashed | link | text | default` ，且默认值为`default`。

```vue
<script setup>
defineProps({
  type: {},
})
</script>

<template>
  <button>Button</button>
</template>
```

#### 答案

```vue
<script setup lang="ts">
defineProps({
  btntype: {
    type: String,
    default: 'default',
    required: true,
    validator: (value: string) => {
      return ['primary', 'ghost', 'dashed', 'link', 'text', 'default'].includes(
        value
      )
    }
  }
})
</script>

<template>
  <button>Button</button>
</template>
```

#### 解答

自定义类型校验validator函数可以返回特定的枚举类型

### 函数式组件

#### 题目

```vue
<script setup lang='ts'>

import { ref } from "vue"

/**
 * 实现该函数式组件 :
 * 1. 使用`list`数据渲染列表元素 (ul/li)
 * 2. 当点击列表子元素时,将其文本颜色更改为红色
*/
const ListComponent = () => {
}

const list = [{
  name: "John",
}, {
  name: "Doe",
}, {
  name: "Smith",
}]

const activeIndex = ref(0)

function toggle(index: number) {
  activeIndex.value = index
}

</script>

<template>
  <list-component
    :list="list"
    :active-index="activeIndex"
    @toggle="toggle"
  />
</template>
```

#### 答案

```vue
<script setup lang="ts">
import { SetupContext, h, ref } from 'vue'
type IList = {
  name: string
}
type ListComponentProps = {
  list: IList[]
  activeIndex: number
}
type ListComponentEmits = {
  toggle(index: number): void
}
const ListComponent = (
  p: ListComponentProps,
  context: SetupContext<ListComponentEmits>
) => {
  const { emit } = context
  return h(
    'ul',
    {},
    p.list.map((x, i) => {
      return h(
        'li',
        {
          style: { color: p.activeIndex == i ? 'red' : null },
          onClick: () => {
            emit('toggle', i)
          }
        },
        x.name
      )
    })
  )
}

const list = [
  {
    name: 'John'
  },
  {
    name: 'Doe'
  },
  {
    name: 'Smith'
  }
]

const activeIndex = ref(0)

function toggle(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <list-component :list="list" :active-index="activeIndex" @toggle="toggle" />
</template>

```

### 渲染函数[h()]

#### 题目

在这个挑战中，你需要使用`h`渲染函数来实现一个组件。

请注意: 你应该确保参数被正确传递、事件被正常触发和插槽内容正常渲染。让我们开始吧。

```vue
<script setup lang="ts">
import MyButton from "./MyButton.ts"
const onClick = () => {
  console.log('onClick')
}
</script>
<template>
  <MyButton :disabled="false" @custom-click="onClick">
    my button
  </MyButton>
</template>
```

#### 答案

```vue
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'MyButton',
  render() {
    return h(
      'button',
      {
        ...this.$attrs,
        onClick: () => this.$emit('custom-click')
      },
      this.$slots
    )
  }
})

```

### 树组件 

#### 题目

在这个挑战中，你需要实现一个树组件，让我们开始吧。

```vue
<script setup lang="ts">
interface TreeData {
  key: string
  title: string
  children: TreeData[]
}
defineProps<{data: TreeData[]}>()
</script>

<template>
  <!-- do something.... -->
</template>

```

#### 答案

```vue
<script setup lang="ts">
export interface TreeData {
  key: string
  title: string
  children?: TreeData[]
}
defineProps<{ data: TreeData[] }>()
defineOptions({ name: 'TreeComponent' })
</script>

<template>
  <ul v-for="item in data">
    <li>
      {{ item.title }}
      <TreeComponent
        v-if="item.children && item.children.length > 1"
        :data="item.children"
      ></TreeComponent>
    </li>
  </ul>
</template>

```

