// 基于vue的插件
// 导入bread插件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel' // 导入频道组件
import MyImage from '@/components/my-image' // 封面组件
export default {
  install (vue) {
    vue.component(MyBread.name, MyBread)
    vue.component(MyChannel.name, MyChannel)
    vue.component(MyImage.name, MyImage)
  }
}
