"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Trash2, UserPlus, ArrowLeft, Newspaper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface User {
  id: string;
  username: string;
  authorName: string | null;
  description: string | null;
  avatarImage: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CurrentUser {
  id: string;
  username: string;
  avatarImage?: string | null;
}

export default function AccountManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchUsers();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.user.username !== "kanzaki_aito") {
        router.push("/admin/dashboard");
        return;
      }
      setCurrentUser(data.user);
    } catch (error) {
      router.push("/admin/login");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userToDelete.id }),
      });

      if (res.ok) {
        setMessage("✓ User deleted successfully!");
        fetchUsers();
      } else {
        const data = await res.json();
        setMessage(`✗ ${data.message || "Failed to delete user"}`);
      }
    } catch (error) {
      setMessage("✗ Error deleting user");
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
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
        fetchUsers();
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
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-32 bg-gray-700" />
              <Skeleton className="h-10 w-64 bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container mx-auto px-4 py-8">
          {/* Create User Form Skeleton */}
          <Card className="bg-black/50 border-orange-500/30 text-white max-w-2xl mb-8">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-2 bg-gray-700" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2 bg-gray-700" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                </div>
                <Skeleton className="h-10 w-32 bg-gray-700" />
              </div>
            </CardContent>
          </Card>

          {/* Users List Skeleton */}
          <Card className="bg-black/50 border-orange-500/30 text-white">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Skeleton className="w-12 h-12 rounded-full bg-gray-700" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-32 bg-gray-700" />
                        <Skeleton className="h-4 w-48 bg-gray-700" />
                        <Skeleton className="h-3 w-24 bg-gray-700" />
                      </div>
                    </div>
                    <Skeleton className="h-9 w-24 bg-gray-700" />
                  </div>
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
              <Button
                onClick={() => router.push("/admin/dashboard")}
                variant="ghost"
                className="text-orange-500 hover:text-orange-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-staatliches text-orange-500">
                Account Management
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
              <span className="text-sm text-orange-400 font-mono">{currentUser?.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Create User Form */}
        <Card className="bg-black/50 border-orange-500/30 text-white max-w-2xl mb-8">
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

        {/* Users List */}
        <Card className="bg-black/50 border-orange-500/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Users className="w-5 h-5" />
              All Admin Accounts ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {user.avatarImage && (
                        <img
                          src={user.avatarImage}
                          alt={user.username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-mono text-orange-400">
                          {user.username}
                          {user.username === "kanzaki_aito" && (
                            <span className="ml-2 text-xs bg-orange-500 text-black px-2 py-1 rounded">
                              SUPER ADMIN
                            </span>
                          )}
                        </h3>
                        {user.authorName && (
                          <p className="text-sm text-gray-400">{user.authorName}</p>
                        )}
                        {user.description && (
                          <p className="text-xs text-gray-500 mt-1">{user.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Created: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {user.username !== "kanzaki_aito" && (
                    <Button
                      onClick={() => handleDeleteClick(user)}
                      variant="destructive"
                      size="sm"
                      className="bg-red-900/50 hover:bg-red-900 text-red-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-orange-500/30">
          <DialogHeader>
            <DialogTitle className="text-orange-400">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete the account{" "}
              <span className="text-orange-400 font-mono">{userToDelete?.username}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="destructive"
              className="bg-red-900 hover:bg-red-800 text-white"
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
