### 数据类型

#### 数据类型分类

**基础数据类型：** Undefined、Null、Boolean、String、Number、Symbol、BigInt

**引用数据类型：** Object(Array、RegExp、Date、Math、Function)

**存储方式**

基础类型存储在栈内存中，被引用或者拷贝时，会创建一个完全相等的变量。

引用类型存储在堆内存中，存储的是地址，多个引用指向同一个地址。这里会涉及一个"共享"的概念。

#### 数据类型检测

1. typeof

2. instanceof

   **typeof 和 instanceof 的差异**

   1. instanceof 可以准确地判断复杂引用数据的类型，但是不能正确判断基础数据类型
   2. 而 typeof 也存在弊端，他虽然可以判断基础数据类型(null 除外)，但是引用数据类型中，除了 Function 类型以外，其他的也无法判断

   ```js
   function myInstanceof(left, right) {
     // 这里先用 typeof 来判断基础类型,如果是,直接返回 false
     if (typeof left !== 'object' || left === null) return false
     // getPrototypeOf 是 Object 自带的 API,能够拿到参数的原型对象
     let proto = Object.getPrototypeOf(left)
     while (true) {
       // 循环往下寻找, 直到找到相同的原型对象
       if (proto === null) return false
       if (proto === right.prototype) return true // 找到相同的原型对象,返回 true
       proto = Object.getPrototypeOf(proto)
     }
   }

   // 验证一下自己实现的 myInstanceof 是否 ok
   console.log(myInstanceof(new Number(123), Number)) // true
   console.log(myInstanceof(123, Number)) // false
   ```

3. Object.prototype.toString().call()

   ```js
   Object.prototype.toString({}) // "[object Object]"
   Object.prototype.toString.call({}) // 同上结果，加上call也ok
   Object.prototype.toString.call(1) //"[object Number]"
   Object.prototype.toString.call('1') //"[object String]"
   Object.prototype.toString.call(true) //"[object Boolean]"
   Object.prototype.toString.call(function () {}) //"[object Function]"
   Object.prototype.toString.call(null) //"[object Null]"
   Object.prototype.toString.call(undefined) //"[object Undefined]"
   Object.prototype.toString.call(/123/g) //"[object RegExp]"
   Object.prototype.toString.call(new Date()) //"[object Date]'
   Object.prototype.toString.call([]) //"[object Array]"
   Object.prototype.toString.call(document) //"[object HTMLDocument]'
   Object.prototype.toString.call(window) //"[object Window]"
   ```

   ```js
   function getType(obj) {
     let type = typeof obj
     if (type !== 'object') {
       //  先进行typeof判断，如果是基础数据类型，直接返回
       return type
     }
     // 对于typeofi返回结果是object的，再进行如下的判断，正则返回结果
     return Object.prototype.toString
       .call(obj)
       .replace(/^\[object (\S+)\]$/, '$1')
     // 注意正则中间有个空格
   }
   /*代码验证，需要注意大小写，哪些是typeof判断，哪些是toString判断？思考下*/
   getType([]) // "Array"typeof []是object, 因此toString返回
   getType('l23') // "string"typeof直接返回
   getType(window) // "Window"toString返回
   getType(null) // "Null"首字母大写，typeof null是object, 需toString来判断
   getType(undefined) // "undefined"typeofi值接返回
   getType() // "undefined'"typeof直接返回
   getType(function () {}) //"function"typeof能判断，因此首字母小写
   getType(/123/g) // "RegExp"toString: 返回
   ```

#### 数据类型转换

1. 强制类型转换

   Number()、parseInt()、parseFloat()、toString()、String()、Boolean()

2. 隐式类型转换

   1. 逻辑运算符`&&`、`||`、`!`
   2. 运算符`+`、`-`、`*`、`、`
   3. 关系操作符`>`、`<`、`<=`、`>=`
   4. 相等运算符`==`
   5. if/while 条件

**Number()方法强制转换规则**

1. 如果是布尔值，true 和 false 分别被转换为 1 和 0
2. 如果数数字，返回自身
3. 如果是 null，返回 0
4. 如果是 undefined，返回 NaN
5. 如果是字符串
   1. 如果字符串中只包含了数字，则将其转换为十进制
   2. 如果字符串中包含了有效的浮点格式，将其转换为浮点数值
   3. 如果是空字符串，将其转换为 0
   4. 如果不是以上格式的字符串，均返回 NaN
