"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

const validationData = [
  { threshold: 0.1, sensitivity: 0.95, specificity: 0.42 },
  { threshold: 0.2, sensitivity: 0.89, specificity: 0.58 },
  { threshold: 0.3, sensitivity: 0.82, specificity: 0.71 },
  { threshold: 0.4, sensitivity: 0.76, specificity: 0.79 },
  { threshold: 0.5, sensitivity: 0.68, specificity: 0.85 },
  { threshold: 0.6, sensitivity: 0.59, specificity: 0.89 },
  { threshold: 0.7, sensitivity: 0.48, specificity: 0.93 },
  { threshold: 0.8, sensitivity: 0.35, specificity: 0.96 },
  { threshold: 0.9, sensitivity: 0.21, specificity: 0.98 },
]

export default function CrossValidationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Validation Performance</CardTitle>
        <CardDescription>Sensitivity and specificity across different risk thresholds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer
            config={{
              sensitivity: {
                label: "Sensitivity",
                color: "hsl(var(--primary))",
              },
              specificity: {
                label: "Specificity",
                color: "hsl(var(--muted-foreground))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={validationData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="threshold" label={{ value: "Risk Threshold", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sensitivity"
                  stroke="var(--color-sensitivity)"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="specificity" stroke="var(--color-specificity)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Sensitivity:</strong> The proportion of actual positive cases correctly identified (true positive
            rate).
          </p>
          <p>
            <strong>Specificity:</strong> The proportion of actual negative cases correctly identified (true negative
            rate).
          </p>
          <p className="mt-2">
            Our model achieves a balance of 0.76 sensitivity and 0.79 specificity at the 0.4 threshold, which is the
            default used for risk classification.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

