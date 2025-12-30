<script setup lang="ts">
import type { FetchError } from 'ofetch'

const email = ref('')
const password = ref('')
const { fetch: fetchSession } = useUserSession()

const handleLogin = async () => {
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: { email: email.value, password: password.value }
  })
  .then(async () => {
    await fetchSession()
    await navigateTo('/')
  })
  .catch((err: FetchError<{ statusMessage: string }>) => {
    alert(err.data?.statusMessage || '登入失敗')
  })
}

const handleRegister = async () => {
  // 1. 執行請求
  await $fetch('/api/auth/register', {
    method: 'POST',
    body: { email: email.value, password: password.value }
  })
  .then(async () => {
    // 2. 這裡處理成功：刷新 Session 並跳轉
    await fetchSession()
    return navigateTo('/')
  })
  .catch((err: FetchError<{ statusMessage: string }>) => {
    // 3. 這裡處理失敗：顯示後端傳回的錯誤訊息
    alert(err.data?.statusMessage || '註冊失敗')
  })
}
</script>

<template>
  <div class="p-8 w-[500px]">
    <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 block mb-2" />
    <input v-model="password" type="password" placeholder="密碼" class="w-full border p-2 block mb-4" />
    
    <div class="flex justify-between w-full">
      <button @click="handleLogin" class="bg-blue-500 text-white p-2">登入</button>
      <button @click="handleRegister" class="bg-green-500 text-white p-2">註冊新帳號</button>
    </div>
  </div>
</template>