<template>
    <!-- 全屏容器 -->
    <div class="container-login">
        <!-- 卡片 -->
        <el-card class="my-card">
            <img src="../../assets/logo_index.png" alt="">
            <!-- 表单 -->
            <el-form :model="loginForm">
                <!-- 表单项容器 -->
                <el-form-item>
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                 <el-form-item>
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px;margin-right:8px"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <!--:value="true" 作用:选中咱们的复选框,不能进行修改,必须同意  -->
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'app-login',
  data () {
    return {
      // 表单对应的数据对象
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container-login{
    width: 100%;
    height:100%;
    background: blue;
    // 设置绝对定位,依赖窗口高度和宽度
    position: absolute;
    top: 0;
    left: 0;
    background:url(../../assets/login_bg.jpg) no-repeat;
    // 让背景图等比例缩放,铺满容器
    background-size: cover;
    .my-card{
        width: 400px;
        height:350px;
        transform: translate(-50%,-60%);
        position: absolute;
        top: 50%;
        left: 50%;
        img{
            width: 200px;
            display: block;
            margin: 0 auto 10px;
        }
    }
}
</style>
