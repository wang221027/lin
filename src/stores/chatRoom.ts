import { defineStore } from 'pinia'
export const useUChatRoomStore = defineStore('chatRoom', {
  state() {
    return {
      userList: [] as any[],
      userListLength: null
    }
  },
  actions: {}
})
