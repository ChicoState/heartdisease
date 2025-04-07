"use client"

import { useEffect, useState } from "react"
import { getHealthHistory } from "@/utils/localStorage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardStats() {
  const [chartData, setChartData] = useState<any[]>([])
  const [averageScore, setAverageScore] = useState<number | null>(null)
  const [assessmentCount, setAssessmentCount] = useState(0)

  useEffect(() => {
    const history = getHealthHistory()
    if (history.length > 0) {
      const chartData = history
        .slice(0, 5)
        .map((item) => ({
          date: new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
          score: item.riskScore,
        }))
        .reverse()

      setChartData(chartData)
      const total = history.reduce((sum, item) => sum + item.riskScore, 0)
      setAverageScore(Math.round((total / history.length) * 10) / 10)
      
      setAssessmentCount(history.length)
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Trends</CardTitle>
        <CardDescription>Your heart health over time</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 1 ? (
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={30} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>Not enough data to show trends</p>
            <p className="text-sm">Complete more assessments to see your progress</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Average Risk</p>
            <p className="text-xl font-semibold">{averageScore !== null ? `${averageScore}%` : "N/A"}</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Assessments</p>
            <p className="text-xl font-semibold">{assessmentCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

