<template>
  <el-container class="container-home">
    <el-aside :width="isOpen?'200px':'64px'" class="my-aside">
      <!-- logo区域 -->
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <!-- 导航菜单 -->
      <el-menu
      default-active="2"
      background-color="#002233"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="border-right:none"
      :collapse="!isOpen"
      :collapse-transition="false">
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
         <el-menu-item index="3">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
         <el-menu-item index="4">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
         <el-menu-item index="5">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
         <el-menu-item index="6">
        <i class="el-icon-present"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
         <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
      <el-container>
        <el-header class="my-header">
          <span class="icon el-icon-s-fold" @click="toggleMenu"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 右边下拉菜单 -->
          <el-dropdown class="my-dropdown" @command="handleClick">
          <span class="el-dropdown-link">
          <!-- 用户头像 -->
          <img class="head" :src="photo" alt="">
          <!-- 用户名称 -->
          <strong class="name">{{name}}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-header>
        <el-main>
          <!-- 二级路由显示位置 -->
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-container>
</template>

<script>
// 导入auth模块
import auth from '../../utils/auth'
export default {
  name: 'app-home',
  data () {
    return {
      isOpen: true,
      name: '',
      photo: ''
    }
  },
  created () {
    // 获取用户信息
    this.getuserInfo()
  },
  methods: {
    // 处理下拉菜单的点击
    handleClick (command) {
      // 跳转到个人设置
      if (command === 'setting') {
        this.$router.push('/setting')
      }
      // 退出登录
      if (command === 'logout') {
        // 先清除token
        auth.delUser()
        // 在退出登录
        this.$router.push('/login')
      }
    },
    // 获取用户信息函数
    getuserInfo () {
      const user = auth.getUser()
      this.name = user.name
      this.photo = user.photo
    },
    toggleMenu () {
      // 切换状态 展开状态,收起的状态
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="less" scoped>
.container-home{
  width: 100%;
  height:100%;
  position: absolute;
  top: 0;
  left: 0;
  // background-color: blue;
  .my-aside{
    background-color: #002233;
    .logo{
      width: 100%;
      height: 60px;
      // background: ..... 前面是背景图定位/ 背景图尺寸
      background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto;
    }
    .minLogo{
      background: url(../../assets/logo_admin_01.png) no-repeat center / 36px auto;
    }
  }
  .my-header{
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon{
      font-size: 24px;
      vertical-align: middle;
    }
    .text{
      vertical-align: middle;
      padding-left: 10px;
    }
    .my-dropdown{
      float: right;
      .head{
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name{
        padding-left: 5px;
        vertical-align: middle;
      }
    }
  }
}
</style>
