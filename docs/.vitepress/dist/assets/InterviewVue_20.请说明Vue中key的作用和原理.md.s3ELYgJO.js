import{_ as e,c as a,o as t,a7 as i}from"./chunks/framework.DIkKG9z6.js";const y=JSON.parse('{"title":"20. 请说明 Vue 中 key 的作用和原理，谈谈你对它的理解","description":"","frontmatter":{},"headers":[],"relativePath":"InterviewVue/20.请说明Vue中key的作用和原理.md","filePath":"InterviewVue/20.请说明Vue中key的作用和原理.md"}'),_={name:"InterviewVue/20.请说明Vue中key的作用和原理.md"},r=i('<h1 id="_20-请说明-vue-中-key-的作用和原理-谈谈你对它的理解" tabindex="-1">20. 请说明 Vue 中 key 的作用和原理，谈谈你对它的理解 <a class="header-anchor" href="#_20-请说明-vue-中-key-的作用和原理-谈谈你对它的理解" aria-label="Permalink to &quot;20. 请说明 Vue 中 key 的作用和原理，谈谈你对它的理解&quot;">​</a></h1><h3 id="_1-1-key-的概念" tabindex="-1">1.1 key 的概念 <a class="header-anchor" href="#_1-1-key-的概念" aria-label="Permalink to &quot;1.1 key 的概念&quot;">​</a></h3><ul><li>key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNode。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能地尝试就地修改/复用相同类型元素的算法</li><li>当 Vue 正在更新使用 v-for 渲染的元素列表时，他默认使用&quot;就地更新&quot;的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保他们在每个索引位置正确渲染。</li></ul><h3 id="_1-2-key-的作用" tabindex="-1">1.2 key 的作用 <a class="header-anchor" href="#_1-2-key-的作用" aria-label="Permalink to &quot;1.2 key 的作用&quot;">​</a></h3><ul><li>Vue 在 patch 过程中通过 key 可以判断两个虚拟节点是否是相同节点。(可以复用老节点)</li><li>无 key 会导致更新的时候出问题</li><li>尽量不要采用索引作为 key</li></ul><p><img src="https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240314161812712.png" alt="image-20240314161812712"></p>',6),o=[r];function l(u,s,n,c,k,d){return t(),a("div",null,o)}const p=e(_,[["render",l]]);export{y as __pageData,p as default};
