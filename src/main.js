// 导包
import Vue from 'vue'
import App from './App.vue'
// 导入axios
import axios from 'axios'
// 导入路由
import router from '@/router'
// 引入饿了么UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
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
