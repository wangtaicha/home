// 导出一个配置好的axios提供给main使用
import axios from 'axios'
// 导入auth模块
import auth from '@/utils/auth'
// 导入路由模块
import router from '@/router'
// 对axios进行配置
// 配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置请求头tiken配置
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
// 配置请求拦截器interceptors
axios.interceptors.request.use(config => {
  // 获取本地token 如果有token就追加
  const user = auth.getUser()
  if (user.token) config.headers.Authorization = `Bearer ${user.token}`
  return config
}, error => {
  // 快速创建一个promise对象 只会执行catch
  return Promise.reject(error)
})

// axios响应拦截器
axios.interceptors.response.use(res => {
  // response就是之前then(res)的响应报文对象
  // 这里对response不会做任何处理的
  // 所以直接返回response就可以了
  return res
}, err => {
  // error 就是错误(异常对象)
  // 对相应错误做点什么
  // 当出现401状态的时候,就是后台报错了,跳转道登录页面
  // err.response 是响应报文对象
  // err.response.status 是相应状态码
  if (err.response && err.response.status === 401) {
    // 拦截到登陆页面
    router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
