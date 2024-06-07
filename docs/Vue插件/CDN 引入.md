<!--
 * @Date: 2024-06-07 10:43:54
 * @LastEditTime: 2024-06-07 11:03:38
 * @Description:
 * @FilePath: /xuchp.github.io/docs/Vue插件/CDN 引入.md
-->

### CDN 引入

#### 安装

下载 yarn

```bash
yarn add vite-plugin-cdn-import -D
```

or npm

```bash
npm install vite-plugin-cdn-import -D
```

#### 基本用法

```js
// vite.config.js
import cdn from 'vite-plugin-cdn-import'

export default {
  plugins: [
    cdn({
      modules: [
        'vue',
        {
          name: '@wangeditor/editor',
          var: 'wangEditor',
          path: 'https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/index.js',
          css: 'https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/css/style.css'
        }
      ]
    })
  ]
}
```

**注意**: 这里的 `var` 字段是插件的全局变量名, 通常挂载在 window 中, 因此名字可以到 window 中查找。`path` 字段是插件的路径，`css` 字段是插件的样式路径。

#### 预设的 npm 包

- react
- react-dom
- react-router-dom
- antd
- vue
- vue2
- vue-router
- vue-router@3
- moment
- dayjs
- axios
- lodash

#### 参数

##### prodUrl

可选, 全局 prodUrl 属性, 生成 CND 文件路径的模板 url。

- 类型

```typescript
{
    prodUrl?: string
}
```

- 默认值: https://cdn.jsdelivr.net/npm/{name}@{version}/{path}

##### modules

external 模块配置

- 类型

```typescript
type GetModuleFunc = (prodUrl: string) => Module
{
    modules: (Module | Module[] | GetModuleFunc | GetModuleFunc[])[]
}
```

##### enableInDevMode

是否在开发模式中启用

类型: boolean

默认值：false

> vite2, vite3 请确保开发模式 process.env.NODE_ENV === 'development'

##### generateScriptTag

自定义生成的 script 标签

- 类型

```typescript
generateScriptTag?: (
    name: string,
    scriptUrl: string,
) => Omit<HtmlTagDescriptor, 'tag' | 'children'>
```

##### generateCssLinkTag

自定义生成 css link 标签

- 类型

```typescript
generateCssLinkTag?: (
    name: string,
    cssUrl: string,
) => Omit<HtmlTagDescriptor, 'tag' | 'children'>
```

#### module 配置

| name    | Description                                           | Type              |
| ------- | ----------------------------------------------------- | ----------------- |
| name    | 需要 CDN 加速的包名称                                 | string            |
| alias   | 名称的别名，例如“react-dom/client”是“react-dom”的别名 | string[]          |
| var     | 全局分配给模块的变量, 可以在控制台 window 对象中获得  | string            |
| path    | 指定 CDN 上的加载路径                                 | string / string[] |
| css     | 可以指定从 CDN 地址上加载多个样式表                   | string / string[] |
| prodUrl | 覆盖全局的 prodUrl                                    | string / string[] |

#### 其他的 CDN prodUrl 地址

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |
