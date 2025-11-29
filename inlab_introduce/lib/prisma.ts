import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
    if (process.env.DATABASE_URL) {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const adapter = new PrismaNeon(pool as any)
        return new PrismaClient({
            adapter,
            log: ['error'],
        } as any)
    }

    // Fallback for non-Neon databases
    return new PrismaClient({
        log: ['error'],
    })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
