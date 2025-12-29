<script setup lang="ts">
const email = ref('')
const password = ref('')
const { fetch: fetchSession } = useUserSession()

// 註冊邏輯
const handleRegister = async () => {
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await fetchSession()
    await navigateTo('/')
  } catch (err: any) {
    alert(err.statusMessage || '註冊失敗')
  }
}

// 登入邏輯 (你原本寫的)
const handleLogin = async () => {
  try {
    await $fetch('/api/api/auth/login', { 
      method: 'POST', 
      body: { email: email.value, password: password.value } 
    })
    await fetchSession()
    await navigateTo('/')
  } catch (err) {
    alert('登入失敗')
  }
}
</script>

<template>
  <div class="p-8">
    <input v-model="email" type="email" placeholder="Email" class="border p-2 block mb-2" />
    <input v-model="password" type="password" placeholder="密碼" class="border p-2 block mb-4" />
    
    <div class="flex gap-4">
      <button @click="handleLogin" class="bg-blue-500 text-white p-2">登入</button>
      <button @click="handleRegister" class="bg-green-500 text-white p-2">註冊新帳號</button>
    </div>
  </div>
</template>