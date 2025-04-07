"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  signup: (email: string, password: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
  }

  const signup = (email: string, password: string) => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)
  }
  return <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

