<script setup lang="ts">
// 定義輸入欄位的變數
const email = ref('')
const password = ref('')

const { fetch: fetchSession } = useUserSession()

const handleEmailLogin = async () => {
  try {
    await $fetch('/api/auth/login', { 
      method: 'POST', 
      body: { 
        email: email.value, 
        password: password.value 
      } 
    })
    await fetchSession()
    await navigateTo('/')
  } catch (error) {
    alert('登入失敗，請檢查帳號密碼')
  }
}
</script>

<template>
  <div class="p-4">
    <div class="flex flex-col gap-2 max-w-sm mb-4">
      <input v-model="email" type="email" placeholder="Email" class="border p-2" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2" />
      <button @click="handleEmailLogin" class="bg-blue-500 text-white p-2">Email Login</button>
    </div>

    <hr class="my-4" />

    <!-- <div class="flex gap-2">
      <a href="/auth/google" class="bg-red-500 text-white p-2">Google Login</a>
      <a href="/auth/github" class="bg-black text-white p-2">GitHub Login</a>
      <a href="/auth/facebook" class="bg-blue-800 text-white p-2">Facebook Login</a>
    </div> -->
  </div>
</template>