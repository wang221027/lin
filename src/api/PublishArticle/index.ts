import request from '@/utils/request'
import qs from 'qs'
enum API {
  // 向后端发送封面url
  ReqArticle = '/my/article/articleCover',
  // 发布文章
  PublishArticle = '/my/article/pubArticle',
  // 当页面加载完毕后清楚上一次选中的封面
  reqClearImage = '/my/article/clearImage'
}
export const reqPublishArticle = (
  title: string,
  content: string,
  type: string,
  nickname: string,
  user_id: string
) => {
  return request.post(API.PublishArticle, qs.stringify({ title, content, type, nickname, user_id }))
}
// 向后端发送封面url
export const ReqArticle = (formData: object) => {
  return request.post(API.ReqArticle, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 当页面加载完毕后清楚上一次选中的封面
export const reqClearImage = () => request.get(API.reqClearImage)
