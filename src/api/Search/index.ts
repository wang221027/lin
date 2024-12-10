import request from '@/utils/request'
enum API {
  // 查询用户信息
  SearchUserInfo = '/my/article/SearchUserInfo'
}
// 查询用户信息
export const reqSearchUserInfo = (username: string) =>
  request.post(API.SearchUserInfo + '/' + username)
