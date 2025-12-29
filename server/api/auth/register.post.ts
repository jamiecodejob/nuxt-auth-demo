// server/api/auth/register.post.ts
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event)

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) throw createError({ statusCode: 400, message: 'Email 已被註冊' })

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      provider: 'email'
    }
  })

  await handleUserSession(event, user)
  return { success: true }
})