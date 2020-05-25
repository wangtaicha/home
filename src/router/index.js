// 进行路由的初始化和配置
// 引入vue-router
import VueRouter from 'vue-router'
// 注册
// 引入vue
import Vue from 'vue'
import auth from '@/utils/auth'
// 一级路由
import Login from '@/views/login' // 登录组件
import Home from '@/views/home' // home组件
import Welcome from '@/views/welcome' // Welcome组件 欢迎页面
import Notfound from '@/views/404' // notFound组件 404页面
import Article from '@/views/article' // article组件 内容管理页面
import Image from '@/views/image' // image组件 素材管理页面
import Comment from '@/views/comment' // comment 评论管理页面
import Fans from '@/views/fans' // comment 评论管理页面
import Publish from '@/views/publish' // notFound组件 发布文章页面
Vue.use(VueRouter)
// 初始化
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login }, // 登录
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Article },
        { path: '/image', component: Image },
        { path: '/publish', component: Publish },
        { path: '/comment', component: Comment },
        { path: '/fans', component: Fans }
      ]
    }, // home
    // 通配规则(以上所有的规则不符合的时候,会走这个规则)
    { path: '*', component: Notfound }
  ]
})
// 前置导航守卫
router.beforeEach((to, form, next) => {
  // 出去/login页面,都需要本地存储了token,才能放行
  // 如果 要去的页面不等于'/login' 并且其他页面中没有token 拦截到'/loign'页面进行登录
  if (to.path !== '/login' && !auth.getUser().token) return next('/login')
  // 其他情况放行
  next()
})

export default router
