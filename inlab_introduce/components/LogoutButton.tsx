"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Settings } from "lucide-react"

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  showAdminButton?: boolean
}

export default function LogoutButton({ variant = "outline", size = "sm", className = "", showAdminButton = true }: LogoutButtonProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        const data = await response.json()
        setIsAuthenticated(data.authenticated)
      } catch (error) {
        console.error("Error checking auth:", error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      })

      if (response.ok) {
        setIsAuthenticated(false)
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error("Error logging out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminClick = () => {
    router.push("/admin/dashboard")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex gap-2">
      {showAdminButton && (
        <Button
          variant={variant}
          size={size}
          onClick={handleAdminClick}
          className={`${className}`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin
        </Button>
      )}
      <Button
        variant={variant}
        size={size}
        onClick={handleLogout}
        disabled={isLoading}
        className={`${className}`}
      >
        <LogOut className="w-4 h-4 mr-2" />
        {isLoading ? "Logging out..." : "Logout"}
      </Button>
    </div>
  )
}
