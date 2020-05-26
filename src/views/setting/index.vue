<template>
    <div class='container-setting'>
      <el-card>
        <div slot="header">
          <my-bread>个人设置</my-bread>
        </div>
        <!-- 栅格系统 -->
        <el-row>
          <el-col :span="12">
            <el-form label-width="120px">
              <el-form-item label="编号: ">{{user.id}}</el-form-item>
              <el-form-item label="手机号: ">{{user.mobile}}</el-form-item>
              <el-form-item label="媒体名称: ">
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍: ">
                <el-input v-model="user.intro" type="textarea" :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="邮箱: ">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveSetting">保存设置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :http-request= "saveUserPhoto"
              :show-file-list="false"
              >
              <img v-if="user.photo" :src="user.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center; font-size:13px;">修改头像</p>
          </el-col>
        </el-row>
      </el-card>
    </div>
</template>

<script>
// 导入eventBus
import eventBus from '@/eventBus'
// 导入auth模块
import auth from '@/utils/auth'
export default {
  name: 'app-setting',
  data () {
    return {
      // 用户信息
      user: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
      // 用户头像
      // imageUrl: ''
    }
  },
  created () {
    // 获取个人信息
    this.gteUserInfo()
  },
  methods: {
    // 修改用户头像
    async saveUserPhoto ({ file }) {
      try {
        // console.log(info)
        const fd = new FormData()
        fd.append('photo', file)
        // 发送请求
        const res = await this.$http.patch('user/photo', fd)
        // 让头像显示
        this.user.photo = res.data.data.photo
        // 提示信息
        this.$message.success('头像修改修改成功')
        // 本地同步
        // 1. 获取本地信息
        const user = auth.getUser()
        // 2. 修改头像信息
        user.photo = res.data.data.photo
        // 3. 保存用户信息
        auth.setUser(user)
        // home组件同步
        eventBus.$emit('settingUserPhoto', res.data.data.photo)
      } catch (e) {
        this.$message.success('操作失败')
      }
    },
    // 修改用户信息
    async saveSetting () {
      try {
        // 使用结构赋值分别this.user中的三个数据去出
        const { name, intor, email } = this.user
        await this.$http.patch('user/profile', { name, intor, email })
        // 提示信息
        this.$message.success('修改用户信息成功')
        // 本地用户信息需要修改
        const user = auth.getUser()
        // 修改用户信息
        user.name = name
        // 保存用户信息
        auth.setUser(user)
        // 同步home组件
        eventBus.$emit('setgingUserName', name)
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    // 获取用户信息
    async gteUserInfo () {
      const res = await this.$http.get('user/profile')
      // console.log(res)
      this.user = res.data.data
      // this.imageUrl = res.data.data.photo
    }
  }
}
</script>

<style lang="less" scoped>
</style>
