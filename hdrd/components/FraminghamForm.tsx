"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
  age: z.number().min(20).max(79),
  sex: z.string(),
  totalChol: z.number().min(100).max(400),
  hdlChol: z.number().min(20).max(100),
  systolicBP: z.number().min(90).max(200),
  isTreatedForBP: z.boolean(),
  isSmoker: z.boolean(),
  hasDiabetes: z.boolean(),
})

type FraminghamInputs = {
  age: number,
  totalChol: number,
  hdlChol: number,
  systolicBP: number,
  isTreatedForBP: boolean,
  isSmoker: boolean,
  hasDiabetes: boolean,
  sex: 'male' | 'female',
}

const coefficients = {
  male: {
    lnAge: 3.06117,
    lnTotalChol: 1.12370,
    lnHDL: -0.93263,
    lnSBP_Treated: 1.99881,
    lnSBP_Untreated: 1.93303,
    smoker: 0.65451,
    diabetes: 0.57367,
    meanCoefficientSum: 23.9802,
    baselineSurvival: 0.88936
  },
  female: {
    lnAge: 2.32888,
    lnTotalChol: 1.20904,
    lnHDL: -0.70833,
    lnSBP_Treated: 2.82263,
    lnSBP_Untreated: 2.76157,
    smoker: 0.52873,
    diabetes: 0.69154,
    meanCoefficientSum: 26.1931,
    baselineSurvival: 0.95012
  }
}

function calculateFraminghamRisk(inputs: FraminghamInputs): number {
  const c = coefficients[inputs.sex];

  const lnAge = Math.log(inputs.age);
  const lnTotalChol = Math.log(inputs.totalChol);
  const lnHDL = Math.log(inputs.hdlChol);
  const lnSBP = Math.log(inputs.systolicBP);
  const bpCoef = inputs.isTreatedForBP ? c.lnSBP_Treated : c.lnSBP_Untreated;

  const sum =
    (c.lnAge * lnAge) +
    (c.lnTotalChol * lnTotalChol) +
    (c.lnHDL * lnHDL) +
    (bpCoef * lnSBP) +
    (c.smoker * (inputs.isSmoker ? 1 : 0)) +
    (c.diabetes * (inputs.hasDiabetes ? 1 : 0));

  const risk = 1 - Math.pow(c.baselineSurvival, Math.exp(sum - c.meanCoefficientSum));
  return risk * 100;
}

export default function FraminghamForm() {
  const [risk, setRisk] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 55,
      sex: "male",
      totalChol: 213,
      hdlChol: 50,
      systolicBP: 135,
      isTreatedForBP: false,
      isSmoker: false,
      hasDiabetes: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const calculatedRisk = calculateFraminghamRisk({
      ...values,
      sex: values.sex as 'male' | 'female'
    });
    setRisk(calculatedRisk);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Framingham Risk Calculator</CardTitle>
        <CardDescription>Calculate your 10-year cardiovascular disease risk</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age (years)</FormLabel>
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

              <FormField
                control={form.control}
                name="totalChol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Cholesterol (mg/dL)</FormLabel>
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hdlChol"
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

              <FormField
                control={form.control}
                name="isTreatedForBP"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">On Blood Pressure Medication</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isSmoker"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Current Smoker</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasDiabetes"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Diabetes</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">Calculate Risk</Button>

            {risk !== null && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Your 10-Year Risk</h3>
                <p className="text-2xl font-bold">{risk.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This represents your estimated risk of developing cardiovascular disease in the next 10 years.
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 