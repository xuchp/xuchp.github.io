import{_ as t,c as a,o as n,j as e,a as _}from"./chunks/framework.BvW0rtPM.js";const k=JSON.parse('{"title":"43.Vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？","description":"","frontmatter":{},"headers":[],"relativePath":"InterviewVue/43.Vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？.md","filePath":"InterviewVue/43.Vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？.md"}'),o={name:"InterviewVue/43.Vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？.md"},r=e("h1",{id:"_43-vue-要做权限管理该怎么做-如果控制到按钮级别的权限怎么做",tabindex:"-1"},[_("43.Vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？ "),e("a",{class:"header-anchor",href:"#_43-vue-要做权限管理该怎么做-如果控制到按钮级别的权限怎么做","aria-label":'Permalink to "43.Vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？"'},"​")],-1),l=e("h3",{id:"_1-1-常见权限控制",tabindex:"-1"},[_("1.1 常见权限控制 "),e("a",{class:"header-anchor",href:"#_1-1-常见权限控制","aria-label":'Permalink to "1.1 常见权限控制"'},"​")],-1),s=e("ul",null,[e("li",null,"登录鉴权：用户登录后返回 token，前端将 token 保存到本地，作为用户登录的凭证，每次发送请求时会携带 token，后端会对 token 进行验证。当页面刷新时我们可以使用token 来获得用户权限。"),e("li",null,"访问权限：根据用户是否登录判断能否访问一个页面，通过路由守卫实现判断用户是否有此权限。"),e("li",null,'页面权限：前端配置的路由分为两部分"通用路由配置"和"需要权限的路由配置"。在权限路由中增加访问权限 meta(备注)。用户登录后可得到对应的权限列表，通过权限列表筛查出对应符合的路由信息，最后通过 addRoutes 方法，动态添加路由。'),e("li",null,"按钮权限：按钮权限一般采用自定义指令实现，当用户登录后端会返回对应的按钮权限，在按钮上使用此指令，指令内部会判断用户是否有此按钮权限，如果没有则会移除按钮。")],-1),i=[r,l,s];function c(d,u,h,m,V,p){return n(),a("div",null,i)}const v=t(o,[["render",c]]);export{k as __pageData,v as default};
