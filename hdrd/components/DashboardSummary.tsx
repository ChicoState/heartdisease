"use client"

import { useEffect, useState } from "react"
import { getHealthHistory } from "@/utils/localStorage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function DashboardSummary() {
  const [latestAssessment, setLatestAssessment] = useState<any>(null)

  useEffect(() => {
    const history = getHealthHistory()
    if (history.length > 0) {
      setLatestAssessment(history[0])
    }
  }, [])

  if (!latestAssessment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Assessment</CardTitle>
          <CardDescription>Your most recent heart health check</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-muted-foreground">No assessments found</p>
        </CardContent>
      </Card>
    )
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "Medium":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      case "High":
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "High":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Latest Assessment</CardTitle>
            <CardDescription>{new Date(latestAssessment.date).toLocaleDateString()}</CardDescription>
          </div>
          {getRiskIcon(latestAssessment.riskLevel)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Risk Score</span>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  latestAssessment.riskLevel === "Low"
                    ? "bg-green-100 text-green-800"
                    : latestAssessment.riskLevel === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {latestAssessment.riskLevel}
              </span>
            </div>
            <Progress
              value={latestAssessment.riskScore}
              className="h-2"
              indicatorClassName={getRiskColor(latestAssessment.riskLevel)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Blood Pressure</span>
              <span className="font-medium">
                {latestAssessment.systolicBP}/{latestAssessment.diastolicBP} mmHg
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Cholesterol</span>
              <span className="font-medium">{latestAssessment.totalCholesterol} mg/dL</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

