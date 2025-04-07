"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">HeartRisk AI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About
          </Link>
          <Link href="/help" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Help
          </Link>
          <Link href="/how-to-measure" className="transition-colors hover:text-foreground/80 text-foreground/60">
            How to Measure
          </Link>
          <Link href="/fixed" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Fixed
          </Link>
          {isLoggedIn && (
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="secondary">Sign in</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
              About
            </Link>
            <Link href="/help" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Help
            </Link>
            <Link href="/how-to-measure" className="transition-colors hover:text-foreground/80 text-foreground/60">
              How to Measure
            </Link>
            <Link href="/fixed" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Fixed
            </Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Dashboard
              </Link>
            )}
            {isLoggedIn ? (
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="secondary" className="w-full">
                  Sign in
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

