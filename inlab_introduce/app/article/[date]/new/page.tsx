"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import TipTapEditor from "@/components/TipTapEditor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Globe, Upload, Link as LinkIcon, X, User as UserIcon } from "lucide-react"

type Language = "en" | "th"

interface UserProfile {
  id: string
  username: string
  authorName: string | null
  description: string | null
  avatarImage: string | null
}

type AuthorType = 'own' | 'other' | 'guest'

export default function NewArticlePage({ params }: { params: Promise<{ date: string }> }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [existingCategories, setExistingCategories] = useState<string[]>([])
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false)
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])
  const [authorType, setAuthorType] = useState<AuthorType>('own')
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const router = useRouter()
  const [resolvedParams, setResolvedParams] = useState<{ date: string } | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    imageUrl: "/img/placeholder.png",
    authorDescription: "",
    authorAvatar: "",
  })

  const [imageInputType, setImageInputType] = useState<"url" | "upload">("url")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("/img/placeholder.png")

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
          // Set author name from profile if available
          if (data.user.authorName) {
            setFormData(prev => ({ ...prev, author: data.user.authorName }))
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetchProfile()
  }, [])

  // Update image preview when URL changes
  useEffect(() => {
    if (imageInputType === "url") {
      setImagePreview(formData.imageUrl)
    }
  }, [formData.imageUrl, imageInputType])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resolvedParams) return

    setIsSubmitting(true)

    try {
      let finalImageUrl = formData.imageUrl

      // If user uploaded a file, use the base64 data URL
      // In production, you'd want to upload to a server/CDN
      if (imageInputType === "upload" && imageFile) {
        finalImageUrl = imagePreview
      }

      const articleData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        author: formData.author,
        date: resolvedParams.date.replace(/\//g, "-"),
        image: finalImageUrl,
        authorDescription: authorType === 'guest' ? formData.authorDescription : null,
        authorAvatar: authorType === 'guest' ? formData.authorAvatar : null,
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
            className={`text-3xl font-bold text-center mb-8 text-orange-500 ${language === "th" ? "font-kanit" : "font-staatliches"
              }`}
          >
            {t.createNewArticle}
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

                {/* Guest Author Input */}
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

            {/* Thumbnail Image Section */}
            <div>
              <Label
                className={`text-sm font-medium text-gray-700 ${language === "th" ? "font-kanit" : "font-mono"
                  }`}
              >
                Thumbnail Image
              </Label>
              <p className="text-sm text-gray-500 mt-1 mb-4">Choose how to add your article thumbnail</p>

              {/* Image Input Type Selector */}
              <div className="flex gap-4 mb-4">
                <Button
                  type="button"
                  variant={imageInputType === "url" ? "default" : "outline"}
                  onClick={() => setImageInputType("url")}
                  className={imageInputType === "url" ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Use Image URL
                </Button>
                <Button
                  type="button"
                  variant={imageInputType === "upload" ? "default" : "outline"}
                  onClick={() => setImageInputType("upload")}
                  className={imageInputType === "upload" ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>

              {/* Image URL Input */}
              {imageInputType === "url" && (
                <div>
                  <Input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                    placeholder="/img/article/default.png or https://example.com/image.jpg"
                    className="w-full"
                  />
                </div>
              )}

              {/* Image Upload */}
              {imageInputType === "upload" && (
                <div>
                  <Card className="border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors">
                    <CardContent className="p-6">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setImageFile(file)
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setImagePreview(reader.result as string)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 text-center">
                          {imageFile ? "Image selected" : "Drop image here or click to select"}
                        </p>
                        {imageFile && (
                          <p className="text-xs text-gray-500 mt-2">{imageFile.name}</p>
                        )}
                      </label>
                    </CardContent>
                  </Card>
                  {imageFile && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview("/img/placeholder.png")
                        setFormData(prev => ({ ...prev, imageUrl: "/img/placeholder.png" }))
                      }}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              )}

              {/* Image Preview */}
              <div className="mt-4">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Image Preview
                </Label>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative w-full h-64 bg-gray-100">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        onError={() => setImagePreview("/img/placeholder.png")}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 ${language === "th" ? "font-kanit" : "font-mono"
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
      </div >
    </div >
  )
}
