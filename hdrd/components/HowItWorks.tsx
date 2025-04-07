import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Brain, LineChart } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Enter Your Health Data",
    description:
      "Provide basic health metrics like blood pressure, cholesterol levels, and lifestyle factors through our simple form.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our advanced AI model, trained on real medical datasets, analyzes your inputs to calculate your heart disease risk.",
  },
  {
    icon: LineChart,
    title: "Get Personalized Insights",
    description:
      "Receive tailored recommendations and insights based on your risk profile to improve your heart health.",
  },
]

export default function HowItWorks() {
  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid fade-out-bottom"></div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our AI-powered platform makes it easy to understand and manage your heart disease risk.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

