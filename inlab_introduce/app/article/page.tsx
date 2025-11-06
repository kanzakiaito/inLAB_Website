"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Youtube, Twitter, Twitch, Globe, Eye, ThumbsUp, Share, Calendar, User, Plus, Edit, Trash2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

type Language = "en" | "th";

interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  category: string;
  image: string;
}

export default function ArticlePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  const translations = {
    en: {
      department: "InLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      articles: "Articles",
      readMore: "Read More",
      views: "views",
      likes: "likes",
      publishedOn: "Published on",
      by: "by",
      joinCommunity: "Join Our Community",
      communityDescription: "Get in touch with our inLAB specialist",
      joinDiscord: "Join Discord",
      addArticle: "Add New Article",
      editArticle: "Edit",
      deleteArticle: "Delete",
      confirmDelete: "Are you sure you want to delete this article?",
      deleteConfirmAction: "Delete",
      cancel: "Cancel",
    },
    th: {
      department: "InLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      articles: "บทความ",
      readMore: "อ่านต่อ",
      views: "การชม",
      likes: "ไลค์",
      publishedOn: "เผยแพร่เมื่อ",
      by: "โดย",
      joinCommunity: "เข้าร่วมห้องปฏิบัติการของพวกเรา",
      communityDescription: "ร่วมพูดคุยกับเหล่า Specialist ใน inLAB อย่างใกล้ชิดได้ที่นี่",
      joinDiscord: "เข้าร่วม Discord",
      addArticle: "เพิ่มบทความใหม่",
      editArticle: "แก้ไข",
      deleteArticle: "ลบ",
      confirmDelete: "คุณแน่ใจหรือไม่ที่จะลบบทความนี้?",
      deleteConfirmAction: "ลบ",
      cancel: "ยกเลิก",
    },
  };

  const navigationItems = [
    {
      title: { en: "CORE TEAM", th: "CORE TEAM" },
      members: { en: "SCIENCE", th: "SCIENCE" },
      code: "CT-01",
      link: "core-team",
    },
    {
      title: { en: "INTERN", th: "INTERN" },
      members: { en: "RESEARCH", th: "RESEARCH" },
      code: "IN-02",
      link: "intern",
    },
    {
      title: { en: "ABOUT US", th: "ABOUT US" },
      members: { en: "INFORMATION", th: "INFORMATION" },
      code: "AB-03",
      link: "about-us",
    },
  ];

  const t = translations[language];

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage whenever it changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleNavClick = (section: string) => {
    router.push(`/${section}`);
  };

  const handleArticleClick = (article: Article) => {
    const formattedDate = article.date.replace(/-/g, '-');
    const articleSlug = article.id;
    router.push(`/article/${formattedDate}/${articleSlug}`);
  };

  const handleAddArticle = () => {
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    // Navigate to new article creation page
    router.push(`/article/${formattedDate}/new`);
  };

  const handleEditArticle = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation(); // Prevent card click
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }
    const formattedDate = article.date.replace(/-/g, '-');
    router.push(`/article/${formattedDate}/${article.id}/edit`);
  };

  const handleDeleteArticle = (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation(); // Prevent card click
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }
    setArticleToDelete(articleId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteArticle = async () => {
    if (articleToDelete) {
      try {
        const res = await fetch(`/api/article?id=${articleToDelete}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete article");
        setArticles(articles.filter(article => article.id !== articleToDelete));
      } catch (error) {
        // Optionally show error to user
      } finally {
        setDeleteDialogOpen(false);
        setArticleToDelete(null);
      }
    }
  }

  const cancelDeleteArticle = () => {
    setDeleteDialogOpen(false);
    setArticleToDelete(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'th') {
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/check");
        setIsAuthenticated(res.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    
    async function fetchArticles() {
      try {
        const res = await fetch("/api/article", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        // Optionally handle error
        setArticles([]);
      }
    }
    
    checkAuth();
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
      {/* Language Toggle and Logout Button */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <LogoutButton className="bg-white/20 border-white/30 text-black hover:bg-white/30" />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleLanguageChange(language === "en" ? "th" : "en")}
          className="bg-white/20 border-white/30 text-black hover:bg-white/30"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === "en" ? "TH" : "EN"}
        </Button>
      </div>

      {/* Header Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Logo and title */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
              className="flex items-center gap-2 sm:mb-5 cursor-pointer"
            >
              <Image
                src="/img/INLABLOGO.png"
                alt="InLAB Logo"
                width={68}
                height={68}
                className="object-contain"
              />
              <div className="flex flex-col">
                <h1 className="text-6xl lg:text-8xl text-black tracking-tight font-staatliches">
                  {t.department}
                </h1>
                <p className="text-xl text-black/80 font-medium font-staatliches -mt-2 lg:-mt-4">
                  {t.subtitle}
                </p>
              </div>
            </a>

            {/* Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 text-black mb-2 lg:mb-0">
              {navigationItems.map((item, index) => {
                const isActive = pathname === `/${item.link}`;
                return (
                  <div
                    key={index}
                    className={`text-left cursor-pointer transition-colors duration-300 p-2 rounded-lg 
                      ${isActive ? "bg-white shadow-md" : "hover:opacity-80"}`}
                    onClick={() => handleNavClick(item.link)}
                  >
                    <div className="text-lg md:text-2xl lg:text-3xl mb-1 font-staatliches">
                      {item.title[language]}
                    </div>
                    <div className="text-xs lg:text-sm opacity-80 font-mono">
                      {item.members[language]}
                    </div>
                    <div className="text-xs opacity-60 font-mono">
                      {item.code}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right section info */}
            <div className="hidden lg:block">
              <div className="text-right text-black flex items-center gap-4">
                <div>
                  <div className="text-4xl font-staatliches">{t.section}</div>
                  <div className="text-xl font-mono">Sun Synchronous Orbit</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Black bar */}
        <div className="h-4 bg-black"></div>
      </div>

      {/* Hero Section */}
      <div
        className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        style={{
          backgroundImage: "url('/img/bg/working_space.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl text-shadow-md text-white font-staatliches leading-tight ${
                language === "th" ? "font-kanit" : "font-staatliches"
              }`}>
            {t.articles.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Black bar */}
      <div className="h-4 bg-black"></div>

      {/* Articles Section */}
      <div className="bg-white flex-grow py-12">
        <div className="container mx-auto px-4">
          {/* Add Article Button */}
          {isAuthenticated && (
            <div className="flex justify-end mb-8">
              <Button
                onClick={handleAddArticle}
                className={`bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                <Plus className="w-5 h-5 mr-2" />
                {t.addArticle}
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="bg-black text-white overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 relative group"
                onClick={() => handleArticleClick(article)}
              >
                {/* Action buttons overlay */}
                {isAuthenticated && (
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => handleEditArticle(e, article)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2"
                      title={t.editArticle}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => handleDeleteArticle(e, article.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2"
                      title={t.deleteArticle}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <div className="relative">
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-orange-500 text-black font-mono text-xs px-3 py-1">
                      {article.category}
                    </Badge>
                  </div>
                  {/* Article Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <Image
                      src={article.image || '/img/placeholder.png'}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  {/* Article Title */}
                  <h3 className={`text-xl font-bold mb-3 text-orange-400 ${
                    language === "th" ? "font-kanit" : "font-mono"
                  }`}>
                    {article.title}
                  </h3>
                  {/* Article Description */}
                  <div 
                    className={`text-orange-300 text-sm mb-4 line-clamp-3 ${
                      language === "th" ? "font-kanit" : "font-mono"
                    }`}
                    dangerouslySetInnerHTML={{ __html: article.description }}
                  />
                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="font-mono">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className="font-mono">{formatDate(article.date)}</span>
                      </div>
                    </div>
                  </div>
                  {/* Stats and Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span className="font-mono">{article.views} {t.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span className="font-mono">{article.likes}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`bg-orange-500 hover:bg-orange-600 text-black font-bold ${
                        language === "th" ? "font-kanit" : "font-mono"
                      }`}
                    >
                      {t.readMore}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="h-4 bg-black"></div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3
            className={`text-2xl font-bold mb-4 ${
              language === "th" ? "font-kanit" : "font-mono"
            }`}
          >
            {t.joinCommunity}
          </h3>
          <p
            className={`text-gray-400 mb-6 max-w-2xl mx-auto ${
              language === "th" ? "font-kanit" : "font-mono"
            }`}
          >
            {t.communityDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/yK6bxAFx7F"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsDiscordHovered(true)}
              onMouseLeave={() => setIsDiscordHovered(false)}
            >
              <Button
                size="lg"
                variant="outline"
                className={`bg-indigo-500 border-white text-white hover:bg-white hover:text-black cursor-pointer ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                <Image
                  src={
                    isDiscordHovered
                      ? "/img/discord_black.png"
                      : "/img/discord.png"
                  }
                  alt="Discord Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {t.joinDiscord}
              </Button>
            </a>
          </div>
        </div>
        <div className="text-center pt-8 text-sm text-orange-300">
          © 2025 InLAB, Outreach division.
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className={language === "th" ? "font-kanit" : "font-mono"}>
              {t.deleteArticle}
            </DialogTitle>
            <DialogDescription className={language === "th" ? "font-kanit" : "font-mono"}>
              {t.confirmDelete}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={cancelDeleteArticle}
              className={language === "th" ? "font-kanit" : "font-mono"}
            >
              {t.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteArticle}
              className={`bg-red-500 hover:bg-red-600 ${language === "th" ? "font-kanit" : "font-mono"}`}
            >
              {t.deleteConfirmAction}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}