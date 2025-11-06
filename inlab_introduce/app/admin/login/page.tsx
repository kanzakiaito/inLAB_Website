"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (res.ok) {
        // User is already logged in, redirect to dashboard
        router.push("/admin/dashboard");
        return;
      }
    } catch (error) {
      // Not logged in, continue to login page
    } finally {
      setChecking(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to dashboard on successful login
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
        <Card className="w-full max-w-md bg-black/90 text-white border-orange-500">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Skeleton className="w-20 h-20 rounded-lg bg-gray-700" />
            </div>
            <Skeleton className="h-8 w-48 mx-auto bg-gray-700" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Skeleton className="h-4 w-20 mb-2 bg-gray-700" />
              <Skeleton className="h-10 w-full bg-gray-700" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2 bg-gray-700" />
              <Skeleton className="h-10 w-full bg-gray-700" />
            </div>
            <Skeleton className="h-10 w-full bg-gray-700" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
      <Card className="w-full max-w-md bg-black/90 text-white border-orange-500">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/img/INLABLOGO.png"
                alt="InLAB Logo"
                width={68}
                height={68}
                className="object-contain invert"
              />
              <div className="flex flex-col text-left">
                <h1 className="text-5xl text-white tracking-tight font-staatliches">
                  INLAB
                </h1>
                <p className="text-sm text-white/80 font-medium font-staatliches -mt-1">
                  Outreach division
                </p>
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-staatliches text-orange-500">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm bg-red-900/30 p-2 rounded">
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}