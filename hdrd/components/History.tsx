"use client"

import { useState, useEffect } from "react"
import { type HealthData, getHealthHistory, deleteHealthData } from "@/utils/localStorage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import Result from "@/components/Result"

export default function History() {
  const [history, setHistory] = useState<HealthData[]>([])
  const [selectedResult, setSelectedResult] = useState<HealthData | null>(null)

  useEffect(() => {
    const data = getHealthHistory()
    setHistory(data.reverse())
  }, [])

  const handleDelete = (id: string) => {
    deleteHealthData(id)
    setHistory((prev) => prev.filter((item) => item.id !== id))
    if (selectedResult && selectedResult.id === id) {
      setSelectedResult(null)
    }
  }

  const handleSelect = (data: HealthData) => {
    setSelectedResult(data)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
          <CardDescription>View your past heart disease risk assessments</CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No assessment history found.</p>
              <Button className="mt-4" asChild>
                <a href="/form">Take Your First Assessment</a>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.riskLevel === "Low"
                            ? "bg-green-100 text-green-800"
                            : item.riskLevel === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.riskLevel}
                      </span>
                    </TableCell>
                    <TableCell>{item.riskScore.toFixed(1)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleSelect(item)}>
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedResult && <Result data={selectedResult} />}
    </div>
  )
}

