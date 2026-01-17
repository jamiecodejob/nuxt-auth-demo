<script setup lang="ts">
// 使用 nuxt-auth-utils 提供的 composable 檢查登入狀態
const { loggedIn, user, clear } = useUserSession()

const logout = async () => {
  await clear()
  navigateTo('/login')
}
// clear是什麼
// 定義：清除當前使用者的登入狀態，並刪除瀏覽器中存放的加密 Session Cookie。

// 1. clear 執行時發生了什麼事？
// 當你呼叫 await clear() 時，它會依序完成以下動作：

// 發送請求：前端會向後端發送一個 DELETE 或 POST 請求到 /api/_auth/session。

// 銷毀 Cookie：伺服器收到請求後，會通知瀏覽器刪除（或過期）那個用來識別身分的加密 Cookie。

// 重置前端狀態：useUserSession 裡的 user 會變回 null，而 loggedIn 會自動變回 false。
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">首頁</h1>
    
    <div v-if="loggedIn">
      <p class="mb-2">歡迎回來，{{ user?.name || user?.email }}！</p>
      <img v-if="user?.avatar" :src="user.avatar" class="w-12 h-12 rounded-full mb-4" />
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">登出</button>
    </div>
    
    <div v-else>
      <p class="mb-4">你尚未登入。</p>
      <NuxtLink to="/login" class="bg-blue-500 text-white px-4 py-2 rounded">前往登入頁面</NuxtLink>
    </div>
  </div>
</template>