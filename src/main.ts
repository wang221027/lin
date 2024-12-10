import { createApp } from 'vue'
// @ts-ignore
import { createPinia } from 'pinia'
import '@/assets/style/base.css'
import './permisstion'
// @ts-ignore
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 头部
import Header from '@/components/Header/index.vue'
// 底部
import Footer from '@/components/Footer/index.vue'
// 搜索
import Search from '@/components/Search/index.vue'
// 添加好友
import AddUser from '@/components/AddUser/index.vue'
// 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 返回上一级 --- 面包屑
import GoBack from '@/components/GoBack/index.vue'
import ContextMenu from '@/components/ContextMenu/index.vue'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
  zIndex: 99999999
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('Header', Header)
app.component('GoBack', GoBack)
app.component('Footer', Footer)
app.component('Search', Search)
app.component('AddUser', AddUser)
app.component('ContextMenu', ContextMenu)
app.use(createPinia())
app.use(router)
app.mount('#app')
