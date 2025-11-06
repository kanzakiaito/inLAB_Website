import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json();

    if (!articleId) {
      return NextResponse.json({ message: "Article ID is required" }, { status: 400 });
    }

    const article = await prisma.article.update({
      where: { id: articleId },
      data: { shares: { increment: 1 } },
    });

    return NextResponse.json({ shares: article.shares });
  } catch (error) {
    console.error("Error incrementing share:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
