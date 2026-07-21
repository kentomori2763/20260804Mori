import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',   // ユーザー名
    photo: ''   // ユーザーの写真URL
  }),

  actions: {
    // APIからランダムユーザーを取得する処理
    async fetchUser() {
      try {
        // 外部API呼び出し
        const res = await axios.get('https://randomuser.me/api/')
        const user = res.data.results[0]

        // APIから取得した名前と写真をstateに保存
        this.name = `${user.name.first} ${user.name.last}`
        this.photo = user.picture.thumbnail
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました', error)
      }
    }
  }
})