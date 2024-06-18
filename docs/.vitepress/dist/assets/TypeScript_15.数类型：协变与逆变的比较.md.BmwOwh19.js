import{_ as s,c as i,o as a,a7 as t}from"./chunks/framework.BvW0rtPM.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"TypeScript/15.数类型：协变与逆变的比较.md","filePath":"TypeScript/15.数类型：协变与逆变的比较.md"}'),n={name:"TypeScript/15.数类型：协变与逆变的比较.md"},p=t(`<p>在 <a href="https://juejin.cn/book/7086408430491172901/section/7100488161263878177" target="_blank" rel="noreferrer">全面梳理类型系统的层级关系：从 Top Type 到 Bottom Type</a> 一节中，我们分析了 TypeScript 类型系统自下而上的层级，比较了原始类型、联合类型、对象类型、内置类型等的层级关系。但是，如果你使用过 TypeScript 很容易就会想到，我们好像漏了一点什么：<strong>函数类型有类型层级吗？</strong> 如果有，它的类型层级又是怎么样的？比如，下面这几个函数类型之间的兼容性如何？</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FooFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BarFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;literal types&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BazFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">input</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>没什么头绪对吧？这一节，我们就来对比函数类型的类型层级，以及隐藏在这一比较幕后的理论——<strong>协变与逆变</strong>。这一篇文章中的概念我曾在此前的掘金文章中分享过，但大部分读者表示内容过于晦涩难懂，因此在这一节中我会换更接地气的方式来讲解。首先，我们通过逐步推导比较函数的类型层级，引出协变与逆变的概念，然后了解在 TypeScript 的内部定义是如何使用协变与逆变的，以及如何通过额外的配置启用这一检查。</p><blockquote><p>本节代码见：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2FTypeScript-Tiny-Book%2Ftree%2Fmain%2Fpackages%2F12-covariance-and-contravariance" target="_blank" rel="noreferrer">Covariance and Contravariance</a></p></blockquote><h2 id="如何比较函数的签名类型" tabindex="-1">如何比较函数的签名类型？ <a class="header-anchor" href="#如何比较函数的签名类型" aria-label="Permalink to &quot;如何比较函数的签名类型？&quot;">​</a></h2><p>首先要明确的是，我们不会使用函数类型去和其他类型（如对象类型）比较，因为这并没有意义，本文中只会对两个函数类型进行比较。</p><p>来看示例，给出三个具有层级关系的类，分别代表动物、狗、柯基。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Animal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  asPet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Dog</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Animal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  bark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Corgi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  cute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>对于一个接受 Dog 类型并返回 Dog 类型的函数，我们可以这样表示：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DogFactory</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>在本文中，我们进一步将其简化为：<code>Dog -&gt; Dog</code> 的表达形式。</p><p>对于函数类型比较，实际上我们要比较的即是参数类型与返回值类型（也只能是这俩位置的类型）。对于 Animal、Dog、Corgi 这三个类，如果将它们分别可重复地放置在参数类型与返回值类型处（相当于排列组合），就可以得到以下这些函数签名类型：</p><blockquote><p>这里的结果中不包括 <code>Dog -&gt; Dog</code>，因为我们要用它作为基础来<strong>被</strong>比较</p></blockquote><ul><li><code>Animal -&gt; Animal</code></li><li><code>Animal -&gt; Dog</code></li><li><code>Animal -&gt; Corgi</code></li><li><code>Dog -&gt; Dog</code></li><li><code>Dog -&gt; Animal</code></li><li><code>Dog -&gt; Corgi</code></li><li><code>Corgi -&gt; Animal</code></li><li><code>Corgi -&gt; Dog</code></li><li><code>Corgi -&gt; Corgi</code></li></ul><p>直接比较完整的函数类型并不符合我们的思维直觉，因此我们需要引入一个辅助函数：它接收一个 <code>Dog -&gt; Dog</code> 类型的参数：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> transformDogAndBark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dogFactory</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DogFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dog</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dogFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  dog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>对于函数参数，实际上类似于我们在类型系统层级时讲到的，<strong>如果一个值能够被赋值给某个类型的变量，那么可以认为这个值的类型为此变量类型的子类型</strong>。</p><p>如一个简单接受 Dog 类型参数的函数：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> makeDogBark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dog</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  dog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>它在调用时只可能接受 Dog 类型或 Dog 类型的子类型，而不能接受 Dog 类型的父类型：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 没问题</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">makeDogBark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Corgi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 不行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">makeDogBark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Animal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span></code></pre></div><p>相对严谨地说，这是因为派生类（即子类）会保留基类的属性与方法，因此说其与基类兼容，但基类并不能未卜先知的拥有子类的方法。相对欢脱地说，因为我们要让这只狗汪汪两声，柯基、柴犬、德牧都会，但如果你传个牛进来，这我就很难办了啊。</p><blockquote><p><strong>里氏替换原则：子类可以扩展父类的功能，但不能改变父类原有的功能，子类型（subtype）必须能够替换掉他们的基类型（base type）。</strong></p></blockquote><p>回到这个函数，这个函数会实例化一只狗狗，并传入 Factory（就像宠物美容），然后让它叫唤两声。实际上，这个函数同时约束了此类型的参数与返回值。首先，我只会传入一只正常的狗狗，但它不一定是什么品种。其次，你返回的必须也是一只狗狗，我并不在意它是什么品种。</p><p>对于这两条约束依次进行检查：</p><ul><li>对于 <code>Animal/Dog/Corgi -&gt; Animal</code> 类型，无论它的参数类型是什么，它的返回值类型都是不满足条件的。因为它返回的不一定是合法的狗狗，即我们说它不是 <code>Dog -&gt; Dog</code> 的子类型。</li><li>对于 <code>Corgi -&gt; Corgi</code> 与 <code>Corgi -&gt; Dog</code>，其返回值满足了条件，但是参数类型又不满足了。这两个类型需要接受 Corgi 类型，可能内部需要它腿短的这个特性。但我们可没说一定会传入柯基，如果我们传个德牧，程序可能就崩溃了。</li><li>对于 <code>Dog -&gt; Corgi</code>、<code>Animal -&gt; Corgi</code>、<code>Animal -&gt; Dog</code>，首先它们的参数类型正确的满足了约束，能接受一只狗狗。其次，它们的返回值类型也一定会能汪汪汪。</li></ul><p>而实际上，如果我们去掉了包含 <code>Dog</code> 类型的例子，会发现只剩下 <code>Animal -&gt; Corgi</code> 了，也即是说，<code>(Animal → Corgi) ≼ (Dog → Dog)</code> 成立（<code>A ≼ B</code> 意为 A 为 B 的子类型）。</p><p>观察以上排除方式的结论：</p><ul><li>参数类型<strong>允许</strong>为 Dog 的父类型，<strong>不允许</strong>为 Dog 的子类型。</li><li>返回值类型<strong>允许</strong>为 Dog 的子类型，<strong>不允许</strong>为 Dog 的父类型。</li></ul><p>你是否 get 到了什么？这里用来比较的两个函数类型，其实就是把具有父子关系的类型放置在参数位置以及返回值位置上，<strong>最终函数类型的关系直接取决于类型的父子关系。</strong> “取决于”也就意味着，其中有规律可循。那么这个时候，我们就可以引入协变与逆变的概念了。</p><h2 id="协变与逆变" tabindex="-1">协变与逆变 <a class="header-anchor" href="#协变与逆变" aria-label="Permalink to &quot;协变与逆变&quot;">​</a></h2><p>我们上一节得到的结论是，考虑 <code>Corgi ≼ Dog ≼ Animal</code>，当有函数类型 <code>Dog -&gt; Dog</code>，仅有 <code>(Animal → Corgi) ≼ (Dog → Dog)</code> 成立（即能被视作此函数的子类型，）。这里的参数类型与返回值类型实际上可以各自独立出来看：</p><p>考虑 <code>Corgi ≼ Dog</code>，假设我们对其进行返回值类型的函数签名类型包装，则有 <code>(T → Corgi) ≼ (T → Dog)</code>，也即是说，在我需要狗狗的地方，柯基都是可用的。即不考虑参数类型的情况，在包装为函数签名的返回值类型后，其子类型层级关系保持一致。</p><p>考虑 <code>Dog ≼ Animal</code>，如果换成参数类型的函数签名类型包装，则有 <code>(Animal -&gt; T) ≼ (Dog -&gt; T)</code>，也即是说，在我需要条件满足是动物时，狗狗都是可用的。即不考虑返回值类型的情况，在包装为函数签名的参数类型后，其子类型层级关系发生了逆转。</p><p>实际上，这就是 TypeScript 中的<strong>协变（</strong> <em><strong>covariance</strong></em> <strong>）</strong> 与<strong>逆变（</strong> <em><strong>contravariance</strong></em> <strong>）</strong> 在函数签名类型中的表现形式。这两个单词最初来自于几何学领域中：<strong>随着某一个量的变化，随之变化一致的即称为协变，而变化相反的即称为逆变。</strong></p><p>用 TypeScript 的思路进行转换，即如果有 <code>A ≼ B</code> ，协变意味着 <code>Wrapper&lt;A&gt; ≼ Wrapper&lt;B&gt;</code>，而逆变意味着 <code>Wrapper&lt;B&gt; ≼ Wrapper&lt;A&gt;</code>。</p><p>而在这里的示例中，<strong>变化（Wrapper）即指从单个类型到函数类型的包装过程</strong>，我们可以使用工具类型来实现独立的包装类型（独立指对参数类型与返回值类型）：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AsFuncArgType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">arg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AsFuncReturnType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">arg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>再使用这两个包装类型演示我们上面的例子：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1 成立：(T -&gt; Corgi) ≼ (T -&gt; Dog)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CheckReturnType</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AsFuncReturnType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Corgi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AsFuncReturnType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2 不成立：(Dog -&gt; T) ≼ (Animal -&gt; T)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CheckArgType</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AsFuncArgType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AsFuncArgType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Animal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>进行一个总结：<strong>函数类型的参数类型使用子类型逆变的方式确定是否成立，而返回值类型使用子类型协变的方式确定</strong>。</p><p>学习了函数类型的比较以及协变逆变的知识以后，你已经了解了如何通过“公式”来确定函数类型之间的兼容性关系，但实际上，基于协变逆变地检查并不是始终启用的（毕竟 TypeScript 在严格检查全关与全开的情况下，简直像是两门语言），我们需要通过配置来开启。</p><h2 id="tsconfig-中的-strictfunctiontypes" tabindex="-1">TSConfig 中的 StrictFunctionTypes <a class="header-anchor" href="#tsconfig-中的-strictfunctiontypes" aria-label="Permalink to &quot;TSConfig 中的 StrictFunctionTypes&quot;">​</a></h2><p>如果你曾经翻过 tsconfig 配置，你可能会注意到 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Ftsconfig%23strictFunctionTypes" target="_blank" rel="noreferrer">strictFunctionTypes</a> 这一项配置，但它在文档中的描述其实相对简略了些：<strong>在比较两个函数类型是否兼容时，将对函数参数进行更严格的检查</strong>（<em>When enabled, this flag causes functions parameters to be checked more correctly</em>），而实际上，这里的更严格指的即是 <strong>对函数参数类型启用逆变检查</strong>，很自然的我们会产生一些疑惑：</p><ul><li>如果启用了这个配置才是逆变检查，那么原来是什么样的？</li><li>在实际场景中的逆变检查又是什么样的？</li></ul><p>还是以我们的三个类为例，首先是一个函数以及两个函数类型签名：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dog</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  dog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CorgiFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">input</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Corgi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AnimalFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">input</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Animal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>我们通过赋值的方式来实现对函数类型的比较：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> func1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CorgiFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fn;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> func2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AnimalFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fn;</span></span></code></pre></div><blockquote><p>还记得吗？如果赋值成立，说明 fn 的类型是 <code>CorgiFunc</code> / <code>AnimalFunc</code> 的子类型</p></blockquote><p>这两个赋值实际上等价于：</p><ul><li><code>(Dog -&gt; T) ≼ (Corgi -&gt; T)</code></li><li><code>(Dog -&gt; T) ≼ (Animal -&gt; T)</code></li></ul><p>结合上面所学，我们很明显能够发现第二种应当是不成立的。但在禁用了 <code>strictFunctionTypes</code> 的情况下，TypeScript 并不会抛出错误。这是因为，在默认情况下，对函数参数的检查采用 <strong>双变（</strong> <em><strong>bivariant</strong></em> <strong>）</strong> ，<strong>即逆变与协变都被认为是可接受的</strong>。</p><p>在 TypeScript ESLint 中，有这么一条规则：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Fblob%2Fmain%2Fpackages%2Feslint-plugin%2Fdocs%2Frules%2Fmethod-signature-style.md" target="_blank" rel="noreferrer">method-signature-style</a>，它的意图是约束在接口中声明方法时，需要使用 <strong>property</strong> 而非 <strong>method</strong> 形式：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// method 声明</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">arg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// property 声明</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  func</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">arg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>进行如此约束的原因即，对于 property 声明，才能在开启严格函数类型检查的情况下享受到<strong>基于逆变的参数类型检查</strong>。</p><p>对于 method 声明（以及构造函数声明），其无法享受到这一更严格的检查的原因则是对于如 Array 这样的内置定义，我们希望它的函数方法就是以协变的方式进行检查，举个栗子，<code>Dog[] ≼ Animal[]</code> 是否成立？</p><ul><li>我们并不能简单的比较 Dog 与 Animal，而是要将它们视为两个完整的类型比较，即 <code>Dog[]</code> 的每一个成员（属性、方法）是否都能对应的赋值给 <code>Animal[]</code> ？</li><li><code>Dog[].push ≼ Animal[].push</code> 是否成立？</li><li>由 push 方法的类型签名进一步推导，<code>Dog -&gt; void ≼ Animal -&gt; void</code> 是否成立？</li><li><code>Dog -&gt; void ≼ Animal -&gt; void</code>在逆变的情况下意味着 <code>Animal ≼ Dog</code>，而这很明显是不对的！</li><li>简单来说， <code>Dog -&gt; void ≼ Animal -&gt; void</code> 是否成立本身就为 <code>Dog[] ≼ Animal[]</code> 提供了一个前提答案。</li></ul><p>因此，如果 TypeScript 在此时仍然强制使用参数逆变的规则进行检查，那么 <code>Dog[] ≼ Animal[]</code> 就无法成立，也就意味着无法将 Dog 赋值给 Animal，这不就前后矛盾了吗？所以在大部分情况下，我们确实希望方法参数类型的检查可以是<strong>双变</strong>的，这也是为什么它们的声明中类型结构使用 method 方式来声明：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">items</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[])</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="总结与预告" tabindex="-1">总结与预告 <a class="header-anchor" href="#总结与预告" aria-label="Permalink to &quot;总结与预告&quot;">​</a></h2><p>在这一节，我们学习了 TypeScript 函数类型的兼容性比较，这应该带给了你一些新的启发：原来不只是原始类型、联合类型、对象类型等可以比较，函数类型之间同样是能够比较的。而对我们开头提出的，<strong>如何对两个函数类型进行兼容性比较</strong>这一问题，我想你也有了答案：比较它们的参数类型是否是反向的父子类型关系，返回值是否是正向的父子类型关系。</p><p>如果用本章学到的新知识来说，其实就是判断<strong>参数类型是否遵循类型逆变，返回值类型是否遵循类型协变</strong>。我们可以通过 TypeScript ESLint 的规则以及 <code>strictFunctionTypes</code> 配置，来为 interface 内的函数声明启用严格的检查模式。如果你的项目内已经配置了 TypeScript ESLint，不妨添加上 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Fblob%2Fmain%2Fpackages%2Feslint-plugin%2Fdocs%2Frules%2Fmethod-signature-style.md" target="_blank" rel="noreferrer">method-signature-style</a> 这条规则来让你的代码质量更上一层楼。</p><p>除了对自定义函数类型地比较，我们也了解了对于部分 TypeScript 内置的方法，会通过显式的 method 声明方式来确保在调用时，对参数类型检查采用<strong>双变</strong>而非<strong>逆变。</strong></p><p>到这里，你已经了解了 TypeScript 类型系统中绝大部分的知识，我想在未来你再遇到奇怪的类型报错时，应该再也不会憋着气打开 StackOverflow 搜索，而是微微一笑胸有成竹地轻松解决，所凭借的自然就是我们对类型系统的深刻掌握。</p><p>类型工具、类型系统、类型编程这三辆马车我们已经解决了俩，在下一节，我们就将开始进入类型编程的世界里，此前我们所学的所有类型工具与类型系统知识将轮番上阵接受考验，而你也将从看见复杂工具类型就头疼，变成看见类型就两眼放光的 TypeScript 高高手。</p><h2 id="扩展阅读" tabindex="-1">扩展阅读 <a class="header-anchor" href="#扩展阅读" aria-label="Permalink to &quot;扩展阅读&quot;">​</a></h2><h3 id="联合类型与兄弟类型下的比较" tabindex="-1">联合类型与兄弟类型下的比较 <a class="header-anchor" href="#联合类型与兄弟类型下的比较" aria-label="Permalink to &quot;联合类型与兄弟类型下的比较&quot;">​</a></h3><p>在上面我们只关注了显式的父子类型关系，实际上在类型层级中还有隐式的父子类型关系（联合类型）以及兄弟类型（同一基类的两个派生类）。对于隐式的父子类型其可以仍然沿用显式的父子类型协变与逆变判断，但对于兄弟类型，比如 Dog 与 Cat，需要注意的是它们根本就<strong>不满足逆变与协变的发生条件（父子类型）</strong>，因此 <code>(Cat -&gt; void) ≼ (Dog -&gt; void)</code> （或者反过来）无论在严格检查与默认情况下均不成立。</p><h3 id="非函数签名包装类型的变换" tabindex="-1">非函数签名包装类型的变换 <a class="header-anchor" href="#非函数签名包装类型的变换" aria-label="Permalink to &quot;非函数签名包装类型的变换&quot;">​</a></h3><p>我们在最开始一直以函数体作为包装类型来作为协变与逆变的转变前提，后面虽然提到了使用数组的作为包装类型（<code>Dog[]</code>）的，但只是一笔带过，重点还是在函数体方面。现在，如果我们就是就是要考虑类似数组这种包装类型呢？比如直接一个简单的笼子 Cage ？</p><p>先不考虑 Cage 内部的实现，只知道它同时只能放一个物种的动物，<code>Cage&lt;Dog&gt;</code> 能被作为 <code>Cage&lt;Animal&gt;</code> 的子类型吗？对于这一类型的比较，我们可以直接用实际场景来代入：</p><ul><li>假设我需要一笼动物，但并不会对它们进行除了读以外的操作，那么你给我一笼狗我也是没问题的，但你不能给我一笼植物。也就意味着，此时 List 是 readonly 的，而 <code>Cage&lt;Dog&gt; ≼ Cage&lt;Animal&gt;</code> 成立。<strong>即在不可变的 Wrapper 中，我们允许其遵循协变。</strong></li><li>假设我需要一笼动物，并且会在其中新增其他物种，比如兔子啊王八，这个时候你给我一笼兔子就不行了，因为这个笼子只能放狗，放兔子进行可能会变异（？）。也就意味着，此时 List 是 writable 的，而 <code>Cage&lt;Dog&gt;</code> <code>Cage&lt;Rabit&gt;</code> <code>Cage&lt;Turtle&gt;</code> 彼此之间是互斥的，我们称为 <strong>不变（*invariant*）</strong>，用来放狗的笼子绝不能用来放兔子，即无法进行分配。</li><li>如果我们再修改下规则，现在一个笼子可以放任意物种的动物，狗和兔子可以放一个笼子里，这个时候任意的笼子都可以放任意的物种，放狗的可以放兔子，放兔子的也可以放狗，即可以互相分配，我们称之为<strong>双变（*Bivariant*）</strong>。</li></ul><p>也就是说，包装类型的表现与我们实际需要的效果是紧密关联的。</p>`,74),l=[p];function h(e,k,r,g,d,o){return a(),i("div",null,l)}const E=s(n,[["render",h]]);export{y as __pageData,E as default};
