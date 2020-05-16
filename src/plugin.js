// 基于vue的插件
// 导入bread插件
import MyBread from '@/components/my-bread'
export default {
  install (vue) {
    vue.component(MyBread.name, MyBread)
  }
}
