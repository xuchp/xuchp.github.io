import{_ as s,c as i,o as a,a7 as n}from"./chunks/framework.BvW0rtPM.js";const c=JSON.parse('{"title":"1. 谈谈你对 Vue 的理解？","description":"","frontmatter":{},"headers":[],"relativePath":"InterviewVue/01.谈谈你对Vue的理解.md","filePath":"InterviewVue/01.谈谈你对Vue的理解.md"}'),t={name:"InterviewVue/01.谈谈你对Vue的理解.md"},l=n(`<h1 id="_1-谈谈你对-vue-的理解" tabindex="-1">1. 谈谈你对 Vue 的理解？ <a class="header-anchor" href="#_1-谈谈你对-vue-的理解" aria-label="Permalink to &quot;1. 谈谈你对 Vue 的理解？&quot;">​</a></h1><p>官方：<strong>Vue</strong>是一套用于构架用户界面的<strong>渐进式框架</strong>，Vue 的核心库只关注视图层</p><p><img src="https://raw.githubusercontent.com/xuchp/typora-pics/main/images/image-20240313101558411.png" alt="image-20240313101558411"></p><h3 id="_1-1-声明式框架" tabindex="-1">1.1 声明式框架 <a class="header-anchor" href="#_1-1-声明式框架" aria-label="Permalink to &quot;1.1 声明式框架&quot;">​</a></h3><p>Vue 的核心特点，用起来简单。那我们就有必要知道<strong>命令式和声明式的区别</strong></p><ul><li>早在 JQ 的时代，编写的代码都是命令式的，命令式框架重要特点就是关注过程</li><li>声明式框架更加关注结果。命令式的代码封装到了 VueJs 中，过程靠 vuejs 来实现</li></ul><blockquote><p>声明式代码更加简单，不需要关注实现，按照要求填代码就可以了(给上原材料就出结果)</p></blockquote><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">命令式编程</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numbers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> total </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numbers.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  total </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numbers[i] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 关注了过程</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(total)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">声明式编程</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> total2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numbers.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reduce</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">memo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">current</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> memo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> current</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(total2)</span></span></code></pre></div><h3 id="_1-2-mvvm-模式" tabindex="-1">1.2 MVVM 模式 <a class="header-anchor" href="#_1-2-mvvm-模式" aria-label="Permalink to &quot;1.2 MVVM 模式&quot;">​</a></h3><p>说起 mvvm，就要知道另一个东西叫 MVC。为什么要有这些模式呢？</p><p>目的：职责划分、分层管理</p><p><img src="https://raw.githubusercontent.com/xuchp/typora-pics/main/images/image-20240313103948553.png" alt="image-20240313103948553"></p><blockquote><p>对于前端而言就是如何将数据同步到页面上，也就是借鉴后端思想</p></blockquote><ul><li><p>MVC 模式：Backbone + underscore + jquery</p><blockquote><p>对于前端而言，数据变化无法同步到视图中。需要将逻辑聚拢在 controller 层</p></blockquote></li><li><p>MVVM 模式：映射关系的简化(隐藏 controller)</p><p><img src="https://raw.githubusercontent.com/xuchp/typora-pics/main/images/image-20240313104458974.png" alt="image-20240313104458974"></p><blockquote><p>虽然没有完成遵循 MVVM 模型，但是 Vue 设计也受到了它的启发。因此在文档中经常会使用 <code>vm</code>(ViewModel 的缩写)这个变量表示 Vue 实例。</p></blockquote></li></ul><h3 id="_1-3-采用虚拟-dom" tabindex="-1">1.3 采用虚拟 DOM <a class="header-anchor" href="#_1-3-采用虚拟-dom" aria-label="Permalink to &quot;1.3 采用虚拟 DOM&quot;">​</a></h3><p>传统更新页面，拼接一个完整的字符串 innerHTML 全部重新渲染，添加虚拟 DOM 后，可以比较新旧虚拟节点，找到变化再进行更新。虚拟 DOM 就是一个对象，用来描述真实 DOM 的</p><p><a href="https://github.com/vuejs/vue/blob/main/src/core/vdom/vnode.ts" target="_blank" rel="noreferrer">github.com</a></p><h3 id="_1-4-区分编译-打包-时和运行-浏览器-时" tabindex="-1">1.4 区分编译(打包)时和运行(浏览器)时 <a class="header-anchor" href="#_1-4-区分编译-打包-时和运行-浏览器-时" aria-label="Permalink to &quot;1.4 区分编译(打包)时和运行(浏览器)时&quot;">​</a></h3><ul><li>Vue 的渲染核心就是调用渲染(render)方法将虚拟 DOM 渲染成真实 DOM(缺点就是虚拟 DOM 编写麻烦)</li><li>专门写个编译时可以将模板编译成虚拟 DOM(在构建的时候进行编译性能更高，不需要运行的时候进行编译)</li></ul><h3 id="_1-5-组件化" tabindex="-1">1.5 组件化 <a class="header-anchor" href="#_1-5-组件化" aria-label="Permalink to &quot;1.5 组件化&quot;">​</a></h3><p>实现高内聚、低耦合、单向数据流</p><ul><li>组件化开发能大幅提高应用开发效率、测试性、复用性等；</li><li>降低更新范围，只重新渲染变化的组件</li></ul>`,22),h=[l];function e(p,k,r,E,o,d){return a(),i("div",null,h)}const u=s(t,[["render",e]]);export{c as __pageData,u as default};
