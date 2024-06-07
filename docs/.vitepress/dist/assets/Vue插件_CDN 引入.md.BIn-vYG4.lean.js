import{_ as i,c as a,o as t,a7 as n,j as s}from"./chunks/framework.BvW0rtPM.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Vue插件/CDN 引入.md","filePath":"Vue插件/CDN 引入.md"}'),l={name:"Vue插件/CDN 引入.md"},e=n(`<h3 id="cdn-引入" tabindex="-1">CDN 引入 <a class="header-anchor" href="#cdn-引入" aria-label="Permalink to &quot;CDN 引入&quot;">​</a></h3><h4 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h4><p>下载 yarn</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vite-plugin-cdn-import</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span></span></code></pre></div><p>or npm</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vite-plugin-cdn-import</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span></span></code></pre></div><h4 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// vite.config.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cdn </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vite-plugin-cdn-import&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    cdn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      modules: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;vue&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;@wangeditor/editor&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          var: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;wangEditor&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/index.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          css: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/css/style.css&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>注意</strong>: 这里的 <code>var</code> 字段是插件的全局变量名, 通常挂载在 window 中, 因此名字可以到 window 中查找。<code>path</code> 字段是插件的路径，<code>css</code> 字段是插件的样式路径。</p><h4 id="预设的-npm-包" tabindex="-1">预设的 npm 包 <a class="header-anchor" href="#预设的-npm-包" aria-label="Permalink to &quot;预设的 npm 包&quot;">​</a></h4><ul><li>react</li><li>react-dom</li><li>react-router-dom</li><li>antd</li><li>vue</li><li>vue2</li><li>vue-router</li><li>vue-router@3</li><li>moment</li><li>dayjs</li><li>axios</li><li>lodash</li></ul><h4 id="参数" tabindex="-1">参数 <a class="header-anchor" href="#参数" aria-label="Permalink to &quot;参数&quot;">​</a></h4><h5 id="produrl" tabindex="-1">prodUrl <a class="header-anchor" href="#produrl" aria-label="Permalink to &quot;prodUrl&quot;">​</a></h5><p>可选, 全局 prodUrl 属性, 生成 CND 文件路径的模板 url。</p><ul><li>类型</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    prodUrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>默认值: <a href="https://cdn.jsdelivr.net/npm/%7Bname%7D@%7Bversion%7D/%7Bpath%7D" target="_blank" rel="noreferrer">https://cdn.jsdelivr.net/npm/{name}@{version}/{path}</a></li></ul><h5 id="modules" tabindex="-1">modules <a class="header-anchor" href="#modules" aria-label="Permalink to &quot;modules&quot;">​</a></h5><p>external 模块配置</p><ul><li>类型</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GetModuleFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">prodUrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Module</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    modules</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Module</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GetModuleFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GetModuleFunc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[])[]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h5 id="enableindevmode" tabindex="-1">enableInDevMode <a class="header-anchor" href="#enableindevmode" aria-label="Permalink to &quot;enableInDevMode&quot;">​</a></h5><p>是否在开发模式中启用</p><p>类型: boolean</p><p>默认值：false</p><blockquote><p>vite2, vite3 请确保开发模式 process.env.NODE_ENV === &#39;development&#39;</p></blockquote><h5 id="generatescripttag" tabindex="-1">generateScriptTag <a class="header-anchor" href="#generatescripttag" aria-label="Permalink to &quot;generateScriptTag&quot;">​</a></h5><p>自定义生成的 script 标签</p><ul><li>类型</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">generateScriptTag</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    name: string,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    scriptUrl: string,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Omit</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HtmlTagDescriptor, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tag&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;children&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h5 id="generatecsslinktag" tabindex="-1">generateCssLinkTag <a class="header-anchor" href="#generatecsslinktag" aria-label="Permalink to &quot;generateCssLinkTag&quot;">​</a></h5><p>自定义生成 css link 标签</p><ul><li>类型</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">generateCssLinkTag</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    name: string,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cssUrl: string,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Omit</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HtmlTagDescriptor, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tag&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;children&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h4 id="module-配置" tabindex="-1">module 配置 <a class="header-anchor" href="#module-配置" aria-label="Permalink to &quot;module 配置&quot;">​</a></h4><table><thead><tr><th>name</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td>name</td><td>需要 CDN 加速的包名称</td><td>string</td></tr><tr><td>alias</td><td>名称的别名，例如“react-dom/client”是“react-dom”的别名</td><td>string[]</td></tr><tr><td>var</td><td>全局分配给模块的变量, 可以在控制台 window 对象中获得</td><td>string</td></tr><tr><td>path</td><td>指定 CDN 上的加载路径</td><td>string / string[]</td></tr><tr><td>css</td><td>可以指定从 CDN 地址上加载多个样式表</td><td>string / string[]</td></tr><tr><td>prodUrl</td><td>覆盖全局的 prodUrl</td><td>string / string[]</td></tr></tbody></table><h4 id="其他的-cdn-produrl-地址" tabindex="-1">其他的 CDN prodUrl 地址 <a class="header-anchor" href="#其他的-cdn-produrl-地址" aria-label="Permalink to &quot;其他的 CDN prodUrl 地址&quot;">​</a></h4>`,37),h=s("table",{path:""},[s("thead",null,[s("tr",null,[s("th",null,"Name"),s("th",null,"pordUrl")])]),s("tbody",null,[s("tr",{path:""},[s("td",null,"unpkg"),s("td",null,[s("a",{href:"//unpkg.com/%7Bname%7D@%7Bversion%7D/",target:"_blank",rel:"noreferrer"},"//unpkg.com/{name}@{version}/")])]),s("tr",null,[s("td",null,"cdnjs"),s("td",null,[s("a",{href:"//cdnjs.cloudflare.com/ajax/libs/%7Bname%7D/%7Bversion%7D/",target:"_blank",rel:"noreferrer"},"//cdnjs.cloudflare.com/ajax/libs/{name}/{version}/")])])])],-1),p=[e,h];function r(d,k,o,c,g,E){return t(),a("div",null,p)}const F=i(l,[["render",r]]);export{y as __pageData,F as default};
