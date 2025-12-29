// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    // Session 加密密鑰 (必填，生產環境請設長一點)
    session: {
      password: process.env.NUXT_SESSION_PASSWORD as string,
    },
    // OAuth 設定 (會自動讀取 NUXT_OAUTH_GOOGLE_CLIENT_ID 等環境變數)
    // oauth: {
    //   google: {
    //     clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET
    //   },
    //   github: {
    //     clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
    //     clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET
    //   },
    //   facebook: {
    //     clientId: process.env.NUXT_OAUTH_FACEBOOK_CLIENT_ID,
    //     clientSecret: process.env.NUXT_OAUTH_FACEBOOK_CLIENT_SECRET
    //   }
    //}
  }
})