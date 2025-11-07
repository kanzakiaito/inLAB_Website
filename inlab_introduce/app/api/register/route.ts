import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { username, password, authorName, description, avatarImage } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Create user with optional fields
  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      authorName: authorName || null,
      description: description || null,
      avatarImage: avatarImage || null,
    },
  });

  return NextResponse.json({ message: "Registered successfully!" });
}