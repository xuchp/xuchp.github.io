# CSS

### 介绍一下 CSS 的盒子模型

```
CSS 的盒子模型有哪些:标准盒子模型、IE 盒子模型
CSS 盒子模型的区别
	标准盒子模型:	margin、border、padding、content
	IE 盒子模型: margin、content(border + padding + content)

通过 css 如何转换盒子模型:
box-sizing: content-box; // 标准盒子模型
box-sizing: border-box; // IE 盒子模型
```

### line-height 和 height 的区别?

```
line-height: 是每一行文字的高, 如果文字换行,则整个盒子的高度会增大(行数*行高)
height: 是一个死值, 就是这个盒子的高度。
```

### CSS 选字符有哪些？哪些属性可以继承？

```
CSS 选择符:
通配(*)
id 选择器(#)
类选择器(.)
标签选择器(div p h1)
相邻选择器(+)
后代(子元素)选择器(ul li)
子元素选择器(>)
属性选择器(a[href])

CSS 属性哪些可以继承?
	文字系列: font-size、color、line-height、text-align、background......
CSS不可继承属性:border、margin、padding...

```

### CSS 优先算法如何计算？

```
优先级比较:!important > 内联样式 > id > class > 标签 > 通配
```

```
CSS 权重计算:
第一: 内联样式 style 	权重值:1000
第二: id 选择器 			 权重值:0100
第三:类选择器 				权重:0010
第四:标签&伪元素选择器  权重:0001
第五:通配 > + :				权重:0000(后者覆盖前者 )
```

### 用 CSS 画一个三角形?

用边框画(border)

```html
<html>
  <body>
    <div></div>
  </body>
</html>
<style>
  div {
    width: 0;
    height: 0;
    border-top: 10px solid #ccc;
    border-left: 10px solid #ccc;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
</style>
```

### 一个盒子不给宽度和高度如何实现水平垂直居中?

```html
<div class="container">
  <div class="main">main</div>
</div>
```

方式一:

```css
.container {
  width: 300px;
  height: 300px;
  border: 5px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  background: red;
}
```

方式二

```css
.container {
  position: relative;
  width: 300px;
  height: 300px;
  border: 5px solid #ccc;
}
.main {
  position: absolute;
  background: red;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

### display 有哪些值？说说他们的作用？

| 值           | 描述                                               |
| ------------ | -------------------------------------------------- |
| none         | 此元素不会被显示                                   |
| block        | 此元素将显示为块元素, 此元素前后会带有换行符       |
| inline       | 默认, 此元素会被显示为内联元素, 元素前后没有换行符 |
| inline-block | 行内块元素(CSS2.1 新增)                            |
| list-item    | 此元素会作为列表展示                               |

https://www.w3school.com.cn/cssref/pr_class_display.asp

### 对 BFC(块级格式化上下文:Block Formatting Context)的理解？

BFC 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

1. 了解 BFC： 块级格式化上下文
2. BFC 的原则：一个元素具有 BFC，那么内部元素再怎么弄，都不会影响到外面的元素
3. 如何触发 BFC：
   - float 的值非 none
   - overflow 的值非 visible
   - display 的值为 inline-block、table-cell......
   - position 的值 absolute、fixed

### 清除浮动有哪些方式?

方式一：触发 BFC

```
overflow: hidden
```

方式二：创建一个盒子，添加样式

```css
div {
  clear: both;
}
```

方式三：创建一个虚拟标签 after（最常用）

```css
div:after {
  content: '';
  display: block;
  clear: both;
}
```

### 在网页中应该使用奇数还是偶数的字体大小？为什么呢？

偶数。让文字在浏览器上表现的更好看

> 说明：UI 给前端设计图一般都是偶数，这样不管是布局也好，转换 px 也好，方便一点

### position 有几种定位？分别是根据什么定位的？

- static：默认值，没有定位
- fixed：固定定位，相对于浏览器窗口进行定位
- relative：相对定位，相对于自身定位，不脱离文档流
- absolute：绝对定位，相对于第一个有 relative 的父元素定位，脱离文档流

relative 和 absolute 的区别

> 1. relative 不脱离文档流，absolute 脱离文档流
> 2. relative 是相对于自身，absolute 是相对于第一个有 relative 的父元素定位的
> 3. relative 如果有 left、right、top、bottom，最终只有 left 和 top 生效；而 absolute 四个都可以生效

### 写一个左中右布局占满屏幕，其中左右两块固定 200px，中间自适应宽，要求先加载中间块，请写出结构及样式。

双飞翼布局

```html
<html>
  <body>
    <div class="container">
      <div class="c">
        <div class="main">中</div>
      </div>
      <div class="l">左</div>
      <div class="r">右</div>
    </div>
  </body>
