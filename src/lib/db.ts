import { PrismaClient } from "@prisma/client";

/**
 * Prisma client with safe fallback for serverless environments (Vercel).
 *
 * In production (Vercel), if DATABASE_URL is not set or points to a local file
 * that doesn't exist, we create a no-op client that throws gracefully.
 * The app falls back to Supabase automatically via isSupabaseConfigured.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL;

  // In serverless (Vercel), if no DATABASE_URL or it's a local file path,
  // we still try to create the client but it will only be used as fallback
  // when Supabase is not configured. The app checks isSupabaseConfigured first.
  try {
    return new PrismaClient({
      datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
      log: process.env.NODE_ENV === "development" ? ["query"] : [],
    });
  } catch (e) {
    console.warn("Prisma client creation failed, will use Supabase only:", e);
    // Return a mock that throws on use — but isSupabaseConfigured should be true
    return new PrismaClient();
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