6. 如果是 Symbol，抛出错误。
7. 如果是对象并且部署了[Synbol.toPrimitive]，那么调用此方法，否则调用对象的 valueOf()方法。

```js
Number(true) // 1
Number(false) // 0
Number('0111') // 111
Number(null) // 0
Number('') // 0
Number('1a') // NaN
Number(-0x11) // -17
Number('0X11') // 17
```

**Boolean()方法的强制转换规则**

除了 undefined、null、false、""、0(包括+0，-0)、NaN 转换出来是 false

其他均为 true

```js
Boolean(0) //false
Boolean(null) //false
Boolean(undefined) //false
Boolean(NaN) //false
Boolean(1) //true
Boolean(13) //true
Boolean('12') //true
```

**==的隐式转换规则**

1. 如果类型相同，无需进行转换
2. 如果一个操作值是 null 或者 undefined，那么另一个操作符必须是 null 或者 undefined 才会返回 true，否则都返回 false
3. 如果其中有一个是 Symbol 类型，那么返回 false
4. 两个操作值如果都为 string 和 number 类型，那么就会将字符串转换为 number
5. 如果有一个操作值是 boolean，那么转换成 number
6. 如果一个操作值是 object，且另一方为 string、number 或者 symbol，就会把 object 转为原始类型再进行判断

```js
null == undefined // true规则2
null == 0 //false规则2
'' == null // false规则2
'' == 0 // true规则4字符串转隐式转换成Number之后再对比
'123' == 123 // true规则4字符串转隐式转换成Number之后再对比
0 == false // true e规则布尔型隐式转换成Number之后再对比
1 == true // true e规则布尔型隐式转换成Number之后再对比
var a = {
  value: 0,
  valueOf: function () {
    this.value++
    return this.value
  }
}
// 注意这里a又可以等于1、2、3
console.log(a == 1 && a == 2 && a == 3) //true f规则Object隐式转换
// 注：但是执行过3遍之后，再重新执行a一3或之前的数字就是false, 因为valuei已经加上去了，这里需要注意一下
```

**'+'的隐式转换规则**

1. '+'号操作符，不仅可以用作数字相加，还可以用作字符串拼接
2. 如果其中有一个是字符串，另外一个是 undefined、null 或布尔型，则调用 toString()方法进行字符串拼接；如果是纯对象、数组、正则等，则默认调用对象的转换方法会存在优先级，然后再进行拼接。
3. 如果其中有一个是数字，另外一个是 undefined、null、布尔值或者数字，则会将其转换成数字进行加法运算，对象的情况还是参照上一条规则
4. 如果其中一个是字符串，一个是数字，则按照字符规则进行拼接。

```js
1 + 2 // 3 常规情况
1 + '2' // 12 常规情况
//下面看一下特殊情况
'1' + undefined //"lundefined“规则1，undefined转换字符串
'1' + null // "1null"规则1，null转换字符串
'1' + true // "1true"规则1，true转换字符串
'1' + 1n // '11'比较特殊字符串和BigInti相加，Biglnt转换为字符串
I + undefined // NaN规则2，undefined转换数字相加NaN
1 + null // 1规则2，null转换为0
1 + true // 2规则2，true转换为1，二者相加为2
1 + 1n // 错误不能把Biglnt和Number类型直接混合相加
'1' + 3 // '13'规则3，字符串拼接
```

**Object 的转换规则**

1. 如果部署了[Symbol.toPrimitive()]方法优先调用再返回
2. 调用 valueOf()，如果转换为基础类型则返回
3. 调用 toString()，如果转换为基础类型则返回
4. 如果都没有返回基础类型会报错

### 浅拷贝和深拷贝

#### 浅拷贝

**浅拷贝：** 自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象，但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了内存中的地址，肯定会影响到另一个对象。

**实现浅拷贝的方法**

