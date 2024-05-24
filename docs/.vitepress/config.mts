/*
 * @Date: 2023-12-22 15:22:22
 * @LastEditTime: 2024-05-24 18:38:14
 * @Description:
 * @FilePath: \xuchp.github.io\docs\.vitepress\config.mts
 */
import { defineConfig } from 'vitepress'
import autoSidebar from 'amtf-vitepress-auto-sidebar'
import { SearchPlugin } from 'vitepress-plugin-search'
import flexSearchIndexOptions from 'flexsearch'

var options = {
  ...flexSearchIndexOptions,
  previewLength: 100, //搜索结果预览长度
  buttonLabel: '搜索',
  placeholder: '请输入关键词'
}
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      autoSidebar({
        collapsed: false,
        忽略后缀名: ['.DS_store']
      }),
      SearchPlugin(options)
    ]
  },
  base: '/notes/',
  title: '丶冫氵灬',
  description: 'blog',
  themeConfig: {
    outline: {
      level: [2, 6],
      label: '章节内容'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples/markdown-examples' },
      {
        text: '要点整理',
        items: [
          { text: 'Vue', link: '/InterviewVue/01.谈谈你对Vue的理解.md' },
          { text: 'JavaScript', link: '/InterviewJS/js.md' }
        ]
      },
      {
        text: '要点整理2',
        items: [{ text: '所有', link: '/basic/css.md' }]
      },
      {
        text: '前端基础',
        items: [
          {
            text: 'JavaScript',
            link: '/JavaScript/第1章-什么是 JavaScript.md'
          }
        ]
      },
      {
        text: 'vue',
        items: [
          {
            text: 'vue教程',
            link: 'vue教程/index.md'
          },
          {
            text: 'vue插件',
            link: 'Vue插件/批量导入svg.md'
          },
          {
            text: 'vue+TS',
            link: 'Vue+TS/TS 扩展路由meta.md'
          },
          {
            text: 'vue挑战',
            link: '/vue-challenge/CSS Features.md'
          }
        ]
      },
      {
        text: 'HarmonyOS',
        items: [
          {
            text: 'HarmonyOS',
            link: '/harmonyOS/入门.md'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
