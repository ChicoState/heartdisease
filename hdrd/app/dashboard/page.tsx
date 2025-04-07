"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import History from "@/components/History"
import DashboardStats from "@/components/DashboardStats"
import DashboardTips from "@/components/DashboardTips"
import DashboardSummary from "@/components/DashboardSummary"

export default function DashboardPage() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assessment History - Takes up full width on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2">
          <History />
        </div>

        {/* Dashboard Info Cards - Stack vertically */}
        <div className="space-y-8">
          <DashboardSummary />
          <DashboardStats />
          <DashboardTips />
        </div>
      </div>
    </div>
  )
}

