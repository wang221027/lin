import request from '@/utils/request'
import qs from 'qs'
enum API {
  // 获取用户信息
  getUserInfo = 'api/getUserInfo',
  // 编辑个人资料
  updateUserInfo = 'api/updateUserInfo',
  // 获取用户文章
  reqUserList = '/my/article/reqUserListInfo'
}
// 编辑个人资料
export const updateUserInfo = (
  nickname: string,
  info: string,
  gender: string,
  username: string,
  user_id: string
) => request.post(API.updateUserInfo, qs.stringify({ nickname, info, gender, username, user_id }))

// 获取用户信息
export const getUserInfo = (username: string) =>
  request.get(API.getUserInfo + `?username=${username}`)

// 获取用户文章
export const reqUserList = (nickname: string) =>
  request.get(API.reqUserList + `?nickname=${nickname}`)
