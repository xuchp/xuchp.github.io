### 批量导入 SVG

#### 一-安装插件

```bash
npm i vite-plugin-svg-icons -D
// 或者
yarn add vite-plugin-svg-icons -D
```

#### 二、在 vite.config.ts中配置

**iconDirs**:iconDirs是保存 svg 图片的文件夹，可以填写多个

<img src="https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240204101235373.png" alt="image-20240204101235373" style="zoom:33%;" />

```typescript
//import path,{ resolve } from 'path'
import path from 'path'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
 
export default defineConfig((command) => {
 return {
    plugins: [
      createSvgIconsPlugin({
        // 指定要缓存的文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: '[name]'
      })
    ],
}
})
```

#### 三、封装 svg 组件

```vue
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use class="svg-use" :href="symbolId" />
  </svg>
</template>
 
<script>
  import { defineComponent, computed } from 'vue'
 
  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon'
      },
      name: {
        type: String,
        required: true
      },
      className: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const symbolId = computed(() => `#${props.name}`)
      const svgClass = computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`
        }
        return 'svg-icon'
      })
      return { symbolId, svgClass }
    }
  })
</script>
<style scope>
  .svg-icon { 
    vertical-align: -0.1em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
    fill: currentColor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
    overflow: hidden;
  } 
</style>
```

#### 四、配置全局组件并引入插件

```typescript

import { type App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
import 'virtual:svg-icons-register'
export const useSvgIcon = (app: App) => {
  // register globally
  app.component('svg-icon', SvgIcon)
}
```

#### 五、在 main.ts 中引入

```typescript
import { useSvgIcon } from '@/icons'
useSvgIcon(app)
```

#### 
