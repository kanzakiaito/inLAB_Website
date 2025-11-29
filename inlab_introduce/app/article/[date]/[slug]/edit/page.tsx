"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TipTapEditor from "@/components/TipTapEditor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Globe, User as UserIcon, X } from "lucide-react"

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

interface UserProfile {
  id: string
  username: string
  authorName: string | null
  description: string | null
  avatarImage: string | null
}

type AuthorType = 'own' | 'other' | 'guest'

export default function EditArticlePage({ params }: { params: Promise<{ date: string; slug: string }> }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [existingCategories, setExistingCategories] = useState<string[]>([])
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false)
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])
  const [authorType, setAuthorType] = useState<AuthorType>('own')
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const router = useRouter()
  const [resolvedParams, setResolvedParams] = useState<{ date: string; slug: string } | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    imageUrl: "",
    authorDescription: "",
    authorAvatar: "",
  })

  const translations = {
    en: {
      editArticle: "Edit Article",
      title: "Title",
      titleRequired: "Title (Required)",
      description: "Description",
      descriptionRequired: "Description (Required)",
      category: "Category",
      author: "Author",
      imageUrl: "Image URL",
      updateArticle: "Update Article",
      cancel: "Cancel",
      backToArticles: "Back to Articles",
      loading: "Loading...",
      titlePlaceholder: "Enter article title (can include both English and Thai)",
      descriptionPlaceholder: "Enter article description (can include both English and Thai)",
    },
    th: {
      editArticle: "แก้ไขบทความ",
      title: "หัวข้อ",
      titleRequired: "หัวข้อ (จำเป็น)",
      description: "คำอธิบาย",
      descriptionRequired: "คำอธิบาย (จำเป็น)",
      category: "หมวดหมู่",
      author: "ผู้เขียน",
      imageUrl: "URL รูปภาพ",
      updateArticle: "อัปเดตบทความ",
      cancel: "ยกเลิก",
      backToArticles: "กลับไปหน้าความ",
      loading: "กำลังโหลด...",
      titlePlaceholder: "กรอกหัวข้อบทความ (สามารถใส่ทั้งภาษาอังกฤษและไทย)",
      descriptionPlaceholder: "กรอกคำอธิบายบทความ (สามารถใส่ทั้งภาษาอังกฤษและไทย)",
    },
  }

  const t = translations[language]

  const categories = [
    { en: "Technology", th: "เทคโนโลยี" },
    { en: "Science", th: "วิทยาศาสตร์" },
    { en: "Research", th: "การวิจัย" },
    { en: "Mobile Development", th: "การพัฒนาแอปพลิเคชัน" },
    { en: "Space", th: "อวกาศ" },
    { en: "Engineering", th: "วิศวกรรม" },
  ]

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  // Fetch existing categories from articles
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/article")
        if (res.ok) {
          const data = await res.json()
          const categories = [...new Set(data.articles.map((article: any) => article.category))] as string[]
          setExistingCategories(categories.filter(Boolean)) // Remove empty categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch all users for author selection
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users")
        if (res.ok) {
          const data = await res.json()
          setAllUsers(data.users || [])
        }
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [])

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile")
        if (res.ok) {
          const data = await res.json()
          setUserProfile(data.user)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    if (!resolvedParams) return

    const fetchArticle = async () => {
      try {
        const response = await fetch("/api/article")
        if (response.ok) {
          const data = await response.json()
          const article = data.articles.find((a: any) => a.id === resolvedParams.slug)

          if (article) {
            setFormData({
              title: article.title,
              description: article.description,
              category: article.category,
              author: article.author,
              imageUrl: article.image,
              authorDescription: article.authorDescription || "",
              authorAvatar: article.authorAvatar || "",
            })

            // Determine author type based on article data
            if (article.authorDescription || article.authorAvatar) {
              // Has guest author data
              setAuthorType('guest')
            } else if (userProfile && (article.author === userProfile.authorName || article.author === userProfile.username)) {
              // Is own profile
              setAuthorType('own')
            } else {
              // Is another user - find and select them
              setAuthorType('other')
              // Find user by author name in fetched users
              const foundUser = allUsers.find(u => u.authorName === article.author || u.username === article.author)
              if (foundUser) {
                setSelectedUserId(foundUser.id)
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [resolvedParams, userProfile, allUsers])

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
        id: resolvedParams.slug,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        author: formData.author,
        date: resolvedParams.date.replace(/\//g, "-"),
        image: formData.imageUrl,
        authorDescription: authorType === 'guest' ? formData.authorDescription : null,
        authorAvatar: authorType === 'guest' ? formData.authorAvatar : null,
      }

      const response = await fetch("/api/article", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })

      if (response.ok) {
        router.push("/article")
      } else {
        throw new Error("Failed to update article")
      }
    } catch (error) {
      console.error("Error updating article:", error)
      alert("Failed to update article. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    router.push("/article")
  }

  if (isLoading || !resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
        <div className="text-white text-xl font-mono">{t.loading}</div>
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

            <div className="w-32"></div>
          </div>
        </div>
        <div className="h-4 bg-black"></div>
      </div>

      {/* Form Section */}
      <div className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4 max-w-full">
          <h1
            className={`text-3xl font-bold text-center mb-8 text-orange-500 ${language === "th" ? "font-kanit" : "font-staatliches"
              }`}
          >
            {t.editArticle}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-2 ${language === "th" ? "font-kanit" : "font-mono"
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
                className={`block text-sm font-medium text-gray-700 mb-2 ${language === "th" ? "font-kanit" : "font-mono"
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
                className={`block text-sm font-medium text-gray-700 mb-2 ${language === "th" ? "font-kanit" : "font-mono"
                  }`}
              >
                {t.category}
              </label>

              {!isAddingNewCategory ? (
                <div className="space-y-2">
                  <Select
                    value={formData.category}
                    onValueChange={(value) => {
                      if (value === "__add_new__") {
                        setIsAddingNewCategory(true)
                        handleInputChange("category", "")
                      } else {
                        handleInputChange("category", value)
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category or add new" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                      <SelectItem value="__add_new__" className="text-orange-500 font-medium">
                        + Add New Category
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.category && !isAddingNewCategory && (
                    <p className="text-xs text-gray-500">
                      Selected: <span className="font-medium">{formData.category}</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      placeholder="Enter new category name"
                      className="flex-1"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddingNewCategory(false)
                        handleInputChange("category", "")
                      }}
                      className="px-3"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Creating new category: <span className="font-medium text-orange-500">{formData.category || "..."}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Author Selection */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-3 ${language === "th" ? "font-kanit" : "font-mono"}`}
              >
                {t.author}
              </label>

              {/* Author Type Selection */}
              <div className="space-y-4">
                {/* Radio Buttons */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="authorType"
                      value="own"
                      checked={authorType === 'own'}
                      onChange={(e) => {
                        setAuthorType(e.target.value as AuthorType)
                        if (userProfile) {
                          handleInputChange("author", userProfile.authorName || userProfile.username)
                        }
                      }}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-sm">My Profile</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="authorType"
                      value="other"
                      checked={authorType === 'other'}
                      onChange={(e) => setAuthorType(e.target.value as AuthorType)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-sm">Another User</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="authorType"
                      value="guest"
                      checked={authorType === 'guest'}
                      onChange={(e) => {
                        setAuthorType(e.target.value as AuthorType)
                        handleInputChange("author", "")
                      }}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-sm">Guest Author</span>
                  </label>
                </div>

                {/* Own Profile Display */}
                {authorType === 'own' && userProfile && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      {userProfile.avatarImage ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 flex-shrink-0">
                          <Image
                            src={userProfile.avatarImage}
                            alt={userProfile.authorName || userProfile.username}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-8 h-8 text-gray-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {userProfile.authorName || userProfile.username}
                        </div>
                        {userProfile.description && (
                          <div className="text-sm text-gray-600 mt-1">
                            {userProfile.description}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          @{userProfile.username}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other User Selection */}
                {authorType === 'other' && (
                  <div className="space-y-3">
                    <Select
                      value={selectedUserId}
                      onValueChange={(userId) => {
                        setSelectedUserId(userId)
                        const selectedUser = allUsers.find(u => u.id === userId)
                        if (selectedUser) {
                          handleInputChange("author", selectedUser.authorName || selectedUser.username)
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {allUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.authorName || user.username} (@{user.username})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Selected User Preview */}
                    {selectedUserId && allUsers.find(u => u.id === selectedUserId) && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-4">
                          {(() => {
                            const selectedUser = allUsers.find(u => u.id === selectedUserId)!
                            return (
                              <>
                                {selectedUser.avatarImage ? (
                                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 flex-shrink-0">
                                    <Image
                                      src={selectedUser.avatarImage}
                                      alt={selectedUser.authorName || selectedUser.username}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                                    <UserIcon className="w-6 h-6 text-gray-600" />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="font-semibold text-sm text-gray-900">
                                    {selectedUser.authorName || selectedUser.username}
                                  </div>
                                  {selectedUser.description && (
                                    <div className="text-xs text-gray-600 mt-0.5">
                                      {selectedUser.description}
                                    </div>
                                  )}
                                </div>
                              </>
                            )
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/*Guest Author Input */}
                {authorType === 'guest' && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <Label className="text-xs">Guest Author Name *</Label>
                      <Input
                        type="text"
                        value={formData.author}
                        onChange={(e) => handleInputChange("author", e.target.value)}
                        placeholder="Enter guest author name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Guest Description (Optional)</Label>
                      <Input
                        type="text"
                        value={formData.authorDescription}
                        onChange={(e) => handleInputChange("authorDescription", e.target.value)}
                        placeholder="e.g., Guest Researcher, External Contributor"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Guest Avatar URL (Optional)</Label>
                      <Input
                        type="url"
                        value={formData.authorAvatar}
                        onChange={(e) => handleInputChange("authorAvatar", e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className="mt-1"
                      />
                    </div>
                    {formData.authorAvatar && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded border">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 flex-shrink-0">
                          <Image
                            src={formData.authorAvatar}
                            alt="Guest avatar preview"
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/img/placeholder.png"
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{formData.author || 'Guest Author'}</div>
                          {formData.authorDescription && (
                            <div className="text-xs text-gray-600">{formData.authorDescription}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-2 ${language === "th" ? "font-kanit" : "font-mono"}`}
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
                className={`flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 ${language === "th" ? "font-kanit" : "font-mono"
                  }`}
              >
                {isSubmitting ? "Updating..." : t.updateArticle}
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
        </div >
      </div >
    </div >
  )
}
