import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const user = await getAuthUser();
  
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  
  // Fetch full user details including avatar
  const fullUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      username: true,
      avatarImage: true,
    },
  });
  
  return NextResponse.json({ 
    authenticated: true,
    user: fullUser || { id: user.userId, username: user.username, avatarImage: null }
  });
}
