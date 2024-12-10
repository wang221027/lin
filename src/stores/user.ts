import { defineStore } from 'pinia'
import { GET_TOKEN } from '@/utils/user'
export const useUserStore = defineStore('user', {
  state() {
    return {
      token: GET_TOKEN() || '',
      username: localStorage.getItem('username') || '',
      nickname: localStorage.getItem('nickname') || ''
    }
  },
  actions: {}
})
