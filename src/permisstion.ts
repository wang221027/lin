//路由鉴权:就是路由能不能被访问到权限设置->全局守卫完成
//引入路由器
import router from '@/router'
//存储用户未登录可以访问路由得路径
let whiteList = [
  '/home',
  '/login',
  '/register',
  '/articleHome',
  '/articleCover',
  '/PersonalFiling',
  '/InRegardTo',
  '/MobileNumberLogin'
]
// 引入 Element-plus message消息提示
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from './utils/user'
//添加相应的全局守卫
//前置守卫
router.beforeEach((to: any, _, next: any) => {
  let token = GET_TOKEN()
  //动态设置网页左上角的标题
  if (token) {
    document.title = `${to.meta.title}`
  }
  //判断用户是否登录-token;
  //用户登陆了
  if (token) {
    next()
  } else {
    //用户未登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      console.log(22)

      next({ path: '/home' })
      ElMessage({
        message: '请登录后操作！',
        type: 'error'
      })
    }
  }
})