1. **Object.assign()** 

   Object.assign() 是 ES6 中 Object 的一个方法，该方法可以用于 JS 对象的合并等多个用途，其中一个用途就是可以进行浅拷贝。

   Object.assign()的语法为：`Object.assign(target, ...source)`

   ```js
   let target = {}
   let source = { a: { b: 2 } }
   Object.assign(target, source)
   console.log(target) // { a: { b: 10 } }
   source.a.b = 10
   console.log(target);// { a: { b: 10 } }
   console.log(source);// { a: { b: 10 } }
   ```

   **注意**

   1. 它不会拷贝对象的继承属性
   2. 它不会拷贝对象的不可枚举属性
   3. 可以拷贝 Symbol 类型的属性

   ```js
   let obj1 = { a: { b: 1 }, sym: Symbol(1) };
   Object.defineProperty(obj1, 'innumerable', {
       value: '不可枚举属性',
       enumerable: false
   })
   let obj2 = {}
   Object.assign(obj2, obj1)
   obj1.a.b = 2;
   console.log('obj1', obj1);
   console.log('obj2', obj2);
   ```

   ![image-20240115102506908](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240115102506908.png)

2. **扩展运算符方式**

   利用 JS 的扩展预算符，在构造对象的同时完成浅拷贝的功能

   扩展预算符的语法为`let cloneObj = {...obj}`

3. **concat 拷贝数组**

   数组的 concat 方法其实也是浅拷贝

4. **slice 拷贝数组**

   slice 方法仅仅针对数组类型

   slice 的语法为`arr.slice(begin, end)`

**手动实现一个浅拷贝**

1. 对基础类型做一个最基本的一个拷贝
2. 对引用类型开辟一个新的存储，并且拷贝一层对象属性

```js
const shallowClone = (target) => {
    if (typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? [] : {}
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = target[prop]
            }
        }
        return cloneTarget
    } else {
        return target
    }
}
```

#### 深拷贝

浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值。

对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。

**深拷贝原理**

将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，且新对象的修改并不会改变原对象，二者实现真正的分离。

**实现深拷贝的方法**

1. 乞丐版(JSON.stringify())

   `JSON.stringify()`是目前开发中最简单的深拷贝的方法

   **注意**

   1. 拷贝的对象的值如果有函数、undefined、Symbol 这几种类型，经过 JSON.stringify()序列化之后的字符串中的键值对会消失
   2. 拷贝 Date 引用类型会变成字符串
   3. 无法拷贝不可枚举的属性
   4. 无法拷贝对象的原型链
   5. 拷贝 RegExp引用类型会变成空对象
   6. 对象中含有 NaN、Infinity以及 -Infinity，JSON 序列化的结果会变成 null
   7. 无法拷贝对象的循环应用，即对象成环(obj[key] = obj)

2. 基础版(手写递归实现)

   ```js
   let obj1 = { a: { b: 1 } }
   function deepClone (obj) {
       let cloneObj = {}
       for (let key in obj) {// 遍历
           if (typeof obj[key] === 'object') {
               cloneObj[key] = deepClone(obj[key]) // 是对象就再次调用该函数递归
           } else {
               cloneObj[key] === obj[key] // 基本类型的话直接复制值
           }
       }
       return cloneObj
   }
   let obj2 = deepClone(obj1)
   obj1.a.b = 2
   console.log(obj2); // { a: { b: 1 } }
   ```

   **注意**

   1. 这个深拷贝函数不能复制不可枚举的属性以及 Symbol 类型
   2. 这种方法只是针对普通的引用类型的值做递归复制
   3. 对象的属性里面成环，即循环引用没有解决

3. 改进版(改进后递归实现)

   1. 针对能够遍历对象对象的不可枚举属性以及 Symbol 类型，我们可以使用`Reflect.ownKeys`方法
   2. 当参数是 Date、RegExp 类型，则直接生成一个新的实例返回
   3. 利用 Object 的`getOwnPropertyDescriptors`方法可以获得对象的所有属性，以及对应的特性，顺便结合 Object 的`create`方法创建一个新对象，并继承传入源对象的原型链
   4. 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏，作为检测循环引用很有帮助，如果存在循环，则引用直接返回 WeakMap 存储的值

   ```js
   const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null
   const deepClone = function (obj, hash = new WeakMap()) {
       if (obj.constructor === Date) {
           return new Date(obj)// 日期对象直接返回一个新的日期对象
       }
       if (obj.constructor === RegExp) {
           return new RegExp(obj)// 正则对象直接返回一个新的正则对象
       }
       // 如果循环引用了就用 WeakMap 来解决
       if (hash.has(obj)) {
           return hash.get(obj)
       }
       let allDesc = Object.getOwnPropertyDescriptors(obj)
       // 遍历传入参数所有键的特性
       let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
       // 继承原型链
       hash.set(obj, cloneObj)
       for (let key of Reflect.ownKeys(obj)) {
           cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
       }
       return cloneObj
   }
   // 下面是验证代码
   let obj = {
       num: 0,
       str: '',
       boolean: true,
       unf: undefined,
       nul: null,
       obj: { name: '我是一个对象', id: 1 },
       arr: [0, 1, 2],
       func: function () {
           console.log('我是一个函数');
       },
       date: new Date(0),
       reg: new RegExp('/我是一个正则/ig'),
       [Symbol('1')]: 1
   }
   Object.defineProperty(obj, 'innumerable', { enumerable: false, value: '不可枚举的属性' })
   obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
   obj.loop = obj // 设置 loop 成循环引用的属性
   let cloneObj = deepClone(obj)
   cloneObj.arr.push(4)
   console.log('obj', obj);
   console.log('cloneObj', cloneObj);
   ```
   

