// 提供了获取用户信息(token)操作相关函数
// 使用sessionStorage来存储用户信息
// 约定两个东西
// 1. key 是 hm-toutiao-93-user
// 2. value 是 json字符串
// 定义成变量之后就无所谓key的长度它足够语义化就可以了
// 在存储用户信息的时候拿到的user肯定是个对象,所以在存储之前需要把对象转换成json字符串,所以
//   你可以使用JSON.stringify(user)来转换我们的用户信息为json格式的字符串
const KEY = 'hm-toutiao-pc-93-user'
// 存储用户信息
const setUser = (user) => {
  window.sessionStorage.setItem(KEY, JSON.stringify(user))
}
// 获取用户信息
const getUser = () => {
  /** 获取用户信息是不需要传参的,只需要根据key去进行获取就可以了,既然是获取,那肯定是需要return的
  所以return获取用户信息之后的值,如何获取,使用window.sessionStorage.getItem(KEY),只需要传入KEY
  即可 */
  /** 但是在这要考虑一些事情: 有可能之前未存储过用户信息,此时获取到的值将会是空(null)
  返回:的值最好是对象我们才好操作,因为传进去的值是json字符串,拿出来之后要不要转换成对象,需要
  转换成对象如果拿到的值是空(null)转换成对象是会有问题的,所以如果没有获取到值,默认一个空对象{}即可
  这样可以保证return的数据是有效的,不至于return一个空(null)使用空做操作是会报错的,所以需要用
  JSON.parse()转换数据,转换成对象,如果没有取到值,我后面给一个默认值叫空对象
  */
  return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}
// 删除用户信息
const delUser = () => {
  window.sessionStorage.removeItem(KEY)
}
// 模块与模块的作用域是相互独立的,如果要使用模块需要导出以上三个函数,通过对象方式导出去
export default {
  setUser,
  getUser,
  delUser
}
// 此时auth模块封装完毕
