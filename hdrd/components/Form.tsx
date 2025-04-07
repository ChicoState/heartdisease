"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import CustomTooltip from "./CustomTooltip"
import { calculateRiskScore, saveHealthData } from "@/utils/localStorage"
import Result from "@/components/Result"
import { InfoIcon, LockIcon } from "lucide-react"

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

export default function RiskAssessmentForm() {
  const [result, setResult] = useState(null)

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
    const savedData = saveHealthData({
      ...values,
      riskScore,
      riskLevel,
    })
    setResult(savedData)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/10" id="risk-assessment">
      <CardHeader>
        <CardTitle className="text-2xl">Heart Disease Risk Assessment</CardTitle>
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
                    <div className="flex items-center gap-2">
                      <FormLabel>Systolic Blood Pressure (mmHg)</FormLabel>
                      <CustomTooltip
                        content={
                          <div className="space-y-2">
                            <p className="font-medium">Systolic Blood Pressure</p>
                            <p>
                              The top number in a blood pressure reading. It measures the pressure in your arteries when
                              your heart beats.
                            </p>
                            <ul className="text-xs space-y-1">
                              <li>
                                <strong>Normal:</strong> Less than 120 mmHg
                              </li>
                              <li>
                                <strong>Elevated:</strong> 120-129 mmHg
                              </li>
                              <li>
                                <strong>Hypertension Stage 1:</strong> 130-139 mmHg
                              </li>
                              <li>
                                <strong>Hypertension Stage 2:</strong> 140 mmHg or higher
                              </li>
                            </ul>
                          </div>
                        }
                      />
                    </div>
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
                    <div className="flex items-center gap-2">
                      <FormLabel>Diastolic Blood Pressure (mmHg)</FormLabel>
                      <CustomTooltip
                        content={
                          <div className="space-y-2">
                            <p className="font-medium">Diastolic Blood Pressure</p>
                            <p>
                              The bottom number in a blood pressure reading. It measures the pressure in your arteries
                              when your heart rests between beats.
                            </p>
                            <ul className="text-xs space-y-1">
                              <li>
                                <strong>Normal:</strong> Less than 80 mmHg
                              </li>
                              <li>
                                <strong>Hypertension Stage 1:</strong> 80-89 mmHg
                              </li>
                              <li>
                                <strong>Hypertension Stage 2:</strong> 90 mmHg or higher
                              </li>
                            </ul>
                          </div>
                        }
                      />
                    </div>
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
                    <div className="flex items-center gap-2">
                      <FormLabel>Total Cholesterol (mg/dL)</FormLabel>
                      <CustomTooltip
                        content={
                          <div className="space-y-2">
                            <p className="font-medium">Total Cholesterol</p>
                            <p>
                              The sum of all cholesterol types in your blood, including HDL, LDL, and triglycerides.
                            </p>
                            <ul className="text-xs space-y-1">
                              <li>
                                <strong>Desirable:</strong> Less than 200 mg/dL
                              </li>
                              <li>
                                <strong>Borderline High:</strong> 200-239 mg/dL
                              </li>
                              <li>
                                <strong>High:</strong> 240 mg/dL or higher
                              </li>
                            </ul>
                          </div>
                        }
                      />
                    </div>
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
                    <div className="flex items-center gap-2">
                      <FormLabel>HDL Cholesterol (mg/dL)</FormLabel>
                      <CustomTooltip
                        content={
                          <div className="space-y-2">
                            <p className="font-medium">HDL Cholesterol</p>
                            <p>
                              "Good" cholesterol that helps remove other forms of cholesterol from your bloodstream.
                            </p>
                            <ul className="text-xs space-y-1">
                              <li>
                                <strong>Low:</strong> Less than 40 mg/dL (men) or less than 50 mg/dL (women)
                              </li>
                              <li>
                                <strong>Optimal:</strong> 60 mg/dL or higher
                              </li>
                            </ul>
                            <p className="text-xs italic">Higher HDL levels are better for heart health.</p>
                          </div>
                        }
                      />
                    </div>
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
                    <div className="flex items-center gap-2">
                      <FormLabel>LDL Cholesterol (mg/dL)</FormLabel>
                      <CustomTooltip
                        content={
                          <div className="space-y-2">
                            <p className="font-medium">LDL Cholesterol</p>
                            <p>
                              "Bad" cholesterol that can build up in your arteries and increase your risk of heart
                              disease.
                            </p>
                            <ul className="text-xs space-y-1">
                              <li>
                                <strong>Optimal:</strong> Less than 100 mg/dL
                              </li>
                              <li>
                                <strong>Near Optimal:</strong> 100-129 mg/dL
                              </li>
                              <li>
                                <strong>Borderline High:</strong> 130-159 mg/dL
                              </li>
                              <li>
                                <strong>High:</strong> 160 mg/dL or higher
                              </li>
                            </ul>
                            <p className="text-xs italic">Lower LDL levels are better for heart health.</p>
                          </div>
                        }
                      />
                    </div>
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
                      <div className="flex items-center gap-2">
                        <FormLabel className="text-base">Diabetes</FormLabel>
                        <CustomTooltip content={<p>Diabetes significantly increases the risk of heart disease.</p>} />
                      </div>
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
                      <div className="flex items-center gap-2">
                        <FormLabel className="text-base">Hypertension Treatment</FormLabel>
                        <CustomTooltip
                          content={
                            <p>
                              Treatment for high blood pressure can significantly reduce your risk of heart disease, but
                              having hypertension still increases your overall risk.
                            </p>
                          }
                        />
                      </div>
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
                      <div className="flex items-center gap-2">
                        <FormLabel className="text-base">Statin Therapy</FormLabel>
                        <CustomTooltip
                          content={
                            <p>
                              Statins are medications that lower cholesterol and can reduce the risk of heart disease.
                            </p>
                          }
                        />
                      </div>
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
                      <div className="flex items-center gap-2">
                        <FormLabel className="text-base">Aspirin Therapy</FormLabel>
                        <CustomTooltip
                          content={
                            <p>
                              Regular low-dose aspirin can help prevent blood clots and reduce heart attack risk in some
                              individuals, though recent guidelines have narrowed recommendations for its use.
                            </p>
                          }
                        />
                      </div>
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
                    <div className="flex items-center gap-2">
                      <FormLabel>Smoking Status</FormLabel>
                      <CustomTooltip
                        content={
                          <p>
                            Smoking is a major risk factor for heart disease. Even former smokers have an elevated risk
                            compared to those who never smoked.
                          </p>
                        }
                      />
                    </div>
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
      <CardFooter className="flex flex-col space-y-3 border-t pt-6">
        <div className="flex items-center gap-2 text-sm">
          <InfoIcon className="h-4 w-4 text-primary" />
          <Link href="/how-to-measure" className="text-primary hover:underline">
            Not sure how to get these measurements?
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LockIcon className="h-4 w-4" />
          <span>Create an account to save your results and track changes over time.</span>
        </div>
      </CardFooter>
    </Card>
  )
}