![image-20240116111129673](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240116111129673.png)

### 继承

继承是面向对象的，使用这种方式我们可以更好地复用以前的开发代码，缩短开发的周期、提升开发效率

继承可以使得子类别具有父类的各种方法和属性

#### 常见的实现继承的方法

**一、原型链继承**

原型链继承是比较常见的继承方式之一，其中涉及的构造函数、原型和实例

 	1. 每一个构造函数都有一个原型对象
 	2. 原型对象又包含一个指向构造函数的指针
 	3. 而实例则包含一个原型对象的指针

```js
function Parent1 () {
    this.name = 'parent1'
    this.play = [1, 2, 3]
}
function Child1 () {
    this.type = 'child2'
}
Child1.prototype = new Parent1()

var s1 = new Child1()
var s2 = new Child1()
s1.play.push(4)
console.log(s1.play, s2.play);
```

![image-20240117094112987](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117094112987.png)

原型链继承内存空间是共享的，当一个发生变化的时候。另一个也随之进行变化

**二、构造函数继承(借助call)**

```js
function Parent1 () {
    this.name = 'parent1'
}
Parent1.prototype.getName = function () {
    return this.name
}
function Child1 () {
    Parent1.call(this)
    this.type = 'Child1'
}
let child = new Child1()
console.log(child); // 没问题
console.log(child.getName()); // 会报错
```

![image-20240117094152565](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117094152565.png)

**三、组合继承(前两中组合)**

```js
function Parent3 () {
    this.name = 'parent3'
    this.play = [1, 2, 3]
}
Parent3.prototype.getName = function () {
    return this.name
}
function Child3 () {
    // 第二次调用Parent3
    Parent3.call(this)
    this.type = 'Child3'
}
// 第一次调用Parent3
Child3.prototype = new Parent3()
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3

let s3 = new Child3()
let s4 = new Child3()
s3.play.push(4)
console.log(s3.play, s4.play); // 互不影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'
```

![image-20240117094228124](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117094228124.png)

**四、原型式继承**

一是用作新对象原型的对象

二是为新对象定义额外属性的对象(可选参数)

```js
let parent4 = {
    name: 'parent4',
    friends: ['p1', 'p2', 'p3'],
    getName: function () {
        return this.name
    }
};
let person4 = Object.create(parent4)
person4.name = 'tom'
person4.friends.push('jerry')

let person5 = Object.create(parent4)
person5.friends.push('lucy')

console.log('person4.name', person4.name);
console.log('person4.name === person4.getName()', person4.name === person4.getName());
console.log('person5.name', person5.name);
console.log('person4.friends', person4.friends);
console.log('person5.friends', person5.friends);
```

![image-20240117094250912](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117094250912.png)

**五、寄生式继承**

使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法

寄生式继承相比于原型式继承，还是在父类基础上添加了更多的方法

```js
let parent5 = {
    name: 'parent5',
    friends: ['p1', 'p2', 'p3'],
    getName: function () {
        return this.name
    }
};
function clone (original) {
    let clone = Object.create(original)
    clone.getFriends = function () {
        return this.friends
    }
    return clone
}
let person5 = clone(parent5)
console.log(person5.getName());
console.log(person5.getFriends());
```

![image-20240117094316990](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117094316990.png)

**六、寄生组合式继承**

在前面这几种继承方式的优缺点基础上进行改造，得出了寄生组合式的继承方法，这也是所有继承方式里面相对最优的继承方式

