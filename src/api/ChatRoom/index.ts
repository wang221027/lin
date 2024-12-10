import request from '@/utils/request'
enum API {
  // 获取所有聊天室信息
  reqUsreInfo = '/my/article/reqUsreInfo',
  // 获取所有聊天室好友
  reqUserList = '/my/article/reqUserList',
  // 获取所有好友申请
  reqUser = '/my/article/reqUser'
}
// 获取所有聊天室信息
export const reqUsreInfo = () => request.get(API.reqUsreInfo)
// 获取所有聊天室好友
export const reqUserList = () => request.get(API.reqUserList)
// 获取所有好友申请
export const reqUser = (username: string) => request.post(API.reqUser + '/' + username)
