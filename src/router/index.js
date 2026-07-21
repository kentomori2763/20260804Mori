import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PurchaseView from '../views/PurchaseView.vue' //購入画面を追加

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: PurchaseView, //購入画面を追加
    },
  ],
})

export default router