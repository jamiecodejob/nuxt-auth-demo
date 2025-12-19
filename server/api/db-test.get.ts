import { prisma } from '../utils/prisma'

export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({ take: 1 })
  return {
    ok: true,
    users,
  }
})
