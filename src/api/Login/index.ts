import request from '@/utils/request'
import type { ILoginType } from './type'
import qs from 'qs'
enum API {
  Login = '/api/login'
}
export const reqLogin = (username: string, password: string) =>
  request.post<any, ILoginType>(API.Login, qs.stringify({ username, password }))
