import pkg from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const { PrismaClient } = pkg as any

const globalForPrisma = globalThis as unknown as {
  prisma?: InstanceType<typeof PrismaClient>
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(
      new Pool({
        connectionString:
          process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL,
      }),
    ),
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
