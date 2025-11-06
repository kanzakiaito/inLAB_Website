"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import LogoutButton from "@/components/LogoutButton"
import { ArrowLeft, Globe, Eye, ThumbsUp, Share2, Calendar, User, Facebook, Twitter, Link } from "lucide-react"

type Language = "en" | "th"

interface Article {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  views: number
  likes: number
  image: string
}

export default function ArticleReadPage({ params }: { params: Promise<{ date: string; slug: string }> }) {
  const [language, setLanguage] = useState<Language>("en")
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(0)
  const [currentViews, setCurrentViews] = useState(0)
  const router = useRouter()
  const [resolvedParams, setResolvedParams] = useState<{ date: string; slug: string } | null>(null)

  const translations = {
    en: {
      backToArticles: "Back to Articles",
      publishedOn: "Published on",
      by: "by",
      views: "views",
      likes: "likes",
      shareArticle: "Share Article",
      likeArticle: "Like Article",
      articleNotFound: "Article not found",
      loading: "Loading...",
      relatedArticles: "Related Articles",
      shareOn: "Share on",
      copyLink: "Copy Link",
      tags: "Tags",
      aboutAuthor: "About the Author",
    },
    th: {
      backToArticles: "กลับไปหน้าบทความ",
      publishedOn: "เผยแพร่เมื่อ",
      by: "โดย",
      views: "การชม",
      likes: "ไลค์",
      shareArticle: "แชร์บทความ",
      likeArticle: "ถูกใจบทความ",
      articleNotFound: "ไม่พบบทความ",
      loading: "กำลังโหลด...",
      relatedArticles: "บทความที่เกี่ยวข้อง",
      shareOn: "แชร์ใน",
      copyLink: "คัดลอกลิงก์",
      tags: "แท็ก",
      aboutAuthor: "เกี่ยวกับผู้เขียน",
    },
  }

  const t = translations[language]

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage whenever it changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const fetchArticle = async () => {
      try {
        const response = await fetch("/api/article")
        if (response.ok) {
          const data = await response.json()
          const foundArticle = data.articles.find((a: Article) => a.id === resolvedParams.slug)

          if (foundArticle) {
            setArticle(foundArticle)
            setCurrentLikes(foundArticle.likes)
            setCurrentViews(foundArticle.views)

            // Check if user has already liked this article
            const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]')
            setIsLiked(likedArticles.includes(foundArticle.id))

            // Increment view count
            await incrementViews(foundArticle.id)
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [resolvedParams])

  const incrementViews = async (articleId: string) => {
    try {
      const response = await fetch(`/api/article/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleId }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setCurrentViews(data.views)
      }
    } catch (error) {
      console.error("Error incrementing views:", error)
    }
  }

  const handleLike = async () => {
    if (!article) return
    
    // Store like status in localStorage to prevent multiple likes
    const likedArticlesKey = 'likedArticles'
    const likedArticles = JSON.parse(localStorage.getItem(likedArticlesKey) || '[]')
    const alreadyLiked = likedArticles.includes(article.id)
    
    if (alreadyLiked) {
      // User already liked this article
      return
    }

    try {
      const response = await fetch(`/api/article/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleId: article.id }),
      })

      if (response.ok) {
        const data = await response.json()
        setIsLiked(true)
        setCurrentLikes(data.likes)
        
        // Save to localStorage
        likedArticles.push(article.id)
        localStorage.setItem(likedArticlesKey, JSON.stringify(likedArticles))
      }
    } catch (error) {
      console.error("Error updating likes:", error)
    }
  }

  const handleShare = async (platform?: string) => {
    const url = window.location.href
    const title = article?.title || ""
    const text = article?.description || ""

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        "_blank",
      )
    } else if (platform === "copy") {
      navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    } else if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(url)
      alert("Article link copied to clipboard!")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (language === "th") {
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleBack = () => {
    router.push("/article")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-xl font-mono">{t.loading}</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{t.articleNotFound}</h1>
            <Button onClick={handleBack} className="bg-orange-500 text-white hover:bg-orange-600">
              {t.backToArticles}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} className="text-gray-600 hover:text-orange-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToArticles}
            </Button>

            <div className="flex items-center gap-2">
              <Image src="/img/INLABLOGO.png" alt="InLAB Logo" width={32} height={32} className="object-contain" />
              <span className="text-xl font-bold text-gray-800">INLAB</span>
            </div>

            <div className="flex items-center gap-2">
              <LogoutButton variant="ghost" className="text-gray-600 hover:text-orange-500" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLanguageChange(language === "en" ? "th" : "en")}
                className="text-gray-600 hover:text-orange-500"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "TH" : "EN"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Article Header */}
              <div className="p-6 lg:p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-medium px-3 py-1">
                    {article.category}
                  </Badge>
                </div>

                {/* Article Title */}
                <h1
                  className={`text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight ${language === "th" ? "font-kanit" : "font-sans"
                    }`}
                >
                  {article.title}
                </h1>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>
                      {currentViews} {t.views}
                    </span>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="mb-8">
                  <div className="relative h-64 lg:h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                    <Image
                      src={article.image || '/img/placeholder.png'}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div
                    className={`text-gray-800 leading-relaxed ${language === "th" ? "font-kanit" : "font-sans"}`}
                    dangerouslySetInnerHTML={{ __html: article.description }}
                  />
                  {/* Enhanced styles for TipTap content */}
                  <style>{`
                    .prose h1 { 
                      font-size: 2em; 
                      font-weight: bold; 
                      margin: 1em 0 0.5em 0;
                      line-height: 1.2;
                      color: #1f2937;
                    }
                    .prose h2 { 
                      font-size: 1.5em; 
                      font-weight: bold; 
                      margin: 0.8em 0 0.4em 0;
                      line-height: 1.3;
                      color: #1f2937;
                    }
                    .prose h3 { 
                      font-size: 1.2em; 
                      font-weight: bold; 
                      margin: 0.6em 0 0.3em 0;
                      line-height: 1.4;
                      color: #1f2937;
                    }
                    .prose p {
                      margin: 0.5em 0;
                      line-height: 1.8;
                    }
                    .prose ul { 
                      list-style: disc; 
                      margin: 0.5em 0;
                      padding-left: 1.5em;
                    }
                    .prose ol { 
                      list-style: decimal; 
                      margin: 0.5em 0;
                      padding-left: 1.5em;
                    }
                    .prose li { 
                      margin: 0.2em 0;
                    }
                    .prose b, .prose strong { 
                      font-weight: bold; 
                    }
                    .prose i, .prose em { 
                      font-style: italic; 
                    }
                    .prose u { 
                      text-decoration: underline; 
                    }
                    .prose table { 
                      border-collapse: collapse; 
                      width: 100%; 
                      margin: 1em 0;
                      border: 1px solid #e5e7eb;
                    }
                    .prose th, .prose td { 
                      border: 1px solid #e5e7eb; 
                      padding: 8px 12px;
                      text-align: left;
                    }
                    .prose th { 
                      background: #f9fafb;
                      font-weight: 600;
                    }
                    .prose img { 
                      max-width: 100%; 
                      height: auto; 
                      margin: 1em 0;
                      border-radius: 4px;
                    }
                    .prose a { 
                      color: #2563eb; 
                      text-decoration: underline;
                    }
                    .prose a:hover {
                      color: #1d4ed8;
                    }
                    .prose code {
                      background: #f3f4f6;
                      padding: 2px 4px;
                      border-radius: 3px;
                      font-family: 'Monaco', 'Courier New', monospace;
                      font-size: 0.9em;
                    }
                    .prose pre {
                      background: #f3f4f6;
                      padding: 12px;
                      border-radius: 6px;
                      overflow-x: auto;
                      margin: 1em 0;
                    }
                    .prose blockquote {
                      border-left: 4px solid #e5e7eb;
                      padding-left: 16px;
                      margin: 1em 0;
                      color: #6b7280;
                      font-style: italic;
                    }
                    
                    /* Callout Styles */
                    .prose .callout {
                      margin: 1em 0;
                      border-radius: 0.5rem;
                      border-left-width: 4px;
                      padding: 1rem;
                    }
                    .prose .callout.border-blue-200.bg-blue-50 {
                      border-left-color: #93c5fd;
                      background-color: #eff6ff;
                    }
                    .prose .callout.border-yellow-200.bg-yellow-50 {
                      border-left-color: #fde047;
                      background-color: #fefce8;
                    }
                    .prose .callout.border-green-200.bg-green-50 {
                      border-left-color: #86efac;
                      background-color: #f0fdf4;
                    }
                    .prose .callout.border-red-200.bg-red-50 {
                      border-left-color: #fca5a5;
                      background-color: #fef2f2;
                    }
                    .prose .callout.border-purple-200.bg-purple-50 {
                      border-left-color: #c084fc;
                      background-color: #faf5ff;
                    }
                    .prose .callout .flex {
                      display: flex;
                    }
                    .prose .callout .items-start {
                      align-items: flex-start;
                    }
                    .prose .callout .gap-3 {
                      gap: 0.75rem;
                    }
                    .prose .callout .text-lg {
                      font-size: 1.125rem;
                    }
                    .prose .callout .flex-shrink-0 {
                      flex-shrink: 0;
                    }
                    .prose .callout .flex-1 {
                      flex: 1 1 0%;
                    }
                    .prose .callout .font-semibold {
                      font-weight: 600;
                    }
                    .prose .callout .text-gray-800 {
                      color: #1f2937;
                    }
                    .prose .callout .mb-1 {
                      margin-bottom: 0.25rem;
                    }
                    .prose .callout .capitalize {
                      text-transform: capitalize;
                    }
                    .prose .callout .text-gray-700 {
                      color: #374151;
                    }
                  `}</style>
                </div>

                {/* Tags Section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-gray-700">{t.tags}:</span>
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {article.author}
                    </Badge>
                  </div>
                </div>

                {/* Social Share */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700">{t.shareOn}:</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShare("facebook")}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Facebook className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShare("twitter")}
                          className="text-blue-400 border-blue-200 hover:bg-blue-50"
                        >
                          <Twitter className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShare("copy")}
                          className="text-gray-600 border-gray-200 hover:bg-gray-50"
                        >
                          <Link className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={handleLike}
                      variant={isLiked ? "default" : "outline"}
                      size="sm"
                      className={`${isLiked
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "border-orange-500 text-orange-500 hover:bg-orange-50"
                        }`}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      {currentLikes}
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Author Bio */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className={`text-xl font-bold mb-4 ${language === "th" ? "font-kanit" : "font-sans"}`}>
                {t.aboutAuthor}
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{article.author}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {language === "th"
                      ? "นักเขียนและนักพัฒนาที่มีประสบการณ์ในสาขาเทคโนโลยี มุ่งมั่นในการแบ่งปันความรู้และประสบการณ์ผ่านบทความคุณภาพ"
                      : "An experienced writer and developer in the technology field, dedicated to sharing knowledge and experience through quality articles."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Article Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className={`font-bold mb-4 ${language === "th" ? "font-kanit" : "font-sans"}`}>Article Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Views</span>
                    <span className="font-medium">{currentViews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Likes</span>
                    <span className="font-medium">{currentLikes}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className={`font-bold mb-4 ${language === "th" ? "font-kanit" : "font-sans"}`}>Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    onClick={handleLike}
                    variant={isLiked ? "default" : "outline"}
                    className={`w-full ${isLiked
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "border-orange-500 text-orange-500 hover:bg-orange-50"
                      }`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {isLiked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    onClick={() => handleShare()}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
