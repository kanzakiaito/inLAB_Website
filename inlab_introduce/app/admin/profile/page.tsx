"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, ArrowLeft, Save, Upload, Newspaper } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfile {
  id: string;
  username: string;
  authorName: string | null;
  description: string | null;
  avatarImage: string | null;
}

export default function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchProfile();
  }, []);

  const checkAuthAndFetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) {
        router.push("/admin/login");
        return;
      }

      const profileRes = await fetch("/api/profile");
      if (profileRes.ok) {
        const data = await profileRes.json();
        setProfile(data.user);
        setAuthorName(data.user.authorName || "");
        setDescription(data.user.description || "");
        setAvatarImage(data.user.avatarImage || "");
        setImagePreview(data.user.avatarImage || null);
      }
    } catch (error) {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password && password !== confirmPassword) {
      setMessage("✗ Passwords do not match");
      return;
    }

    try {
      const updateData: any = {
        authorName,
        description,
        avatarImage,
      };

      if (password) {
        updateData.password = password;
      }

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✓ Profile updated successfully!");
        setPassword("");
        setConfirmPassword("");
        setProfile(data.user);
      } else {
        setMessage(`✗ ${data.message || "Failed to update profile"}`);
      }
    } catch (error) {
      setMessage("✗ Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Header Skeleton */}
        <div className="bg-black/50 border-b border-orange-500/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-32 bg-gray-700" />
              <Skeleton className="h-10 w-48 bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Card className="bg-black/50 border-orange-500/30 text-white">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-gray-700 mb-2" />
              <Skeleton className="h-4 w-64 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Avatar Skeleton */}
                <div>
                  <Skeleton className="h-4 w-24 mb-2 bg-gray-700" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-24 h-24 rounded-full bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-10 w-full bg-gray-700" />
                      <Skeleton className="h-10 w-full bg-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Form Fields Skeleton */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-32 mb-2 bg-gray-700" />
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </div>
                ))}

                <Skeleton className="h-10 w-full bg-gray-700" />
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
              <Button
                onClick={() => router.push("/admin/dashboard")}
                variant="ghost"
                className="text-orange-500 hover:text-orange-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-staatliches text-orange-500">
                Profile Settings
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
            <div className="flex items-center gap-3">
              {profile?.avatarImage && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
                  <Image
                    src={profile.avatarImage}
                    alt={profile.username}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm text-orange-400 font-mono">{profile?.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="bg-black/50 border-orange-500/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <User className="w-5 h-5" />
              Edit Your Profile
            </CardTitle>
            <p className="text-sm text-gray-400 mt-2">
              Logged in as: <span className="text-orange-400 font-mono">{profile?.username}</span>
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Avatar Image */}
              <div className="space-y-3">
                <Label className="text-gray-300 text-base font-semibold">Avatar Image</Label>
                <div className="flex items-start gap-6">
                  {imagePreview ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-orange-500 flex-shrink-0">
                      <Image
                        src={imagePreview}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-gray-800 border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-black hover:file:bg-orange-600 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">
                      Upload an image file (JPG, PNG, GIF). Max size: 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Author Name */}
              <div className="space-y-2">
                <Label htmlFor="authorName" className="text-gray-300 text-base font-semibold">
                  Author Name
                </Label>
                <p className="text-xs text-gray-500">
                  This will be displayed on articles you create
                </p>
                <Input
                  id="authorName"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter your display name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300 text-base font-semibold">
                  Author Description
                </Label>
                <p className="text-xs text-gray-500">
                  A short bio or introduction about yourself
                </p>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white min-h-32 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Password Change */}
              <div className="border-t border-gray-700 pt-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">
                    Change Password
                  </h3>
                  <p className="text-xs text-gray-500">
                    Leave empty to keep your current password
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      New Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-300">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              {message && (
                <div
                  className={`text-sm p-3 rounded ${
                    message.startsWith("✓")
                      ? "bg-green-900/50 text-green-400 border border-green-700"
                      : "bg-red-900/50 text-red-400 border border-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
