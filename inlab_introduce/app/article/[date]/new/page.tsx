"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TipTapEditor from "@/components/TipTapEditor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Globe } from "lucide-react"

type Language = "en" | "th"

export default function NewArticlePage({ params }: { params: Promise<{ date: string }> }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [resolvedParams, setResolvedParams] = useState<{ date: string } | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    imageUrl: "/img/article/default.png",
  })

  const translations = {
    en: {
      createNewArticle: "Create New Article",
      title: "Title",
      titleRequired: "Title (Required)",
      description: "Description",
      descriptionRequired: "Description (Required)",
      category: "Category",
      author: "Author",
      imageUrl: "Image URL",
      saveArticle: "Save Article",
      cancel: "Cancel",
      backToArticles: "Back to Articles",
      titlePlaceholder: "Enter article title (can include both English and Thai)",
      descriptionPlaceholder: "Enter article description (can include both English and Thai)",
    },
    th: {
      createNewArticle: "สร้างบทความใหม่",
      title: "หัวข้อ",
      titleRequired: "หัวข้อ (จำเป็น)",
      description: "คำอธิบาย",
      descriptionRequired: "คำอธิบาย (จำเป็น)",
      category: "หมวดหมู่",
      author: "ผู้เขียน",
      imageUrl: "URL รูปภาพ",
      saveArticle: "บันทึกความ",
      cancel: "ยกเลิก",
      backToArticles: "กลับไปหน้าความ",
      titlePlaceholder: "กรอกหัวข้อบทความ (สามารถใส่���ั้งภาษาอังกฤษและไทย)",
      descriptionPlaceholder: "กรอกคำอธิบายบทความ (สามารถใส่ทั้งภาษาอังกฤษและไทย)",
    },
  }

  const t = translations[language]

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  const categories = [
    { en: "Technology", th: "เทคโนโลยี" },
    { en: "Science", th: "วิทยาศาสตร์" },
    { en: "Research", th: "การวิจัย" },
    { en: "Mobile Development", th: "การพัฒนาแอปพลิเคชัน" },
    { en: "Space", th: "อวกาศ" },
    { en: "Engineering", th: "วิศวกรรม" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resolvedParams) return
    setIsSubmitting(true)

    try {
      const articleData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        author: formData.author,
        date: resolvedParams.date.replace(/\//g, "-"),
        image: formData.imageUrl,
      }

      const response = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })

      if (response.ok) {
        router.push("/article")
      } else {
        throw new Error("Failed to create article")
      }
    } catch (error) {
      console.error("Error creating article:", error)
      alert("Failed to create article. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    router.push("/article")
  }

  if (!resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
        <div className="text-white text-xl font-mono">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === "en" ? "th" : "en")}
          className="bg-white/20 border-white/30 text-black hover:bg-white/30"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === "en" ? "TH" : "EN"}
        </Button>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              variant="outline"
              onClick={handleBack}
              className="bg-white/20 border-white/30 text-black hover:bg-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToArticles}
            </Button>
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image src="/img/INLABLOGO.png" alt="InLAB Logo" width={48} height={48} className="object-contain" />
              <div className="flex flex-col">
                <h1 className="text-4xl text-black tracking-tight font-staatliches">INLAB</h1>
                <p className="text-sm text-black/80 font-medium font-staatliches -mt-1">OUTREACH DIVISION</p>
              </div>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
        <div className="h-4 bg-black"></div>
      </div>

      {/* Form Section */}
      <div className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4 max-w-full">
          <h1
            className={`text-3xl font-bold text-center mb-8 text-orange-500 ${
              language === "th" ? "font-kanit" : "font-staatliches"
            }`}
          >
            {t.createNewArticle}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-2 ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                {t.titleRequired}
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder={t.titlePlaceholder}
                required
                className="w-full"
              />
            </div>

            {/* Description (Rich Text) */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-2 ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                {t.descriptionRequired}
              </label>
              <div className="w-full">
                <TipTapEditor
                  value={formData.description}
                  onChange={(content) => handleInputChange("description", content)}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-2 ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                {t.category}
              </label>
            </div>

            {/* Author */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-2 ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                {t.author}
              </label>
              <Input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Kanzaki Aito"
                required
                className="w-full"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-2 ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                {t.imageUrl}
              </label>
              <Input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                placeholder="/img/article/default.png"
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                {isSubmitting ? "Saving..." : t.saveArticle}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className={`px-8 ${language === "th" ? "font-kanit" : "font-mono"}`}
              >
                {t.cancel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
