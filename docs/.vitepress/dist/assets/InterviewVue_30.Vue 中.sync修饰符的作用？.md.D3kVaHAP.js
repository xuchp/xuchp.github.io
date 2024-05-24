import{_ as s,c as a,o as n,a7 as i}from"./chunks/framework.DIkKG9z6.js";const u=JSON.parse('{"title":"30. Vue 中 .sync 修饰符的作用？","description":"","frontmatter":{},"headers":[],"relativePath":"InterviewVue/30.Vue 中.sync修饰符的作用？.md","filePath":"InterviewVue/30.Vue 中.sync修饰符的作用？.md"}'),e={name:"InterviewVue/30.Vue 中.sync修饰符的作用？.md"},t=i(`<h1 id="_30-vue-中-sync-修饰符的作用" tabindex="-1">30. Vue 中 .sync 修饰符的作用？ <a class="header-anchor" href="#_30-vue-中-sync-修饰符的作用" aria-label="Permalink to &quot;30. Vue 中 .sync 修饰符的作用？&quot;">​</a></h1><p>在有些情况下，我们可能需要对一个 prop 进行&quot;双向绑定&quot;，这时可以使用.sync 来实现。v-model 默认只能双向绑定一个属性，这里就可以通过<code>.sync</code>修饰符绑定多个属性。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`&lt;my :value.sync=&quot;xxxx&quot;&gt;&lt;/my&gt;\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** 编译后结果是</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">* with(this) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    return _c(&#39;my&#39;, {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      attrs: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        &quot;value&quot;: xxxx</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      on: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        &quot;update:value&quot;: function ($event) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          xxxx = $event</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    })</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span></code></pre></div><blockquote><p>vue3 中<code>.sync</code> 语法被移除</p></blockquote>`,4),l=[t];function p(c,h,o,k,r,d){return n(),a("div",null,l)}const y=s(e,[["render",p]]);export{u as __pageData,y as default};
