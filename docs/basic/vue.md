# 一、Vue2 篇

## 1. 关于生命周期

#### 1.1 生命周期有哪些？发送请求在 created 还是 mounted ？

Vue2.x 系统自带有8个

```
beforeCreated
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destoryed
```

发送请求在 created 还是 mounted ？

```
这个问题具体要看项目和业务的情况了,因为组件的加载顺序是,父组件引入了子组件,那么先执行父的前 3 个生命周期,再执行子组件的 4 个生命周期,那么我们的业务是父组件引入子组件,并且优先加载子组件的数据,那么在父组件中的请求要放 mounted 中,如果当前组件没有依赖关系,那么放在那个生命周期中请求都是可以的.
```

#### 1.2 为什么发送请求不在 beforeCreate 里？beforeCreate 和 created 有什么区别？

为什么发送请求不在 beforeCreate 里

```
因为:如果请求是在 methods 中封装好的,在 beforeCreate 调用的时候, beforeCreate 阶段是拿不到 methods 里面的方法的(会报错了).
```

beforeCreate 和 created 有什么区别？

```
beforeCreate 中没有$data
created 中有$data

created 中可以拿到 methods 的方法的
beforeCreate 拿不到 methods 方法
```

#### 1.3 在created 中如何获取 dom

```
1. 只要写异步代码，获取 dom 是在异步中获取的，就可以了
   例如 setTimeout(),请求,Promise.xxx()等等...
2. 使用 Vue 系统内置的 this.$nextTick()
```

#### 1.4一旦进入组件会执行哪些生命周期？

```text
beforeCreated
created
beforeMount
mounted
```

#### 1.5 第二次或者第 N 次进入组件会执行哪些生命周期？

如果当前组件加入了 keep-alive,只会执行一个生命周期

```
activated
```

如果没有加入 keep-alive

```
beforeCreated
created
beforeMount
mounted
```

#### 1.6 父组件引入子组件，那么生命周期执行的顺序是？

```
父：beforeCreated、created、beforeMount
子：beforeCreated、created、beforeMount、mounted
父：mounted
```

#### 1.7 加入 keep-alive 会执行哪些生命周期

如果使用了 keep-alive 组件,当前的组件会额外新增 2 个生命周期(系统 8+ 2) 

```
activated
deactivated
```

如果当前组价加入了 keep-alive,第一次进入这个组件会执行 5 个生命周期

```
beforeCreated
created
beforeMount
mounted
activated
```

#### 1.8 你在什么情况下用过哪些生命周期？说一说生命周期的使用场景

```
created		===> 单组件请求
mounted		===> 同步可以获取 dom,如果子组件请求后父组件请求
activated	===> 判断 id 是否相等,如果不相同发起请求
destroyed	===> 关闭页面,记录视频播放的时间,初始化的时候从上一次的历史开始播放
```

## 2.关于组件

#### 2.1 组件传值(通信)的方式

```
父传后代(后代拿到了父的数据)
1. 父组件引入子组件,绑定数据 
			<List :str1="str1"></List>
		子组件通过 props 来接收
      props:{
        str1:{
          type:String,
          default:''
        }
      }
  ***这种方式: 父传子很方便,但是父传给孙子辈分的组件很麻烦(父->子,子->孙子)
  这种方式: 子组件不能直接修改父组件的数据
  
2. 	子组件直接使用父组件的数据
子组件通过: this.$parent.xxx 使用父组件的数据
这种方式: 子组件可以直接修改父组件的数据
3. 依赖注入
    父组件
    <script>
      provide(){
        return {
          val1:'这是父组件的依赖'
        }
      }
    </scirpt>
    后代组件:
    <script>
      inject:['val1']
    <script>
优势:父组件可以直接向某个后代组件传值(不用一级一级传递)
```

```
后代传父(父拿到了后代的数据)
1. 子组件传值给父组件
	子组件定义自定义事件 this.$emit
2. 父组件直接拿到子组件的数据
	<List ref="child"></List>
	this.$refs.child.xxx
```

```
平辈之间的传值(兄弟可以拿到数据)

通过新建 bus.js 文件来做
```

bus.js

```js
import Vue from 'vue'

export default new Vue();
```

#### 2.2 父组件如何直接修改子组件的值

```
<List ref="child"></List>
	this.$refs.child.xxx = 'xxxxxx';
```

#### 2.3 子组件如何直接修改父组件的值

```
子组件中可以使用:this.$parent.xxx去修改
```

#### 2.4 如何找到父组件

```
this.$parent
```

#### 2.5 如何找到根组件

```
this.$root
```

#### 2.6 keep-alive

```
keep-alive 是什么: 缓存当前组件的
```

#### 2.7 插槽slot

```
匿名插槽: 没有名字的插槽
```

```
具名插槽: 有名字的插槽
```

```
作用域插槽: 传值,传递类似于父组件向子组件传值,接收需要解构
```

#### 2.8 provide/inject 

```
provide/inject ===> 依赖注入,用于向后代组件传值
```

#### 2.9 如何封装组件

```
组件一定要难点,涉及到的知识点:slot,组件通信...
```

## 3. 关于Vuex