```js
function clone (parent, child) {
    // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
    child.prototype = Object.create(parent.prototype)
    child.prototype.constructor = child
}

function Parent6 () {
    this.name = 'parent6'
    this.play = [1, 2, 3]
}
Parent6.prototype.getName = function () {
    return this.name
}
function Child6 () {
    Parent6.call(this)
    this.friends = 'child5'
}
clone(Parent6, Child6)

Child6.prototype.getFriends = function () {
    return this.friends
}
let person6 = new Child6()
console.log(person6);
console.log(person6.getName());
console.log(person6.getFriends());
```

![image-20240117094338932](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117094338932.png)

**七、ES6的extends关键字实现逻辑**

使用关键词很容易直接实现JavaScript的继承，但是如果想深入了解extends语法糖是怎么实现的，就得深入研究extends的底层逻辑

```js
class Person {
    constructor(name) {
        this.name = name
    }
    // 原型方法
    // 即Person.prototype.getName = function(){}
    // 下面可以简写为getName(){...}
    getName = function () {
        console.log('Person:', this.name);
    }
}
class Gamer extends Person {
    constructor(name, age) {
        // 子类中存在构造函数，则需要再使用“this”之前首先调用super()
        super(name)
        this.age = age
    }
}
const asuna = new Gamer('Asuna', 20)
asuna.getName() // 成功访问到父类的方法
```

#### 如何实现new、apply、call、bind的底层逻辑

JavaScript中的apply、call和bind方法是前端代码开发中相当重要的概念，并且与this的指向密切相关

**new原理介绍**

new 关键词的主要作用，就是指向一个构造函数，返回一个实例对象。根据构造函数的情况，来确定是否可以接受参数的传递

**new 执行过程**

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象(this指向新对象)
3. 执行构造函数中的代码(为这个新对象添加属性)
4. 返回新对象

new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是return语句指定的对象

**new 被调用后大致做了哪几件事情**

1. 让实例可以访问到私有属性
2. 让实例可以访问构造函数原型(constructor.prototype)所在原型链上的属性
3. 构造函数返回的最后结果是引用数据类型

**new 的实现**

```js
function _new (ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw 'ctor must be a function'
    }
    let obj = new Object()
    obj.__proto__ = Object.create(ctor.prototype)
    let res = ctor.apply(obj, ...args)
    let isObject = typeof res === 'object' && typeof res !== null
    let isFunction = typeof res === 'function'
    return isObject || isFunction ? res : obj
}
```

**apply&call&bind原理介绍**

call、apply、bind是挂在 Function 对象上的个方法，调用这三个方法的必须是一个函数

```js
func.call(thisArg, param1, param2,...)
func.apply(thisArg, [param1, param2,...])
func.bind(thisArg, param1, param2,...)
```

**共同点：** 改变函数 func 的 this 指向

**不同点**

1. call 和 apply 直接返回执行结果，bind 返回的是一个函数

| 方法/特征 | call              | apply             |       bind        |
| --------- | ----------------- | ----------------- | :---------------: |
| 方法参数  | 多个              | 单个数组          |       多个        |
| 方法功能  | 函数调用改变 this | 函数调用改变 this | 函数调用改变 this |
| 返回结果  | 直接执行的        | 直接执行          | 返回待执行的函数  |
| 底层实现  | 通过eval          | 通过eval          |  间接调用 apply   |

### 闭包

**JavaScript 的作用域：** 指变量能够被访问到的范围

#### 闭包的定义

**红宝书：** 闭包是指有权访问另外一个函数作用域中的变量的函数

**MDN：** 一个函数和对其周围状态的引用捆绑在一起(或者说函数被引用包围)，这样的组合就是闭包。也就是说，闭包让你可以在一个内层函数访问到起外层函数的作用域

**基本概念：** 闭包其实就是一个可以访问其他函数内部变量的函数

通常情况下，函数内部变量是无法被外部访问的，因此使用闭包的作用，就具备了实现能在外部访问某个函数内部变量的功能。

#### 闭包产生的原因

**作用域链的基本概念：** 当访问一个变量时，代码解释器会首先在当前的作用域查找，如果没找到，就去腹肌作用域查找，直到找到该变量或者不存在父级作用域中。

闭包产生的本质就是当前环境中存在指向父级作用域的引用   

#### 闭包的表现形式

