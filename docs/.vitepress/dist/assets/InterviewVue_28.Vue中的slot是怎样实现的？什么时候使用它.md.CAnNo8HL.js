import{_ as s,c as a,o as i,a7 as n}from"./chunks/framework.DIkKG9z6.js";const u=JSON.parse('{"title":"28. Vue 中的 slot 是怎样实现的？什么时候使用它？","description":"","frontmatter":{},"headers":[],"relativePath":"InterviewVue/28.Vue中的slot是怎样实现的？什么时候使用它.md","filePath":"InterviewVue/28.Vue中的slot是怎样实现的？什么时候使用它.md"}'),t={name:"InterviewVue/28.Vue中的slot是怎样实现的？什么时候使用它.md"},l=n(`<h1 id="_28-vue-中的-slot-是怎样实现的-什么时候使用它" tabindex="-1">28. Vue 中的 slot 是怎样实现的？什么时候使用它？ <a class="header-anchor" href="#_28-vue-中的-slot-是怎样实现的-什么时候使用它" aria-label="Permalink to &quot;28. Vue 中的 slot 是怎样实现的？什么时候使用它？&quot;">​</a></h1><h3 id="_1-1-什么是插槽" tabindex="-1">1.1 什么是插槽？ <a class="header-anchor" href="#_1-1-什么是插槽" aria-label="Permalink to &quot;1.1 什么是插槽？&quot;">​</a></h3><p>插槽设计来源于 Web Components 规范草案，利用<code>slot</code>进行占位，在使用组件时，组件标签内部的内容会分发到对应的 slot 中。</p><h3 id="_1-2-什么时候使用它" tabindex="-1">1.2 什么时候使用它？ <a class="header-anchor" href="#_1-2-什么时候使用它" aria-label="Permalink to &quot;1.2 什么时候使用它？&quot;">​</a></h3><p>通过插槽可以让用户更好地对组件进行扩展和定制化。可以通过具名插槽指定渲染的位置。常用的组件例如：弹窗组件、布局组件、表格组件、树组件……</p><h3 id="_1-3-插槽的分类和原理" tabindex="-1">1.3 插槽的分类和原理 <a class="header-anchor" href="#_1-3-插槽的分类和原理" aria-label="Permalink to &quot;1.3 插槽的分类和原理&quot;">​</a></h3><ul><li><p>默认插槽</p></li><li><p>具名插槽</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`&lt;div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &lt;slot name=&quot;title&quot;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &lt;slot name=&quot;content&quot;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&lt;/div&gt;\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 编译后的结果with(this) {return _c(&#39;div&#39;, [_t(&quot;title&quot;), _t(&quot;content&quot;)], 2)}</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`&lt;my&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &lt;h1 slot=&quot;title&quot;&gt;标题&lt;/h1&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &lt;h1 slot=&quot;content&quot;&gt;内容&lt;/h1&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&lt;/my&gt;\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">* 编译后结果</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">with(this) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    return _c(&#39;my&#39;, [_c(&#39;h1&#39;, {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      attrs: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        &quot;slot&quot;: &quot;title&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      slot: &quot;title&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    }, [_v(&quot;标题&quot;)]), _c(&#39;h1&#39;, {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      attrs: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        &quot;slot&quot;: &quot;content&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      slot: &quot;content&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    }, [_v(&quot;内容&quot;)])])</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span></code></pre></div></li><li><p>作用域插槽</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`&lt;div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &lt;slot :article=&quot;{title:&#39;标题&#39;,content:&#39;内容&#39;}&quot;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&lt;/div&gt;\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** 编译后的结果 </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">with(this) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    return _c(&#39;div&#39;, [_t(&quot;default&quot;, null, {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      &quot;article&quot;: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        title: &#39;标题&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        content: &#39;内容&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    })], 2)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`&lt;my&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &lt;template v-slot=&quot;{article}&quot;&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &lt;h1&gt;{{ article.title }}&lt;/h1&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &lt;div&gt;{{ article.content }}&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &lt;/template&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&lt;/my&gt;\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** 编译后的结果</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">with(this) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    return _c(&#39;my&#39;, {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      scopedSlots: _u([{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        key: &quot;default&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        fn: function ({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          article</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        }) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          return [_c(&#39;h1&#39;, [_v(_s(article.title))]), _c(&#39;div&#39;, [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            _v(_s(article.content))</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          ])]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      }])</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    })</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span></code></pre></div><blockquote><p>普通插槽渲染在父级，作用域插槽在组件内部渲染</p></blockquote></li></ul>`,7),p=[l];function e(h,k,c,o,r,d){return i(),a("div",null,p)}const A=s(t,[["render",e]]);export{u as __pageData,A as default};
