### 1. Options API 和 Composition API

- Vue2 的`API`设计是`Option`(配置)风格的。
- Vue3 的`API`设计是`Composition`(组合)风格的。

#### Options API 的弊端

`Options`类型的`API`，数据、方法、计算属性等，是分散在：`data`、`methods`、`computed`中的，若想新增或者修改一个需求，就需要分别修改`data`、`methods`、`computed`，不便于维护和复用。

![img](https://gitee.com/xuchp/typora-pics/raw/master/images/27764adda45a5aa388cb8f55affa3178831-20240130114549239.gif)

### 2.拉开序幕的 setup

#### setup 概述

`setup` 是 `Vue3` 中一个新的配置项 ，值是一个函数，它是 `Composition API` "表演的舞台"，组件中所用到的：数据、方法、计算属性、监视……等等，均配置在 `setup` 中

特点如下

- `setup`函数返回的对象中的内容，可直接在模板中使用
- `setup`中访问 `this`是`undefined`
- `setup`函数会在`beforeCreate`之前调用，它是"领先"所有钩子执行的

```vue
<!--
 * @Date: 2024-01-30 14:23:15
 * @LastEditTime: 2024-01-30 14:28:17
 * @Description: 
 * @FilePath: /vue3-ts-md/src/components/CompositionAPI2.vue
-->
<template>
  <div class="person">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    // 数据
    const name = ref('张三')
    const age = ref(18)
    // 方法
    const changeName = () => {
      name.value = 'zhang-san'
    }
    const changeAge = () => {
      age.value += 1
    }

    const showTel = () => {
      alert('138888888888')
    }
    return {
      name,
      age,
      changeAge,
      changeName,
      showTel
    }
  }
}
</script>
<style scoped>
button {
  margin: 0 5px;
}
</style>
```

### 3. 【ref 创建：基本类型的响应式数据】

- **作用：**定义响应式变量。
- **语法：**`let xxx = ref(初始值)`。
- **返回值：**一个`RefImpl`的实例对象，简称`ref对象`或`ref`，`ref`对象的`value`**属性是响应式的**。
- **注意点：**
  - `JS`中操作数据需要：`xxx.value`，但模板中不需要`.value`，直接使用即可。
  - 对于`let name = ref('张三')`来说，`name`不是响应式的，`name.value`是响应式的。

### 4. 【reactive 创建：对象类型的响应式数据】

- **作用：**定义一个**响应式对象**（基本类型不要用它，要用`ref`，否则报错）
- **语法：**`let 响应式对象= reactive(源对象)`。
- **返回值：**一个`Proxy`的实例对象，简称：响应式对象。
- **注意点：**`reactive`定义的响应式数据是“深层次”的。

### 5. 【ref 创建：对象类型的响应式数据】

- 其实`ref`接收的数据可以是：**基本类型**、**对象类型**。
- 若`ref`接收的是对象类型，内部其实也是调用了`reactive`函数。

### 6. 【ref 对比 reactive】

宏观角度看：

> 1. `ref`用来定义：**基本类型数据**、**对象类型数据**；
>
> 2. `reactive`用来定义：**对象类型数据**。

- 区别：

> 1. `ref`创建的变量必须使用`.value`（可以使用`volar`插件自动添加`.value`）。
>
>    <img src="https://gitee.com/xuchp/typora-pics/raw/master/images/%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%85value.png" alt="自动补充value" style="zoom:50%;" /> 
>
> 2. `reactive`重新分配一个新对象，会**失去**响应式（可以使用`Object.assign`去整体替换）。

- 使用原则：

> 1. 若需要一个基本类型的响应式数据，必须使用`ref`。
> 2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
> 3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`。

### 7. 【toRefs 与 toRef】

- 作用：将一个响应式对象中的每一个属性，转换为`ref`对象。

- 备注：`toRefs`与`toRef`功能一致，但`toRefs`可以批量转换。

- 语法如下：

  ```vue
  <template>
    <div class="person">
      <h2>姓名：{{person.name}}</h2>
      <h2>年龄：{{person.age}}</h2>
      <h2>性别：{{person.gender}}</h2>
      <button @click="changeName">修改名字</button>
      <button @click="changeAge">修改年龄</button>
      <button @click="changeGender">修改性别</button>
    </div>
  </template>
  
  <script lang="ts" setup name="Person">
    import {ref,reactive,toRefs,toRef} from 'vue'
  
    // 数据
    let person = reactive({name:'张三', age:18, gender:'男'})
  	
    // 通过toRefs将person对象中的n个属性批量取出，且依然保持响应式的能力
    let {name,gender} =  toRefs(person)
  	
    // 通过toRef将person对象中的gender属性取出，且依然保持响应式的能力
    let age = toRef(person,'age')
  
    // 方法
    function changeName(){
      name.value += '~'
    }
    function changeAge(){
      age.value += 1
    }
    function changeGender(){
      gender.value = '女'
    }
  </script>
  ```

  
