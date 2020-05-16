// 导包
import Vue from 'vue'
import App from './App.vue'
// 导入自己配置的axios
import axios from '@/api'
// 导入自己封装的全局组件
import plugin from '@/plugin'
// 导入路由
import router from '@/router'
// 引入饿了么UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 注册自己的组件
Vue.use(plugin)
// 使用ElementUI
Vue.use(ElementUI)
// 挂载$http对象,就是axiso
Vue.prototype.$http = axios
// false就是开发阶段的
// true是上线阶段的
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
