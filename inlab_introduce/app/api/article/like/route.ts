import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { articleId, action } = await request.json();

    if (!articleId) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    const updateData = action === 'unlike'
      ? { likes: { decrement: 1 } }
      : { likes: { increment: 1 } };

    const article = await prisma.article.update({
      where: { id: articleId },
      data: updateData,
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
