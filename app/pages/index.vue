<script setup lang="ts">
// 使用 nuxt-auth-utils 提供的 composable 檢查登入狀態
const { loggedIn, user, clear } = useUserSession()

const logout = async () => {
  await clear()
  navigateTo('/login')
}
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