1. 返回一个函数
2. 在定时器、时间监听、Ajax 请求、Web Workers 或者任何异步中，只要使用了回调函数，实际上就是在使用闭包
3. 作为函数参数传递的形式
4. IIFE(立即执行函数)，创建了闭包，保存了全局作用域(window)和当前函数的作用域，因此可以输出全局的变量

### JSON.stringify

`JSON.stringify`是日常开发中经常用到的 JSON 对象中的方法

**JSON.parse**

JSON.parse 方法用来解析 JSON 字符串，构造有字符串描述的 JavaScript 值或对象

第一个参数是需要解析处理的 JSON 字符串；第二个参数是可选参数，提供可选的 reviver 函数

**JSON.stringify**

JSON.stringify 方法是将一个 JavaScript 对象或者值转换为 JSON 字符串

第一个参数传入的是要转换的对象；第二个参数是一个 replacer 函数；第三个参数用来控制结果字符串里面的间距

### 数组

#### Array 的构造器

Array 构造器用于创建一个新的数组，通常推荐使用对象字面量的方式创建一个数组

**new Array**

`new Array(arg1,arg2...)`参数长度为0 或长度大于等于 2 时，传入的参数将按照顺序依次成为新数组的第 0 至第 N 项(参数长度为 0 时，返回空数组)

`new Array(len)`当 len 不是数值时，处理同上，返回一个只包含 len 元素一项的数组；当 len 为数值时，len 最大不能超过 32 位无符号整型，即需要小于 2 的 32 次方(len 最大为 `Math.pow(2, 32)`)，否则将抛出 `RangeError`

**Array.of**

用于将参数依次转化为数组中的一项，然后返回这个新数组，而不管这个参数是数字还是其他

**Array.from**

设计初衷是快速便捷地基于其他对象创建新数组，准确来说就是从一个类似数组的可迭代对象中创建换一个新的数组实例

三个参数

1. 类似数组的对象，必选
2. 加工函数，新生成的数组会经过该函数的加工再返回
3. this 作用域，表示加工函数执行时 this 的值

```js
var obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var arr = Array.from(obj, function (value, index) {
    console.log(value, index, this, arguments.length);
    return value.repeat(3)// 必须指定返回值,否则返回 undefined
}, obj)
console.log(arr);
```

![image-20240117112411958](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117112411958.png)

#### Array 的判断

**Array.isArray**

用来判断一个变量是否为数组类型

#### Array 的方法

**改变自身的方法：** pop、push、reverse、shift、sort、splice、unshift、以及两个 ES6 新增的方法 copyWithin和 fill

**不改变自身的方法：** concat、join、slice、toString、toLocalString、indexOf、lastIndexOf、未形成标准的 toSource、以及 ES7 新增的方法 includes

**数组遍历的方法：** forEach、every、 some、filter、map、reduce、reduceRight，以及 ES6 新增的方法 entries、find、findIndex、keys、values

#### 数组扁平化

数组的扁平化其实就是讲一个嵌套多层的数组 array(嵌套可以是任何层数)转化为只有一层的数组

**扁平化实现方法**

1. 普通的递归实现

   通过循环递归的方式，一项一项地去遍历，如果每一项还是数组，那么就继续往下遍历，利用递归程序的方法，来实现数组的每一项的连接

   ```js
   var a = [1, [2, [3, 4, 5]]]
   
   function flatten (arr) {
       let result = []
   
       for (let i = 0; i < arr.length; i++) {
           if (Array.isArray(arr[i])) {
               result = result.concat(flatten(arr[i]))
           } else {
               result.push(arr[i])
           }
       }
       return result
   }
   console.log(flatten(a));
   ```

   ![image-20240117153246144](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117153246144.png)

2. 利用 reduce 函数迭代

   从上面普通的递归函数中可以看出，其实就是对数组的每一项进行处理，其实也可以用reduce 来实现数组的拼接，从而简化第一种方法的代码

   ```js
   var a = [1, [2, [3, 4, 5]]]
   function flatten (arr) {
       return arr.reduce(function (prev, next) {
           return prev.concat(Array.isArray(next) ? flatten(next) : next)
       }, [])
   }
   console.log(flatten(a));
   ```

3. 扩展运算符实现

   ```js
   var a = [1, [2, [3, 4, 5]]]
   function flatten (arr) {
       while (arr.some(item => Array.isArray(item))) {
           arr = [].concat(...arr)
       }
       return arr
   }
   console.log(flatten(a));
   ```

