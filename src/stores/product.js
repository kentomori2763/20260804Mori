import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'リンゴ',
        price: 150,
        quantity: 0,
        description: '新鮮で甘い青森県産のリンゴです。',
        image: 'https://i.gyazo.com/33190ef83fbcba1a1adc62cf75a8c21a.png'
      },
      {
        id: 2,
        name: 'バナナ',
        price: 120,
        quantity: 0,
        description: '朝食やおやつにぴったりのバナナ。',
        image: 'https://i.gyazo.com/8bc6124e09555f55cf860cb5a57d36d9.png'
      },
      {
        id: 3,
        name: 'みかん',
        price: 100,
        quantity: 0,
        description: '冬といえばコタツにみかん！甘酸っぱさが特徴です。',
        image: 'https://i.gyazo.com/0ca2ff93417509680735f9a0a9ff7073.png'
      }
    ]
  }),

  getters: {
    totalPrice: (state) => {
      return state.products.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  },

  actions: {
    // 商品をカートに追加
    addToCart(product) {
      const item = this.products.find(p => p.id === product.id)
      if (item) {
        item.quantity++
      }
    },

    deleteProduct(id){
      const item = this.product (p => (p.quantity = 0))
      if(item){
        item.quantiti = 0
      }  
    },

    // カートを空にする
    clearCart() {
      this.products.forEach(p => (p.quantity = 0))
    },

    // 購入処理（3秒待ってからカートをクリア）
    async purchase() {
      await new Promise(resolve => setTimeout(resolve, 3000))
      this.clearCart()
    }
  }
})