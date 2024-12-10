import request from '@/utils/request'
import type { ArticleList } from './type'
enum API {
  // 获取文章列表
  ReqArticleHome = '/getArticleList',
  // 用户点赞
  REQ_USER_LIKE = '/my/article/userLike',
  // 浏览文章
  REQ_BROWSE_ARTICLE = '/my/article/browseArticle'
}
// 获取文章列表
export const reqArticleHome = () => request.get<any, ArticleList>(API.ReqArticleHome)
// 用户点赞
export const reqUserLike = (id: number, nickname: string) =>
  request.post(API.REQ_USER_LIKE + '/' + id + '/' + nickname)

// 浏览文章
export const reqBrowseArticle = (id: number, nickname: string) =>
  request.post(API.REQ_BROWSE_ARTICLE + '/' + id + '/' + nickname)
