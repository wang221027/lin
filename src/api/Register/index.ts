import request from '@/utils/request'
import qs from 'qs'
enum API {
  Register = '/api/register'
}
export const reqRegister = (nickname: string, username: string, password: string) =>
  request.post(API.Register, qs.stringify({ nickname, username, password }))
