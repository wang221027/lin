//统一管理首页模块接口
import request from '@/utils/request'
import qs from 'qs'
//通过枚举管理首页模块的接口地址
enum API {
  // 用户更换头像
  UPDATE_USER_COVER = '/my/article/avatar',
  // 根据id获取用户头像url
  GET_ARTICLE_COVER = 'api/article/getUserPic'
}
// 用户更换头像
export const unDateUserCover = (formData: any, user_id: string) => {
  return request.post(API.UPDATE_USER_COVER + '/' + user_id, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 根据id获取用户头像url
export const reqArticleCover = (id: string) => {
  return request({
    url: API.GET_ARTICLE_COVER,
    method: 'post',
    data: qs.stringify({
      id
    })
  })
}
