"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { saveHealthData, type HealthData } from "@/utils/localStorage"
import Result from "./Result"

const formSchema = z.object({
  age: z.number().min(20).max(100),
  sex: z.string(),
  systolicBP: z.number().min(90).max(200),
  totalCholesterol: z.number().min(100).max(400),
  hdlCholesterol: z.number().min(20).max(100),
  smoker: z.string(),
  diabetes: z.boolean(),
})

export default function AIAssessmentForm() {
  const [result, setResult] = useState<HealthData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 50,
      sex: "male",
      systolicBP: 120,
      totalCholesterol: 200,
      hdlCholesterol: 50,
      smoker: "never",
      diabetes: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      const healthData: Omit<HealthData, "id" | "date"> = {
        age: values.age,
        sex: values.sex,
        systolicBP: values.systolicBP,
        totalCholesterol: values.totalCholesterol,
        hdlCholesterol: values.hdlCholesterol,
        smoker: values.smoker,
        diabetes: values.diabetes,
        riskScore: data.riskScore,
        riskLevel: data.riskLevel,
      }
      const savedData = saveHealthData(healthData)
      setResult(savedData)
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to calculate risk. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={20}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>20</span>
                        <span>{field.value} years</span>
                        <span>100</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sex</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="systolicBP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Systolic Blood Pressure</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={90}
                        max={200}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>90</span>
                        <span>{field.value} mmHg</span>
                        <span>200</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalCholesterol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Cholesterol</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={100}
                        max={400}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>100</span>
                        <span>{field.value} mg/dL</span>
                        <span>400</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hdlCholesterol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HDL Cholesterol</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={20}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>20</span>
                        <span>{field.value} mg/dL</span>
                        <span>100</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smoker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Smoking Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select smoking status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="former">Former</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diabetes"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Diabetes</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Calculating..." : "Calculate Risk"}
            </Button>
          </form>
        </Form>
        {error && (
          <div className="mt-4 text-sm text-red-500">
            {error}
          </div>
        )}
        {result && (
          <div className="mt-8">
            <Result data={result} />
          </div>
        )}
      </CardContent>
    </Card>
  )
} 