// 对外暴露常量路由
export const constantRoute = [
  // 首页
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/Home/index.vue'),
    meta: { title: '首页' }
  },
  // 博客
  {
    name: 'articleHome',
    path: '/articleHome',
    component: () => import('@/views/ArticleHome/index.vue'),
    meta: { title: '博客' }
  },
  // 发布文章
  {
    name: 'publishArticle',
    path: '/publishArticle',
    component: () => import('@/views/PublishArticle/index.vue'),
    meta: { title: '发布文章' }
  },
  // 文章详情
  {
    name: 'articleCover',
    path: '/articleCover',
    component: () => import('@/views/ArticleCover/index.vue'),
    meta: { title: '文章详情' }
  },
  // 登录
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录' }
  },
  // 注册
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register/index.vue'),
    meta: { title: '注册' }
  },
  // 聊天室
  {
    name: 'ChatRoom',
    path: '/ChatRoom',
    component: () => import('@/views/ChatRoom/index.vue'),
    meta: { title: '聊天室' },
    redirect: '/ChatRoom/message',
    children: [
      {
        name: 'message',
        path: '/ChatRoom/message',
        component: () => import('@/views/ChatRoom/Message/index.vue'),
        meta: { title: '聊天' }
      },
      {
        name: 'user',
        path: '/ChatRoom/user',
        component: () => import('@/views/ChatRoom/User/index.vue'),
        meta: { title: '好友' }
      }
    ]
  },
  // 个人归档
  {
    name: 'PersonalFiling',
    path: '/PersonalFiling',
    component: () => import('@/views/PersonalFiling/index.vue'),
    meta: { title: '个人归档' }
  },
  // 关于
  {
    name: 'InRegardTo',
    path: '/InRegardTo',
    component: () => import('@/views/InRegardTo/index.vue'),
    meta: { title: '关于' }
  },
  // 手机号登录
  {
    name: 'MobileNumberLogin',
    path: '/MobileNumberLogin',
    component: () => import('@/views/MobileNumberLogin/index.vue'),
    meta: { title: '手机号登录' }
  },
  // 个人主页
  {
    name: 'PersonalCenter',
    path: '/PersonalCenter',
    component: () => import('@/views/PersonalCenter/index.vue'),
    meta: { title: '个人主页' }
  },
  // 重定向，在项目跑起来的时候，访问/, 立马让他重定向到首页
  {
    path: '/',
    redirect: '/home'
  }
]
