import{_ as e,c as t,o as i,a7 as _}from"./chunks/framework.DIkKG9z6.js";const h=JSON.parse('{"title":"39. Vue 中的性能优化有哪些","description":"","frontmatter":{},"headers":[],"relativePath":"InterviewVue/39.Vue 中的性能优化有哪些.md","filePath":"InterviewVue/39.Vue 中的性能优化有哪些.md"}'),a={name:"InterviewVue/39.Vue 中的性能优化有哪些.md"},l=_('<h1 id="_39-vue-中的性能优化有哪些" tabindex="-1">39. Vue 中的性能优化有哪些 <a class="header-anchor" href="#_39-vue-中的性能优化有哪些" aria-label="Permalink to &quot;39. Vue 中的性能优化有哪些&quot;">​</a></h1><ul><li>数据层级不宜过深，合理设置响应式数据</li><li>通过<code>Object.freeze()</code>方法冻结属性</li><li>使用数据时，缓存值的结果，不频繁取值</li><li>合理设置 key 属性</li><li>v-show 和 v-if 的选取</li><li>控制组件力粒度 -&gt;Vue 采用组件级更新</li><li>采用函数式组件 -&gt; 函数式组件开销低</li><li>采用异步组件 -&gt; 借助 <code>webpack</code> 分包的能力</li><li>使用<code>keep-alive</code>缓存组件 v-once</li><li>分页、虚拟滚动、时间分片等策略…</li></ul>',2),o=[l];function c(r,n,s,d,u,V){return i(),t("div",null,o)}const f=e(a,[["render",c]]);export{h as __pageData,f as default};
