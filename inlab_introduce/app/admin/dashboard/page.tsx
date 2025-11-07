"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, LogOut, UserPlus, Newspaper, Settings, BarChart3, Eye, Heart, Share2, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface User {
  id: string;
  username: string;
  avatarImage?: string | null;
}

interface ArticleStats {
  id: string;
  title: string;
  author: string;
  views: number;
  likes: number;
  shares: number;
  date: string;
  slug: string | null;
}

interface Analytics {
  articles: ArticleStats[];
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  pageTraffic: {
    totalPageViews: number;
    uniqueVisitors: number;
    articlesCount: number;
  } | null;
}

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchAnalytics();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setCurrentUser(data.user);
    } catch (error) {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✓ User created successfully!");
        setNewUsername("");
        setNewPassword("");
      } else {
        setMessage(`✗ ${data.message || "Failed to create user"}`);
      }
    } catch (error) {
      setMessage("✗ Error creating user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Header Skeleton */}
        <div className="bg-black/50 border-b border-orange-500/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-64 bg-gray-700" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-32 bg-gray-700" />
                <Skeleton className="h-10 w-24 bg-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container mx-auto px-4 py-8">
          {/* Quick Action Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-black/50 border-orange-500/30">
                <CardHeader>
                  <Skeleton className="h-6 w-32 bg-gray-700" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-black/50 border-orange-500/30">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-24 bg-gray-700" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-12 w-32 bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Table Skeleton */}
          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full bg-gray-700" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="bg-black/50 border-b border-orange-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-staatliches text-orange-500">
                InLAB Admin Dashboard
              </h1>
              <Button
                onClick={() => router.push("/article")}
                variant="ghost"
                className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
              >
                <Newspaper className="w-4 h-4 mr-2" />
                Articles
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {currentUser?.avatarImage && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
                    <Image
                      src={currentUser.avatarImage}
                      alt={currentUser.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-sm">
                  <div className="text-gray-400">Logged in as:</div>
                  <div className="text-orange-400 font-mono">{currentUser?.username}</div>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/50 border-orange-500/30 text-white hover:border-orange-500 transition-colors cursor-pointer"
            onClick={() => router.push("/article")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Newspaper className="w-5 h-5" />
                Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">
                Manage your articles
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30 text-white hover:border-orange-500 transition-colors cursor-pointer"
            onClick={() => router.push("/admin/profile")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Settings className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">
                Edit your profile info
              </p>
            </CardContent>
          </Card>

          {currentUser?.username === "archbas" && (
            <Card className="bg-black/50 border-orange-500/30 text-white hover:border-orange-500 transition-colors cursor-pointer"
              onClick={() => router.push("/admin/accounts")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Users className="w-5 h-5" />
                  Account Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Manage all admin accounts
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Analytics Overview */}
        {analytics && (
          <>
            {/* Total Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/30 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-400 text-lg">
                    <Eye className="w-5 h-5" />
                    Total Views
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-500/30 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-red-400 text-lg">
                    <Heart className="w-5 h-5" />
                    Total Likes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{analytics.totalLikes.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/30 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-green-400 text-lg">
                    <Share2 className="w-5 h-5" />
                    Total Shares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{analytics.totalShares.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>

            {/* Page Traffic (archbas only) */}
            {analytics.pageTraffic && currentUser?.username === "archbas" && (
              <Card className="bg-black/50 border-orange-500/30 text-white mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <TrendingUp className="w-5 h-5" />
                    Page Traffic Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Page Views</p>
                      <p className="text-3xl font-bold text-orange-400">
                        {analytics.pageTraffic.totalPageViews.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Unique Visitors</p>
                      <p className="text-3xl font-bold text-orange-400">
                        {analytics.pageTraffic.uniqueVisitors.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Articles</p>
                      <p className="text-3xl font-bold text-orange-400">
                        {analytics.pageTraffic.articlesCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Article Stats Table */}
            <Card className="bg-black/50 border-orange-500/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <BarChart3 className="w-5 h-5" />
                  Article Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Title</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Author</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">Views</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">Likes</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-semibold">Shares</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.articles.map((article) => (
                        <tr key={article.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="py-3 px-4">
                            <div className="max-w-md truncate">{article.title}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-400">{article.author}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-flex items-center gap-1 text-blue-400">
                              <Eye className="w-4 h-4" />
                              {article.views}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-flex items-center gap-1 text-red-400">
                              <Heart className="w-4 h-4" />
                              {article.likes}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-flex items-center gap-1 text-green-400">
                              <Share2 className="w-4 h-4" />
                              {article.shares}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-400 text-sm">
                            {new Date(article.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
