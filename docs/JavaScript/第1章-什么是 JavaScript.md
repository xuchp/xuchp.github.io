# 什么是 JavaScript

### JavaScript 是什么

虽然 JavaScript 和 ECMAScript 基本上是同义词, 但是 JavaScript 远远不限于 ECMA-262 所定义的那样

完整的 JavaScript 包含以下几个部分

1. 核心(ECMAScript)：有 ECMA-262 定义并提供核心功能
2. 文档对象模型(DOM)：提供与网页内容交互的方法和接口
3. 浏览器对象模型(BOM)：提供和浏览器交互的方法和接口

### JavaScript 实现

#### ECMAScript

在基本层面上, ECMA-262 描述 JavaScript 包含如下几个部分

语法、类型、语句、关键字、保留字、操作符、全局对象

#### DOM

文档对象模型(Document Object Model)是一个应用编程接口(API), 用于在 HTML 中使用扩展的 XML。

##### DOM 级别

DOMLevel1 由 DOM Core 和 DOM HTML 组成。 前者提供了一中映射 XML 文档，从而方便访问和操作文档任意部分的方式；后者扩展了前者并增加了特定于 HTML 的对象和方法。

DOMLevel2 新增了以下模块

1. DOM 视图：描述追踪文档不同视图（如应用 CSS 样式前后的文档）的接口
2. DOM 事件：描述事件及事件处理的接口
3. DOM 样式：描述处理元素 CSS 样式的接口
4. DOM 遍历和范围：描述遍历和操作 DOM 树的接口

DOMLevel3 进一步扩展了 DOM，增加了统一的方式加载和保存文档的方法（包含在一个叫 DOM Load and Save 的新模块中），还有验证文档的方法（DOM Validation）

DOMLevel4 新增的内容包括替代 Mutation Events 的 Mutation Observes

#### BOM

IE3 和 Netscape Navigator 3 提供的浏览器对象模型（BOM）API，用于支持访问和操作浏览器的窗口。

BOM 主要针对浏览器窗口和子窗口（frame），不过人们通常会把任何特定于浏览器的扩展都归在 BOM 的范畴内。比如

1. 弹出新浏览器窗口的能力
2. 移动、缩放和关闭浏览器窗口的能力
3. navigator 对象，提供关于浏览器的详尽信息
4. location 对象，提供浏览器加载页面的详尽信息
5. screen 对象，提供关于用户屏幕分辨率的详尽信息
6. performance 对象，提供浏览器占用内存、导航行为和时间统计的详尽信息
7. 对 cookie 的支持
8. 对其他自定义对象，如 XMLHttpRequest 和 IE 的 ActiveXObject

### JavaScript 的不同版本