#### 3.1 Vuex 有哪些属性

```
state: 		==>	定义全局共享属性
getters: 	==>	针对 state 数据进行二次计算
mutations:==>	存放同步的方法
actions: 	==>	存放异步方法的,并且是用来提交 mutations
modules: 	==>	把 vuex 再次进行模块之间的划分
```

#### 3.2 Vuex 使用 state 值

```
this.$store.state.xxx
```

```
辅助函数: mapState
```

以上两种方式都也可以拿到 state 的值, 那么区别是什么?

```
使用 this.$store.state.xxx 时可以直接修改 vuex 的 state 数据的
使用辅助函数的形式, 是不可以修改的
```

#### 3.3 Vuex 的 getters 值修改

面试官可能会这样问:组件中使用了 getters 中的内容, 组件是采用 v-model 的形式会发生什么?

```
getters 是不可以修改的
```

#### 3.4 Vuex 的 mutations 和 actions 区别

```
相同点:	mutations 和 actions 都是用来存放全局方法的,这个全局方法 return的值拿不到
```

```
区别:	 
	mutations	==>	同步
	actions		===>异步的,返回的是一个 Promise 对象,他可以执行相关的异步操作

mutations 是来修改 state 的值的,actions 的作用是来提交 mutations 的
```

#### 3.5 Vuex 持久化存储

在页面中使用 state 的值:1, 然后把 1 修改成 2, 然后刷新页面又回到了 1, 为什么?

````
vuex 本身不是持久化存储数据的. Vuex是一个状态管理仓库(state:全局属性)==> 就是存放全局属性的地方
````

```
实现持久化存储: 1. 自己写 localStorage 2. 使用 vuex-persistedstate 插件
```



## 4. 关于路由

#### 4.1 路由的模式和区别

```
 路由模式:history,hash
```

```
区别: 
1. 关于找不到当前页面发送请求的问题
	history 会给后端发送一次请求而 hash 不会
2. 关于项目打包前端自测问题
	hash 是可以看到内容的
	history 默认情况下看不到内容
3. 关于表象不同
	hash:#
	history:/
```

#### 4.2 子路由和动态路由

#### 4.3 路由传值

#### 4.4 导航故障

同页面跳转出现

解决:

```javascript
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(error=>error)
}
```

#### 4.5 $router 和$route 的区别

```
$router:不仅包含当前路由, 还包含整个路由的属性和方法
$route:包含当前路由对象
```

#### 4.6 导航守卫

 ```
 1. 全局守卫
 	beforeEach:路由进入之前
 	afterEach: 路由进入之后
 2. 路由独享守卫
 	beforeEnter:路由进入之前
 3. 组件内守卫
 	beforeRouteEnter:路由进入之前
 	beforeRouteUpdate:路由更新之前
 	beforeRouteLeave:路由离开之前
 ```



## 5.关于 API

#### 5.1 $set

```
面试官:你有没有碰到过,数据更新试图没有更新的问题===>$set
```

```
this.$set(target, key,  修改后的值)
```

#### 5.2 $nextTick

```
$nextTick 返回的参数[函数], 是一个异步的。功能: 获取更新后的 dom
```

#### 5.3 $refs

```
来获取 dom 的
```

#### 5.4 $el

```
$el: 获取当前组件的根节点 
```

#### 5.5 $data

```
$data: 获取当前组件 data 的数据
```

#### 5.6 $children

```
$children: 是获取当前组件的所有子组件的
```

#### 5.7 $parent

```
找到当前组件的父组件,如果找不到返回自身
```

#### 5.8 $root

```
找到根组件
```

#### 5.9 data 自定义数据

```
数据定义在 data 的 return 内和 return 外的区别:
1. return 外: 单纯修改这个数据是不可以修改的,因为没有 set 和 get
2. return 内: 是可以修改的
```

#### 5.10 computed 计算属性

```
computed 计算属性的结果值, 可以修改吗? 可以的,需要通过 get/set 写法
 
当前组件 v-model 绑定的值是 computed 来的,可以修改吗? 可以的, 需要通过 get/set 写法
```

#### 5.11 watch

```

```

#### 5.12 methods 和 computed 区别

```
computed 是有缓存机制的, methods是没有缓存机制的(调用几次执行几次)
```

## 6. 关于指令

#### 6.1 如何自定义指令

```
全局指令:  main.js
Vue.directive('demo',{
	inserted: function(a, b, c){
		console.log(a, b, c)
	}
})
```

```
局部指令: 某一个组件内
<script>
export default {
	directives: {
		demo: {
			bind: function (el) {
				console.log(el,1)
			}
		}
	}
}
</script>
```

#### 6.2 vue 单向绑定

```
双向绑定: v-model
单向绑定: v-bind
```

#### 6.3 v-if 和 v-for 的优先级

```
vue2 中, v-for 的优先级大于 v-if
Vue3 中, v-if 的优先级大于 v-for
```

## 7. 关于原理

#### 7.1 $nextTick 原理

微任务:Promise.then  setImmediate MutationObserver

宏任务:setTimeout

```
$nextTick(callback){
	return new Promise.resolve().then(callback())
}
```

#### 7.2 