4. split 和 toString 共同处理

   ```js
   var a = [1, [2, [3, 4, 5]]]
   function flatten (arr) {
       return arr.toString().split(',')
   }
   console.log(flatten(a));
   ```

5. 调用 ES6 中的 flat

   直接调用 ES6 中的 flat 方法，可以直接实现数组扁平化

   语法：`arr.flat([depth])`depth 表示展开深度，Infinity 表示一直展开

   ```js
   var a = [1, [2, [3, 4, 5]]]
   function flatten (arr) {
       return arr.flat(Infinity)
   }
   console.log(flatten(a));
   ```

6. 正则和 JSON 方法共同处理

   ```js
   var a = [1, [2, [3, 4, 5]]]
   function flatten (arr) {
       let str = JSON.stringify(arr)
       str = str.replace(/(\[|\])/g, '')
       str = '[' + str + ']'
       return JSON.parse(str)
   }
   console.log(flatten(a));
   ```

   ### 数组排序

   **时间复杂度：** 说的更多地是通过 O(nlogn)以及 O(n)等来衡量，其实大多数时候我们对此并未建立形象的认知

   **空间复杂度：** 对一个算法在运行过程中临时占用存储空间大小的度量

   #### 排序分类

   **比较类排序：** 通过比较来决定元素之间的相对次序，其时间复杂度不能突破 O(nlogn)，因此也成为非线性时间比较类排序。

   **非比较类排序：** 不通过比较来决定元素之间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。 ![image-20240117155801276](https://gitee.com/xuchp/typora-pics/raw/master/images/image-20240117155801276.png)

**冒泡排序**

```js
var a = [1, 3, 6, 3, 34, 76, 1, 34, 222, 6, 456, 211]

function bubbleSort (array) {
    const len = array.length
    if (len < 2) { return array }
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (array[j] > array[i]) {
                const temp = array[j]
                array[j] = array[i]
                array[i] = temp
            }
        }
    }
    return array
}

console.log(bubbleSort(a))// [1, 1, 3, 3, 6, 6, 34, 34, 76, 211, 222, 456]
```

**快速排序**

通过一趟排序，将待排记录分割成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可以分别对这两部分记录继续进行排序，以达到整个序列有序。

```js
var a = [1, 3, 6, 3, 34, 76, 1, 34, 222, 6, 456, 211]
function quickSort (array) {
    var quick = function (arr) {
        if (arr.length <= 1) return arr
        const len = arr.length
        const index = Math.floor(len >> 1)
        const pivot = arr.splice(index, 1)[0]
        const left = []
        const right = []
        for (let i = 0; i < len; i++) {
            if (arr[i] > pivot) {
                right.push(arr[i])
            } else if (arr[i] <= pivot) {
                left.push(arr[i])
            }
        }
        return quick(left).concat([pivot], quick(right))
    }
    const result = quick(array)
    return result
}
console.log(quickSort(a))// [1, 1, 3, 3, 6, 6, 34, 34, 76, 211, 222, 456]
```

**插入排序**

插入排序算法描述的是一种简单直观的排序方法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应的值并插入，从而达到排序的效果

```js
var a = [1, 3, 6, 3, 34, 76, 1, 34, 222, 6, 456, 211]
function insertSort (array) {
    const len = array.length
    let current
    let prev
    for (let i = 1; i < len; i++) {
        current = array[i]
        prev = i - 1
        while (prev >= 0 && array[prev] > current) {
            array[prev + 1] = array[prev]
            prev--
        }
        array[prev + 1] = current
    }
    return array
}

console.log(insertSort(a))// [1, 1, 3, 3, 6, 6, 34, 34, 76, 211, 222, 456]
```

**选择排序**

选择排序是一种简单直观的排序方法，首先将最小的元素存放在序列的起始位置，再从剩余未排序元素中继续寻找最小元素，然后放到已排序的序列后面......以此类推，直到所有元素均排序完毕

```js
var a = [1, 3, 6, 3, 34, 76, 1, 34, 222, 6, 456, 211]
function selectSort (array) {
    const len = array.length
    let temp
    let minIndex
    for (let i = 0; i < len - 1; i++) {
        minIndex = i
        for (let j = i; j < len; j++) {
            if (array[j] <= array[minIndex]) {
                minIndex = j
            }
        }
        temp = array[i]
        array[i] = array[minIndex]
        array[minIndex] = temp
    }
    return array
}

console.log(selectSort(a))// [1, 1, 3, 3, 6, 6, 34, 34, 76, 211, 222, 456]
```

**堆排序**

堆排序是指利用堆这种数据结构所设计的一种排序算法

**堆积** 是一个近似完全二叉树的结构，并同时满足堆积的性质，即子节点的键值或索引总是小于(或者大于)它的父节点

**堆的底层** 实际上就是一棵完全二叉树，可以用数组实现。

```js
var a = [1, 3, 6, 3, 34, 76, 1, 34, 222, 6, 456, 211]
function heap_sort (arr) {
    var len = arr.length
    var k = 0

    function swap (i, j) {
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    function max_heapify (start, end) {
        var dad = start
        var son = dad * 2 + 1
        if (son >= end) return
        if (son + 1 < end && arr[son] < arr[son + 1]) {
            son++
        }
        if (arr[dad] <= arr[son]) {
            swap(dad, son)
            max_heapify(son, end)
        }
    }

    for (var i = Math.floor(len / 2) - 1; i >= 0; i--) {
        max_heapify(i, len)
    }
    for (var j = len - 1; j > k; j--) {
        swap(0, j)
        max_heapify(0, j)
    }
    return arr
}

console.log(heap_sort(a))// [1, 1, 3, 3, 6, 6, 34, 34, 76, 211, 222, 456]
```

**归并排序**

归并排序是建立在归并操作上的一种有效的排序算法，该算法是采用分治法的一个非常典型的应用

将已有序的子序列合并，得到完全有序的序列，先使每个子序列有序，再使子序列段间有序，若将两个有序表合并成一个有序表，称为**二路归并**

归并排序是一种稳定的排序方法，归并排序的性能不收输入数据的影响，但表现比选择排序好很多，代价是需要额外的内存空间

```js
var a = [1, 3, 6, 3, 34, 76, 1, 34, 222, 6, 456, 211]
function mergeSort (array) {
    const merge = (right, left) => {
        const result = []
        let il = 0
        let ir = 0
        while (il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                result.push(left[il++])
            } else {
                result.push(right[ir++])
            }
        }
        while (il < left.length) {
            result.push(left[il++])
        }
        while (ir < right.length) {
            result.push(right[ir++])
        }
        return result
    }

    const mergeSort = array => {
        if (array.length === 1) { return array }
        const mid = Math.floor(array.length / 2)
        const left = array.slice(0, mid)
        const right = array.slice(mid, array.length)
        return merge(mergeSort(left), mergeSort(right))
    }
    return mergeSort(array)
}

console.log(mergeSort(a))// [1, 1, 3, 3, 6, 6, 34, 34, 76, 211, 222, 456]
```

| 排序算法 | 时间复杂度 | 空间复杂度 | 稳定性 |
| :------: | :--------: | :--------: | :----: |
| 冒泡排序 | O(n 平方)  |    (1)     |  稳定  |
| 快速排序 | O(n logn)  |  O(nlogn)  | 不稳定 |
| 插入排序 | O(n 平方)  |    O(1)    |  稳定  |
| 选择排序 | O(n 平方)  |    O(1)    | 不稳定 |
|  堆排序  | O(n logn)  |    O(1)    | 不稳定 |
| 归并排序 | O(n logn)  |    O(n)    |  稳定  |

#### sort排序

通过 sort 方法也可以实现数组的排序，默认排序顺序是先将元素转换为字符串，然后再进行排序

语法是`arr.sort([compareFunction])`

**compareFunction**

1. 如果 compareFunction(a，b)小于 0，那么 a 会被排列在 b 之前
2. 如果 compareFunction(a，b)等于 0，那么 a 和 b 的相对位置不变
3. 如果 compareFunction(a，b)大于 0，那么 b 会被排列在 a 之前

**sort 源码分析**

n 为排序个数

1. 当 n <= 10 时，采用插入排序
2. 当 n > 10 时，采用三路快速排序
3. 当 10 < n <= 1000 时，采用中位数作为哨兵元素
4. n > 1000，每隔 200 ~ 215 个元素挑出一个元素放到一个新数组中，然后对它排序，找到中间位置的数依次作为中位数
