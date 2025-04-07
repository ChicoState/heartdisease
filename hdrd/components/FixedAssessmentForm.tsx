"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { calculateRiskScore, saveHealthData, type HealthData } from "@/utils/localStorage"
import Result from "./Result"

const formSchema = z.object({
  age: z.number().min(20).max(79),
  sex: z.string(),
  race: z.string(),
  systolicBP: z.number().min(90).max(200),
  diastolicBP: z.number().min(60).max(130),
  totalCholesterol: z.number().min(130).max(320),
  hdlCholesterol: z.number().min(20).max(100),
  ldlCholesterol: z.number().min(30).max(300),
  diabetes: z.boolean(),
  smoker: z.string(),
  hypertensionTreatment: z.boolean(),
  statin: z.boolean(),
  aspirin: z.boolean(),
})

export default function FixedAssessmentForm() {
  const [result, setResult] = useState<HealthData | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 45,
      sex: "Male",
      race: "White",
      systolicBP: 120,
      diastolicBP: 80,
      totalCholesterol: 180,
      hdlCholesterol: 50,
      ldlCholesterol: 100,
      diabetes: false,
      smoker: "Never",
      hypertensionTreatment: false,
      statin: false,
      aspirin: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { riskScore, riskLevel } = calculateRiskScore(values)
    const healthData: Omit<HealthData, "id" | "date" | "riskScore" | "riskLevel"> = {
      age: values.age,
      sex: values.sex,
      systolicBP: values.systolicBP,
      totalCholesterol: values.totalCholesterol,
      hdlCholesterol: values.hdlCholesterol,
      smoker: values.smoker,
      diabetes: values.diabetes,
    }
    const savedData = saveHealthData(healthData)
    setResult(savedData)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/10">
      <CardHeader>
        <CardTitle className="text-2xl">Fixed Rate Heart Disease Risk Assessment</CardTitle>
        <CardDescription>Enter your health information to get a personalized risk assessment.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sex */}
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
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Race */}
              <FormField
                control={form.control}
                name="race"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select race" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="White">White</SelectItem>
                        <SelectItem value="African American">African American</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Age */}
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
                          max={79}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>20</span>
                          <span>{field.value} years</span>
                          <span>79</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Systolic Blood Pressure */}
              <FormField
                control={form.control}
                name="systolicBP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Systolic Blood Pressure (mmHg)</FormLabel>
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
                  </FormItem>
                )}
              />

              {/* Diastolic Blood Pressure */}
              <FormField
                control={form.control}
                name="diastolicBP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diastolic Blood Pressure (mmHg)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={60}
                          max={130}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>60</span>
                          <span>{field.value} mmHg</span>
                          <span>130</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Total Cholesterol */}
              <FormField
                control={form.control}
                name="totalCholesterol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Cholesterol (mg/dL)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={130}
                          max={320}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>130</span>
                          <span>{field.value} mg/dL</span>
                          <span>320</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* HDL Cholesterol */}
              <FormField
                control={form.control}
                name="hdlCholesterol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HDL Cholesterol (mg/dL)</FormLabel>
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
                  </FormItem>
                )}
              />

              {/* LDL Cholesterol */}
              <FormField
                control={form.control}
                name="ldlCholesterol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LDL Cholesterol (mg/dL)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={30}
                          max={300}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>30</span>
                          <span>{field.value} mg/dL</span>
                          <span>300</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Diabetes */}
              <FormField
                control={form.control}
                name="diabetes"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Diabetes</FormLabel>
                      <FormDescription>Do you have diabetes?</FormDescription>
                    </div>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm ${!field.value ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          No
                        </span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                        <span
                          className={`text-sm ${field.value ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Yes
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Hypertension Treatment */}
              <FormField
                control={form.control}
                name="hypertensionTreatment"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Hypertension Treatment</FormLabel>
                      <FormDescription>Are you on medication for high blood pressure?</FormDescription>
                    </div>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm ${field.value ? "text-muted-foreground" : "text-primary font-medium"}`}
                        >
                          No
                        </span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                        <span
                          className={`text-sm ${field.value ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Yes
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Statin */}
              <FormField
                control={form.control}
                name="statin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Statin Therapy</FormLabel>
                      <FormDescription>Are you taking statins for cholesterol?</FormDescription>
                    </div>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm ${field.value ? "text-muted-foreground" : "text-primary font-medium"}`}
                        >
                          No
                        </span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                        <span
                          className={`text-sm ${field.value ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Yes
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Aspirin */}
              <FormField
                control={form.control}
                name="aspirin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Aspirin Therapy</FormLabel>
                      <FormDescription>Are you taking aspirin regularly?</FormDescription>
                    </div>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm ${field.value ? "text-muted-foreground" : "text-primary font-medium"}`}
                        >
                          No
                        </span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                        <span
                          className={`text-sm ${field.value ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Yes
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Smoking Status - Full width */}
            <div className="mt-6">
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
                        <SelectItem value="Current">Current Smoker</SelectItem>
                        <SelectItem value="Former">Former Smoker</SelectItem>
                        <SelectItem value="Never">Never Smoked</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Calculate Risk
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-8 animate-in">
            <Result data={result} />
          </div>
        )}
      </CardContent>
    </Card>
  )
} 