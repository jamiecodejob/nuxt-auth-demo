// server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// 1. 定義全局變數型別，防止開發環境重複初始化
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 2. 初始化連線池
const pool = new Pool({
  connectionString: process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL,
})

// 3. 建立適配器
const adapter = new PrismaPg(pool)

// 4. 建立 PrismaClient 單例
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    // 在開發環境開啟 log，方便你除錯 SQL
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

// 5. 如果不是生產環境，將實例存入全局變數
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}