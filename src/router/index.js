// 进行路由的初始化和配置
// 引入vue-router
import VueRouter from 'vue-router'
// 注册
// 引入vue
import Vue from 'vue'
// 一级路由
import Login from '@/views/login' // 登录组件
import Home from '@/views/home' // home组件
import Welcome from '@/views/welcome' // Welcome组件 欢迎页面
import Notfound from '@/views/404' // notFound组件 404页面
Vue.use(VueRouter)
// 初始化
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login }, // 登录
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome }
      ]
    }, // home
    // 通配规则(以上所有的规则不符合的时候,会走这个规则)
    { path: '*', component: Notfound }
  ]
})

export default router
