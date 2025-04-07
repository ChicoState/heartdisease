"use client"

import Link from "next/link"
import type { HealthData } from "@/utils/localStorage"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, XCircle, ArrowRight } from "lucide-react"

interface ResultProps {
  data: HealthData
}

export default function Result({ data }: ResultProps) {
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low":
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case "Medium":
        return <AlertCircle className="h-8 w-8 text-yellow-500" />
      case "High":
        return <XCircle className="h-8 w-8 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card className="card-hover">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Your Heart Disease Risk</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Based on the information you provided
            </CardDescription>
          </div>
          {getRiskIcon(data.riskLevel)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Risk Score: {data.riskScore.toFixed(1)}</span>
            <span
              className={`text-sm font-bold px-2 py-1 rounded-full ${
                data.riskLevel === "Low"
                  ? "bg-green-100 text-green-800"
                  : data.riskLevel === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {data.riskLevel} Risk
            </span>
          </div>
          <Progress value={data.riskScore} className={`h-3 ${getRiskColor(data.riskLevel)}`} />
        </div>

        <div className="text-sm space-y-2">
          <p>
            Your risk of developing heart disease is considered <strong>{data.riskLevel.toLowerCase()}</strong> based on
            the information you provided.
          </p>
          <p>Key factors influencing your risk:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Age: {data.age} years</li>
            <li>Systolic Blood Pressure: {data.systolicBP} mmHg</li>
            <li>Total Cholesterol: {data.totalCholesterol} mg/dL</li>
            <li>HDL Cholesterol: {data.hdlCholesterol} mg/dL</li>
            {data.diabetes && <li>Diabetes</li>}
            {data.smoker === "current" && <li>Current smoker</li>}
          </ul>
          <p className="text-muted-foreground">
            Remember, this is an estimate and not a diagnosis. For a comprehensive evaluation, please consult with a
            healthcare professional.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Take Assessment Again
        </Button>
        <Link href="/help">
          <Button className="gap-2">
            View Recommendations
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

