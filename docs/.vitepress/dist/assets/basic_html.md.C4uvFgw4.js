import{_ as a,c as s,o as n,a7 as p}from"./chunks/framework.DIkKG9z6.js";const u=JSON.parse('{"title":"HTML","description":"","frontmatter":{"lastUpdated":true},"headers":[],"relativePath":"basic/html.md","filePath":"basic/html.md"}'),e={name:"basic/html.md"},i=p(`<h1 id="html" tabindex="-1">HTML <a class="header-anchor" href="#html" aria-label="Permalink to &quot;HTML&quot;">​</a></h1><h3 id="行内元素有哪些-块级元素有哪些-空-void-元素有哪些" tabindex="-1">行内元素有哪些?块级元素有哪些?空(void)元素有哪些? <a class="header-anchor" href="#行内元素有哪些-块级元素有哪些-空-void-元素有哪些" aria-label="Permalink to &quot;行内元素有哪些?块级元素有哪些?空(void)元素有哪些?&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>行内元素:span img input......</span></span>
<span class="line"><span>块级元素:div footer header section p h1-h6...</span></span>
<span class="line"><span>空元素:br hr...</span></span></code></pre></div><p>元素之间的转换问题</p><p>通过 display 进行转换</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>display:inline: 把某元素转化成行内元素 ==&gt;不独占一行, 不能设置宽高</span></span>
<span class="line"><span>display:inline-block: 把某元素转化成行内块元素 ==&gt;不独占一行, 可以设置宽高</span></span>
<span class="line"><span>display:block: 把某元素转化成块元素 ==&gt;独占一行, 可以设置宽高</span></span></code></pre></div><h3 id="页面导入样式时-使用-link-和-import-有什么区别" tabindex="-1">页面导入样式时, 使用 link 和@import 有什么区别? <a class="header-anchor" href="#页面导入样式时-使用-link-和-import-有什么区别" aria-label="Permalink to &quot;页面导入样式时, 使用 link 和@import 有什么区别?&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>区别一: link 现有, 后有@import, 所以在兼容性上 link 比@import 好</span></span>
<span class="line"><span>区别二: link 和@import 加载顺序有区别。浏览器先加载标签 link, 后加载@import</span></span></code></pre></div><h3 id="title-和-h1-的区别-b-和-strong-的区别-i-和-em-的区别" tabindex="-1">title 和 h1 的区别?b 和 strong 的区别?i 和 em 的区别? <a class="header-anchor" href="#title-和-h1-的区别-b-和-strong-的区别-i-和-em-的区别" aria-label="Permalink to &quot;title 和 h1 的区别?b 和 strong 的区别?i 和 em 的区别?&quot;">​</a></h3><p>title 和 h1 的区别:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>定义:</span></span>
<span class="line"><span>title:title 概括了网站信息, 可以告诉搜索引擎或者用户关于这个网站的内容主题是什么</span></span>
<span class="line"><span>h1:文章主题内容, 告诉蜘蛛我们的网站内容最主要是什么</span></span>
<span class="line"><span>区别:</span></span>
<span class="line"><span>title 是显示在网页标题上, h1 显示在网页内容上</span></span>
<span class="line"><span>title 比 h1 更加的重要(title&gt;h1) ==&gt;SEO 的了解</span></span>
<span class="line"><span>场景:</span></span>
<span class="line"><span>网站的 logo 都是用 h1 标签包裹的</span></span></code></pre></div><p>b 和 strong 的区别:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>定义:</span></span>
<span class="line"><span>b:是一个实体标签, 用来给文字加粗</span></span>
<span class="line"><span>strong:逻辑标签, 用来加强字符语气的</span></span>
<span class="line"><span>区别:</span></span>
<span class="line"><span>b 标签只有加粗的样式, 没有实际的含义</span></span>
<span class="line"><span>strong 标签表示标签内字符比较重要, 用于强调的。</span></span>
<span class="line"><span>题外话:</span></span>
<span class="line"><span>为了符合 CSS3 的规范,b 标签尽量少用,改用 strong 就可以了。</span></span></code></pre></div><p>i 和 em 的区别</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>定义:</span></span>
<span class="line"><span>i:是一个实体标签, 用来作文字倾斜的</span></span>
<span class="line"><span>em:是一个逻辑标签, 用来强调文字内容的</span></span>
<span class="line"><span>区别:</span></span>
<span class="line"><span>i 只是一个倾斜的标签, 没有实际含义。</span></span>
<span class="line"><span>em 表示标签内字符重要, 用于强调的。</span></span>
<span class="line"><span>场景:</span></span>
<span class="line"><span>i 更多地用在字体图标, em 更多地用在术语(生物、医药)上</span></span></code></pre></div><h3 id="img-标签的-title-和-alt-有什么区别" tabindex="-1">img 标签的 title 和 alt 有什么区别? <a class="header-anchor" href="#img-标签的-title-和-alt-有什么区别" aria-label="Permalink to &quot;img 标签的 title 和 alt 有什么区别?&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>区别一</span></span>
<span class="line"><span>title: 鼠标移入到图片显示的值</span></span>
<span class="line"><span>alt: 图片无法加载时显示的值</span></span>
<span class="line"><span>区别二</span></span>
<span class="line"><span>在 SEO 的层面上, 蜘蛛抓取不到图片的内容, 所以前端在写 img 标签的时候,为了增加 SEO 效果要加入 alt 属性来描述这张图是什么内容或者关键词</span></span></code></pre></div><h3 id="png、jpg、gif-这些图片格式解释一下-分别什么时候用" tabindex="-1">png、jpg、gif 这些图片格式解释一下, 分别什么时候用? <a class="header-anchor" href="#png、jpg、gif-这些图片格式解释一下-分别什么时候用" aria-label="Permalink to &quot;png、jpg、gif 这些图片格式解释一下, 分别什么时候用?&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>png: 无损压缩, 尺寸体积要比 jpg/jpeg 的大。适合做小图标</span></span>
<span class="line"><span>jpg: 采用压缩算法, 有一点失真, 比 png 体积小。适合做 banner 等中大图片</span></span>
<span class="line"><span>gif: 一般是做动图的。</span></span>
<span class="line"><span>webp: 同时支持有损和无损压缩, 相同质量的图片, webp 具有更新的体积。兼容性不是特别好</span></span></code></pre></div><h3 id="什么是语义化标签" tabindex="-1">什么是语义化标签 <a class="header-anchor" href="#什么是语义化标签" aria-label="Permalink to &quot;什么是语义化标签&quot;">​</a></h3><p>header、footer、section 等</p><ol><li>易读性和维护性更好</li><li>SEO 成分会更好, 蜘蛛抓取更好</li><li>IE8 不兼容 HTML5 标签的.解决:可以通过 html5shiv.js 去处理</li></ol><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3>`,23),l=[i];function t(c,o,h,d,r,g){return n(),s("div",null,l)}const m=a(e,[["render",t]]);export{u as __pageData,m as default};
