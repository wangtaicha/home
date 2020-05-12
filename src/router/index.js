// 进行路由的初始化和配置
// 引入vue-router
import VueRouter from 'vue-router'
// 注册
// 引入vue
import Vue from 'vue'
// 一级路由
import Login from '@/views/login' // 登录组件
Vue.use(VueRouter)
// 初始化
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login }
  ]
})

export default router
