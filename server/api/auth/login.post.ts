// server/api/auth/login.post.ts
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.email || !body.password) {
    throw createError({ statusCode: 400, statusMessage: '請輸入 Email 和密碼' })
  }

  // 直接使用 prisma，Nuxt 會幫你處理導入
  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })

  if (!user || !user.password || !bcrypt.compareSync(body.password, user.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Email 或密碼錯誤' })
  }

  // 設定 Session
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar
    }
  })

  return { success: true }
})