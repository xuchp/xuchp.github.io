# JS

### 延迟加载 JS 有哪些方式？

延迟加载: async defer

例如`<script async type="text/javascript" src="*.js"/>`

defer: 等 HTML 全部解析完成, 才会指向 js 代码, 按顺序执行 js 脚本, 会阻塞

async: async 和 html 解析是同步的(一起的), 不是按顺次执行 js 脚本(谁先加载完谁先行)

### JS 数据类型有哪些？

基本类型: string、number、boolean、undefined、null、 symbol、bigint

引用类型: object

字符串和其他类型相加, 变成链接的形式

NaN 是一个数值类型, 但是不是一个具体的数字。

typeof null 结果是 object ; typeof undefined 结果是 undefined

### null 和 undefined 的区别

1. 作者在设计 js 时先设计的 null(原因: 最初设计 js 的时候借鉴了 java 语言）
2. null 会被隐式转化成 0, 很不容易发现错误
3. 现有 null 后有 undefined, 出来 undefined 就是为了填补之前的坑。

具体区别: null 是一个表示"无"的对象(空对象指针), 转为数值为 0; undefined 是一个表示“无”的原始值, 转为数值时为 NaN

### == 和 === 有什么不同

== : 比较的是值

string == number || boolean || number...都会隐式转换

通过 valueOf 转换(valueOf() 方法通常由 JavaScript 在后台自动调用, 并不显式地出现在代码中)

===: 除了比较值, 还比较类型

### JS 微任务和宏任务

1. js 是单线程的语言

2. js 代码执行流程: 同步执行完 => 事件循环

   同步执行完了, 才会执行事件循环的内容

   进入事件循环: 请求、定时器、事件......

3. 事件循环包含【宏任务、微任务】

   微任务: promise.then

   宏任务: setTimeout

   > 要执行宏任务的前提是清空了所有的微任务
   >
   > 流程: 同步 => 事件循环【微任务和宏任务】=> 微任务 => 宏任务 => 微任务...

### JS 作用域

1. 除了函数外, JS 没有块级作用域。
2. 作用域链: 内部可以访问外部的变量, 但是外部不能访问内部的变量
   注意: 如果内部有, 优先查找内部; 如果内部没有就查找外部的
3. 注意声明变量是用 var 还是没有写 (window.)
4. 注意: JS 有变量提升的(变量悬挂声明)
5. 优先级: 声明变量 > 声明普通函数 > 参数 > 变量提升

##### 面试的时候怎么看？

1. 本层作用域有没有此变量【注意变量提升】
2. 注意: JS 除了函数外没有块级作用域
3. 普通声明函数是不看写函数的顺序的

##### 考题 1

```js
function c() {
  var b = 1
  function a() {
    console.log(b) // undefined
    var b = 2
    console.log(b) // 2
  }
  a()
  console.log(b) // 1
}
c()
```

##### 考题二

```js
var name = 'a'
;(function () {
  if (typeof name == 'undefined') {
    var name = 'b'
    console.log('111' + name)
  } else {
    console.log('222' + name)
  }
})()
```

```bash
输出: 111b
```

##### 考题三

```js
function fun(a) {
  var a = 10
  function a() {}
  console.log(a)
}
fun(100)
```

```bas
输出:  10
```

### JS 对象

JS 对象注意点:

1. 对象是通过 new 操作符构建出来的, 所以对象之间不相等(除了引用外)

2. 对象注意: 引用类型

3. 对象的 key 都是字符串类型

4. 对象如何找属性|方法

   查找规则: 现在对象本身找 -> 构造函数中找 -> 对象原型中找 -> 构造函数原型中找 -> 对象上一层原型中找

###### 考题一

```js
console.log([1, 2, 3] === [1, 2, 3]) // false
```

###### 考题二

```js
var obj1 = {
  a: 'hello'
}
var obj2 = obj1
obj2.a = 'world'
console.log(obj1) // {a:'world'}
;(function () {
  console.log(a) // undefined
  var a = 1
})()
```

###### 考题三

```js
var a = {}
var b = {
  key: 'a'
}
var c = {
  key: 'c'
}
a[b] = '123'
a[c] = '456'
console.log(a[b]) // 456, 因为key 为对象时, 都会被转成[object Object]
```

### JS 作用域+this 指向+原型考题

###### 考题一

```js
function Foo() {
  getName = function () {
    console.log(1)
  }
  return this
}
Foo.getName = function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log(3)
}
var getName = function () {
  console.log(4)
}
function getName() {
  console.log(5)
}
Foo.getName() // 2
getName() // 4
Foo().getName() // 1
getName() // 1
new Foo().getName() // 3
```

输出结果

```js
2
4
1
1
3
```

###### 考题二

```js
var o = {
  a: 10,
  b: {
    fn: function () {
      console.log(this.a)
      console.log(this)
    }
  }
}
o.b.fn()
```

输出结果:

```js
undefined
{
  fn: f
}
```

###### 考题三

```js
window.name = 'ByteDance'
function A() {
  this.name = 123
}
A.prototype.getA = function () {
  console.log(this)
  return this.name + 1
}
let a = new A()
let funcA = a.getA
funcA()
```

输出结果

```js
Window
```

###### 考题四

```js
var length = 10
function fn() {
  return this.length + 1
}
var obj = {
  length: 5,
  test1: function () {
    return fn()
  }
}
obj.test2 = fn
console.log(obj.test1())
console.log(fn() === obj.test2())
console.log(obj.test1() === obj.test2())
```

输出结果

```js
11
false
false
```

### JS 判断变量是不是数组, 你能写出哪些方法

###### 方式一: isArray 判断

```
var arr = [1,2,3]
console.log(Array.isArray(arr))
```

###### 方式二: instanceof

```js
var arr = [1, 2, 3]
console.log(arr instanceof Array)
```

###### 方式三: 原型 prototype

```js
var arr = [1, 2, 3]
console.log(Object.prototype.toString.call(arr).indexOf('Array') > -1)
```

###### 方式四: isPrototypeOf 判断

```js
var arr = [1, 2, 3]
console.log(Array.prototype.isPrototypeOf(arr))
```

###### 方式五: constructor

```js
var arr = [1, 2, 3]
console.log(arr.constructor.toString().indexOf('Array') > -1)
```

### slice 是干嘛的?splice 是否会改变原数组?

###### slice

slice 是来截取的

```js
slice(start?: number, end?: number): T[];
```

参数可以写 slice(3), slice(1,3), slice(-3)...返回的是一个新的数组

###### splice

```js
splice(start: number, deleteCount?: number): T[];
splice(start: number, deleteCount: number, ...items: T[]): T[];
```

功能有插入、删除、替换

返回: 删除的元素

该方法会改变原数组

### JS 数组去重

###### 方式一: new Set

```js
var arr = [1, 2, 3, 4, 5, 1, 3]
function unique(arr) {
  return [...new Set(arr)]
}
console.log(unique(arr))
```

###### 方式二: indexOf

```js
var arr = [1, 2, 3, 4, 5, 1, 3]
function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log(unique(arr))
```

###### 方式三: sort

```js
var arr = [1, 2, 3, 4, 5, 1, 3]
function unique(arr) {
  arr = arr.sort()
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log(unique(arr))
```

### 找出多维数组最大值

```js
var arr = [
  [4, 5, 1, 3],
  [13, 27, 18, 26],
  [32, 35, 37, 39],
  [1000, 1001, 857, 1]
]
function fnArr(arr) {
  var newArr = []
  arr.forEach((item, index) => {
    newArr.push(Math.max(...item))
  })
  return newArr
}
console.log(fnArr(arr))
```

### 给字符串新增方法实现功能

```js
String.prototype.addPrefix = function (str) {
  return str + this
}
console.log('world'.addPrefix('hello')) // helloworld
```

### 找出字符串出现最多次数的字符以及次数

```js
var s = 'aaaaaaabbbbbbcccccbbbbaaaaaabbbbbcccaaa'
function getMost(str) {
  var obj = {}
  for (var i = 0; i < str.length; i++) {
    var char = str.charAt(i)
    if (obj[char]) {
      obj[char]++
    } else {
      obj[char] = 1
    }
  }
  var max = 0
  for (var key in obj) {
    if (max < obj[key]) {
      max = obj[key]
    }
  }
  for (var key in obj) {
    if (obj[key] === max) {
      console.log('最多的字符是' + key + ', 次数是' + max) // 最多的字符是a, 次数是16
    }
  }
}
console.log(getMost(s))
```

### new 操作符具体做了什么?

1. 创建了一个空的对象
2. 将空对象的原型指向于构造函数的原型
3. 将空对象作为构造函数的上下文(改变 this 指向)
4. 对构造函数有返回值的处理判断

### 闭包

###### 1. 闭包是什么

闭包是一个函数加上到创建函数的作用域的连接, 闭包"关闭"了函数的自由变量

###### 2. 闭包可以解决什么问题(闭包的优点)

1. 内部函数可以访问到外部函数的局部变量

2. 闭包可以解决的问题

   ```js
   var lis = document.getElementsByTagName('li')
   for (var i = 0; i < lis.length; i++) {
     ;(function (i) {
       lis[i].onclick = function () {
         alert(i)
       }
     })(i)
   }
   ```

###### 3. 闭包的缺点

1. 变量会驻留在内存中, 造成内存损耗问题。

> 解决: 把闭包的函数设置为 null

```js
var lis = document.getElementsByTagName('li')
for (var i = 0; i < lis.length; i++) {
  ;(function (i) {
    lis[i].onclick = function () {
      alert(i)
    }
    lis[i] = null
  })(i)
}
```

2. 内存泄漏会出现在低版本的 IE 中, 其他浏览器不会出现这个问题。

### 原型链

1. 原型可以解决什么问题

对象共享属性和共享方法

2. 谁有原型

   函数拥有 `prototype`

   对象拥有`__proto__`

3. 对象查找属性或者方法的顺序

   查找规则: 现在对象本身找 -> 构造函数中找 -> 对象原型中找 -> 构造函数原型中找 -> 对象上一层原型中找

4. 原型链

   就是把原型串联起来,

   原型链的最顶端是 null

### JS 继承有哪些方式

###### 方式一: ES6

```js
class Parent {
  constructor() {
    this.age = 18
  }
}
class Child extends Parent {
  constructor() {
    super()
    this.name = '张三'
  }
}
let o = new Child()
console.log(o, o.name, o.age)
```

###### 方式二: 原型链继承

```js
function Parent() {
  this.age = 20
}
function Child() {
  this.name = '张三'
}
Child.prototype = new Parent()
let o = new Child()
console.log(o, o.name, o.age)
```

###### 方式三: 借用构造函数

```js
function Parent() {
  this.age = 20
}
function Child() {
  Parent.call(this)
  this.name = '张三'
}
let o = new Child()
console.log(o, o.name, o.age)
```

###### 方式四: 组合式继承

```js
function Parent() {
  this.age = 20
}
function Child() {
  Parent.call(this)
  this.name = '张三'
}

Child.prototype = new Parent()
let o = new Child()
console.log(o, o.name, o.age)
```

### 说一下 call、apply、bind 的区别?

###### 共同点:

功能一致, 可以改变 this 指向

语法: `函数.call()、函数.apply()、函数.bind()`

###### 区别:

1. 返回不同: call 和 apply 可以立即执行; bind 不会立即执行, 因为 bind 返回的是一个函数, 所以需要加()执行
2. 参数不同: apply 第二个参数是数组; call 和 bind 有多个参数需要挨个写

###### 场景:

用 apply 的情况

```js
var arr = [1, 2, 6, 54, 33, 246]
console.log(Math.max(null, arr))
```

用 bind 的情况

```js
// btn 和 h1s 是带 id 的 button 和 h1
var btn = document.getElementById('btn')
var h1s = document.getElementById('h1s')
btn.onclick = function () {
  console.log(this.id)
}.bind(h1s)
```

### sort 背后的原理是什么?

V8 引擎 sort 函数只给出了两种排序 InsertionSort 和 QuickSort, 数量小于 10 的数组使用 InsertionSort,比 10 大的数组则使用 QuickSort

之前的版本是: 插入排序和快排, 现在是冒泡排序

原理实现链接: [v8/src/js/array.js at ad82a40509c5b5b4680d4299c8f08d6c6d31af3c · v8/v8 (github.com)](https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js)

726 和 760 行

### 深拷贝和浅拷贝

共同点:复制

1. 浅拷贝: 只复制引用, 而未复制真正的值

   ```js
   var arr1 = [1, 2, 3]
   var arr2 = arr1
   ```

   ```js
   var obj1 = {
     a: 1,
     b: 2
   }
   var obj2 = Object.assign(obj1)
   ```

2. 深拷贝: 是复制真正的值(不同引用)

   ```js
   var obj1 = {
     a: 1,
     b: 2
   }
   var obj2 = JSON.parse(JSON.stringify(obj1))
   ```

   ```js
   function copyObj(obj) {
     var newObj = Array.isArray(obj) ? [] : {}
     for (const key in obj) {
       if (typeof obj[key] === 'object') {
         newObj[key] = copyObj(obj[key])
       } else {
         newObj[key] = obj[key]
       }
     }
     return newObj
   }
   ```

### localStorage、sessionStorage、cookie 的区别

共同点: 在客户端存放数据

区别:

1. 数据存放有效期

   sessionStorage: 仅在当前浏览器窗口关闭之前有效[浏览器关了就没了]

   localStorage: 始终有效, 窗口或者浏览器关闭了也一直存在, 所以是持久化存储

   cookie: 只在设置的 cookie 过期时间之前有效, 即时窗口或者浏览器关闭, 也不会失效

2. localStorage 和 sessionStorage 不可以设置过期时间

   cookie 有过期时间, 可以设置过期时间(把时间调整到之前的时间,就过期了)

3. 存储大小的限制

   cookie 存储量不能超过 4k

   localStorage 和 sessionStorage 不能超过 5M

   \*\*\*\*根据不同的浏览器存储的大小是不同的

### 自适应

淘宝无限适配[移动端](lib-flexible.js) + 布局单位使用 rem

```js
window.addEventListener('resize', setRemUnit)
function setRemUnit () {
    let fontSize = document.documentElement.clientWidth / 10
    document.documentElement.style.fontSize = fontSize + 'px'
}
setRemUnit()
```

### var、let、const 的区别

var、let、const共同点: 都是可以声明变量的

区别一:

​	var 具有变量提升的机制

​	let 和 const 没有变量提升的机制

区别二:

​	var 可以多次声明同一个变量

​	let 和 const 不可以多次声明同一个变量

区别三:

​	var、let 声明变量的

​	const 声明常量

​	var 和 let 声明的变量可以再次赋值, const 声明的常量不能被再次赋值

区别四:

​	var 声明的变量没有自身的作用域

​	const 和 let 声明的变量有自身的作用域

### 作用域考题

###### 考题一: let 和 const 没有变量提升性

```js
console.log(str) // undefined
var str = '你好'

console.log(num) // 报错
let num = 10
```

###### 考题二:var 没有自身作用域

```js
function demo () {
    var n = 2
    if (true) {
        var n = 1
    }
    console.log(n);  // 1 
}
demo()
```

```js
function demo () {
    let n = 2
    if (true) {
        let n = 1
    }
    console.log(n);  // 2
}
demo()
```

###### 考题三

```js
const obj = { a: 1 }
obj = 1111;  // 报错
obj.a = 1111 // 不报错
```

### 将下列对象进行合并

```js
const a = {
    a: 1,
    b: 4
}
const b = {
    b: 2,
    c: 3
}
```

###### 方式一: Object.assign()

```js
let obj1 = Object.assign(a, b)
console.log(obj1);
```

###### 方式二:解构

```js
let obj1 = { ...a, ...b }
console.log(obj1);
```

###### 方式三: 自定义

```js
function extend (target, source) {
    for (var key in source) {
        target[key] = source[key]
    }
    return target
}
let obj1 = extend(a, b)
console.log(obj1);
```

### 箭头函数和普通函数有什么区别?

1. this 指向的问题

   箭头函数中的 this 是在箭头函数定义时就确定的, 而且是不能修改的(call、apply、bind)

   **** 箭头函数的 this 指向定义时候外层第一个普通函数的 this

2. 箭头函数不能 new(不能当做构造函数)
3. 箭头函数没有 prototype
4. 箭头函数没有 arguments

### Promise 的几种状态

有三种状态

pending(进行中)

fulfilled(已成功)

rejected(已失败)

### find 和 filter 的区别

区别一:返回的内容不同

​	filter: 返回的是数组

​	find: 返回的是具体的内容

区别二:

​	filter: 返回整体(每一个匹配到的都返回)

​	find: 匹配到第一个就返回

### some 和 every 的区别

some: 如果有一项匹配,则返回 true

every: 全部匹配才会返回 true









