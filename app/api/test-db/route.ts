// app/api/test-db/route.ts

import { prisma } from "@/lib/prisma";

export async function GET() {
  const count = await prisma.user.count();

  return Response.json({
    ok: true,
    userCount: count,
    databaseUrl: process.env.DATABASE_URL?.includes("neon")
      ? "NEON"
      : "LOCAL",
  });
}