## 扩展路由的Meta

1. 项目根目录下创建 `typing.d.ts` 文件

2. 加入以下内容

   ```typescript
   import 'vue-router'
   
   declare module 'vue-router' {
     interface RouteMeta {
       hidden?: boolean
       noShowingChildren?: boolean
       alwaysShow?: boolean
       title?: string
       icon?: string
     }
   }
   ```

   