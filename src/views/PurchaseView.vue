<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/product'

const store = useProductStore()

// カートに入っている商品だけを抽出
const productsInCart = computed(() => store.products.filter((p) => p.quantity > 0))

// 合計金額をgetterから取得
const totalPrice = computed(() => store.totalPrice)

// ローディング状態と完了メッセージ用のフラグ
const loading = ref(false)
const showPopup = ref(false)

// 購入処理
const handlePurchase = async () => {
  loading.value = true
  await store.purchase()
  loading.value = false
  showPopup.value = true

  // 2秒後にポップアップ非表示
  setTimeout(() => {
    showPopup.value = false
  }, 2000)
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="text-h5 font-weight-bold mb-6 text-center">購入ページ</h2>

        <!-- 商品カード一覧 -->
        <v-row>
          <v-col v-for="item in productsInCart" :key="item.id" cols="12">
            <v-card class="d-flex align-center pa-3">
              <v-img :src="item.image" width="100" height="100" class="mr-4" cover></v-img>

              <!-- 商品名と価格 -->
              <div class="flex-grow-1 text-left">
                <div class="text-h6">{{ item.name }}</div>
                <div class="text-subtitle-2">{{ item.price }}円 × {{ item.quantity }}個</div>
              </div>

              <v-btn icon color="error">
                 <v-icon>mdi-delete</v-icon>
            </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <!-- 合計金額 -->
        <v-divider class="my-4"></v-divider>
        <p class="text-subtitle-1 font-weight-bold text-center">合計金額：{{ totalPrice }}円</p>

        <!-- 購入ボタン -->
        <div class="text-center mt-4">
          <v-btn
            color="success"
            :loading="loading"
            :disabled="loading || productsInCart.length === 0"
            @click="handlePurchase"
          >
            購入する
          </v-btn>
        </div>

        <!-- 購入完了メッセージ -->
        <v-alert
          v-if="showPopup"
          type="success"
          class="mt-6 text-center"
          border="start"
          elevation="2"
        >
          購入が完了しました！
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>