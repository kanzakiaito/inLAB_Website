import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        date: "desc",
      },
    })

    // Transform the data to match the expected format
    const transformedArticles = articles.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      author: article.author,
      date: article.date.toISOString().split("T")[0], // Format as YYYY-MM-DD
      views: article.views,
      likes: article.likes,
      category: article.category,
      image: article.image,
    }))

    return NextResponse.json({ articles: transformedArticles }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Check authentication
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articleData = await request.json()

    const newArticle = await prisma.article.create({
      data: {
        title: articleData.title,
        description: articleData.description,
        author: articleData.author,
        date: new Date(articleData.date),
        views: 0,
        likes: 0,
        category: articleData.category,
        image: articleData.image,
        authorDescription: articleData.authorDescription || null,
        authorAvatar: articleData.authorAvatar || null,
      },
    })

    // Transform response to match expected format
    const transformedArticle = {
      id: newArticle.id,
      title: newArticle.title,
      description: newArticle.description,
      author: newArticle.author,
      date: newArticle.date.toISOString().split("T")[0],
      views: newArticle.views,
      likes: newArticle.likes,
      category: newArticle.category,
      image: newArticle.image,
    }

    return NextResponse.json(
      {
        message: "Article created successfully",
        article: transformedArticle,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  // Check authentication
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articleData = await request.json()

    const updatedArticle = await prisma.article.update({
      where: { id: articleData.id },
      data: {
        title: articleData.title,
        description: articleData.description,
        author: articleData.author,
        date: new Date(articleData.date),
        category: articleData.category,
        image: articleData.image,
        authorDescription: articleData.authorDescription || null,
        authorAvatar: articleData.authorAvatar || null,
      },
    })

    // Transform response to match expected format
    const transformedArticle = {
      id: updatedArticle.id,
      title: updatedArticle.title,
      description: updatedArticle.description,
      author: updatedArticle.author,
      date: updatedArticle.date.toISOString().split("T")[0],
      views: updatedArticle.views,
      likes: updatedArticle.likes,
      category: updatedArticle.category,
      image: updatedArticle.image,
    }

    return NextResponse.json(
      {
        message: "Article updated successfully",
        article: transformedArticle,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  // Check authentication
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get("id")

    if (!articleId) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 })
    }

    await prisma.article.delete({
      where: { id: articleId },
    })

    return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}
