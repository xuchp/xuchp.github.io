# HTML 中的 JavaScript

### \<Script\> 元素

script 元素有下列 8 个属性

1. async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效
2. charset：可选。使用 src 属性指定的代码字符集，这个属性很少使用，因为大多数浏览器不在乎它的值。
3. crossorigin：可选。配置相关请求的 CROS（跨域资源共享）设置。默认不适用 CROS。`crossorigin="annoymous"`配置文件请求不必设置凭据标志。`crossorigin="use-credentials"`设置凭据标志，意味着出站请求会包含凭据。
4. defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在 IE7 及更早版本中，对行内脚本也可以指定这个属性。
5. integrity：可选。允许比对接收到的资源和指定的加密签名已验证子资源完整性（`SRI，Subresource Integrity`）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（`CDN，Content Delivery Network`）不会提供恶意内容。
6. language：废弃。最初用于表示代码块中的脚本语言（如`"JavaScript"`、`"JavaScript1.2"`或`"VBScript"`），大多数浏览器都会忽略这个值，不应该再使用它。
7. src：可选。表示包含要指向的代码的外部文件。
8. type：可选。代替 `language`，表示代码中脚本语言的内容类型（也成 MIME 类型）。按照惯例，这个值始终都是`"text/javascript"`，尽管 `"text/javascript"` 和 `"text/ecmascript"` 都已经废弃了。JavaScript 文件的 MIME 类型通常是 `"application/x-javascript"`，不过给 type 属性这个值有可能导致脚本被忽略。在非 IE 浏览器中有效的其他值还有 `"application/javascript"` 和`"application/ecmascript"`。如果这个值是 `module`，则代码会被当成 ES6 模块，而且只有这时候代码中才能出现 `import` 和 `export` 关键字

使用了 `src`属性的\<script\>元素不应该再在\<script\>和\</script\>标签中包含其他 JavaScript 代码。如果两者都提供的话，则浏览器只会下载并执行脚本文件，从而忽略行内代码。

