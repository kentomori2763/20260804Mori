<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useUserStore } from './stores/user' //userのstoreをインポート

const userStore = useUserStore()

// アプリ起動と同時にユーザー取得するActionsを実行
onMounted(() => {
  userStore.fetchUser()
})
</script>

<template>
  <header>
    <!-- Vueロゴの代わりにStoreから取得したユーザー写真 -->
    <img
      v-if="userStore.photo"
      :src="userStore.photo"
      alt="User photo"
      class="logo"
      width="125"
      height="125"
    />
    <img
      v-else
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <!-- You did it! の代わりにStoreから取得したユーザー名 -->
      <HelloWorld :msg="userStore.name || 'Loading...'" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/purchase">購入</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  border-radius: 50%; /* 丸くしてプロフィール画像っぽく */
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>