import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json();

    if (!articleId) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    const article = await prisma.article.update({
      where: { id: articleId },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ 
      message: "Like counted",
      likes: article.likes 
    }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to increment likes" }, { status: 500 });
  }
}
