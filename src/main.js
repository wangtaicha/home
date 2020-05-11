// 导包
import Vue from 'vue'
import App from './App.vue'

// false就是开发阶段的
// true是上线阶段的
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
