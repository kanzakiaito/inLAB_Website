import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get all articles with their stats
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        views: true,
        likes: true,
        shares: true,
        date: true,
        slug: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    // Calculate total stats
    const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
    const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
    const totalShares = articles.reduce((sum, article) => sum + article.shares, 0);

    // For kanzaki_aito, include page traffic data
    let pageTraffic = null;
    if (user.username === "kanzaki_aito") {
      // This would connect to your analytics service
      // For now, returning mock data structure
      pageTraffic = {
        totalPageViews: totalViews,
        uniqueVisitors: Math.floor(totalViews * 0.7), // Mock calculation
        articlesCount: articles.length,
      };
    }

    return NextResponse.json({
      articles,
      totalViews,
      totalLikes,
      totalShares,
      pageTraffic,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
