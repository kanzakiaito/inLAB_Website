"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, LogOut, UserPlus, Newspaper } from "lucide-react";

interface User {
  id: string;
  username: string;
}

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-white">Loading...</div>
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
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                Logged in as: <span className="text-orange-400 font-mono">{currentUser?.username}</span>
              </span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Action Cards */}
          <Card className="bg-black/50 border-orange-500/30 text-white hover:border-orange-500 transition-colors cursor-pointer"
            onClick={() => router.push("/article")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Newspaper className="w-5 h-5" />
                Manage Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">
                View, create, edit, and delete articles
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">
                Create new admin accounts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Create User Form */}
        <Card className="bg-black/50 border-orange-500/30 text-white max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <UserPlus className="w-5 h-5" />
              Create New Admin Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter password"
                />
              </div>
              {message && (
                <div
                  className={`text-sm p-2 rounded ${
                    message.startsWith("✓")
                      ? "bg-green-900/50 text-green-400"
                      : "bg-red-900/50 text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
