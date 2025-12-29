// server/api/auth/register.post.ts
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // 1. 先檢查使用者
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    // 這裡定義彈窗會顯示的文字
    throw createError({
      statusCode: 400,
      statusMessage: '此 Email 已經註冊過囉，請直接登入！'
    })
  }

  // 2. 建立新使用者
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      provider: 'email',
      name: email.split('@')[0]
    }
  })

  await handleUserSession(event, user)
  return { success: true }
})