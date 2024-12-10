import request from '@/utils/request'
import qs from 'qs'
enum API {
  // 获取文章列表
  ReqArticleCover = '/getArticleCover',
  // 发表评论
  PUT_COMMENT = '/my/article/addComment',
  // 获取所有评论
  REQ_COMMENTS = '/reqComments'
}
export const ArticleCover = (id: number) => request.get(API.ReqArticleCover + `?id=${id}`)
// 发表评论
export const reqComment = (
  alias: string,
  isReply: string,
  avatarUrl: string,
  nickname: string,
  commentId: string,
  userCommentId: any,
  otherUserNames?: string
) => {
  return request({
    url: API.PUT_COMMENT,
    method: 'post',
    data: qs.stringify({
      alias,
      isReply,
      avatarUrl,
      nickname,
      commentId,
      userCommentId,
      otherUserNames
    })
  })
}
// 获取所有评论
export const reqComments = () => request.get(API.REQ_COMMENTS)
