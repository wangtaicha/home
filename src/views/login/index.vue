<template>
    <!-- 全屏容器 -->
    <div class="container-login">
        <!-- 卡片 -->
        <el-card class="my-card">
            <img src="../../assets/logo_index.png" alt="">
            <!-- 表单 -->
            <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
                <!-- 表单项容器 -->
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                 <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px;margin-right:8px"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <!--:value="true" 作用:选中咱们的复选框,不能进行修改,必须同意  -->
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login()" type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import auth from '@/utils/auth'
export default {
  name: 'app-login',
  data () {
    // 自定义校验规则
    const checkMobile = (rules, value, callback) => {
      const reg = new RegExp(/^1[3-9]\d{9}$/)
      // 进行校验(1开头,第二位3-9,其余的9个数组)
      if (!reg.test(value)) {
        // 校验失败
        callback(new Error('手机号格式错误'))
      } else {
        // 校验成功
        callback()
      }
    }
    return {
      // 表单对应的数据对象
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 校验规则
      loginRules: {
        mobile: [
          // required : 是否必填
          // message: 错误提示
          // trigger: 触发校验的时机
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // len: 输入的内容必须是6位
          { len: 6, message: '请输入6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整体表单进行校验
      // 通过this.$refs.loginForm就可以拿到组件实例
      //   console.log(this.$refs.loginForm)
      this.$refs.loginForm.validate((valid) => {
        // valid如果为true, name校验成功
        // console.log(valid)
        if (valid) {
          // 进行登录
          // 请求方式:post
          // 请求地址:http://ttapi.research.itcast.cn/mp/v1_0/authorizations
          // 请求参数:请求体:{mobile,code}
          // 响应内容: 用户相关的信息
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            this.loginForm).then(res => {
            // 响应报文对象(响应状态行,响应头,响应主体,res.data)
            // 本地存储用户信息,使用auth.js模块中setUser函数
            auth.setUser(res.data.data) // 这才用户信息
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('手机号或验证码错误')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 外面的大盒子
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
    // 卡片
    .my-card{
        width: 400px;
        height:350px;
        transform: translate(-50%,-60%);
        position: absolute;
        top: 50%;
        left: 50%;
        // 图片
        img{
            width: 200px;
            display: block;
            margin: 0 auto 10px;
        }
    }
}
</style>
