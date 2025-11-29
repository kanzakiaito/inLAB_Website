import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  // Find user
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Compare password
  const isValid = await compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Create JWT token
  const token = await createToken(user.id, user.username);

  // Set cookie
  const response = NextResponse.json({
    message: "Login successful",
    user: { id: user.id, username: user.username }
  });

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}