</html>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
  }
  .container > div {
    float: left;
  }
  .l {
    width: 200px;
    height: 100vh;
    background: red;
    margin-left: -100%;
  }
  .c {
    width: 100%;
    height: 100vh;
    background: pink;
  }
  .main {
    padding: 0 200px;
  }
  .r {
    width: 200px;
    height: 100vh;
    background: blue;
    margin-left: -200px;
  }
</style>
```

### 什么是 CSS reset？

reset.css 是一个 css 文件，用来重置 css 样式。

Normalize.css 为了增强跨浏览器渲染的一致性，我们使用了 normalize.css，这是由 Nicolas Gallagher 和 Jonathan Neal 维护的一个 css 重置样式库。

### css sprite 是什么？有什么优缺点？

1. 是什么

   把多个小图标合并成一张大图片，又称精灵图

2. 优缺点

   优点：减少了 http 请求的次数，提升了性能

   缺点：维护比较差（例如图片位置进行调整或者内容宽高修改，都会造成维护问题）

### display:none 和 visibility:hidden 的区别？

| 区别             | display:none | visibility:hidden        |
| ---------------- | ------------ | ------------------------ |
| 占用位置区别     | 是不占位置的 | 虽然隐藏了，但是占用位置 |
| 重绘和回流的问题 | 重绘并回流   | 只重绘不回流             |

> 产生回流一定会造成重绘，但是重绘不一定会造成回流。
>
> 产生回流的情况：改变元素的位置（left、top...）、显示隐藏元素
>
> 产生重绘的情况：样式改变、换皮肤

### opacity 和 rgba 的区别？

共同性：实现透明效果

| 区别       | opacity                                         | rgba                                                                                        |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 取值范围   | 取值范围 0-1 之间，0 表示完全透明，1 表示不透明 | R 表示红色，G 表示绿色，B 表示蓝色，取值可以在正整数或者百分数。A 表示透明度，取值 0-1 之间 |
| 继承的区别 | 会继承父元素的 opacity                          | 设置的元素的后代元素不会继承不透明属性                                                      |

### ::before 和 :after 中双冒号和单冒号有什么区别?解释一下这两个伪元素的作用?

1. 区别

   一个冒号(:)是伪类, 两个冒号(::)是伪元素	====>是为了做区分

2. 是什么?作用

   before 在元素之前、 after 在元素之后

   作用: 清除浮动、样式布局上也有作用

### 怎么让 chrome 支持小于 12px 的文字

Chorme 浏览器默认字体大小是 16px, 每个浏览器默认字体大小不一定一样

解决办法:

```css
{
  --webkit-transform: scale(0.75)
}
```

### rem 和 em 的 区别

相对于 font-size

em 是针对于父元素的 font-size

rem 是针对于根(html)元素的 font-size

### webkit 表单输入框 placeholder 的颜色值能改变吗

```css
input::-webkit-input-placeholder{
  color: red
}
```

### 响应式

1. 是什么?

   一个 URL 可以响应多端

2. 语法结构

   ```css
   @media only screen and (max-width: 1000px){
     
   }
   ```

   only: 可以排除不支持媒体查询的浏览器

   screen: 设备类型

   max-width | max-height

   min-width | min-height

3. 响应式图片[性能优化]

   ```html
   <picture>
     <source srcset="1.jpg" meida='(max-width: 1000px)'>
     <source srcset="2.jpg" media='(max-width: 700px)'>
     <img srcset="3.jpg"/>
   </picture>
   ```

### 布局方案

1. 什么情况下采用响应式布局?

   数据不是特别多, 用户量不是特别大, 纯展示类的项目适合响应式布局

   例如: 公司的官网, 专题页面

   特别追求性能的项目,不太适合响应式, 因为如果添加了很多的响应式, 会造成加载速度变慢

2. PC + 移动端应该做什么样的布局方案

   注意: 访问量还可以或者比较大, 例如淘宝网

   PC 端是一套,会加入一点点响应式

   移动端是一套, 会使用自适应的布局方式

3. PC 的设计图

   UI:1920

   笔记本电脑: 1280

   UI 图的宽度和电脑的宽度不对应,怎么办?

   1. 把 UI 图进行等比缩放, 缩放成和电脑一样的尺寸
   2. 换 1920 的电脑

4. 移动端的设计图

   宽度 750

   因为 750 设计图/2 就是 375, 正好是 iPhone6 的尺寸, 我们要把 iPhone6 的尺寸作为基准点
