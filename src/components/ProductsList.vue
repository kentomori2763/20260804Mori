<script setup>
import { computed } from 'vue'
import { useProductStore } from '../stores/product'

const store = useProductStore()

// stateとgetterを参照
const products = computed(() => store.products)
const totalPrice = computed(() => store.totalPrice)

// actionsを呼び出す処理
const addToCart = (product) => {
  store.addToCart(product)
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="item in products"
        :key="item.id"
        cols="12" sm="6" md="4"
      >
        <v-card class="d-flex flex-column justify-space-between" height="100%">
          <!-- 商品画像 -->
          <v-img
            :src="item.image"
            height="150px"
            cover
          ></v-img>

          <!-- 商品名と詳細 -->
          <v-card-title class="text-h6">{{ item.name }}</v-card-title>
          <v-card-subtitle>
            {{ item.price }}円 / {{ item.quantity }}個
          </v-card-subtitle>
          <v-card-text>
            {{ item.description }}
          </v-card-text>

          <!-- カート追加ボタンをカード下部中央に配置 -->
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              variant="elevated"
              prepend-icon="mdi-cart-plus"
              @click="addToCart(item)"
            >
              追加
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 合計金額 -->
  <v-divider class="my-4"></v-divider>
  <p class="text-subtitle-1 font-weight-bold text-center">
    合計金額：{{ totalPrice }}円
  </p>
</template>