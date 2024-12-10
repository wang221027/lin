import { ref, onMounted } from 'vue'
// 引入登录api
import { reqLogin } from '@/api/Login/index'
import { ElMessage } from 'element-plus'
// 引入存储token方法
import { GET_TOKEN, SET_TOKEN } from '@/utils/user'
// 引入ts类型
import type { ILoginType } from '@/api/Login/type'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
export default function () {
  // 用户名
  const username = ref('')
  // 密码
  const password = ref('')
  // 登录框是否显示
  const isShow = ref(false)
  const $router = useRouter()
  const $route = useRoute()
  // 登录
  const login = async () => {
    if (username.value === '' || password.value === '') {
      return ElMessage.error('账号或密码不能为空！')
    }
    const result: ILoginType = await reqLogin(username.value, password.value)
    if (result.status === 200) {
      ElMessage.success('登录成功！')
      SET_TOKEN(result.token)
      if (result.user_pic == '') {
        result.user_pic = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
      userStore.token = result.token
      console.log(result)
      localStorage.setItem('nickname', result.nickname)
      localStorage.setItem('username', result.username)
      localStorage.setItem('user_pic', result.user_pic)
      localStorage.setItem('user_id', result.id as string)
      $router.push('/home')
    }
  }
  // 注册
  const goRegister = () => {
    $router.push('/register')
  }
  const goMobileNumberLogin = () => {
    $router.push('/MobileNumberLogin')
  }
  onMounted(() => {
    if (GET_TOKEN()) {
      $router.push('/home')
    }
    if ($route.query.username) {
      username.value = $route.query.username as string
    }
    isShow.value = true
  })
  return {
    username,
    password,
    isShow,
    login,
    goRegister,
    goMobileNumberLogin
  }
}
