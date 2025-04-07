"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Heart, Lock, Mail, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const { login, signup } = useAuth()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login()
    router.push("/dashboard")
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    signup(signupEmail, signupPassword)
    router.push("/dashboard")
  }

  return (
    <div className="absolute inset-0 flex h-screen w-screen">
      {/* Left side - Image/Decorative section */}
      <div className="relative hidden md:flex md:w-1/2 bg-primary/10">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome to HeartRisk AI</h2>
          <p className="text-muted-foreground max-w-md">
            Sign in to access your personalized heart health dashboard or create a new account to get started.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 w-full max-w-xs">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-primary/10 backdrop-blur-sm flex items-center justify-center"
              >
                <div className={`w-6 h-6 rounded-full ${i % 2 === 0 ? "bg-primary/20" : "bg-primary/30"}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-card p-8 md:p-12 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Access HeartRisk AI</h1>
          <p className="text-muted-foreground">Sign in to your account or create a new one</p>
        </div>

        {/* Sign In Form */}
        <div>
          <h2 className="text-lg font-medium mb-4">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="loginEmail" className="block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  type="email"
                  id="loginEmail"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="loginPassword" className="block text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  type="password"
                  id="loginPassword"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-4 text-sm text-muted-foreground">or</span>
          </div>
        </div>

        {/* Sign Up Form */}
        <div>
          <h2 className="text-lg font-medium mb-4">Create Account</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="signupEmail" className="block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  type="email"
                  id="signupEmail"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="signupPassword" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  type="password"
                  id="signupPassword"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="outline" className="w-full">
              Create account
            </Button>
          </form>
        </div>

        <div className="mt-8">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </div>
      </div>
    </div>
  )
}

